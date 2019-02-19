const express = require('express');
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda.sqlite3'
    },
    useNullAsDefault: true,
  }
const db = knex(knexConfig);

const router = express.Router();

const errors = {
    '19': 'A zoo by that name already exists'
  }

  // endpoints here
router.get('/', async (req, res) => {
    try {
      const zoos = await db('zoos');
      res.status(200).json(zoos);
    } catch (error) {
      res.status(500).json(error)
    }
});
  
router.get('/:id', async (req, res) => {
    try {
        const zoo = await db('zoos')
        .where({ id: req.params.id });
        res.status(200).json(zoo);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const [id] = await db('zoos').insert(req.body)
        
        const zoo = await db('zoos')
        .where({ id })
        .first();

        res.status(201).json(zoo);
    } catch (error) {
        const message = errors[error.errno] || 'There was a problem adding the zoo to the database'
        res.status(500).json({message, error})
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const count = await db('zoos')
        .where({ id: req.params.id })
        .del();
        
        if (count) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Record with that id not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const count = await db('zoos')
        .where({ id: req.params.id })
        .update(req.body);

        if (count) {
        const zoo = await db('zoos')
            .where({ id: req.params.id })
            .first();
        
        res.status(200).json(zoo)
        } else {
        res.status(404).json({ message: 'Record with that id not found'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;