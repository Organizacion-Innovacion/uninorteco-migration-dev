import React from "react";
import { TextField, Dropdown, DropdownItem } from "@ellucian/react-design-system/core";

type HeaderProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  uniqueCategories: string[];
  classes: {
    inputs: string;
  };
};

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  uniqueCategories,
  classes,
}) => {
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className={classes.inputs}>
      <TextField
        label="Buscar"
        variant="outlined"
        value={searchQuery}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setSearchQuery(e.target.value)
        }
      />
      <Dropdown value={selectedCategory} onChange={handleCategoryChange}>
        <DropdownItem value="General">General</DropdownItem>
        {uniqueCategories.map((category) => (
          <DropdownItem key={category} value={category}>
            {category}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
};

export default Header;
