const git = require('simple-git/promise')
const { execSync } = require('child_process')
const crypto = require('crypto')

module.exports = app => {
  app.post('/api/updateGit', (req, res) => {
    console.log(crypto.createHash('sha1', 'cashews').update(JSON.stringify(req.body)).digest('hex'))
    console.log(req.headers['x-hub-signature'])
    git().pull('origin', 'master').then(() => {
      execSync('pm2 reload 0')
      res.sendStatus(200)
    })
  })
}
// Testing 8
