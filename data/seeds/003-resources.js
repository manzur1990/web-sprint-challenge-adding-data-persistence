exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {resource_name: 'CPU', description: 'Intel Processor'},
        {resource_name: 'MOBO', description: 'Mother Board will be from MSI'},
        {resource_name: 'GPU', description: 'Nvidia Graphics'},
        {resource_name: 'Ebike Motor', description: '40mph speed'},
        {resource_name: 'Ebike Battery', description: '3000W power'},
      ]);
    });
};