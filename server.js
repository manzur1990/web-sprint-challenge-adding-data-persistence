const express = require('express')

const db = require('./data/db-config.js')

const server = express()

server.use(express.json())

server.get('/', (req, res)=>{
    res.send({message: 'Sprint Challange: Adding Data Presistance'})
})

server.get('/api/projects', (req, res) => {
  // get all projects from the database
  db('projects')
  .then(projects => {
    res.status(200).json(projects)
  })
  .catch(error => {
    res.status(500).json(error)
  })
})

server.get('/api/tasks', (req, res) => {
  // get all tasks from the database
  db('tasks as t')
    .leftJoin('projects as p', 'p.id', 't.project_id')
    .leftJoin('resources as r', 'r.id', 't.resource_id')
    .select('t.id as Task_ID', 't.description as Task_Description', 'p.project_name as Project_Name', 'p.description as Project_Descriptoin', 'r.resource_name as Resource_Name')
  .then(tasks => {
    res.status(200).json(tasks)
  })
  .catch(error => {
    res.status(500).json(error)
  })
})

server.get('/api/resources', (req, res) => {
    // get all resources from the database
    db('resources')
    .then(resources => {
      res.status(200).json(resources)
    })
    .catch(error => {
      res.status(500).json(error)
    })
  })

server.get('/api/projects_resources/:id', (req, res) => {
    // get a list of project resources
    db('projects_resources as pr')
      .where('pr.project_id', req.params.id)
      .leftJoin('projects as p', 'p.id', 'pr.project_id')
      .leftJoin('resources as r', 'r.id', 'pr.resource_id')
      .select('p.project_name as Project_Name', 'r.resource_name as Resource_Name')
    .then(tasks => {
      res.status(200).json(tasks)
    })
    .catch(error => {
      res.status(500).json(error)
    })
  })


// create project
server.post('/api/projects', (req, res) => {
  db('projects').insert(req.body)
  .then(ids => {
    const id = ids[0]
    db('projects')
      .where({ id })
      .first()
    .then(project => {
      res.status(201).json(project)
    })
  })
  .catch(error => {
    res.status(500).json(error)
  })
})

// create task
server.post('/api/tasks', (req, res) => {
    db('tasks').insert(req.body)
    .then(ids => {
      const id = ids[0]
      db('tasks')
        .where({ id })
        .first()
      .then(task => {
        res.status(201).json(task)
      })
    })
    .catch(error => {
      res.status(500).json(error)
    })
  })

// create resource
server.post('/api/resources', (req, res) => {
    db('resources').insert(req.body)
    .then(ids => {
      const id = ids[0]
      db('resources')
        .where({ id })
        .first()
      .then(resource => {
        res.status(201).json(resource)
      })
    })
    .catch(error => {
      res.status(500).json(error)
    })
  })



module.exports = server
