import './App.css'
import Main from '../Main/index'
import Header from '../Header/index';
import Footer from '../Footer/index';


const App = () => {
    return (
        <div className="App">

            <Header title='User Page' version={0+1} />
            <Main />
            <Footer />

        </div>
    );
}

export default App;