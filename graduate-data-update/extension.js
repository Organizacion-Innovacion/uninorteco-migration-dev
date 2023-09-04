module.exports = {
  name: "graduate-data-update",
  publisher: "uninorte",
  cards: [
    {
      type: "graduate-data-update-card",
      source: "./src/cards/MainCard.jsx",
      title: "Actualización de datos egresados",
      displayCardType: "Actualización de datos egresados",
      description: "This is the description of graduate data update",
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
