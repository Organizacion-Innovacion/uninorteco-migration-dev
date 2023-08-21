module.exports = {
  name: "uninorte-extension-template",
  publisher: "uninorte",
  cards: [
    {
      type: "card-template-1",
      source: "./src/cards/MainCard.jsx",
      title: "Notificaciones Brighspace",
      displayCardType: "Notificaciones Brighspace",
      description: "This is the description of Card Template 1",
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
