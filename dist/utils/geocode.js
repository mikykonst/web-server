// @ts-ignore
const request = require('request');
// @ts-ignore
const get = require("lodash/get");
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWlreWtvbnN0IiwiYSI6ImNsMmtxbjZkMzBmbXYzcG84ZjdscG1ibTUifQ.udEIdpAeD3g0NO1D-FU6WA`;
    request({ url, json: true }, (error, result) => {
        if (error) {
            callback('Connection error...');
        }
        else if (result.body.features.length === 0) {
            callback('Configuration error...');
        }
        else {
            const lon = get(result, 'body.features[0].center[1]');
            const lat = get(result, 'body.features[0].center[0]');
            callback(null, { lat, lon });
        }
    });
};
module.exports = geocode;
//# sourceMappingURL=geocode.js.map