import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import Board from './components/board';

const theme = {
  primary: "#b3d9ff",
  secondary: "#c8c9cc",
  info: "#a6d7e8",
  warning: "#ffe09e",
  error: "#f18a9b",

}





function App() {
  return (
    <ThemeProvider theme={theme}>
      <Board/>
    </ThemeProvider>
  );
}

export default App;
