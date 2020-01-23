const AWS = require('aws-sdk')

module.exports = app => {
  app.get('/api/presignedRequest/:name&:type', (req, res) => {
    const { name, type } = req.params

    const s3 = new AWS.S3({ apiVersion: '2006-03-01' })
    const url = s3.getSignedUrl('putObject', {
      Bucket: 'portfoliogs',
      Key: name,
      ContentType: type
    })
    res.send({ url, name: `https://portfoliogs.s3.amazonaws.com/${name}` })
  })
}
