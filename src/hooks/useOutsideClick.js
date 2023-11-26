import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
      //Set third argument to TRUE to avoid problem of event handler moves up the DOM during the capturing instead of bubbling phase
    },
    [handler, listenCapturing]
  );
  return ref;
}
