import React from "react";
import { withStyles } from "@ellucian/react-design-system/core/styles";
import CardComponent from "./cardComponent/CardComponent";
import { stylesComponent } from "./SectionOneComponentStyles";

const SectionOneComponent: React.FC<{ classes: any }> = () => (
    <>
      <CardComponent titleCard="Correo" labelTextfield="Correo electrónico" />
      <CardComponent titleCard="Télefono" labelTextfield="Télefono" />
    </>
  );

export default withStyles(stylesComponent)(SectionOneComponent);
