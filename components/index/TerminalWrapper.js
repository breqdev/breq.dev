import React, { useEffect, useState } from "react";
import LazyWrapper from "../../utils/LazyWrapper";

const Terminal = React.lazy(() => import("./Terminal"));

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

export default function TerminalWrapper() {
  const [terminalShown, setTerminalShown] = useState(false);

  const konamiCodeSuccess = useKonamiCode();

  useEffect(() => {
    let timeout;

    if (konamiCodeSuccess) {
      timeout = setTimeout(() => setTerminalShown(true), 500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [konamiCodeSuccess]);

  return terminalShown ? (
    <LazyWrapper>
      <Terminal />
    </LazyWrapper>
  ) : null;
}
