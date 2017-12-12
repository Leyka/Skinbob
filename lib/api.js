/**
 * League of Legends API configuration
 * https://developer.riotgames.com
 */
module.exports = {
  baseUrl: 'https://na1.api.riotgames.com/lol/',
  key: 'RGAPI-b3488af5-b51d-4c48-8a39-2c84d702f876',
  version: 3,
  buildUrl: function (type, element, options) {
    let symbol = '&'
    if (options === 'undefined') {
      symbol = '?'
      options = ''
    }
    return this.baseUrl + type + '/v' + this.version + '/' + element + options + symbol + 'api_key=' + this.key
  },
  championsUrl: function () {
    return this.buildUrl('static-data', 'champions/', '?tags=skins&dataById=true')
  }
}