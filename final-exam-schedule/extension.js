module.exports = {
  name: "horario-examenes-finales",
  publisher: "uninorte",
  cards: [
    {
      type: "card-horario-examenes-finales",
      source: "./src/cards/MainCard.jsx",
      title: "Examenes Finales",
      displayCardType: "Card Examenes Finales",
      description: "This is the description of Card Examenes Finales",
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
