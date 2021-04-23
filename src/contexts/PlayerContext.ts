import { createContext } from 'react'

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
  play: (episode: Episode) => void
}

export const PlayerContext = createContext({} as PlayerContextData) // createContext recebe o formato dos dados que o context vai iniciar, por exemplo: string'', objeto{}, array[]