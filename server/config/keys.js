// FIGURE OUT WHICH KEYS TO RETURN
if (process.env.NODE_ENV === 'production') {
  //RETURN PROD KEYS
  module.exports = require('./prod');
} else {
  //RETURN DEV KEYS
  module.exports = require('./dev');
}

//GOOGLE CLIENT -> 67672504776-jjug6ltqvqjef0pdcrbvor3cm7ehvk9j.apps.googleusercontent.com
//GOOGLE SECRET -> vKzHUPXY7mZW_LBHEVSHNZlm
//MONGO URL -> mongodb://spiderman:AuNtMaY@ds139277.mlab.com:39277/cloudlogger-prod
//COOKIE KEY -> asjdkashd12y98equiwodlau120qdaslkd
