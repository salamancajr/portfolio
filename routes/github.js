const git = require('simple-git')

module.exports = app => {
  app.post('/api/updateGit', (req, res) => {
    git().pull('origin', 'master')
    console.log('Git webhook working')

    res.sendStatus(200)
  })
}
// Test 3
