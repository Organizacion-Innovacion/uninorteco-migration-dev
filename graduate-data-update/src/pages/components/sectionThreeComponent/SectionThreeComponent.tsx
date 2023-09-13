import React from "react";
import { withStyles } from "@ellucian/react-design-system/core/styles";
import AdressForm from "./components/AdressForm";

const SectionThreeComponent: React.FC<{ classes: any }> = () => (<><AdressForm titleCard='Permanente'/><AdressForm titleCard='Temporal'/></>);

export default withStyles()(SectionThreeComponent);