import React, { useMemo, useRef } from "react";
import {
  EmulatorState,
  FileSystem,
  CommandMapping,
  defaultCommandMapping,
  OutputFactory,
} from "javascript-terminal";
import ReactTerminal from "react-terminal-component";

import README from "./terminalContent/README.txt";
import CREDITS from "./terminalContent/CREDITS.txt";

export default function Terminal() {
  const socket = useRef<WebSocket>();
  const chatName = useRef("");
  const inbox = useRef([]);

  const emulatorState = useMemo(
    () =>
      EmulatorState.create({
        fs: FileSystem.create({
          "/home": {},
          "/home/README": {
            content: README,
          },
          "/home/CREDITS": {
            content: CREDITS,
          },
        }),
        commandMapping: CommandMapping.create({
          ...defaultCommandMapping,
          connect: {
            function: (state, ops) => {
              chatName.current = ops[0];

              if (!ops[0]) {
                return {
                  output: OutputFactory.makeErrorOutput({
                    source: "connect",
                    type: "name required",
                  }),
                };
              }

              socket.current = new WebSocket("wss://chat.breq.dev/socket");

              socket.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                inbox.current.push(data);
              };

              return {
                output: OutputFactory.makeTextOutput(
                  "connected as " + chatName.current
                ),
              };
            },
            optDef: {},
          },
          connection: {
            function: (state, ops) => {
              if (socket.current.readyState === WebSocket.OPEN) {
                return {
                  output: OutputFactory.makeTextOutput(
                    "connected as " + chatName.current
                  ),
                };
              } else {
                return {
                  output: OutputFactory.makeErrorOutput({
                    source: "connection",
                    type: "not connected",
                  }),
                };
              }
            },
            optDef: {},
          },
          send: {
            function: (state, ops) => {
              if (socket.current.readyState !== WebSocket.OPEN) {
                return {
                  output: OutputFactory.makeErrorOutput({
                    source: "send",
                    type: "not connected",
                  }),
                };
              }

              socket.current.send(
                JSON.stringify({
                  content: ops.join(" "),
                  nickname: chatName.current,
                  color: "#000000",
                })
              );

              return {
                output: OutputFactory.makeTextOutput("sent: " + ops.join(" ")),
              };
            },
            optDef: {},
          },
          inbox: {
            function: (state, ops) => {
              const newMessages = inbox.current.slice();
              inbox.current = [];

              const lines = newMessages.map(
                ({ content, nickname }) => `${nickname}: ${content}`
              );

              return {
                output: OutputFactory.makeTextOutput(
                  "inbox:\n" + lines.join("\n")
                ),
              };
            },
            optDef: {},
          },
        }),
      }),
    [chatName, socket, inbox]
  );

  return (
    <div className="mx-auto max-w-5xl p-8 font-mono">
      <ReactTerminal
        theme={{
          background: "#000",
          promptSymbolColor: "#fff",
          commandColor: "#fff",
          outputColor: "#1BB3FF",
          errorOutputColor: "#FF1B8D",
          fontSize: "1rem",
          spacing: "1%",
          fontFamily: "'Ubuntu Mono', ui-monospace, monospace",
          width: "100%",
        }}
        promptSymbol="breq@breq.dev$ "
        emulatorState={emulatorState}
      />
    </div>
  );
}
