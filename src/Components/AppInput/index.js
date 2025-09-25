
import React , {useEffect,useState} from "react";
import "./AppInput.css";



const AppInput = ({ type, placeholder = "", onChange , error ,value }) => {
  const [localValue, setLocalValue] = useState(value || "");

  // Sync with parent value changes
  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <input
      className={["input", error ? "input-error" : ""].join(" ")}
      type={type}
      value={localValue}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default AppInput;
