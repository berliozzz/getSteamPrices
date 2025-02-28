import mongoose from 'mongoose'
import {mongooseUri} from '../config.js'

mongoose.connect(mongooseUri, {})

export {mongoose}