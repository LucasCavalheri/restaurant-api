import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('products').del()

  await knex('products').insert([
    { id: 1, name: 'Bolo de Chocolate', price: 10 },
    { id: 2, name: 'Coca-Cola', price: 5 },
    { id: 3, name: 'Porção de Batata Frita', price: 29.9 }
  ])
}
