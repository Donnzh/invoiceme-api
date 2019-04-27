import mongoose, { Schema } from 'mongoose'
var generate = require('nanoid/generate')

const invoicesSchema = new Schema({
  _id: {
    type: String,
    default: () => generate('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 7)
  },
  name: {
    type: String
  },
  comment: {
    type: String
  },
  amount: {
    type: String
  },
  invoiceId: {
    type: String
  },
  invoiceDate: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

invoicesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      comment: this.comment,
      invoiceId: this.invoiceId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      amount: this.amount,
      invoiceDate: this.invoiceDate
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Invoices', invoicesSchema)

export const schema = model.schema
export default model
