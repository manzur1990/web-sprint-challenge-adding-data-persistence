
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {description: "Install the CPU to the MOBO", project_id:1, resource_id:1},
        {description: "Route electrical wires in the bike", project_id:2, resource_id:2}
      ]);
    });
};
