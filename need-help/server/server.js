const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: 'Outlook', // Cambia esto al proveedor para correos de Hotmail
  auth: {
    user: 'lfgalviz@hotmail.com', // Tu dirección de correo de prueba
    pass: 'nspjdpdjtbdblzlj' // La contraseña de tu cuenta de prueba
  }
});

app.post('/enviar-correo-prueba', async (req, res) => {
  try {
    const { txtArea, optionCategoria, segundaCategoria, txtUbicacion, txtExt } = req.body;

    // Lógica para el envío de correo electrónico
    const nombreRemitente = 'Nombre de Prueba'; // Cambia esto al nombre del remitente
    const idRemitente = 'remitente_prueba'; // Cambia esto al ID del remitente

    // Configura las direcciones de correo electrónico según la categoría (si es necesario)

    let to_email = 'lgalviz@uninorte.edu.co'; // Cambia esto al destinatario deseado

    if (optionCategoria === '5' || optionCategoria === '2') {
      to_email = 'lgalviz@uninorte.edu.co'; // Cambia esto al destinatario correspondiente
    }

    // Cuerpo del correo
    const asunto = `Asunto de Prueba - ${nombreRemitente}`;
    const mensaje = `Contenido del correo de prueba enviado por ${nombreRemitente} (ID: ${idRemitente}):\n\n${txtArea}`;

    // Configura el correo
    const mailOptions = {
      from: 'lfgalviz@hotmail.com', // Debe coincidir con la cuenta de prueba
      to: to_email,
      subject: asunto,
      text: mensaje
    };

    // Envía el correo electrónico
    await enviarCorreo(mailOptions);

    // Respuesta exitosa
    res.status(200).json({ mensaje: 'Correo de prueba enviado con éxito' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error al enviar el correo de prueba' });
  }
});

async function enviarCorreo(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
        reject(error);
      } else {
        console.log('Correo enviado:', info.response);
        resolve(info);
      }
    });
  });
}

app.listen(port, () => {
  console.log(`Servidor Node.js en ejecución en el puerto ${port}`);
});