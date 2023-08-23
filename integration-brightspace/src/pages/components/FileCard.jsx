/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { Typography, TextLink } from "@ellucian/react-design-system/core";

const styles = () => ({
  card: {
    marginTop: 0,
    marginRight: "40px",
    marginLeft: "40px",
    padding: "40px",
    border: "1px solid #e0e0e0",
    display: "flex",
    flexDirection: "column",
    marginBottom: "3rem",
    alignItems: "center",
  },
});
export default function FileCard(props) {
  const { fileName, fileFormat, downloadLink } = props;

  const getFileIcon = (format) => {
    switch (format) {
      case "pdf":
        return "📄";
      case "xls":
        return "📊";
      default:
        return "📁";
    }
  };
  return (
    <div className={props.classes.card}>
      <Typography variant="h5">Nuevo archivo publicado</Typography>
      <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <span style={{ fontSize: "24px", marginRight: "10px" }}>
          {getFileIcon(fileFormat)}
        </span>
        <Typography variant="body1">{fileName}</Typography>
      </div>
      <div style={{ marginTop: "10px" }}>
        <TextLink href={downloadLink} target="_blank" rel="noopener noreferrer">
          Descargar
        </TextLink>
      </div>
    </div>
  );
}
