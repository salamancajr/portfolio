const git = require('simple-git/promise')
const { execSync } = require('child_process')
const crypto = require('crypto')

module.exports = app => {
  app.post('/api/updateGit', (req, res) => {
    const decryptedHmac = crypto.createHmac('sha1', process.env.GITHUB_SECRET).update(JSON.stringify(req.body)).digest('hex')
    if (`sha1=${decryptedHmac}` === req.headers['x-hub-signature']) {
      git().pull('origin', 'master').then(() => {
        execSync('pm2 reload --force 0')
        res.sendStatus(200)
      })
    } else {
      res.sendStatus(403)
    }
  })
}
