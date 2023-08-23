import React from "react";
import { Typography, Button } from "@ellucian/react-design-system/core";

export default function ExamCard(props) {
  return (
    // eslint-disable-next-line react/destructuring-assignment, react/prop-types
    <div className={props.classes.card}>
      <Typography variant="h4">Evaluación publicada</Typography>
      <Typography variant="body2" style={{ color: "#ccc", marginBottom: "20px" }}>
        Hace 2 horas
      </Typography>
      <Typography>
        Descripción detallada de la notificación que puede incluir más información sobre
        la evaluación, enlaces para acceder a la evaluación, instrucciones, etc.
      </Typography>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button variant="contained" color="primary">
          Comenzar Examen
        </Button>
      </div>
    </div>
  );
}
