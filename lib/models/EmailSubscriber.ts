import mongoose, { Document, Model, Schema } from 'mongoose'

interface IEmailSubscriber extends Document {
  email: string
}

const EmailSubscriberSchema: Schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
})

const EmailSubscriber: Model<IEmailSubscriber> =
  mongoose.models.EmailSubscriber ||
  mongoose.model<IEmailSubscriber>('EmailSubscriber', EmailSubscriberSchema)

export default EmailSubscriber
