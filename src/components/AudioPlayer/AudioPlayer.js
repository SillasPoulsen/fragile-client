import { useState, useRef } from "react";
import player from "../../images/Group 1 (5).png";
import pauser from "../../images/Group 1 (6).png";

function AudioPlayer() {
  const [audioStatus, changeAudioStatus] = useState(false);
  const myRef = useRef();
  const startAudio = () => {
    myRef.current.play();
    changeAudioStatus(true);
  };
  const pauseAudio = () => {
    myRef.current.pause();
    changeAudioStatus(false);
  };
  return (
    <>
      <audio
        ref={myRef}
        src="http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
      />
      {audioStatus ? (
        <img src={pauser} alt="playerIcon" onClick={pauseAudio} />
      ) : (
        <img src={player} alt="playerIcon" onClick={startAudio} />
      )}
    </>
  );
}

export default AudioPlayer;
