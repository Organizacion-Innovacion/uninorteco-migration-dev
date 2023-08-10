module.exports = {
  name: "average-calculator",
  publisher: "uninorte",
  cards: [
    {
      type: "average-calculator-card",
      source: "./src/cards/MainCard.jsx",
      title: "Calculadora de Promedio",
      displayCardType: "Calculadora de Promedio",
      description:
        "Calculadora promedio es una funcionalidad que te permite realizar los cálculos con respecto al promedio de una asignatura, promedio semestral y promedio acumulado",
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
