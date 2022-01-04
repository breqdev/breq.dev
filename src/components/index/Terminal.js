import React, { useEffect, useState, useMemo } from "react";
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

const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
  "Enter",
];

function useKonamiCode() {
  const [count, setCount] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const keyDownHandler = ({ code }) => {
      if (success) {
        return;
      }

      if (code === konamiCode[count]) {
        setCount(count + 1);
      } else {
        setCount(0);
      }
    };

    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [count, success]);

  if (count === konamiCode.length && !success) {
    setSuccess(true);
  }

  return success;
}

export default function Terminal() {
  const [terminalShown, setTerminalShown] = useState(false);

  // poor woman's ref
  const [socket] = useState({ current: null });
  const [chatName] = useState({ current: "" });
  const [inbox] = useState({ current: [] });

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

  const konamiCodeSuccess = useKonamiCode();

  useEffect(() => {
    let timeout;

    if (konamiCodeSuccess) {
      timeout = setTimeout(() => setTerminalShown(true), 500);
    }

    return () => {
      clearTimeout(timeout);
    };
  });

  if (!terminalShown) {
    return null;
  }

  // We need to prevent the .terminalContainer style from being purged from
  // CSS, since we need to use it to apply our own override styles to remove
  // the terminal style.
  // See /src/styles/global.css for more info.

  // eslint-disable-next-line no-unused-vars
  const classNameInUse = "terminalContainer";

  return (
    <div className="max-w-5xl mx-auto font-mono p-8">
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
