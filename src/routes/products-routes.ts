import { ProductsController } from '@/controllers/products-controller'
import { Router } from 'express'

const productsRoutes = Router()
const productsController = new ProductsController()

productsRoutes.post('/', productsController.create)
productsRoutes.get('/', productsController.index)
productsRoutes.get('/:id', productsController.show)
productsRoutes.put('/:id', productsController.update)
productsRoutes.delete('/:id', productsController.delete)

export { productsRoutes }
