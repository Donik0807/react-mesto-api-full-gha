import { useState } from "react";

export default function useForm(inputValues) {
  const [inputData, setInputData] = useState(inputValues);

  function handleChange(event) {
    const { value, name } = event.target;
    setInputData((inputData) => ({ ...inputData, [name]: value }));
  }
  
  return { inputData, handleChange, setInputData };
}
