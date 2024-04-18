/// <reference types="@kitajs/html/htmx.d.ts" />

import { singleton } from 'tsyringe'
import { asPage, Header } from './common'

@singleton()
export default class RootTemplates {
  constructor() {}

  public Root = (title: string, count: number) =>
    asPage(
      <html>
        <head>
          <Header />
          <title>{Bun.escapeHTML(title)}</title>
        </head>
        <body>
          <this.Counter count={count} />
          <this.Button />
        </body>
      </html>
    )

  public Counter = ({ count }: { count: number }) => (
    <div id="counter" hx-get="/counter" hx-trigger="button-click from:body" hx-swap="outerHTML">
      {count}
    </div>
  )

  public Button = () => (
    <button hx-get="/click" hx-swap="none">
      Click me!
    </button>
  )
}
