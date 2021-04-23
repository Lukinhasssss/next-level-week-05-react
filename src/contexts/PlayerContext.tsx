import { createContext, useContext, useState } from 'react'

type Episode = {
  title: string
  members: string
  thumbnail: string
  duration: number
  url: string
}

type PlayerContextData = {
  episodeList: Episode[]
  currentEpisodeIndex: number
  isPlaying: boolean
  isLooping: boolean
  play: (episode: Episode) => void
  playNext: () => void
  playPrevious: () => void
  hasNext: boolean
  hasPrevious: boolean
  playList: (list: Episode[], index: number) => void
  togglePlay: () => void
  toggleLoop: () => void
  setPlayingState: (state: boolean) => void
}

export const PlayerContext = createContext({} as PlayerContextData) // createContext recebe o formato dos dados que o context vai iniciar, por exemplo: string'', objeto{}, array[]

type PlayerContextProviderProps = {
  children: React.ReactNode
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)

  function play(episode: Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function toggleLoop() {
    setIsLooping(!isLooping)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = (currentEpisodeIndex + 1) < episodeList.length

  function playNext() {
    if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
        playList,
        isPlaying,
        isLooping,
        togglePlay,
        toggleLoop,
        setPlayingState
      }}
    >
      { children }
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext)
}