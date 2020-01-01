// const git = require('simple-git')
const { execSync } = require('child_process')

module.exports = app => {
  app.post('/api/updateGit', (req, res) => {
    execSync('pm2 stop 0')
    execSync('git pull origin master')
    execSync('pm2 start 0')
    // git().pull('origin', 'master')

    res.sendStatus(200)
  })
}
