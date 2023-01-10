import React from "react";

import { Container } from "./styles";

interface SelectInputProps {
  options: {
    value: string | number;
    label: string | number;
  }[];
  // onChange: (value: string | number) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ options }) => {
  return (
    <Container>
      <select>
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default SelectInput;
