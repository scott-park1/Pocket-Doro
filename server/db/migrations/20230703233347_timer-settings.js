/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('timerPreferences', (table) => {
    table.integer('interval_length')
    table.integer('short_break_length')
    table.integer('long_break_length')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('timerPreferences')
}
