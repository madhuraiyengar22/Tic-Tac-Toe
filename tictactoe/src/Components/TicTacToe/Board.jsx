import React from 'react'
import Tile from './Tile'
import Strike from './Strike'

function Board({tiles, onTileClick, playerTurn, strikeClass}) {
  return (
    <div className='board'>
      <Tile playerTurn={playerTurn} value={tiles[0]} onClick={() => onTileClick(0)} />
      <Tile playerTurn={playerTurn} value={tiles[1]} onClick={() => onTileClick(1)} />
      <Tile playerTurn={playerTurn} value={tiles[2]} onClick={() => onTileClick(2)} />
      <Tile playerTurn={playerTurn} value={tiles[3]} onClick={() => onTileClick(3)} />
      <Tile playerTurn={playerTurn} value={tiles[4]} onClick={() => onTileClick(4)} />
      <Tile playerTurn={playerTurn} value={tiles[5]} onClick={() => onTileClick(5)} />
      <Tile playerTurn={playerTurn} value={tiles[6]} onClick={() => onTileClick(6)} />
      <Tile playerTurn={playerTurn} value={tiles[7]} onClick={() => onTileClick(7)} />
      <Tile playerTurn={playerTurn} value={tiles[8]} onClick={() => onTileClick(8)} />
      <Strike strikeClass={strikeClass} />
    </div>
  )
}

export default Board