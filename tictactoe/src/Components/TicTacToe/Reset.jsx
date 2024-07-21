import React from 'react'
import GameState from './GameState'

function Reset({gameState, onReset}) {
  if (gameState === GameState.inProgress){
    return;
  }
  return (
    <button className='reset-button' onClick={onReset}>Reset</button>
  )
}

export default Reset