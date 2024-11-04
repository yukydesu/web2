import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface AppProps {
  title: string;
}

function App({title}: AppProps) {

  const [count, setCount] = useState(0); // menuPrinted est un state qui est initialisé à false, et qui est modifiable par la fonction setMenuPrinted 

  // Fonction qui incrémente le state count de 1
  const handleClick = () => {
    setCount(count + 1);
  }

  title = "You are a master in the art of clicking !";

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClick}>
          count is {count}
        </button>
        {/* Si le count est à 10 ou plus alors afficher un messsge */}
        {count >= 10 && <p>{title}</p>}
        {count >= 10 && <p>SUCCESS :</p>}
        {count >= 10 && <p>10</p>}
        {count >= 20 && <p>20</p>}
        {count >= 30 && <p>30</p>}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
