module.exports = {
  name: "horario-examenes-finales",
  publisher: "uninorte",
  cards: [
    {
      type: "card-horario-examenes-finales",
      source: "./src/cards/MainCard.jsx",
      title: "Examenes Finales",
      displayCardType: "Card Examenes Finales",
      description: "Los estudiantes pueden ver sus examenes finales en esta tarjeta",
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
