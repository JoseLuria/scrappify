import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import * as cheerio from 'cheerio'
import axios from 'axios'

export const status = ({ success, msg }: { success: boolean; msg: string }): void => {
  console.log(`status: ${success ? '🟢' : '🔴'} ${msg}`)
}

export const scrape = async (URL: string): Promise<cheerio.CheerioAPI> => {
  const { data: html } = await axios.get(URL)
  status({ success: true, msg: 'loaded cheerio API' })
  return cheerio.load(html)
}

export const saveJSON = async (JSONText: string, name: string): Promise<void> => {
  const ROOT_PATH = process.cwd()
  const filePath = path.join(ROOT_PATH, `data/${name}.json`)
  await writeFile(filePath, JSONText, 'utf-8')
  status({ success: true, msg: `created ${name} JSON file` })
}
