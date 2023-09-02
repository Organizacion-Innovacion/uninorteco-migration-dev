import React from "react";
import { Typography } from "@ellucian/react-design-system/core";
import { InfoModal } from "../../../components/InfoModal";

export interface SemestreInfoModalProps {
  setOpen: (open: boolean) => void;
  open: boolean;
}

export function SemestreInfoModal({ setOpen, open }: SemestreInfoModalProps) {
  return (
    <InfoModal
      open={open}
      setOpen={setOpen}
      title="¿Cómo se calcula el promedio semestral en Uninorte?"
    >
      <Typography variant="body1" sx={{ mb: 4 }}>
        Los semestres académicos están compuestos por asignaturas. Las asignaturas
        tienen asociado un número de créditos que representan el peso que tienen en el
        cálculo de tu promedio semestral. Esto significa que hay asignaturas que tienen
        más relevancia que otras. El promedio semestral es calculado usando la fórmula
        de promedio ponderado donde la nota de la asignatura es el valor y el número de
        créditos el peso
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Veamos un ejemplo usando 2 asignaturas
      </Typography>
      <Typography
        variant="body1"
        sx={{ display: "flex", flexDirection: "column", mb: 2 }}
      >
        <span>&#x2022; Calculo I - 3 créditos en esta asignatura obtuviste un 4.4</span>
        <span>&#x2022; Física I - 5 créditos, en esta asignatura obtuviste un 4.2</span>
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Por ende, aplicando la fórmula de promedio ponderado tu promedio semestral es:{" "}
        <br />
        <em>Promedio semestral = (4.4*3 + 4.1*5) / (5 + 3) = 4.2125 ≈ 4.21</em>
      </Typography>
      <Typography variant="body1">
        El promedio semestral tiene una precisión de 2 décimas y es redondeado hacia
        abajo.
      </Typography>
    </InfoModal>
  );
}
