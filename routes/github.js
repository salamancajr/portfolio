const git = require('simple-git/promise')
const { execSync } = require('child_process')
const crypto = require('crypto')

module.exports = app => {
  app.post('/api/updateGit', (req, res) => {
    if (crypto.createHmac('sha1', 'cashews').update(JSON.stringify(req.body)).digest('hex') === req.headers['x-hub-signature']) {
      git().pull('origin', 'master').then(() => {
        execSync('pm2 reload --force 0')
        res.sendStatus(200)
      })
    } else {
      res.sendStatus(403)
    }
  })
}
// Testing 9
