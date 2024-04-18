import { describe, expect, it, spyOn } from 'bun:test'

import { counterMock, mockLogger, templateMock, toHTMLString } from './helpers'

import { RootController } from '../root'

describe('RootController', () => {
  describe('get', () => {
    it('should return rendered root template', async () => {
      const controller = new RootController(counterMock, templateMock, mockLogger)
      const result = await controller.get().then(toHTMLString)
      expect(result).toBe('root_TSOA HTMX demo_root')
    })
  })

  describe('counter', () => {
    it('should return rendered counter template', async () => {
      const controller = new RootController(counterMock, templateMock, mockLogger)
      const result = await controller.getCounter().then(toHTMLString)
      expect(result).toBe('counter')
    })
  })

  describe('button', () => {
    it('should return rendered button template', async () => {
      const controller = new RootController(counterMock, templateMock, mockLogger)
      const incrementSpy = spyOn(counterMock, 'increment')
      const triggerEventSpy = spyOn(controller, 'triggerEvent')
      const result = await controller.buttonClick().then(toHTMLString)

      expect(result).toBe('button')
      expect(incrementSpy).toHaveBeenCalledTimes(1)
      expect(triggerEventSpy).toHaveBeenCalledTimes(1)
      expect(triggerEventSpy).toHaveBeenCalledWith('button-click')
    })
  })
})
