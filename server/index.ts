import app from './app'
import http from 'http'
import config from './utils/config'
import logger from './utils/logger'
import path from 'path'
import express from 'express'

// backend handles all requests starting with /api
const server = http.createServer(app)

// now let's handle everything else

// Handle static files from the /build folder
app.use(express.static(path.join(__dirname, '..', 'frontend')))

// Groupread uses react-router, so we need to redirect direct
// links to index.html and then react-router can handle the path
app.get('/*', (req, res) => {
  return res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'))
})

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})