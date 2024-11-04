import { useState } from 'react'

interface ClickCounterProps {
  title: string;
}

const ClickCounter = ({title}: ClickCounterProps) => {
    const [count, setCount] = useState(0);
    
    const handleClick = () => {
        setCount(count + 1);
    }
    
    title = "You are a master in the art of clicking !";
    
    return (
        <>
        <button onClick={handleClick}>
            count is {count}
        </button>
        {count >= 10 && <p>{title}</p>}
        {count >= 10 && <p>SUCCESS :</p>}
        {count >= 10 && <p>10</p>}
        {count >= 20 && <p>20</p>}
        {count >= 30 && <p>30</p>}
        </>
    )
}

export default ClickCounter;