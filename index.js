import SteamMarketFetcher from 'steam-market-fetcher'

const market = new SteamMarketFetcher({
  currency: 'RUB',
  format: 'json'
})

const marketName = 'M4A1-S | Control Panel (Battle-Scarred)'

market.getItemPrice({
  market_hash_name: marketName,
  appid: 730,
  callback: (err, price) => {
      if (err) throw err

      console.log(price)
  }
})
