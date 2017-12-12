/**
 * The CDN is used to get images from skins, icons, champions etc.
 */
module.exports = {
  baseCdnUrl: 'https://ddragon.leagueoflegends.com/cdn/',
  version: '7.24.1',
  skinUrl: function (champion, num) {
    // If param 'num' is not provided, it means we get the default skin (0)
    num = (num === 'undefined') ? 0 : num
    const base = this.baseCdnUrl + 'img/champion/' + 'loading/'
    return base + champion + '_' + num + '.jpg'
  },
  iconUrl: function (champion) {
    return this.baseCdnUrl + this.version + '/img/champion/' + champion + '.png'
  }
}