/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('images').del()
  await knex('images').insert([
    { id: 1, sprite: '' },
    { id: 2, sprite: '' },
    { id: 3, sprite: '' },
    { id: 4, sprite: '' },
    { id: 5, sprite: '' },
  ])
}
