import React, { useRef, useEffect } from 'react';

const Player = ({ activeSong, isPlaying, volume, seekTime, repeat, onEnded, onTimeUpdate, onLoadedData }) => {
  const audioRef = useRef(null);
  console.log('activeSong', activeSong?.track?.preview_url);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleAudioPlay = () => {
      if (audioElement.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
        audioElement.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      } else {
        audioElement.addEventListener('canplay', handleCanPlay, { once: true });
      }
    };

    const handleCanPlay = () => {
      audioElement.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    };

    if (isPlaying) {
      handleAudioPlay();
    } else {
      audioElement.pause();
    }

    return () => {
      // Clean up event listeners when the component unmounts
      audioElement.removeEventListener('canplay', handleCanPlay);
    };
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    audioRef.current.currentTime = seekTime;
  }, [seekTime]);

  return (
    <audio
      src={activeSong?.track?.preview_url}
      ref={audioRef}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;














// /* eslint-disable jsx-a11y/media-has-caption */
// import React, { useRef, useEffect } from 'react';

// const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
//   const ref = useRef(null);
//   // eslint-disable-next-line no-unused-expressions
//   if (ref.current) {
//     if (isPlaying) {
//       ref.current.play();
//     } else {
//       ref.current.pause();
//     }
//   }

//   useEffect(() => {
//     ref.current.volume = volume;
//   }, [volume]);
//   // updates audio element only on seekTime change (and not on each rerender):
//   useEffect(() => {
//     ref.current.currentTime = seekTime;
//   }, [seekTime]);

//   return (
//     <audio
//       src={activeSong?.trackMetadata?.trackUri}
//       ref={ref}
//       loop={repeat}
//       onEnded={onEnded}
//       onTimeUpdate={onTimeUpdate}
//       onLoadedData={onLoadedData}
//     />
//   );
// };

// export default Player;
