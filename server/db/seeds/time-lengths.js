/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('timerPreferences').del()
  await knex('timerPreferences').insert([
    { interval_length: 25, short_break_length: 5, long_break_length: 30 },
  ])
}
