const git = require('simple-git/promise')
const { execSync } = require('child_process')

module.exports = app => {
  app.post('/api/updateGit', (req, res) => {
    console.log(req.headers['X-Hub-Signature'])
    git().pull('origin', 'master').then(() => {
      execSync('pm2 reload 0')
      res.sendStatus(200)
    })
  })
}
// Testing 2
