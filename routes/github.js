module.exports = app => {
  app.post('/api/updateGit', (req, res) => {
    console.log('Git webhook working')
  })
}
