import React from 'react';
import './App.css';
import Container from './modules/Container';
import Field from './modules/Field';

function App() {
  return (
    <div className="App">
      <h1>Урожайность деревьев укладывается в нормальное распределение</h1>
      <p>Дерево со средней урожайностью встречается чаще.</p>
      <Container>
        <Field />
      </Container>
    </div>
  );
}

export default App;
