import { describe, expect, it } from 'bun:test'
import Counter from '../counter'

describe('Counter', () => {
  describe('get', () => {
    it('should return counter state 0 initially', async () => {
      const counter = new Counter()
      const result = counter.get()
      expect(result).toEqual(0)
    })

    it('should return counter state 1 after incrementing', async () => {
      const counter = new Counter()
      counter.increment()
      const result = counter.get()
      expect(result).toEqual(1)
    })

    it('should return counter state 2 after incrementing twice', async () => {
      const counter = new Counter()
      counter.increment()
      counter.increment()
      const result = counter.get()
      expect(result).toEqual(2)
    })
  })
})
