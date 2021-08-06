module.exports = class Api {
  constructor(request, opts) {
    this.opts = Object.assign({}, opts);

    this.request = request;

    this.requestOpts = this.opts.requestOpts || {};
    this.apiUrl = this.opts.apiUrl || 'http://riosv0.eastus.cloudapp.azure.com:5236';
    this.version = this.opts.version || '0.9.1.0';
  }
  
  async getAppearance(accountId, characterId) {
    return new Promise(resolve => this.request.post(
      Object.assign({
        url: `${this.apiUrl}/getappearance`,
        body: {
          account_id: accountId,
          character_id: characterId,
        },
        json: true,
      }, this.requestOpts),
      (error, response, body) => {
        if (error) return resolve({hasError: true, data: { type: 'request_error', error }});
        if (response.statusCode != 200) return resolve({ hasError: true, data: { type: 'status_code', error: {statusCode: response.statusCode, statusMessage: response.statusMessage} } });
        if (!body) return resolve({ hasError: true, data: { type: 'empty_body', error: 'Server returned nothing' } });
        if (body.status_code !== 0) return resolve({ hasError: true, data: { type: 'server_status_code', error: body} });
        resolve({hasError: false, data: body});
      })
    );
  }
  
  async getServerList() {
    return new Promise(resolve => this.request.post(
      Object.assign({
        url: `${this.apiUrl}/getserverlist`,
        body: {
          version: this.version,
        },
        json: true,
      }, this.requestOpts),
      (error, response, body) => {
        if (error) return resolve({hasError: true, data: { type: 'request_error', error }});
        if (response.statusCode != 200) return resolve({ hasError: true, data: { type: 'status_code', error: {statusCode: response.statusCode, statusMessage: response.statusMessage} } });
        if (!body) return resolve({ hasError: true, data: { type: 'empty_body', error: 'Server returned nothing' } });
        if (body.status_code !== 0) return resolve({ hasError: true, data: { type: 'server_status_code', error: body} });
        resolve({hasError: false, data: body});
      })
    );
  }
  
  async login(steamId) {
    return new Promise(resolve => this.request.post(
      Object.assign({
        url: `${this.apiUrl}/login`,
        body: {
          steam_id: steamId,
        },
        json: true,
      }, this.requestOpts),
      (error, response, body) => {
        if (error) return resolve({hasError: true, data: { type: 'request_error', error }});
        if (response.statusCode != 200) return resolve({ hasError: true, data: { type: 'status_code', error: {statusCode: response.statusCode, statusMessage: response.statusMessage} } });
        if (!body) return resolve({ hasError: true, data: { type: 'empty_body', error: 'Server returned nothing' } });
        resolve({hasError: false, data: body});
      })
    );
  }
}