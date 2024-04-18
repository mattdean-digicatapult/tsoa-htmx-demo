import { Get, Produces, Route, SuccessResponse } from 'tsoa'
import { inject, injectable, singleton } from 'tsyringe'

import { Logger, type ILogger } from '../logger.js'
import Counter from '../models/counter.js'
import RootTemplates from '../views/root.js'
import { HTML, HTMLController } from './HTMLController.js'

@singleton()
@injectable()
@Route('/')
@Produces('text/html')
export class RootController extends HTMLController {
  constructor(
    private counter: Counter,
    private templates: RootTemplates,
    @inject(Logger) private logger: ILogger
  ) {
    super()
    this.logger = logger.child({ controller: '/' })
  }

  /**
   * Retrieves the root page for the site
   */
  @SuccessResponse(200)
  @Get('/')
  public async get(): Promise<HTML> {
    this.logger.debug({ msg: 'root page requested', controller: '/' })
    return this.html(this.templates.Root('TSOA HTMX demo', this.counter.get()))
  }

  /**
   * Returns a HTML fragment of the root page counter
   */
  @SuccessResponse(200)
  @Get('/counter')
  public async getCounter(): Promise<HTML> {
    this.logger.debug({ msg: 'counter received', controller: '/' })
    return this.html(this.templates.Counter({ count: this.counter.get() }))
  }

  /**
   * Returns a HTML fragment of the root page button
   */
  @SuccessResponse(200)
  @Get('/click')
  public async buttonClick(): Promise<HTML> {
    this.logger.debug({ msg: 'click received', controller: '/' })
    this.counter.increment()
    this.triggerEvent('button-click')
    return this.html(this.templates.Button())
  }
}
