import React from 'react';
import './App.scss';
import SearchBar from './Components/SearchBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>NEXT<sub>Search</sub></h1>
        <SearchBar/>
      </header>
   
    </div>
  );
}

export default App;
