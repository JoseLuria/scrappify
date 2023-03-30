export type MessageStatus = 'pending' | 'success' | 'error'

export interface StatusOptions {
  status?: MessageStatus
  msg: string
}

export interface ScrapedSong {
  number: number
  artist: string
  title: string
}
