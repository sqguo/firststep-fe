import React, { useEffect, useRef } from "react";

function usePrevious<T>(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current as T;
}

export default usePrevious;
