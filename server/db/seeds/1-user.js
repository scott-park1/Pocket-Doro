/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    { id: 1, task: 'learn how to code' },
    { id: 2, task: 'learn how to deploy' },
    { id: 3, task: 'practice typescript' },
  ])
}
