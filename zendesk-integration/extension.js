module.exports = {
  name: "uninorte-extension-template",
  publisher: "uninorte",
  cards: [
    {
      type: "card-template-1",
      source: "./src/cards/MainCard.jsx",
      title: "Centro de atención estudiantil",
      displayCardType: "Card Template 1",
      description: "Centro de ayuda y preugntas frecuentes",
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
