'use strict'

function saveInStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}
