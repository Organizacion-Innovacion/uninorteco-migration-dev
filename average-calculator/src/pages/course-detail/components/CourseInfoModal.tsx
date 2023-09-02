import React from "react";
import { Typography } from "@ellucian/react-design-system/core";
import { InfoModal } from "../../../components/InfoModal";

export interface CourseInfoModalProps {
  setOpen: (open: boolean) => void;
  open: boolean;
}

export function CourseInfoModal({ setOpen, open }: CourseInfoModalProps) {
  return (
    <InfoModal
      open={open}
      setOpen={setOpen}
      title="¿Cómo se calcula la nota final de una asignatura en Uninorte?"
    >
      <Typography variant="body1" sx={{ mb: 4 }}>
        Las asignaturas están compuestas de componentes parciales. Los componentes
        tienen asociado un porcentaje que representa el peso que tienen en el cálculo de
        tu nota final. Lo anterior significa que existen componentes que tienen más
        relevancia que otros. La nota final de las asignaturas es calculada usando la
        fórmula de promedio ponderado dónde la nota del componente es el valor y el
        porcentaje el peso.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Veamos un ejemplo usando los siguientes 2 componentes parciales:
      </Typography>
      <Typography
        variant="body1"
        sx={{ display: "flex", flexDirection: "column", mb: 2 }}
      >
        <span>&#x2022; Parcial 1 - 20%, en este componente obtuviste un 4.0 </span>
        <span>&#x2022; Parcial 2 - 80%, en este componente obtuviste es 3.5</span>
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Por ende, aplicando la fórmula de promedio ponderado tu nota final es: <br />
        <em>Nota final = (4.0*20 + 3.5*80) / (20 + 80) ≈ 3.6 </em>
      </Typography>
      <Typography variant="body1">
        La nota final de una asignatura tiene una precisión de una décima y es
        redondeada al entero más cercano. Lo último nos permite deducir que asignaturas
        que terminan con una nota final de 2.96, 2.97 son redondeadas a 3. Incluso una
        nota de 2.95 es redondeada a 3 debido a que en caso de empate se redondea al
        entero superior. No obstante, una nota final de 2.94 redondea a 2.9
      </Typography>
    </InfoModal>
  );
}
