import { knex } from '@/database/knex'
import { AppError } from '@/utils/app-error'
import { Request, Response, NextFunction } from 'express'
import z from 'zod'

export class TablesSessionsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number()
      })

      const { table_id } = bodySchema.parse(req.body)

      const session = await knex<TablesSessionsRepository>('tables_sessions')
        .where({
          table_id
        })
        .orderBy('opened_at', 'desc')
        .first()

      if (session && !session.closed_at) {
        throw new AppError('Esta mesa já está ocupada')
      }

      await knex<TablesSessionsRepository>('tables_sessions').insert({
        table_id,
        opened_at: knex.fn.now()
      })

      return res.status(201).json()
    } catch (error) {
      next(error)
    }
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const sessions = await knex<TablesSessionsRepository>('tables_sessions').orderBy('closed_at')

      return res.json(sessions)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: 'ID deve ser um número' })
        .parse(req.params.id)

      const session = await knex<TablesSessionsRepository>('tables_sessions').where({ id }).first()

      if (!session) {
        throw new AppError('Sessão da mesa não encontrada', 404)
      }

      if (session.closed_at) {
        throw new AppError('Esta sessão da mesa já foi finalizada')
      }

      await knex<TablesSessionsRepository>('tables_sessions')
        .update({
          closed_at: knex.fn.now()
        })
        .where({ id })

      return res.json({ id })
    } catch (error) {
      next(error)
    }
  }
}
