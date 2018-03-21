'use strict';

const moment = require('moment-timezone');
const deepExtend = require('deep-extend');

// /api/v1/timezone?address=singapore&address=india&key=<YOURAPIKEY>
module.exports.get = (event, context, callback) => {
  const qs = event.queryStringParameters;
  const addresses = [].concat(qs.address); //convert one address into array

  const googleMaps = require('./googlemaps').with(qs.key);

  // map all the timezone objects for each address into an array
  let timezones = addresses.map(addr => {
    return new Promise((resolve,reject) => {

      // make a request to Google geocode to get the lat/long for the address
      return googleMaps.geocode({
        address:addr
      })
      .asPromise()
      .then((result) => {
        const loc = result.json.results.length>0 && result.json.results[0].geometry.location || {lat:0,lng:0}
        const longName = result.json.results[0].address_components[0].long_name;
        const shortName = result.json.results[0].address_components[0].short_name;

        // make a request to Google timezone to get the timezone for the lat/long
        googleMaps.timezone({
            location: [loc.lat, loc.lng],
            language: 'en'
          })
          .asPromise()
          .then(result => {

            // use moment.js to lookup the timezone abbreviation e.g. 'PDT'
            const abbr = moment.tz.zone(result.json.timeZoneId).abbr(moment());

            // extend the Google result with the address name and timezone abbreviation
            resolve(deepExtend(result.json,{abbr:abbr,longName:longName,shortName:shortName}));
          })
      })
    })
  })

  // for all the timezone objects
  Promise.all(timezones)
  .then(data => {
    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
    };
    callback(null, response);

  })
};
