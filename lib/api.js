/**
 * League of Legends API configuration
 * https://developer.riotgames.com
 */
module.exports = {
  baseUrl: 'https://na1.api.riotgames.com/lol/',
  key: 'RGAPI-13309c2c-1256-42d2-86b8-2287b0b13ae1',
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