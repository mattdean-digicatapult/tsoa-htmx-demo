import { Readable } from 'node:stream'

import pino from 'pino'

import RootTemplates from '../../templates/root'

export const templateMock = {
  Root: (s: string) => `root_${s}_root`,
  Counter: () => `counter`,
} as RootTemplates
export const mockLogger = pino({ level: 'silent' })

export const toHTMLString = async (stream: Readable) => {
  const chunks = []
  for await (const chunk of stream) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}
