const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: "Outlook", // Cambia esto al proveedor para correos de Hotmail
  auth: {
    user: "lfgalviz@hotmail.com", // Tu dirección de correo de prueba
    pass: "nspjdpdjtbdblzlj", // La contraseña de tu cuenta de prueba
  },
});

app.post("/enviar-correo-prueba", async (req, res) => {
  try {
    const {
      fName,
      sName,
      id,
      user_area,
      user_role,
      txtArea,
      optionCategoria,
      segundaCategoria,
      txtUbicacion,
      txtExt,
    } = req.body;

    // Lógica para el envío de correo electrónico
    const nombreRemitente = "Nombre de Prueba"; // Cambia esto al nombre del remitente
    const idRemitente = "remitente_prueba"; // Cambia esto al ID del remitente

    // Configura las direcciones de correo electrónico según la categoría (si es necesario)

    let to_email = "lgalviz@uninorte.edu.co";

    if (optionCategoria === "5" || optionCategoria === "2") {
      to_email = "lgalviz@uninorte.edu.co";
    }

    // Cuerpo del correo
    const asunto = `REPORTE DESDE UNINORTE.CO - ${optionCategoria}`;
    let mensaje =
      "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />";
    if (optionCategoria !== "0") {
      mensaje += `<strong>${optionCategoria}</strong><br/>`;
      if (segundaCategoria !== "") {
        const segundaCategoriaTexto = segundaCategoria.join("- ");
        mensaje += `${segundaCategoriaTexto}<br/>`;
      } else {
        mensaje += "<strong>SIN CATEGORÍA</strong><br/>";
      }
      mensaje += "<br/>";

      if (txtArea !== "") {
        mensaje += `<strong>Descripción: </strong>${txtArea
          .replace(/<(?:.|\n)*?>/gm, "")
          .trim()}<br /><br />`;
      }

      const name = `${fName} ${sName}`;

      mensaje += `<strong>Nombre: </strong>${name}<br/>`;
      mensaje += `<strong>Ubicación: </strong>${encodeURI(txtUbicacion)}"<br/>`;
      mensaje += `<strong>Ext: </strong>${encodeURI(txtExt)}<br/>`;
      mensaje += `<strong>Correo: </strong>${id}@uninorte.edu.co<br/><br/>`;
      mensaje += `<strong>Area: </strong>${user_area}<br/>`;
      mensaje += `<strong>Rol: </strong>${user_role}<br/></br>`;
      mensaje += `-------------------------------------------------------------------------`;
      mensaje += `<br /> <br />`;
      mensaje += `Enviado desde <strong>Uninorte.co</strong> <br />`;
      const fecha = new Date();
      mensaje += `Fecha y Hora:    ${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}<br />`;
    }

    // Configura el correo
    const mailOptions = {
      from: "lfgalviz@hotmail.com", // Debe coincidir con la cuenta de prueba
      to: to_email,
      subject: asunto,
      html: mensaje,
    };

    // Envía el correo electrónico
    await enviarCorreo(mailOptions);

    // Respuesta exitosa
    res.status(200).json({ mensaje: "Correo de prueba enviado con éxito" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ mensaje: "Error al enviar el correo de prueba" });
  }
});

app.post("/enviar-correo", async (req, res) => {
  try {
    const {
      fName,
      sName,
      id,
      user_area,
      user_role,
      txtArea,
      optionCategoria,
      segundaCategoria,
      txtUbicacion,
      txtExt,
    } = req.body;

    // Lógica para el envío de correo electrónico
    const nombreRemitente = "Nombre de Prueba"; // Cambia esto al nombre del remitente
    const idRemitente = "remitente_prueba"; // Cambia esto al ID del remitente

    // Configura las direcciones de correo electrónico según la categoría (si es necesario)

    let to_email = "csu@uninorte.edu.co";
    let cc_email = [
      "jpion@uninorte.edu.co",
      "arellanaa@uninorte.edu.co",
      "ldmonten@uninorte.edu.co",
      "cduarte@uninorte.edu.co",
    ];

    if (optionCategoria === "5" || optionCategoria === "2") {
      to_email = [
        "jcbernal@uninorte.edu.co",
        "agalera@uninorte.edu.co",
        "ppina@uninorte.edu.co",
        "ogeronimo@uninorte.edu.co",
        "lcnino@uninorte.edu.co",
        "csu@uninorte.edu.co",
        "coordinadormttolab@uninorte.edu.co",
      ];
      cc_email = [
        "jpion@uninorte.edu.co",
        "arellanaa@uninorte.edu.co",
        "ldmonten@uninorte.edu.co",
        "cduarte@uninorte.edu.co",
      ];
    }

    // Cuerpo del correo
    const asunto = `REPORTE DESDE UNINORTE.CO - ${optionCategoria}`;
    let mensaje =
      "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />";
    if (optionCategoria !== "0") {
      mensaje += `<strong>${optionCategoria}</strong><br/>`;
      if (segundaCategoria !== "") {
        const segundaCategoriaTexto = segundaCategoria.join("- ");
        mensaje += `${segundaCategoriaTexto}<br/>`;
      } else {
        mensaje += "<strong>SIN CATEGORÍA</strong><br/>";
      }
      mensaje += "<br/>";

      if (txtArea !== "") {
        mensaje += `<strong>Descripción: </strong>${txtArea
          .replace(/<(?:.|\n)*?>/gm, "")
          .trim()}<br /><br />`;
      }

      const name = `${fName} ${sName}`;

      mensaje += `<strong>Nombre: </strong>${name}<br/>`;
      mensaje += `<strong>Ubicación: </strong>${encodeURI(txtUbicacion)}"<br/>`;
      mensaje += `<strong>Ext: </strong>${encodeURI(txtExt)}<br/>`;
      mensaje += `<strong>Correo: </strong>${id}@uninorte.edu.co<br/><br/>`;
      mensaje += `<strong>Area: </strong>${user_area}<br/>`;
      mensaje += `<strong>Rol: </strong>${user_role}<br/></br>`;
      mensaje += `-------------------------------------------------------------------------`;
      mensaje += `<br /> <br />`;
      mensaje += `Enviado desde <strong>Uninorte.co</strong> <br />`;
      const fecha = new Date();
      mensaje += `Fecha y Hora:    ${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}<br />`;
    }

    // Configura el correo
    const mailOptions = {
      from: "lfgalviz@hotmail.com", // Debe coincidir con la cuenta de prueba
      to: to_email,
      subject: asunto,
      html: mensaje,
    };

    // Envía el correo electrónico
    await enviarCorreo(mailOptions);

    // Respuesta exitosa
    res.status(200).json({ mensaje: "Correo de prueba enviado con éxito" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ mensaje: "Error al enviar el correo de prueba" });
  }
});

async function enviarCorreo(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo:", error);
        reject(error);
      } else {
        console.log("Correo enviado:", info.response);
        resolve(info);
      }
    });
  });
}

app.listen(port, () => {
  console.log(`Servidor Node.js en ejecución en el puerto ${port}`);
});
