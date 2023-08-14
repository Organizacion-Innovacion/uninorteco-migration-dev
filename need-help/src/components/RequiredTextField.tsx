import React, { useState, ChangeEvent } from "react";
import PropTypes from "prop-types";
import { TextField } from "@ellucian/react-design-system/core";
import { spacing50 } from "@ellucian/react-design-system/core/styles/tokens";


interface RequiredTextFieldProps {
  placeholder?: string;
  multiline?: boolean;
}

const RequiredTextField: React.FC<RequiredTextFieldProps> = ({
  placeholder,
  multiline,
}) => {
  const [state, updateState] = useState({
    value: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    updateState({
      ...state,
      [name]: value,
    });
  };

  const { value } = state;
  const customId = multiline
    ? "TextFieldMultilineExample"
    : "TextFieldFullWidthExample";
  const label = placeholder || "Label";

  return (
        <TextField
          id={`${customId}_Field`}
          label={label}
          name="value"
          onChange={handleChange}
          value={value}
          fullWidth
          multiline={multiline}
          maxCharacters={multiline ? 100 : undefined}
          minRows={multiline ? 5 : undefined}
          placeholder={`Enter ${multiline ? "up to 100 " : ""}characters`}
          style={{ marginBottom: spacing50 }}
        />
  );
};

RequiredTextField.propTypes = {
  placeholder: PropTypes.string,
  multiline: PropTypes.bool,
};

export default RequiredTextField;
