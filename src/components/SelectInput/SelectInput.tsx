import React from "react";

import { Container } from "./styles";

interface SelectInputProps {
  options: {
    value: string | number;
    label: string | number;
  }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void | undefined;
  defaultValue: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  options,
  onChange,
  defaultValue,
}) => {
  return (
    <Container>
      <select onChange={onChange} defaultValue={defaultValue}>
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
