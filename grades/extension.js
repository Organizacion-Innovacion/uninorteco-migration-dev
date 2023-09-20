module.exports = {
  name: "grades",
  publisher: "uninorte",
  cards: [
    {
      type: "grades-card",
      source: "./src/cards/MainCard.jsx",
      title: "Calificaciones",
      displayCardType: "Calificaciones",
      description: "Visualiza las calificaciones de tus asignaturas matriculadas",
      pageRoute: {
        route: "/",
        excludeClickSelectors: ["a"],
      },
    },
  ],
  page: {
    source: "./src/app/App.jsx",
    backgroundColor: "neutral",
  },
};
