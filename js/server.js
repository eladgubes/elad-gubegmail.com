'use strict'

var gProjects;

createProjects()

function createProject(name, title, desc, url, labels) {

  var project = {
    id: name,
    name: name,
    title: title,
    desc: desc,
    url: url,
    publishedAt: new Date(),
    labels: labels
  }


  return project
}

function createProjects() {
  var projects = []

  projects.push(createProject('Book shop', 'open a book store', 'manage your own book store, set the price and start selling', '../projects/Book Shop/index.html', ['shop', 'books']))
  projects.push(createProject('Minesweeper', 'try to avoid the mines', 'in this game there are 3 levels, you need to revel all the ceils', '../projects/Minesweeper/index.html', ['metrics', 'game']))
  projects.push(createProject('Pacman', 'eat the ghosts and get points', 'in this game you need to eat the ghosts and get points', '../projects/pacman/index.html', ['board game', 'pacman']))
  projects.push(createProject('touch-nums', 'mark all the numbers in the right order', 'in this game there are 4 levels, you need to mark all the numbers in the right order', '../projects/touch-nums/index.html', ['numbers', 'game']))
  gProjects = projects
}

function getProjects() {
  return gProjects
}


function findProject(projectId) {

  var idx = gProjects.findIndex(proInx => {
    return (projectId === proInx.id)
  })
  return gProjects[idx]

}
