const AWS = require('aws-sdk');

const {AWS_ACCESS, AWS_SECRET} = require('../properties');

const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS,
    secretAccessKey: AWS_SECRET
});

module.exports = {
    s3
}
