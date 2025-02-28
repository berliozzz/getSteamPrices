import SteamMarketFetcher from 'steam-market-fetcher'
import {Item} from './model/item.js'
import {parsePrice, isItemExistInDB } from './utils.js'

const marketFetcher = new SteamMarketFetcher({
  currency: 'RUB',
  format: 'json'
})

let items = []

const marketName = 'M4A1-S | Control Panel (Battle-Scarred)'
// const marketName = 'Dual Berettas | Twin Turbo (Factory New)'

const getItemPrice = () => {
  marketFetcher.getItemPrice({
    market_hash_name: marketName,
    appid: 730,
    callback: async (err, price) => {
      if (err) throw err

      let isExist = await isItemExistInDB(Item, marketName)
      if (isExist) {
        updateItem(marketName, price)
      } else {
        createNewItem(marketName, price)
      }
    }
  })
}
const getItemsFromDB = async () => {
  Item.find({}).sort('marketName')
    .then(res => {
      items = res
      getItemPrice()
    })
    .catch(err => {
      console.log(err)
    })
}
const createNewItem = (marketName, price) => {
  const item = new Item({
    marketName: marketName,
    medianPrice: parsePrice(price.median_price),
    lastCheckTime: Date.now()
  })

  item.save()
    .then(() => {
      console.log(`${marketName} added to DB.`)
    })
    .catch((err) => {
      if (err.code == 11000) {
        console.log('Такой предмет уже есть в базе.')
      } else {
        console.log('createNewItem: ' + err.message)
      }
    })
}
const updateItem = (marketName, price) => {
  console.log(price)
}


getItemsFromDB()
