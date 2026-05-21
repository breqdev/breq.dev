---
title: How I became a domain registrar*
description: "*but maybe not the TLDs you're thinking of"
tags: [dns, networking]
---

This website has the domain name `breq.dev`. To set it up, I purchased it from a registrar (Porkbun), who then bought it at wholesale prices from the `.dev` registry (run by Google).

When you open this website in your browser, your computer _resolves_ this domain using the DNS protocol. Specifically, it looks up `.dev` in the root servers to get Google's servers, looks up `breq.dev` in Google's servers to get _my_ nameservers (run by Cloudflare in this case), and then queries those servers to get the IP address of the server hosting `breq.dev`.

But who runs these root servers? Who decided that `.dev` should be a domain name, or that Google should have the exclusive right to manage it? In practice, the root servers are managed by ICANN (the aptly-named Internet Corporation for Assigned Names and Numbers), which delegates top-level domains like `.dev` to whoever pays them [lots of money](https://www.icann.org/en/blogs/details/icann-sets-expected-evaluation-fee-for-new-gtld-applications-in-the-next-round-25-09-2024-en).

That said, there's nothing inherent to the DNS protocol that specifies that ICANN runs the root servers or prevents anyone else from starting their own. This is where [DigiNøltar](https://diginoltar.nl/) comes in -- it is an alternate set of DNS root servers for the Internet, with its own TLDs and its own rules for who gets to run them. For instance, DigiNøltar itself is available at `notar.øl` (or more precisely, `notar.xn--l-4ga` in [IDN normalized](https://en.wikipedia.org/wiki/Internationalized_domain_name) form). And this website is available at `brooke.oomf`!

This project involved setting up my own authoritative DNS server, which was much more complex than I anticipated! DNS is one of the protocols that most software developers are familiar with, but few ever interact with at such a low level.

# Authoritative and Recursive Nameservers

The DNS system is built on "nameservers": servers which receive requests for domain names and return corresponding DNS records. These servers are split into two types: "authoritative" and "recursive."

Recursive nameservers are the ones you're likely most familiar with, like `8.8.8.8` or `1.1.1.1`. When a recursive nameserver receives a request for a domain name, it is responsible for contacting the appropriate authoritative nameservers until it finds the record it is looking for.

Using the `dig` command and the `+norecurse` option, we can see this chain in action! To illustrate, let's look up two domains that point to the same site: `diginoltar.nl` using the ICANN root servers and `notar.xn--l-4ga` using the DigiNøltar root servers.

Let's start with one of the ICANN root servers. Although they're operated by different entities, they all should behave identically. There are not that many root servers, so their IP addresses are often hardcoded -- let's assume we know that the IP address of `a.root-servers.net` is `198.41.0.4`.

<Dig>

```
; <<>> DiG 9.18.48 <<>> +norecurse A @198.41.0.4 diginoltar.nl
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 52658
;; flags: qr; QUERY: 1, ANSWER: 0, AUTHORITY: 3, ADDITIONAL: 7

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;diginoltar.nl.			IN	A

;; AUTHORITY SECTION:
nl.			172800	IN	NS	ns3.dns.nl.
nl.			172800	IN	NS	ns1.dns.nl.
nl.			172800	IN	NS	ns4.dns.nl.

;; ADDITIONAL SECTION:
ns3.dns.nl.		172800	IN	A	194.0.25.24
ns3.dns.nl.		172800	IN	AAAA	2001:678:20::24
ns1.dns.nl.		172800	IN	A	194.0.28.53
ns1.dns.nl.		172800	IN	AAAA	2001:678:2c:0:194:0:28:53
ns4.dns.nl.		172800	IN	A	185.159.199.200
ns4.dns.nl.		172800	IN	AAAA	2620:10a:80ac::200

;; Query time: 32 msec
;; SERVER: 198.41.0.4#53(198.41.0.4) (UDP)
;; WHEN: Mon May 18 22:10:50 EDT 2026
;; MSG SIZE  rcvd: 232
```

</Dig>

Remember, it's not the root server's job to have records for every domain name -- that's why we don't see `diginoltar.nl` in the response at all! The root server points you to the authoritative server for the top level domain (`.nl`), and that server points to the authoritative server for the second-level domain (`diginoltar.nl`), and

First, look at the Authority Section. This specifies what nameservers ("NS") are responsible for the `.nl` domain. We can keep querying any of `ns1`, `ns3`, or `ns4.dns.nl` to find our answer.

You might wonder: how can we query, say, `ns1.dns.nl` to look up records if we don't know its IP address? Since it's under the `.nl` zone, we'd need to query `ns1.dns.nl` to figure out -- it's a chicken-and-egg problem. To get around this, the root server also supplied "glue records" in the Additional Section: the "A" and "AAAA" records mapping `ns1.dns.nl` and the others to IPv4 and IPv6 addresses we can connect to. (The IPv6 ones are called AAAA records since an IPv6 address is four times as many bytes as an IPv4 address!)

Cool, now let's pick one of those addresses at random and ask it for diginoltar.nl:

<Dig>

```
; <<>> DiG 9.18.48 <<>> +norecurse A @194.0.25.24 diginoltar.nl
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 3125
;; flags: qr; QUERY: 1, ANSWER: 0, AUTHORITY: 3, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1400
; COOKIE: aeaea45fdcf62976010000006a08e3e1d11dcd412312d010 (good)
;; QUESTION SECTION:
;diginoltar.nl.			IN	A

;; AUTHORITY SECTION:
diginoltar.nl.		3600	IN	NS	ns1.famfo.xyz.
diginoltar.nl.		3600	IN	NS	ns1.homecloud.lol.
diginoltar.nl.		3600	IN	NS	miyuki.sakamoto.pl.

;; Query time: 129 msec
;; SERVER: 194.0.25.24#53(194.0.25.24) (UDP)
;; WHEN: Sat May 16 17:38:41 EDT 2026
;; MSG SIZE  rcvd: 160
```

</Dig>

Awesome -- we now have some servers which are authoritative for `diginoltar.nl`! Notice that we don't need glue records this time, since they're all on a different domain than `.nl`. We can look up the IP address of the first one using the same process we're doing now:

- Ask the root server: `dig +norecurse A @198.41.0.4 ns1.famfo.xyz` gives us the `.xyz` nameserver `x.nic.xyz`, with a glue record showing it at `194.169.218.42`
- Ask the authoritative `.xyz` server: `dig +norecurse A @194.169.218.42 ns1.famfo.xyz` gives us the `.famfo.xyz` nameserver `ns1.famfo.xyz`, with a glue record showing it at `116.202.10.127`
- Ask the authoritative `famfo.xyz` server: `dig +norecurse A @116.202.10.127 ns1.famfo.xyz` gives us `116.202.10.127`!

You might have noticed that we can skip the last step, but I wrote it out for completeness.

Finally, we can ask `ns1.famfo.xyz` for `diginoltar.nl`:

<Dig>

```
; <<>> DiG 9.18.48 <<>> +norecurse A @116.202.10.127 diginoltar.nl
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 37909
;; flags: qr aa; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;diginoltar.nl.			IN	A

;; ANSWER SECTION:
diginoltar.nl.		3600	IN	A	5.75.163.176

;; Query time: 171 msec
;; SERVER: 116.202.10.127#53(116.202.10.127) (UDP)
;; WHEN: Sat May 16 17:45:15 EDT 2026
;; MSG SIZE  rcvd: 58
```

</Dig>

And we get our answer: `5.75.163.176`! This is the website hosting `diginoltar.nl`.

Next, let's repeat this process, but with the DigiNøltar infrastructure and the `notar.xn--l-4ga` domain name.

Ask the root server, `51.195.3.249`:

<Dig>

```
; <<>> DiG 9.18.48 <<>> +norecurse A @51.195.3.249 notar.xn--l-4ga
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 5979
;; flags: qr; QUERY: 1, ANSWER: 0, AUTHORITY: 1, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;notar.øl.			IN	A

;; AUTHORITY SECTION:
øl.			600	IN	NS	ns1.øl.gtld-servers.ol.

;; Query time: 108 msec
;; SERVER: 51.195.3.249#53(51.195.3.249) (UDP)
;; WHEN: Sat May 16 17:46:50 EDT 2026
;; MSG SIZE  rcvd: 87
```

</Dig>

Cool, we need to find `ns1.øl.gtld-servers.ol`. Let's ask the root nameserver again:

<Dig>

```
; <<>> DiG 9.18.48 <<>> +norecurse A @51.195.3.249 ns1.øl.gtld-servers.ol
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 23950
;; flags: qr aa; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;ns1.øl.gtld-servers.ol.	IN	A

;; ANSWER SECTION:
ns1.øl.gtld-servers.ol. 600	IN	A	5.75.163.176

;; Query time: 198 msec
;; SERVER: 51.195.3.249#53(51.195.3.249) (UDP)
;; WHEN: Sat May 16 17:48:56 EDT 2026
;; MSG SIZE  rcvd: 74
```

</Dig>

We get an A record response directly -- this is uncommon but allowed within the protocol. Let's ask it about `notar.xn--l-4ga`:

<Dig>

```
; <<>> DiG 9.18.48 <<>> +norecurse A @5.75.163.176 notar.xn--l-4ga
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 18622
;; flags: qr aa; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;notar.øl.			IN	A

;; ANSWER SECTION:
notar.øl.		3600	IN	A	5.75.163.176

;; Query time: 129 msec
;; SERVER: 5.75.163.176#53(5.75.163.176) (UDP)
;; WHEN: Sat May 16 17:50:18 EDT 2026
;; MSG SIZE  rcvd: 60
```

</Dig>

Awesome, another A record! We now know that `notar.øl` is hosted on `5.75.163.176`, the same server as `diginoltar.nl`.

You can see how this is, essentially, two parallel sets of infrastructure, coexisting on the public Internet. Just as I can set my router to use a recursive resolver like `8.8.8.8` that uses the ICANN root servers, I can set up my router to use the [DigiNøltar recursive resolver](http://diginoltar.nl/uitleg-root/) at `51.195.8.10`.

# Hosting a nameserver

Suppose we want to create our own TLD, `.oomf`. We need to host an authoritative nameserver for it -- something that DigiNøltar's root servers will give to people when they ask about `.oomf`.

[BIND](https://en.wikipedia.org/wiki/BIND) is the most common software used for this type of thing. We need to set up a maze of configuration files on disk in order to use it.

First, let's set up BIND's root configuration file. This sets the path of our other files. `recursion no` specifies that this is an authoritative server, and shouldn't try to resolve stuff for clients like a recursive server would.

```c
// /etc/bind/named.conf.options
options {
    directory "/var/cache/bind";

    listen-on { any; };
    listen-on-v6 { any; };

    allow-query { any; };
    recursion no;

    dnssec-validation no;
};
```

Awesome -- let's declare our zone! Here's where we would put all of the TLDs we want to be authoritative for. Right now, it's just `.oomf`. `type primary` means that we are the authoriative source for this zone -- `secondary` would be for load-balancing or failover servers. Each zone gets its own _zone file_, specified with the `file` keyword.

```c
// /var/cache/bind/named.conf.local
zone "oomf" {
    type primary;
    file "/etc/bind/zones/db.oomf";
};
```

Let's put in our zone definition! Here's where we switch from the C-style syntax of BIND configuration files into the format of [DNS zone files](https://datatracker.ietf.org/doc/html/rfc1035#section-5).

```dns-zone-file
; /etc/bind/zones/db.oomf
$ORIGIN oomf.
$TTL 3600

@ IN SOA ns1.oomf.gtld-servers.ol. hostmaster.oomf. (
    2026050701 ; serial
    3600       ; refresh
    60         ; retry
    604800     ; expire
    60         ; minimum TTL
)

@ IN NS ns1.oomf.gtld-servers.ol.
```

DigiNøltar will point `ns1.oomf.gtld-servers.ol` at us. `SOA` is "Start of Authority", it declares that this server is the authority for `oomf` (which is represented by the `@` symbol). The NS record is what will actually tell recursive resolvers who is the authority for this domain -- it's where we'd put alternate server names like `ns2.oomf.gtld-servers.ol` if we had more than one.

At this point, we're all ready to start issuing domains! Let's use `brooke.oomf` as an example.

If we want to also host DNS records for domains, we do it like this. First, declare that the zone exists:

```dns-zone-file
; /etc/bind/zones/db.oomf
; [...]
brooke    IN NS ns1.oomf.gtld-servers.ol.
```

Then, include the relevant records -- the `SOA` declaring that we're the authority, the relevant NS, and finally the A specifying where the web server is:

```dns-zone-file
; /etc/bind/zones/db.brooke.oomf
$ORIGIN brooke.oomf.
$TTL 3600

@ IN SOA ns1.oomf.gtld-servers.ol. hostmaster.oomf. (
    2026050701 ; serial
    3600
    60
    604800
    60
)

@ IN NS  ns1.oomf.gtld-servers.ol.
@ IN A   71.232.183.79
```

If we wanted to use a different authoritative server for the `brooke.oomf` zone, for instance at `ns1.brooke.oomf`, we'd just have to point at their nameserver, and include a glue record if needed:

```dns-zone-file
; /etc/bind/zones/db.oomf
; [...]
brooke           IN NS ns1.brooke.oomf.
ns1.brooke.oomf. IN A  71.232.183.79
```

And that's it -- our very own top-level domain name!

# How can you get in on this?

First off, you can use DigiNøltar's DNS servers to access sites hosted on their TLDs! The easiest way is to set your DNS server to one of their [public recursive ones](http://diginoltar.nl/uitleg-root/). In my case, since I live in the US and don't want all of my DNS traffic to have to go to Europe and back, I just have overrides set up in my network's recursive resolver to only send DNS requests for DigiNøltar TLDs to them and route ICANN TLDs to the normal root zone.

You can also register a domain name from [any of the supported TLDs](http://notar.øl/producten/), usually by contacting that TLD's registrar through some esoteric and fun method.

And if you want -- hosting your own TLD is an easy, fun, and free way to learn more about how DNS infrastructure works and is deployed in practice!
