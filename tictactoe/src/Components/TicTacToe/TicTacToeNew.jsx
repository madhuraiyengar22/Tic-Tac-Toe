import React from 'react'
import './TicTacToeNew.css'
import Board from './Board'
import { useState, useEffect } from 'react'
import GameState from './GameState'
import GameOver from './GameOver'
import Reset from './Reset'
import gameOverSoundAsset from '../Assets/sounds/gameOver.wav'
import clickSoundAsset from '../Assets/sounds/click.wav'

const PLAYER_X = "X"
const PLAYER_O = "O"

const gameOverSound = new Audio(gameOverSoundAsset)
gameOverSound.volume = 0.3;
const clickSound = new Audio(clickSoundAsset)
clickSound.volume = 1;

const winningCombinations = [
    // Rows
    {combo: [0,1,2], strikeClass: "strike-row-1"},
    {combo: [3,4,5], strikeClass: "strike-row-2"},
    {combo: [6,7,8], strikeClass: "strike-row-3"},
    // Columns
    {combo: [0,3,6], strikeClass: "strike-column-1"},
    {combo: [1,4,7], strikeClass: "strike-column-2"},
    {combo: [2,5,8], strikeClass: "strike-column-3"},
    // Diagonals
    {combo: [0,4,8], strikeClass: "strike-diagonal-1"},
    {combo: [2,4,6], strikeClass: "strike-diagonal-2"}
]

function checkWinner(tiles, setStrikeClass, setGameState) {
    for(const {combo, strikeClass} of winningCombinations){
        const tileValue1 = tiles[combo[1]];
        const tileValue2 = tiles[combo[0]];
        const tileValue3 = tiles[combo[2]];

        if(tileValue1 === tileValue2 && tileValue2 === tileValue3 && tileValue3 !== null){
            setStrikeClass(strikeClass);
            if(tileValue3 === PLAYER_X){
                setGameState(GameState.playerXWins);
            }
            else{
                setGameState(GameState.playerOWins);
            }
            return;
        }
    }

    const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
    if(areAllTilesFilledIn){
        setGameState(GameState.draw)
    }
    console.log("checkWinner")
}

function TicTacToeNew() {
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [strikeClass, setStrikeClass] = useState();
    const [gameState, setGameState] = useState(GameState.inProgress);

    const handleClick = (index) => {
        if (gameState !== GameState.inProgress){
            return;
        }
        if (tiles[index] !== null){
            return;
        }
        const newTiles = [...tiles]; //making a copy of the tiles array
        newTiles[index] = playerTurn;
        setTiles(newTiles)
        if (playerTurn === PLAYER_X)
            setPlayerTurn(PLAYER_O)
        else
            setPlayerTurn(PLAYER_X)
        console.log(index)
    }

    const handleReset = () => {
        setGameState(GameState.inProgress);
        setTiles(Array(9).fill(null));
        setStrikeClass();
        setPlayerTurn(PLAYER_X)
        console.log('Reset')
    }

    useEffect(() => {
        checkWinner(tiles, setStrikeClass, setGameState);
    }, [tiles])

    useEffect(() => {
        if (tiles.some((tile) => tile != null)){
            clickSound.play();
        }
    }, [tiles])

    useEffect(() => {
        if (gameState !== GameState.inProgress){
            gameOverSound.play();
        }
    }, [gameState])

    return (
        <div>
            <h1 className='title'>TicTacToeNew</h1>
            <Board playerTurn={playerTurn} tiles={tiles} onTileClick={handleClick} strikeClass={strikeClass} />
            <GameOver gameState={gameState} />
            <Reset gameState={gameState} onReset={handleReset} />
        </div>
    )
}

export default TicTacToeNew