// import
import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";

// import css
import './App.css';

const App = () => {

  return (
    <div className="page">

      <Header title="Welcome to My App" version={0+1} />
      <Main />
      <Footer title="© 2023 My App"/>

    </div>
  );
};

export default App;

