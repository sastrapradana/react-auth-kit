import { useState } from "react";

export default function useHandleChange(initialValue) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    const { name, value: valueInput } = event.target;
    setValue({ ...value, [name]: valueInput });
  };

  const clearValue = () => {
    setValue(initialValue);
  };

  return { value, handleChange, clearValue };
}
