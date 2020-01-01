const git = require('simple-git')
const { execSync } = require('child_process')

module.exports = app => {
  app.post('/api/updateGit', (req, res) => {
    git().pull('origin', 'master').then(() => {
      execSync('pm2 reload 0')
      res.sendStatus(200)
    })
  })
}
// Testing 2
