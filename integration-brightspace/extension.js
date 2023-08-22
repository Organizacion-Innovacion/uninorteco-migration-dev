module.exports = {
  name: "integration-brightspace",
  publisher: "uninorte",
  cards: [
    {
      type: "integration-brightspace-card",
      source: "./src/cards/MainCard.jsx",
      title: "Notificaciones Brightspace",
      displayCardType: "Notificaciones Brightspace",
      description:
        "La integración con Brightspace permite que los estudiantes reciban notificaciones de Brightspace en el LMS de la Universidad del Norte.",
      pageRoute: {
        route: "/",
        excludeClickSelectors: ["a"],
      },
    },
  ],
  page: {
    source: "./src/app/App.jsx",
  },
};
