import React, { useState } from 'react'
import Board from './Board';

function Game({channel}) {
    const [playersJoind, setPlayersJoined] = useState(
      channel.state.watcher_count === 2
    );

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2)
  });

  if (!playersJoind) {
    return <div>Waiting for other plpayer to join...</div>
  }
  return <div className="gameContainer">
    <Board/>
    {/* CHAT */}
    {/* LEAV GAME BUTTON */}
  </div>  
}

export default Game