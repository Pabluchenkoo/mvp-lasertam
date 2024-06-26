import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import messages_es from './localizacion/es.json';
import messages_en from './localizacion/en.json';
import {EventsProvider} from "./pages/app/Calendar/context/eventsContext";


// Here is where you insert the react-axe configuration
if (process.env.NODE_ENV !== 'production') {
    const axe = require('react-axe');
    axe(React, ReactDOM, 1000); // Adjust the delay as needed for your app
}


const language = navigator.language.split(/[-_]/)[0]; 
const messages = {
  es: messages_es,
  en: messages_en,
}; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <EventsProvider>
    <IntlProvider locale={language} messages={messages[language]}>
      <BrowserRouter>
      <App />
        </BrowserRouter>
    </IntlProvider>
      </EventsProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
