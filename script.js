const lockedCards = document.querySelectorAll(".project-card.locked");

lockedCards.forEach((card) => {
  card.addEventListener("click", () => {
    card.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-4px)" },
        { transform: "translateX(4px)" },
        { transform: "translateX(0)" },
      ],
      {
        duration: 220,
        easing: "ease-out",
      }
    );
  });
});
