import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { AppError } from '@/utils/app-error'

export function errorHandling(error: Error, _request: Request, response: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message })
  }

  if (error instanceof ZodError) {
    return response.status(400).json({ message: 'Erro de validação', issues: error.format() })
  }

  return response.status(500).json({ message: 'Houve um erro interno no servidor', error: error.message })
}
