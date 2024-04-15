import { singleton } from 'tsyringe'
import { asPage, Header } from './common'

@singleton()
export default class RootTemplates {
  private count = 0

  constructor() {}

  public Root = (title: string) =>
    asPage(
      <html>
        <head>
          <Header />
          <title>{Bun.escapeHTML(title)}</title>
        </head>
        <body>
          <this.Counter />
        </body>
      </html>
    )

  public Counter = () => (
    <div id="counter" hx-get="/counter" hx-trigger="every 1s" hx-swap="outerHTML">
      {this.count++}
    </div>
  )
}
