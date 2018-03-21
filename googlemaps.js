module.exports.with = function(key) {
  return require('@google/maps').createClient({
    key: key, // need to pass in the Google key on the querstring
    Promise: Promise
  });
}
