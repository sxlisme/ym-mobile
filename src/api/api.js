// import { fetch, baseUrl } from 'config/index'

let baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8456' : '';
console.log(baseUrl);

module.exports = {
  baseUrl
}
