// @ts-ignore
const request = require("request");
// @ts-ignore
const { get } = require("lodash");
const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0ed2c1c178c41843c71c85052f8bb288&query=${lat},${long}`;
    request({ url, json: true }, (err, res) => {
        if (err) {
            console.log('Connection problems!', undefined);
        }
        else if (get(res, 'body.error')) {
            console.log('Cant find your location!', undefined);
        }
        else {
            try {
                const temperature = get(res, 'body.current.temperature');
                const precip = get(res, 'body.current.precip');
                callback(null, `It's ${temperature} degree. There is ${precip}% change of rain.`);
            }
            catch (err) {
                callback(err, undefined);
            }
        }
    });
};
module.exports = forecast;
//# sourceMappingURL=forecast.js.map