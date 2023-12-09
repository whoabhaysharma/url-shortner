import mongoose from 'mongoose'
import shortid from 'shortid'

const urlSchema = new mongoose.Schema({
    full: String,
    short: {
        type: String,
        default: shortid.generate
    },
    count: {
        type: Number,
        default: 0
    }
})

const Url = mongoose.model('Url', urlSchema)

export default Url