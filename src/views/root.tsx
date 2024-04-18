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
        <body hx-ext="json-enc">
          <this.Counter count={count} />
          <this.Button disabled={false} />
        </body>
      </html>
    )

  public Counter = ({ count }: { count: number }) => (
    <div id="counter" hx-get="/counter" hx-trigger="button-click from:body" hx-swap="outerHTML">
      <span>{count}</span>
      <img class="spinner htmx-indicator" src="/public/images/spinner.svg" />
    </div>
  )

  public Button = ({ disabled }: { disabled: boolean }) => {
    const attributes: Htmx.Attributes = disabled
      ? {
          'hx-trigger': 'counter-loaded from:body',
          'hx-get': '/button',
          'hx-swap': 'outerHTML',
        }
      : { 'hx-post': '/button', 'hx-swap': 'outerHTML' }

    return (
      <button disabled={disabled} {...attributes}>
        Click me!
      </button>
    )
  }
}
