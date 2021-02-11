import express from 'express'
import asyncHanlder from 'express-async-handler'

const app = express()

const getProducts = app.get(
  '/',
  asyncHanlder(async (req, res) => {
    res.json({ msg: 'działa' })
  })
)

export { getProducts }
