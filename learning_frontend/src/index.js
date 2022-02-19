import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LearningGame from "./LearningGame";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<App/>} />
    <Route path="/LearningGame" element={<LearningGame/>} />
  </Routes>
  </BrowserRouter>,
  rootElement
);
