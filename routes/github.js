const git = require('simple-git')

module.exports = app => {
  app.post('/api/updateGit', (req, res) => {
    git().pull('origin', 'master')

    res.sendStatus(200)
  })
}
