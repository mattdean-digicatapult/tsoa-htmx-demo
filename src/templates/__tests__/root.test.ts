import { describe, expect, it } from 'bun:test'

import RootTemplates from '../root'

describe('RootTemplates', () => {
  describe('Root', () => {
    it('should render root page', async () => {
      const templates = new RootTemplates()
      const rendered = await templates.Root('title')
      expect(rendered).toMatchSnapshot()
    })

    it('should escape html in title', async () => {
      const templates = new RootTemplates()
      const rendered = await templates.Root('<div>Malicious Content</div>')
      expect(rendered).toMatchSnapshot()
    })

    it('should render counter 1 on second load', async () => {
      const templates = new RootTemplates()
      await templates.Root('title')
      const rendered = await templates.Root('title')
      expect(rendered).toMatchSnapshot()
    })
  })

  describe('Counter', () => {
    it('should render the counter with value 0', async () => {
      const templates = new RootTemplates()
      const rendered = await templates.Counter()
      expect(rendered).toMatchSnapshot()
    })

    it('should render the counter on second call with value 1', async () => {
      const templates = new RootTemplates()
      await templates.Counter()
      const rendered = await templates.Counter()
      expect(rendered).toMatchSnapshot()
    })
  })
})
