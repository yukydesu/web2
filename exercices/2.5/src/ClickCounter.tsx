import { useState } from 'react';

interface ClickCounterProps {
  title: string;
  hoverMessage: string;
}

const ClickCounter = ({ title, hoverMessage }: ClickCounterProps) => {
  const [count, setCount] = useState(0);
  const [showHoverMessage, setShowHoverMessage] = useState(false);

  const handleClick = () => {
    setCount(count + 1);
  };

  const handleMouseEnter = () => {
    setShowHoverMessage(true);
  };

  const handleMouseLeave = () => {
    setShowHoverMessage(false);
  };

  title = "You are a master in the art of clicking !";

  return (
    <>
      <button onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        count is {count}
      </button>
      <p>{showHoverMessage ? `${hoverMessage}` : null}</p>
      <p>
        {count >= 10 && <p>{title}</p>}
        {count >= 10 && <p>SUCCESS :</p>}
        {count >= 10 && <p>10</p>}
        {count >= 20 && <p>20</p>}
        {count >= 30 && <p>30</p>}
        </p>
    </>
  );
};

export default ClickCounter;