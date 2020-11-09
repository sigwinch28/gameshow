import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const names = [
  "Pedro Assuncao",
  "Andreia Costa",
  "Carlos Barata",
  "Pedro Miguel Dias de Matos",
  "Ciaran Edwards",
  "Pedro Lopes",
  "Igor Escobar",
  "Hass Chapman",
  "Bruno Oliveira",
  "André Domingues",
  "Catarina Santana",
  "João Costa",
  "Gonçalo Silva",
  "Vera Brito",
  "António Ferreira",
  "António Leonardo",
  "Pedro Caseiro",
  "Ricardo Maranho",
  "Joe Harrison",
  "Daniel Francisco",
  "Raphael Cruzeiro"]

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
