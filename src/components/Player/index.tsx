import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import { usePlayer } from '../../contexts/PlayerContext'
import styles from './styles.module.scss'

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null)

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious
  } = usePlayer()

  useEffect(() => {
    if (!audioRef.current) {
      return
    }

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  const episode = episodeList[currentEpisodeIndex]

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ""}>
        <div className={styles.progress}>
          <span>00:00</span>

          <div className={styles.slider}>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: "#04d361" }} // Vai mudar a cor do progresso que já aconteceu
                railStyle={{ backgroundColor: "#9f75ff" }} // Cor de fundo da barra que ainda não sofreu progresso
                handleStyle={{ borderColor: "#04d361", borderWidth: 4 }} // Vai alterar a bolinha do slider
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>

          <span>00:00</span>
        </div>

        {episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            loop={isLooping}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        )}

        <div className={styles.buttons}>
          <button
            type="button"
            disabled={!episode || episodeList.length === 1}
            onClick={() => toggleShuffle()}
            className={ isShuffling ? styles.isActive : '' }
          >
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button" disabled={!episode || !hasPrevious}>
            <img
              src="/play-previous.svg"
              alt="Tocar anterior"
              onClick={playPrevious}
            />
          </button>
          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Pausar" />
            ) : (
              <img src="/play.svg" alt="Tocar" />
            )}
          </button>
          <button type="button" disabled={!episode || !hasNext}>
            <img src="/play-next.svg" alt="Tocar próxima" onClick={playNext} />
          </button>
          <button
            type="button"
            disabled={!episode}
            onClick={() => toggleLoop()}
            className={ isLooping ? styles.isActive : '' }
          >
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}