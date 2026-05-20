export interface DigOptions {
  digVersion: string;
  queryName: string;
  queryType: string;
  server: string;
  flags: string[];
}

export interface ResourceRecord {
  name: string;
  ttl: number;
  class: string;
  type: string;
  value: string;
}

export interface DigResult {
  options: DigOptions;
  authoritySection: ResourceRecord[];
  answerSection: ResourceRecord[];
  additionalSection: ResourceRecord[];
}

/**
 * Parses a resource record line of the form:
 *   nl.  172800  IN  NS  ns3.dns.nl.
 */
function parseRecord(line: string): ResourceRecord | null {
  // Fields are separated by whitespace; value may contain spaces (e.g. SOA)
  const parts = line.trim().split(/\s+/);
  if (parts.length < 5) return null;

  const [name, ttlStr, cls, type, ...valueParts] = parts;
  const ttl = parseInt(ttlStr, 10);
  if (isNaN(ttl)) return null;

  return {
    name,
    ttl,
    class: cls,
    type,
    value: valueParts.join(" "),
  };
}

/**
 * Extracts the +flags and other options from the DiG command line comment, e.g.:
 *   ; <<>> DiG 9.18.48 <<>> +norecurse A @198.41.0.4 diginoltar.nl
 */
function parseCommandLine(line: string): DigOptions {
  // Strip leading "; <<>> DiG " and split on " <<>> "
  const withoutPrefix = line.replace(/^;\s*<<>>\s*DiG\s+/, "");
  const arrowIdx = withoutPrefix.indexOf("<<>>");
  const version = arrowIdx >= 0 ? withoutPrefix.slice(0, arrowIdx).trim() : "";
  const rest =
    arrowIdx >= 0 ? withoutPrefix.slice(arrowIdx + 4).trim() : withoutPrefix;

  const tokens = rest.split(/\s+/);
  const flags: string[] = [];
  let queryType = "";
  let server = "";
  let queryName = "";

  for (const token of tokens) {
    if (token.startsWith("+")) {
      flags.push(token);
    } else if (token.startsWith("@")) {
      server = token.slice(1);
    } else if (!queryType && /^[A-Z]+$/.test(token)) {
      // First all-uppercase token is the query type (A, AAAA, MX, NS, …)
      queryType = token;
    } else if (!queryName && token.includes(".")) {
      queryName = token;
    }
  }

  return { digVersion: version, queryName, queryType, server, flags };
}

/**
 * Parses a full dig output string and returns structured options,
 * authority section records, and additional section records.
 */
export function parseDig(input: string): DigResult {
  const lines = input.split("\n");

  let options: DigOptions = {
    digVersion: "",
    queryName: "",
    queryType: "",
    server: "",
    flags: [],
  };
  const authoritySection: ResourceRecord[] = [];
  const additionalSection: ResourceRecord[] = [];
  const answerSection: ResourceRecord[] = [];

  type Section = "none" | "authority" | "additional" | "answer";
  let currentSection: Section = "none";

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    // Command line — first line with "DiG" in it
    if (/^;\s*<<>>\s*DiG/.test(line)) {
      options = parseCommandLine(line);
      continue;
    }

    // Section headers
    if (/^;;\s*AUTHORITY SECTION:/.test(line)) {
      currentSection = "authority";
      continue;
    }
    if (/^;;\s*ADDITIONAL SECTION:/.test(line)) {
      currentSection = "additional";
      continue;
    }
    if (/^;;\s*ANSWER SECTION:/.test(line)) {
      currentSection = "answer";
      continue;
    }
    // Any other ";;" line resets the section
    if (/^;;/.test(line)) {
      currentSection = "none";
      continue;
    }
    // Skip comment/blank lines
    if (line.startsWith(";") || line.trim() === "") {
      continue;
    }

    // Data lines
    if (
      currentSection === "authority" ||
      currentSection === "additional" ||
      currentSection === "answer"
    ) {
      const record = parseRecord(line);
      if (record) {
        if (currentSection === "authority") {
          authoritySection.push(record);
        } else if (currentSection === "answer") {
          answerSection.push(record);
        } else {
          additionalSection.push(record);
        }
      }
    }
  }

  return { options, authoritySection, additionalSection, answerSection };
}
