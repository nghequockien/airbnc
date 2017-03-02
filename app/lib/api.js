import * as common from '../config/common'

class Api {
  static headers() {
    return {
      'Accept': 'application/json; text/html',
      'Content-Type': 'application/json',
      'dataType': 'json',
    }
  }

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT')
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST')
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE')
  }

  static xhr(route, params, verb) {
    const host = common.AIRBNB_HOST + '/' + common.AIRBNB_V + '/'
    const url = `${host}${route}`

    console.log(url);

    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
    options.headers = Api.headers()

    console.log(options);
    return fetch(url, options).then( (resp) => {
      let json = JSON.parse(resp._bodyText);
      console.log(json);
      return json;
      //return json.then(err => {throw err});
    }).catch(err => {
      console.log(err);
      throw err;
    });
  }
}
export default Api
