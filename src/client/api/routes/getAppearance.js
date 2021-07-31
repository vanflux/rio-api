const Constants = require('../constants');

module.exports = async function (request, accountId, characterId, opts) {
  return new Promise(resolve => request.post(
    Object.assign({
      url: `${Constants.baseUrl}/getappearance`,
      body: {
        account_id: accountId,
        character_id: characterId,
      },
      json: true,
    }, opts),
    (error, response, body) => {
      if (error) return resolve({hasError: true, data: { type: 'request_error', error }});
      if (response.statusCode != 200) return resolve({ hasError: true, data: { type: 'status_code', error: {statusCode: response.statusCode, statusMessage: response.statusMessage} } });
      if (!body) return resolve({ hasError: true, data: { type: 'empty_body', error: 'Server returned nothing' } });
      if (body.status_code !== 0) return resolve({ hasError: true, data: { type: 'server_status_code', error: body} });
      resolve({hasError: false, data: body});
    })
  );
}