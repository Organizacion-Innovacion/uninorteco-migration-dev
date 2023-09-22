/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { withStyles } from "@ellucian/react-design-system/core/styles";
import { v4 as uuidv4 } from "uuid";
import { spacing20 } from "@ellucian/react-design-system/core/styles/tokens";
import { Typography, Button, Link } from "@ellucian/react-design-system/core";
import PropTypes from "prop-types";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { useIntl } from "react-intl";
import { useGetCourse } from "../hooks/useGetCourse";
import { calculateDistance } from "../core/common/utils";
import { APP_ENV_VARS } from "../core/config/app-env-vars";
import { useNotifications } from "../hooks/useNotifications";
import { AppLogger } from "../core/config/logger";
import FileCard from "./components/FileCard";
import ExamCard from "./components/ExamCard";
import NotificationCard from "./components/NotificationCard";
import loginImage from "../assets/password.png";

const myLogger = AppLogger.getAppLogger().createContextLogger("home.jsx");
const styles = () => ({
  card: {
    margin: `0 ${spacing20}`,
    border: "1px solid #e0e0e0",
    padding: "20px",
    borderRadius: "5px",
    marginBottom: "20px",
  },
});

const HomePage = (props) => {
  const [token, setToken] = useState(null);
  const { classes } = props;
  const { setPageTitle } = usePageControl();
  const intl = useIntl();
  const distance = calculateDistance(11.1, -74.11, 11.2, -73.11);
  const { notifications, loading, error } = useNotifications(token);
  const { course } = useGetCourse();
  myLogger.debug(`notifications: ${notifications}`);
  myLogger.debug(`the distance is ${distance}`);
  myLogger.debug(`loading: ${loading}`);
  myLogger.debug(`error: ${error}`);
  console.log("notifications from hook: ", notifications);
  console.log("course from hook: ", course);
  useEffect(() => {
    myLogger.debug("useEffect");
  }, []);

  // Función para iniciar el flujo de autorización
  const startAuthFlow = () => {
    const redirectUri =
      "https://experience-test.elluciancloud.com/udntest/development/page/001G000000oSi8rIAC/uninorte/integration-brightspace/integration-brightspace-card/";
    const scopes =
      "alerts:alerts:read grades:gradesettings:read orgunits:course:read organizations:organization:read users:profile:read users:userdata:read users:own_profile:read"; // Tus scopes separados por espacios
    const authUrl = `https://auth.brightspace.com/oauth2/auth?response_type=code&client_id=9f61d745-9fa7-4a5e-a80d-ac96a5f92f9f&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes)}`;
    window.location.href = authUrl;
  };

  // Función para obtener el token de acceso usando el código
  const getToken = async (code) => {
    try {
      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("client_id", "9f61d745-9fa7-4a5e-a80d-ac96a5f92f9f");
      params.append("client_secret", "sfyFd24jirYDR2_kHYJUHsZtvl4d9_vAz4gwJDpsbEA");
      params.append(
        "redirect_uri",
        "https://experience-test.elluciancloud.com/udntest/development/page/001G000000oSi8rIAC/uninorte/integration-brightspace/integration-brightspace-card/"
      );

      const response = await axios.post(
        "https://auth.brightspace.com/core/connect/token",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setToken(response.data.access_token);
      console.log("Token obtenido:", response.data.access_token);
    } catch (err) {
      console.error("Error obteniendo el token:", err);
    }
  };

  useEffect(() => {
    // Verificar si hay un código en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      getToken(code);
    }
  }, []);

  const AuthPrompt = () => (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <img
        src={loginImage}
        alt="Brightspace Icon"
        style={{ width: "100px", marginBottom: "20px" }}
      />
      <Typography variant="h5" style={{ marginBottom: "20px" }}>
        Autoriza a Brightspace
      </Typography>
      <Typography style={{ marginBottom: "30px" }}>
        Para ver tus notificaciones, necesitas autorizar a nuestra aplicación para
        acceder a tu cuenta de Brightspace.
      </Typography>
      <Button variant="contained" color="primary" onClick={startAuthFlow}>
        Iniciar sesión con Brightspace
      </Button>
    </div>
  );
  return (
    <div style={{ padding: "20px" }}>
      {!token ? (
        <AuthPrompt />
      ) : // Renderizar las notificaciones si el usuario está autenticado
      loading ? (
        <Typography>Cargando notificaciones...</Typography>
      ) : (
        notifications.map((notification) => {
          const { Id, Title, Message, MessageURL, Course, AlertDateTime, Category } =
            notification;
          return (
            <NotificationCard
              Title={Title}
              Message={Message}
              Id={Id}
              Course={Course}
              AlertDateTime={AlertDateTime}
              Category={Category}
              MessageURL={MessageURL}
            />
          );
        })
      )}
    </div>
  );
};

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
