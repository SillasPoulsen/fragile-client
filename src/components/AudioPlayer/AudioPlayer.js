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
        src="https://edge2.pod.npr.org/anon.npr-mp3/npr/lifekit/2022/01/20220113_lifekit_life_kit_ethical_investing__-_final.mp3/20220113_lifekit_life_kit_ethical_investing__-_final.mp3_89ddcfd89580c2380b61c941b55dc0df_16856556.mp3?awCollectionId=510338&awEpisodeId=1072207126&orgId=1&d=1013&p=510338&story=1072207126&t=podcast&e=1072207126&size=16219369&ft=pod&f=510338&hash_redirect=1&x-total-bytes=16856556&x-ais-classified=streaming&listeningSessionID=0CD_382_17__80ba78c93727598a29b0c0e3a3a90984c4d3a48f"
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
