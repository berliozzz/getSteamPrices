export const parsePrice =  (price)=> {
  let priceStringArr = price.match(/(\d+),(\d+)/)
  return parseInt(`${priceStringArr[1]}${priceStringArr[2]}`)
}
export const isItemExistInDB = (Item, marketName) => {
  return new Promise((resolve, reject) => {
    Item.findOne({ marketName: marketName }).exec()
    .then(res => res ? resolve(true) : resolve(false))
    .catch(error => reject(error))
  })
}