import { useEffect, useState } from "react";

export function useLocalStorageState(initState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initState;
  });  // هعملك فاليو تخزن فيها الراجع من الكي

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);  // هات الكي اعملك احطلك ايتم باسمه في اللوكال ستورادج كل ما الكي يتغير يعني كل ما يتبعت كي جديد

  return [value, setValue];
}
