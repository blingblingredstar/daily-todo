#!/usr/bin/env node
const { program } = require('commander')
const api = require('./index')
const pkg = require('./package.json')

program.version(pkg.version)

program
  .command('add')
  .description('add todo')
  .action((_, option) => {
    const todo = option.args.join(' ')
    api
      .add(todo)
      .then(() => {
        console.log('Add todo successfully')
      })
      .catch(() => {
        console.log('Add todo failed')
      })
  })

program
  .command('clear')
  .description('clear all todo')
  .action((_, option) => {
    api
      .clear()
      .then(() => {
        console.log('Clear todo successfully')
      })
      .catch(() => {
        console.log('Clear todo failed')
      })
  })

program
  .command('ls')
  .description('show all todo')
  .action(() => {
    api.showAll()
  })

program.parse(process.argv)
