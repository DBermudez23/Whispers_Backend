import express from 'express'
import cors from 'cors' 
import bodyParser from 'body-parser'
import * as whisper from './stores/whisper.js'
import * as user from './stores/user.js'
import { generateToken, requireAuthorization } from './utils.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())

// --- Auth API ---
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const foundUser = await user.getUserByCredentials(username, password)
    const accessToken = generateToken({ username, id: foundUser._id })
    res.json({ accessToken })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.post('/signup', async (req, res) => {
  try {
    const { username, password, email } = req.body
    const newUser = await user.create(username, password, email)
    const accessToken = generateToken({ username, id: newUser._id })
    res.json({ accessToken })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// --- Whisper API ---
app.get('/api/v1/whisper', requireAuthorization, async (req, res) => {
  const whispers = await whisper.getAll()
  res.json(whispers)
})

app.get('/api/v1/whisper/:id', requireAuthorization, async (req, res) => {
  const id = req.params.id
  const storedWhisper = await whisper.getById(id)
  if (!storedWhisper) return res.sendStatus(404)
  res.json(storedWhisper)
})

app.post('/api/v1/whisper', requireAuthorization, async (req, res) => {
  const { message } = req.body
  if (!message) return res.sendStatus(400)
  const newWhisper = await whisper.create(message, req.user.id)
  res.status(201).json(newWhisper)
})

app.put('/api/v1/whisper/:id', requireAuthorization, async (req, res) => {
  const { message } = req.body
  const id = req.params.id
  if (!message) return res.sendStatus(400)
  const storedWhisper = await whisper.getById(id)
  if (!storedWhisper) return res.sendStatus(404)
  if (storedWhisper.author.id !== req.user.id) return res.sendStatus(403)
  await whisper.updateById(id, message)
  res.sendStatus(200)
})

app.delete('/api/v1/whisper/:id', requireAuthorization, async (req, res) => {
  const id = req.params.id
  const storedWhisper = await whisper.getById(id)
  if (!storedWhisper) return res.sendStatus(404)
  if (storedWhisper.author.id !== req.user.id) return res.sendStatus(403)
  await whisper.deleteById(id)
  res.sendStatus(200)
})

export { app }
