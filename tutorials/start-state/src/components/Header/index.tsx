import { useState } from "react";
import './Header.css';

interface HeaderProps {
    title: string;
    version: number;
  }
  
  const Header = ({title, version}: HeaderProps) => {

    const [menuPrinted, setMenuPrinted] = useState(false); // menuPrinted est un state qui est initialisé à false, et qui est modifiable par la fonction setMenuPrinted 

    const handleClick = () => {
      console.log(`value of menuPrinted before click: ${menuPrinted}`);
      setMenuPrinted(!menuPrinted);
    }
  
    return (
      <header onClick={handleClick}> 
        <h1 className="animate__animated animate__bounce">{title}</h1>
        <p>
          {/* // si menuPrinted est true, alors on affiche le titre suivi de ... and rarely do we hate it! sinon on affiche juste le titre */}
          {menuPrinted ? `${title}... and rarely do we hate it!` : title} 
        </p>
        <h4>Version: {version}</h4>
      </header>
    );
  };
  
  export default Header;
  