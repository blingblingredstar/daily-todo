const { db } = require('./db')

const inquirer = require('inquirer')

const add = async (todo = '') => {
  const list = await db.read()
  list.push({ title: todo, done: false })
  await db.write(list)
}

const clear = async () => {
  await db.write([])
}

const askForAddTodo = async (list) => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'add todo',
        default: 'please input a todo',
      },
    ])
    .then(({ title }) => {
      list.push({ title, done: false })
      db.write(list)
      console.log(`add ${title} successfully`)
    })
}

const askForAction = async (list, index) => {
  const actions = {
    done: () => {
      list[index].done = true
      db.write(list)
    },

    undo: () => {
      list[index].done = false
      db.write(list)
    },

    changeTitle: () => {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'newTitle',
            message: 'new title',
            default: list[index].title,
          },
        ])
        .then(({ newTitle }) => {
          const title = list[index].title
          list[index].title = newTitle
          db.write(list)
          console.log(`change ${title} to ${newTitle} successfully`)
        })
    },

    delete: () => {
      const deletedTodo = list.splice(index, 1)[0]
      db.write(list)
      console.log(deletedTodo.title + ' delete successfully')
    },

    exit: () => {},
  }

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Please choose a action',
        choices: [
          { name: 'exit', value: 'exit' },
          { name: 'done', value: 'done' },
          { name: 'undo', value: 'undo' },
          { name: 'change title', value: 'changeTitle' },
          { name: 'delete', value: 'delete' },
        ],
      },
    ])
    .then(({ action }) => {
      const ac = actions[action] || actions['exit']
      ac()
    })
}

const printTasks = async (list) => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'index',
        message: 'Please choose a todo?',
        choices: [
          {
            name: 'exit',
            value: -1,
          },
          ...list.map((todo, index) => ({
            name: `${todo.done ? '[x]' : '[_]'} ${index + 1} - ${todo.title}`,
            value: index,
          })),
          { name: '+ Add todo', value: -2 },
        ],
      },
    ])
    .then((answers) => {
      const index = +answers.index
      if (index === -1) {
        //exit
        return
      }
      if (index === -2) {
        // add todo
        return askForAddTodo(list)
      }
      if (index >= 0) {
        return askForAction(list, index)
      }
    })
}

const showAll = async () => {
  const list = await db.read()
  printTasks(list)
}

module.exports = {
  add,
  clear,
  showAll,
}
