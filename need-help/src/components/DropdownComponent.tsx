import React, { ChangeEvent } from "react";
import { Dropdown, DropdownItem } from "@ellucian/react-design-system/core";
import { spacing50 } from "@ellucian/react-design-system/core/styles/tokens";

interface DropdownComponentProps {
  placeholder: string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  degrees: string;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  placeholder,
  handleChange,
  degrees,
}) => {
  const customId = "FluidDropdown";
  const stringOptions = [
    "Mechanical Engineering",
    "Environmental and Energy Management",
    "Renewable Energy Engineering",
    "Electrical Engineering",
    "Biomedical System Engineering",
    "Civil Engineering/Civil Engineering Technician",
    "Information Science and Engineering",
  ];

  return (
    <div>
      <Dropdown
        fullWidth
        id={`${customId}_Dropdown`}
        label={placeholder}
        onChange={handleChange}
        value={degrees}
        style={{ marginBottom: spacing50 }}
      >
        <DropdownItem label="None" value="None" />
        {stringOptions.map((option) => (
          <DropdownItem key={option} label={option} value={option} />
        ))}
      </Dropdown>
    </div>
  );
};

export default DropdownComponent;
