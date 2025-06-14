import styled from "styled-components";

export default function Card({ card, handleChoice, flipped }) {
  function handleClick() {
    handleChoice(card);
  }
  return (
    <CardContainer>
      <img src={card.src}></img>
      <Cover flipped={flipped} onClick={handleClick}></Cover>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  position: relative;
  img {
    width: 100%;
    height: 200px;
  }
`;

const Cover = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  background-color: black;
  width: 100%;
  height: 200px;
  transform: ${(props) => (props.flipped ? "rotateY(90deg)" : "rotateY(0deg)")};
  transition: all ease-in 0.4s;
`;
