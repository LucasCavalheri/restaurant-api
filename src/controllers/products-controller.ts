import { knex } from '@/database/knex'
import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export class ProductsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createProductSchema = z.object({
        name: z.string().trim(),
        price: z.number().gt(0, { message: 'Preço deve ser maior que zero' })
      })

      const { name, price } = createProductSchema.parse(req.body)

      await knex<ProductRepository>('products').insert({ name, price })

      return res.status(201).json({
        message: 'Produto criado com sucesso'
      })
    } catch (error) {
      next(error)
    }
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.query

      const products = await knex<ProductRepository>('products')
        .select()
        .whereLike('name', `%${name ?? ''}%`)

      return res.json({
        message: 'Produtos listados com sucesso',
        products
      })
    } catch (error) {
      next(error)
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: 'ID deve ser um número' })
        .parse(req.params.id)

      const product = await knex<ProductRepository>('products').select().where({ id }).first()

      if (!product) {
        return res.status(404).json({
          message: 'Produto não encontrado'
        })
      }

      return res.json({
        message: 'Produto listado com sucesso',
        product
      })
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

      const updateProductSchema = z.object({
        name: z.string().trim(),
        price: z.number().gt(0, { message: 'Preço deve ser maior que zero' })
      })

      const { name, price } = updateProductSchema.parse(req.body)

      const product = await knex<ProductRepository>('products').select().where({ id }).first()

      if (!product) {
        return res.status(404).json({
          message: 'Produto não encontrado'
        })
      }

      await knex<ProductRepository>('products').update({ name, price, updated_at: knex.fn.now() }).where({ id })

      return res.json({
        message: 'Produto atualizado com sucesso'
      })
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: 'ID deve ser um número' })
        .parse(req.params.id)

      const product = await knex<ProductRepository>('products').select().where({ id }).first()

      if (!product) {
        return res.status(404).json({
          message: 'Produto não encontrado'
        })
      }

      await knex<ProductRepository>('products').delete().where({ id })

      return res.json({
        message: 'Produto deletado com sucesso'
      })
    } catch (error) {
      next(error)
    }
  }
}
