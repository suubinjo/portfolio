const lockedCard = document.querySelector(".project-card.locked");

if (lockedCard) {
  lockedCard.addEventListener("click", () => {
    lockedCard.animate(
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
}
