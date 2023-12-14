import './App.css';
import Login from './Components/Login/Login';
import { createContext } from 'react';

export const ThemeContext = createContext(null);

function App() {


  return (
    <ThemeContext.Provider>
      <Login/>
    </ThemeContext.Provider>
  )
}

export default App;
