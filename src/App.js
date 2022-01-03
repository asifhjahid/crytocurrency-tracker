import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App';
import Header from './components/Header';
import Coin from './pages/Coin';
import Home from './pages/Home';

function App() {

  const useStyles = makeStyles(()=>({
    App:{
      backgroundColor: '#14161a',
      color:'#ffffff',
      minHeight:'100vh',
    },
  }));
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.App}>
        <Header />
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coins/:id' element={<Coin />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
