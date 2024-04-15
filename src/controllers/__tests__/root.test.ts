import { describe, expect, it } from 'bun:test'

import { mockLogger, templateMock, toHTMLString } from './helpers'

import { RootController } from '../root'

describe('RootController', () => {
  describe('get', () => {
    it('should return rendered root template', async () => {
      const controller = new RootController(templateMock, mockLogger)
      const result = await controller.get().then(toHTMLString)
      expect(result).toBe('root_TSOA HTMX demo_root')
    })
  })

  describe('counter', () => {
    it('should return rendered counter template', async () => {
      const controller = new RootController(templateMock, mockLogger)
      const result = await controller.counter().then(toHTMLString)
      expect(result).toBe('counter')
    })
  })
})
