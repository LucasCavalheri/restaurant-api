import { NextFunction, Request, Response } from 'express'

export class ProductsController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({ message: 'OK' })
    } catch (error) {
      next(error)
    }
  }
}
