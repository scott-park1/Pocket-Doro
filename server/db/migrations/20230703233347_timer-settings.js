/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('timerPreferences', (table) => {
    table.interger('interval_length')
    table.interger('short_break_length')
    table.interger('long_break_length')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('timerPreferences')
}
