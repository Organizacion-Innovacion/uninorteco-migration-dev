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

const formatDate = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
export default function FileCard(props) {
  const {
    fileName,
    fileFormat,
    course,
    downloadLink,
    Title,
    Message,
    AlertDateTime,
    IconURL,
  } = props;

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
      <div
        style={{
          marginTop: "10px",
          display: "flex",
        }}
      >
        <Typography variant="h5">{Title}</Typography>
        {/* icon */}
        <img src={IconURL} alt="" />
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <Typography variant="body1">{Message}</Typography>
      </div>
      <Typography variant="body1">{course.Name}</Typography>

      <Typography variant="body2" style={{ marginTop: "10px" }}>
        {formatDate(AlertDateTime)}
      </Typography>
      {/* <div style={{ marginTop: "10px" }}>
        <TextLink href={downloadLink} target="_blank" rel="noopener noreferrer">
          Descargar
        </TextLink>
      </div> */}
    </div>
  );
}
