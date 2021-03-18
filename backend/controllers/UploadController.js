import asyncHandler from 'express-async-handler'
import S3 from 'aws-sdk/clients/s3.js'

const upload = asyncHandler(async (req, res) => {
  S3.console.log(req.body)
  res.json({ dupa: 'as' })
})

export { upload }
