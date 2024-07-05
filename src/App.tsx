import {letters} from './helpers/letters'
import { HangImage } from './components/HangImage'
import './App.css'
import { useEffect, useState } from 'react';
import { getRandomWord } from './helpers/getRandomWord';

function App() {

  const [word, setWord] = useState( getRandomWord() );
  const [hiddenWord, setHiddenWord] = useState( '_ '.repeat( word.length));
  const [ attempts, setAttempts ] = useState(0);
  const [ lose, setLose] = useState( false );
  const [ won, setWon] = useState( false );


  // determinar si al persona perdio
  useEffect( () => {
  if ( attempts >= 4)  {
    setLose(true)
  } 
}, [ attempts]) // hooks

  useEffect( () => {
    //console.log(hiddenWord)
    const currentHiddenWord = hiddenWord.split(' ').join('')
    if ( currentHiddenWord === word ) {
      setWon( true )
    }
  }, [ hiddenWord ])

  const checkLetter = ( letter: string) => {
    if ( lose ) return;
    if ( won ) return;
    if ( !word.includes(letter)) {
      setAttempts( Math.min(attempts + 1, 4) );
      return;
    }

    const hiddenWordArray = hiddenWord.split(' ');

    for (let i = 0; i < word.length; i++) {
          if ( word[i] === letter) {
            hiddenWordArray[i] = letter;
          }
      
    }

    setHiddenWord(hiddenWordArray.join(' '))

  }

  const newGame = () => {
    const newWord = getRandomWord();

    setWord ( newWord )
    setHiddenWord( '_ '.repeat( newWord.length ));
    setAttempts(0);
    setLose(false);
    setWon(false);
  }

  return (
      <div className='App'>
        <h1>Ahorcado hecho con React y TS</h1>
        {/* imagenes */}
        <HangImage imageNumber={attempts} />

        {/* palabra oculta */}
        <h3>{ hiddenWord }</h3>

        {/* contador intentos */}
        <h3>Intentos: { attempts }</h3>

        {/* msj si pierde */}
        {
          ( lose ) 
          ? <h2>Perdió 😢, la palabra era: { word }</h2>
          :''
        }
        {/* msj si gana */}
        {
          ( won ) 
          ? <h2>🎉🎉Ganaste🎉🎉</h2>
          :''
        }
        {/* botones de letrass */}
        {
          letters.map( (letter) => (
            <button
              onClick={ () => checkLetter(letter) }
              key={ letter }>
              { letter }
            </button>
          ))
        }

        <br /><br />
        <button onClick={ newGame } className='play'>Jugar de nuevo</button>

      </div>

  )
}

export default App
