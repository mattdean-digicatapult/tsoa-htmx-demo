import { Get, Produces, Route, SuccessResponse } from 'tsoa'
import { inject, injectable, singleton } from 'tsyringe'

import { Logger, type ILogger } from '../logger.js'
import RootTemplates from '../templates/root.js'
import { HTML, HTMLController } from './HTMLController.js'

@singleton()
@injectable()
@Route('/')
@Produces('text/html')
export class RootController extends HTMLController {
  constructor(
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
    return this.html(this.templates.Root('TSOA HTMX demo'))
  }

  /**
   * Returns a HTML fragment of the root page counter
   */
  @SuccessResponse(200)
  @Get('/counter')
  public async counter(): Promise<HTML> {
    this.logger.debug({ msg: 'counter received', controller: '/' })
    return this.html(this.templates.Counter())
  }
}
