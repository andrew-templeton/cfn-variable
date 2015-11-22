
var crypto = require('crypto');

var CfnLambda = require('cfn-lambda');

exports.handler = CfnLambda({
  Create: Create,
  Update: function(physicalId, params, oldParams, reply) {
    Create(params, reply);
  },
  Delete: function(phys, params, reply) {
    reply();
  }
});

function Create(params, reply) {
  console.log('Creating CFN variable: %j', params);
  var jsonString = JSON.stringify(params);
  var id = hash(jsonString);
  var value = new Buffer(jsonString).toString('base64');
  reply(null, id, {
    Value: value
  });
}

function hash(value) {
  return crypto
    .createHash('sha256')
    .update(value)
    .digest('hex');
}
