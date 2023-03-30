import 'dotenv/config'
import querystring from 'node:querystring'
import axios from 'axios'
import { statusMsg } from '../utils'

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

export const getToken = async (): Promise<undefined | string> => {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    statusMsg({ status: 'error', msg: 'invalid *.env varibles' })
    return
  }

  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')

  try {
    const { data } = await axios<{ access_token?: string }>({
      method: 'POST',
      url: TOKEN_ENDPOINT,
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN
      })
    })

    statusMsg({ msg: 'created spotify token' })
    return data.access_token
  } catch (error) {
    const err = error as Error
    statusMsg({ status: 'error', msg: `spotify token ${err.message.toLowerCase()}` })
  }
}
