import { Readable } from 'node:stream'

import pino from 'pino'

import Counter from '../../models/counter'
import RootTemplates from '../../views/root'

export const templateMock = {
  Root: (s: string) => `root_${s}_root`,
  Counter: () => `counter`,
  Button: ({ disabled }) => `button_${disabled}_button`,
} as RootTemplates
export const mockLogger = pino({ level: 'silent' })
export const counterMock = {
  get: () => 42,
  increment: () => 43,
} as Counter

export const toHTMLString = async (stream: Readable) => {
  const chunks = []
  for await (const chunk of stream) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}
