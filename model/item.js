import {mongoose} from './mongoose.js'

const Schema = mongoose.Schema

let schema = new Schema({
  marketName: {
    type: String,
    unique: true
  },
  medianPrice: {
    type: Number,
    default: 0
  },
  lastCheckTime: {
    type: Number,
    default: 0
  }
})
  
export const Item = mongoose.model('Item', schema)