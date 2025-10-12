import { AppError } from '@/utils/app-error'
import { Request, Response, NextFunction } from 'express'

export function errorHandling(error: Error, _request: Request, response: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message })
  }

  return response.status(500).json({ message: 'Houve um erro interno no servidor', error: error.message })
}
