const path = require('path')
const request = require('request')
const _ = require('lodash')
const api = require(path.resolve('lib', 'api'))
const db = require(path.resolve('db', 'utils'))

module.exports = {

  getIndex: async (req, res) => {
    const champions = await db.all('champions')
    res.send(champions)
  },

  getEverything: (req, res) => {
    const championsUrl = api.championsUrl()
    request(championsUrl, async (err, responseFromRequest, body) => {
      if (!err && responseFromRequest.statusCode === 200) {
        const championsJSON = JSON.parse(body).data
        await insertChampionsAndSkins(championsJSON)
        res.send('done')
      } else {
        console.log('Error API Champions: ' + err)
      }
    })
  },

  getSales: (req, res) => {
    if (req.query.d === 'undefined') {
      res.status(500).send({ error: 'Data is not valid' })
    }

    const data = JSON.parse(req.query.d)
    if (_.isEmpty(data) || data.skins.length !== 4 || data.champions.length !== 4) {
      res.status(500).send({ error: 'Data is not valid' }) // Todo better reponse to invalid data
    }
    /**
     * TODO
     * Check all users that are subscribed to skins or champs in Database
     * Notify them
     * Unsubscribe them from the skin
     */
    getSkinsOnSale(data.skins)
    getChampionsOnSale(data.champions)
  }
}

/**
 * Insert Champions and his skins (from Riot api) in database if not existent
 * @param {*} championsJSON
 */
async function insertChampionsAndSkins (championsJSON) {
  let champion = {}
  let idChampionDB = null
  let skinsJSON = []
  let fields = {}

  try {
    for (const index in championsJSON) {
      champion = championsJSON[index]
      fields = {
        public_id: champion.id,
        name: champion.name,
        key: champion.key,
        title: _.startCase(champion.title)
      }
      idChampionDB = await db.findOrCreate('champions', 'public_id', champion.id, fields)
      skinsJSON = champion.skins
      await insertSkins(skinsJSON, idChampionDB)
    }
  } catch (err) {
    console.log('Error inserting champions', err)
  }
}

/**
 * Insert Skins from a champion (from Riot api) in database if not existent
 * @param {*} skinsJSON
 * @param {*} idChampionDB Id of champion in Database
 */
async function insertSkins (skinsJSON, idChampionDB) {
  let skin = {}
  let fields = {}

  try {
    for (const index in skinsJSON) {
      skin = skinsJSON[index]
      fields = {
        public_id: skin.id,
        name: skin.name,
        number: skin.num,
        champion_id: idChampionDB
      }
      await db.findOrCreate('skins', 'public_id', skin.id, fields)
    }
  } catch (err) {
    console.log('Error inserting skins', err)
  }
}

/**
 * Return skin data from provided JSON to the object in database
 *
 */
async function getSkinsOnSale (skinsJSON) {
  let skin = {}
  let skinInDB = {}
  let skins = []

  for (const index in skinsJSON) {
    skin = skinsJSON[index]
    skinInDB = await db.findBy('skins', 'name', skin.name)
    skins.push(skinInDB)
    await updatePrice(skinInDB, skin.price)
  }

  return skins
}

/**
 * Every champion has a default skin
 * So when a subscriber subscribes for a champion,
 * he actually subscribes for a skin named "default"
 * @param {JSON} championsJSON
 */
async function getChampionsOnSale (championsJSON) {
  let champion = {}
  let championInDB = {}
  let skinInDB = {}
  let champions = []

  for (const index in championsJSON) {
    champion = championsJSON[index]
    championInDB = await db.findBy('champions', 'name', champion.name)
    champions.push(championInDB)
    skinInDB = await db.find('skins', {
      champion_id: championInDB.id,
      name: 'default'
    })
    await updatePrice(skinInDB, champion.price)
  }

  return champions
}

async function updatePrice (skinInDB, price) {
  if (skinInDB.price_on_sale === null) {
    console.log(skinInDB.name, 'price will be updated')
    return db.update('skins', skinInDB.id, {price_on_sale: price})
  }
}