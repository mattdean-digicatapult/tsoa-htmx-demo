import { describe, expect, it } from 'bun:test'

import RootTemplates from '../root'

describe('RootTemplates', () => {
  describe('Root', () => {
    it('should render root page', async () => {
      const templates = new RootTemplates()
      const rendered = await templates.Root('title', 0)
      expect(rendered).toMatchSnapshot()
    })

    it('should escape html in title', async () => {
      const templates = new RootTemplates()
      const rendered = await templates.Root('<div>Malicious Content</div>', 0)
      expect(rendered).toMatchSnapshot()
    })

    it('should render counter 1 on second load', async () => {
      const templates = new RootTemplates()
      const rendered = await templates.Root('title', 1)
      expect(rendered).toMatchSnapshot()
    })
  })

  describe('Counter', () => {
    it('should render the counter with value 0', async () => {
      const templates = new RootTemplates()
      const rendered = await templates.Counter({ count: 0 })
      expect(rendered).toMatchSnapshot()
    })

    it('should render the counter on second call with value 1', async () => {
      const templates = new RootTemplates()
      const rendered = await templates.Counter({ count: 1 })
      expect(rendered).toMatchSnapshot()
    })
  })

  describe('Button', () => {
    it('should render the enabled button', async () => {
      const templates = new RootTemplates()
      const rendered = await templates.Button({ disabled: false })
      expect(rendered).toMatchSnapshot()
    })

    it('should render the disabled button', async () => {
      const templates = new RootTemplates()
      const rendered = await templates.Button({ disabled: true })
      expect(rendered).toMatchSnapshot()
    })
  })
})
