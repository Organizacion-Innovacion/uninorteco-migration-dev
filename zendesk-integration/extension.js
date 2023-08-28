module.exports = {
  name: "zendesk-integration",
  publisher: "uninorte",
  cards: [
    {
      type: "zendesk-integration-card",
      source: "./src/cards/MainCard.jsx",
      title: "Centro de atención estudiantil",
      displayCardType: "Centro de atención estudiantil",
      description: "Centro de ayuda y preguntas frecuentes",
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
