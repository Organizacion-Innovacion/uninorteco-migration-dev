module.exports = {
  name: "uninorte-extension-template",
  publisher: "uninorte",
  cards: [
    {
      type: "card-template-1",
      source: "./src/cards/MainCard.jsx",
      title: "Card Template 1",
      displayCardType: "Card Template 1",
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
