import { Express, Request, Response } from "express";
import { createUserHandler } from '../controller/user.controller'
import { createUserSchema } from '../schema/user.schema'
import validate from '../middleware/validateResource'
function routes(app: Express) {
  app.get('/', (req: Request, res: Response) => {
    res.json('123')
  })
  app.post('/api/users', validate(createUserSchema), createUserHandler)
}
export default routes;