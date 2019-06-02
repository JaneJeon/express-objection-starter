const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const region = process.env.AWS_DEFAULT_REGION

if (!accessKeyId || !secretAccessKey || !region) {
  console.error("AWS Credentials missing!")
}

module.exports = { accessKeyId, secretAccessKey, region }
