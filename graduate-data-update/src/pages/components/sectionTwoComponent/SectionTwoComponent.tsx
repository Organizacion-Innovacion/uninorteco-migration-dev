import React from "react";
import { withStyles } from "@ellucian/react-design-system/core/styles";
import EmploymentStatus from "./components/EmploymentStatus";

const SectionTwoComponent: React.FC<{ classes: any }> = () => {
  const options:string[] = ["Empleado","Empresario","Independiente","Estudiante","Desempleado","Inactivo Laboralmente", "Jubilado"];

  return <EmploymentStatus titleCard="¡Ayúdanos a estar en contacto contigo!" options={options}/>;
};

export default withStyles()(SectionTwoComponent);
