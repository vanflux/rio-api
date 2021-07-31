const Constants = require('../constants');

module.exports = async function (request, steamId, opts) {
  return new Promise(resolve => request.post(
    Object.assign({
      url: `${Constants.baseUrl}/login`,
      body: {
        steam_id: steamId,
      },
      json: true,
    }, opts),
    (error, response, body) => {
      if (error) return resolve({hasError: true, data: { type: 'request_error', error }});
      if (response.statusCode != 200) return resolve({ hasError: true, data: { type: 'status_code', error: {statusCode: response.statusCode, statusMessage: response.statusMessage} } });
      if (!body) return resolve({ hasError: true, data: { type: 'empty_body', error: 'Server returned nothing' } });
      resolve({hasError: false, data: body});
    })
  );
}