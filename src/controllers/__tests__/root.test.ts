import { afterEach, describe, expect, it, mock, spyOn } from 'bun:test'

import { counterMock, mockLogger, templateMock, toHTMLString } from './helpers'

import { RootController } from '../root'

describe('RootController', () => {
  afterEach(() => {
    mock.restore()
  })

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
      const triggerEventSpy = spyOn(controller, 'triggerEvent')
      const result = await controller.getCounter().then(toHTMLString)
      expect(result).toBe('counter')
      expect(triggerEventSpy).toHaveBeenCalledTimes(1)
      expect(triggerEventSpy).toHaveBeenCalledWith('counter-loaded')
    })
  })

  describe('buttonClick', () => {
    it('should return rendered button template', async () => {
      const controller = new RootController(counterMock, templateMock, mockLogger)
      const incrementSpy = spyOn(counterMock, 'increment')
      const triggerEventSpy = spyOn(controller, 'triggerEvent')
      const result = await controller.buttonClick().then(toHTMLString)

      expect(result).toBe('button_true_button')
      expect(incrementSpy).toHaveBeenCalledTimes(1)
      expect(triggerEventSpy).toHaveBeenCalledTimes(1)
      expect(triggerEventSpy).toHaveBeenCalledWith('button-click')
    })
  })

  describe('button', () => {
    it('should return rendered button template', async () => {
      const controller = new RootController(counterMock, templateMock, mockLogger)
      const incrementSpy = spyOn(counterMock, 'increment')
      const triggerEventSpy = spyOn(controller, 'triggerEvent')
      const result = await controller.button().then(toHTMLString)

      expect(result).toBe('button_false_button')
      expect(incrementSpy).toHaveBeenCalledTimes(0)
      expect(triggerEventSpy).toHaveBeenCalledTimes(0)
    })
  })
})
