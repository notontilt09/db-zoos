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

const errors = {
    '19': 'A zoo by that name already exists'
  }