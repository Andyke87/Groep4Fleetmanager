import './App.css';
import Login from './Components/Login/Login';
import Welkom from './Components/Welkom/Welkom';
import NieuwScherm from './Components/NieuwScherm/NieuwSchermVoertuigen.jsx';
import { createContext, useState } from 'react';
import ReactSwitch from 'react-switch';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'))
  }
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
    <div className='App' id={theme}>
      <div className='switch'>
        <label>{theme === 'light' ? 'Light Mode' : 'Dark Mode'} </label>
        <ReactSwitch onChange={toggleTheme} checked={theme === 'dark'}/>
      </div>
      <Login/>
    </div>
    </ThemeContext.Provider>
  )
}

export default App;
