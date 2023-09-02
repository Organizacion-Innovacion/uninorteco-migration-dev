import React from "react";
import { Typography } from "@ellucian/react-design-system/core";
import { InfoModal } from "../../../components/InfoModal";

export interface PGAInfoModalModalProps {
  setOpen: (open: boolean) => void;
  open: boolean;
}

export function PGAInfoModal({ setOpen, open }: PGAInfoModalModalProps) {
  return (
    <InfoModal
      open={open}
      setOpen={setOpen}
      title="¿Cómo se calcula el promedio acumulado o PGA en Uninorte?"
    >
      <Typography variant="body1" sx={{ mb: 4 }}>
        El promedio acumulado es calculado usando la fórmula de promedio ponderado donde
        el promedio semestral es el valor y el total de créditos de ese semestre es el
        peso.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Veamos un ejemplo suponiendo que ya cursaste 2 semestres
      </Typography>
      <Typography
        variant="body1"
        sx={{ display: "flex", flexDirection: "column", mb: 2 }}
      >
        <span>
          &#x2022; El primer semestre matriculaste un total de 15 créditos y tu promedio
          semestral fue de 4.5
        </span>
        <span>
          &#x2022; El segundo semestre matriculaste un total de 16 créditos y tu
          promedio semestral fue de 4.0
        </span>
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Por ende, aplicando la fórmula de promedio ponderado tu promedio acumulado es:{" "}
        <br />
        <em>Promedio acumulado = (4.5*15 + 4.0*16) / (15 + 16) = 4.2419 ≈ 4.24</em>
      </Typography>
      <Typography variant="body1">
        El promedio acumulado tiene una precisión de 2 décimas y es redondeado hacia
        abajo.
      </Typography>
    </InfoModal>
  );
}
