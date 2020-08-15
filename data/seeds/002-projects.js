exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {project_name: 'Build a Gaming PC', description: 'It will have NVIDIA graphics with Intel processor'},
        {project_name: 'Pimp my Bike', description: 'Motorize the good old bike'}
      ]);
    });
};
