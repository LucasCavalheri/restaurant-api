import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('tables').del()

  await knex('tables').insert([
    { id: 1, table_number: 1 },
    { id: 2, table_number: 2 },
    { id: 3, table_number: 3 },
    { id: 4, table_number: 4 },
    { id: 5, table_number: 5 }
  ])
}
