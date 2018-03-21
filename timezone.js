'use strict';

const moment = require('moment-timezone');
const deepExtend = require('deep-extend');

// /api/v1/timezone?address=singapore&key=<YOURAPIKEY>
module.exports.get = (event, context, callback) => {
  const qs = event.queryStringParameters;
  const addresses = [].concat(qs.address); //convert one address into array

  const googleMaps = require('@google/maps').createClient({
  const googleMaps = require('./googlemaps').with(qs.key);

  googleMaps.geocode({
      address: addresses[0]//'Sydney Opera House'
    })
    .asPromise()
    .then((result) => {

      const loc = result.json.results.length>0 && result.json.results[0].geometry.location || {lat:0,lng:0}
      const longName = result.json.results[0].address_components[0].long_name;
      const shortName = result.json.results[0].address_components[0].short_name;
      googleMaps.timezone({
          location: [loc.lat, loc.lng],
          language: 'en'
        }).asPromise()
        .then((result) => {
          //console.log(result.json)
          const abbr = moment.tz.zone(result.json.timeZoneId).abbr(moment()); // PDT

          const response = {
            statusCode: 200,
            body: JSON.stringify(deepExtend(result.json,{abbr:abbr,longName:longName,shortName:shortName})),
          };
          callback(null, response);
        })
        .catch((err) => {
          callback(err, "ERROR getting timezone from lat/lng");
        });
    })
    .catch((err) => {
      console.log(err)
      callback(err, "ERROR getting lat/lng from address " + qs);
    });
};
