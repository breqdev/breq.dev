export default function turtle(turtle: HTMLImageElement) {
  let hasTurtle = false;
  let isTouch = false;
  let turtPosn = { x: 0, y: 0 };
  let turtSize = 32;

  function mouseUp() {
    hasTurtle = false;
  }

  function moveTurtle(cx: number, cy: number) {
    if (!turtle) return;

    turtle.style.position = "fixed";
    turtle.style.display = "block";
    turtle.style.left = cx - turtPosn.x + "px";
    turtle.style.top = cy - turtPosn.y + "px";
    turtle.style.height = turtSize + "px";
    turtle.style.width = turtSize + "px";
    turtle.style.userSelect = "none";
  }

  function mouseMove(event: MouseEvent) {
    if (hasTurtle && (event.buttons & 1 || isTouch)) {
      moveTurtle(event.clientX, event.clientY);
      document.body.style.userSelect = "none";
      return false;
    } else {
      hasTurtle = false;
      document.body.style.userSelect = "initial";
    }
  }

  function touchMove(event: TouchEvent) {
    if (!hasTurtle) return;
    for (const touch of event.changedTouches) {
      moveTurtle(touch.screenX, touch.screenY);
      event.preventDefault();
      return false;
    }
  }

  function mouseDown(event: MouseEvent) {
    hasTurtle = true;
    turtPosn.x = event.offsetX;
    turtPosn.y = event.offsetY;
    event.preventDefault();
    return false;
  }

  function touchDown(event: TouchEvent) {
    isTouch = true;
    hasTurtle = true;

    for (const touch of event.touches) {
      const rect = turtle.getBoundingClientRect();
      if (!rect) continue;
      turtPosn.x = touch.screenX - rect.x;
      turtPosn.y = touch.screenY - rect.y;
      event.preventDefault();
      return false;
    }
  }

  const params = new URLSearchParams(window.location.search);

  if (params.get("turt[big]")) {
    turtSize = parseFloat(params.get("turt[big]")!) * (56 / 3);
  }
  moveTurtle(
    parseFloat(params.get("turt[x]")!),
    parseFloat(params.get("turt[y]")!),
  );

  turtle.addEventListener("mousedown", mouseDown);
  turtle.addEventListener("touchstart", touchDown);
  document.body.addEventListener("mousemove", mouseMove);
  document.body.addEventListener("touchmove", touchMove);
  document.body.addEventListener("mouseup", mouseUp);
  document.body.addEventListener("touchend", mouseUp);
}
