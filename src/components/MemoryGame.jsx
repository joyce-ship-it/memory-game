import React from "react";
import styled from "styled-components";
import Card from "./Card";
const MemoryGame = ({ images }) => {
  const [cards, setCards] = React.useState([]);
  const [turns, setTurns] = React.useState(0);
  const [userChoice1, setUserChoice1] = React.useState(null);
  const [userChoice2, setUserChoice2] = React.useState(null);
  console.log(cards);
  React.useEffect(() => {
    if (userChoice2) {
      if (userChoice1.src === userChoice2.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === userChoice1.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      } else {
        console.log("no match");
      }
      setTimeout(() => resetChoice(), 500);
    }
  }, [userChoice2]);
  function handleChoice(card) {
    userChoice1 ? setUserChoice2(card) : setUserChoice1(card);
    // console.log(userChoice1, userChoice2);
  }
  function resetChoice() {
    setUserChoice1(null);
    setUserChoice2(null);
    setTurns((prevTurns) => prevTurns + 1);
  }
  function shuffleCards() {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((image) => {
        return { src: image, matched: false, id: crypto.randomUUID() };
      });
    setCards(shuffledCards);
    setTurns(0);
  }

  return (
    <div>
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>
        {turns > 0 ? "Re-start" : "Start"} Game
      </button>
      <CardGrid>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              userChoice1 === card ||
              userChoice2 === card ||
              card.matched === true
            }
          />
        ))}
      </CardGrid>
      {turns > 0 && <h2>Turns : {turns}</h2>}
    </div>
  );
};

const CardGrid = styled.div`
  max-width: 900px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
`;

export default MemoryGame;
