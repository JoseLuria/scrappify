import type { ScrappedSong } from './types'
import { statusMsg, scrape } from './utils'
import { SONG, SONG_ARTIST, SONG_TITLE } from './selectors'

export const scrapeSongs = async () => {
  const $ = await scrape('https://www.billboard.com/charts/hot-100/')

  const songs: ScrappedSong[] = []

  statusMsg({ status: 'pending', msg: 'scrapping songs' })

  $(SONG).each((_, el) => {
    const title = $(el).find(SONG_TITLE).text().trim()
    const artist = $(el).find(SONG_ARTIST).text().trim()
    const number = songs.length + 1
    songs.push({ title, artist, number })
    statusMsg({ msg: `${number}.${title} scrapped` })
  })

  statusMsg({ msg: `scrapped ${songs.length} songs` })

  return songs
}
