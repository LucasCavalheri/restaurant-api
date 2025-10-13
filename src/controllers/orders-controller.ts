import { knex } from '@/database/knex'
import { AppError } from '@/utils/app-error'
import { Request, Response, NextFunction } from 'express'
import z from 'zod'

export class OrdersController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createOrderSchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number()
      })

      const { table_session_id, product_id, quantity } = createOrderSchema.parse(req.body)

      const session = await knex<TablesSessionsRepository>('tables_sessions').where({ id: table_session_id }).first()

      if (!session) {
        throw new AppError('Sessão da mesa não encontrada', 404)
      }

      if (session.closed_at) {
        throw new AppError('Sessão da mesa finalizada')
      }

      const product = await knex<ProductRepository>('products').where({ id: product_id }).first()

      if (!product) {
        throw new AppError('Produto não encontrado', 404)
      }

      await knex<OrdersRepository>('orders').insert({
        table_session_id,
        product_id,
        quantity,
        price: product.price
      })

      return res.status(201).json({
        message: 'Pedido criado com sucesso'
      })
    } catch (error) {
      next(error)
    }
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { table_session_id } = req.params

      const orders = await knex('orders')
        .select(
          'orders.id',
          'orders.table_session_id',
          'orders.product_id',
          'products.name',
          'orders.price',
          'orders.quantity',
          knex.raw('(orders.price * orders.quantity) as total'),
          'orders.created_at',
          'orders.updated_at'
        )
        .join('products', 'products.id', 'orders.product_id')
        .where({ table_session_id })
        .orderBy('orders.created_at', 'desc')

      return res.status(200).json(orders)
    } catch (error) {
      next(error)
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { table_session_id } = req.params

      const order = await knex('orders')
        .select(
          knex.raw('COALESCE(SUM(orders.price * orders.quantity), 0) AS total'),
          knex.raw('COALESCE(SUM(orders.quantity), 0) AS quantity')
        )
        .where({ table_session_id })
        .first()

      return res.json(order)
    } catch (error) {
      next(error)
    }
  }
}
