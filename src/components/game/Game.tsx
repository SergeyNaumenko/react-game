import { useEffect } from 'react';
import Board from '../board';
import Footer from '../footer';

import './style.scss';

const Game = () => {

  return (
    <div className='game'>
      <header className='header'>
        <h1>here is the header</h1>
      </header>
      <main className='main'>
        <Board/>
      </main>
      <Footer/>
    </div>
  );
}

export default Game;
