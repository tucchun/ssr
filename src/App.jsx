import React, { useCallback, useState } from "react";

function Hello() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    let c = count + 1;
    setCount(c);
  }, [count]);

  return <h1 onClick={handleClick}>Hello from React!-click time: {count}</h1>;
}

export default Hello;
