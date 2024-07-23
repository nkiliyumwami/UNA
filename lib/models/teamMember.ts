import mongoose, { Document, Model, Schema } from 'mongoose'

export interface ITeamMember extends Document {
  name: string
  role: string
  description?: string
  image?: string
  email: string
  linkedin?: string
  category: 'leadership' | 'board'
}

const teamMemberSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    email: { type: String, required: true, unique: true },
    linkedin: { type: String },
    category: { type: String, required: true, enum: ['leadership', 'board'] },
  },
  { timestamps: true }
)

const TeamMember: Model<ITeamMember> =
  mongoose.models.TeamMember ||
  mongoose.model<ITeamMember>('TeamMember', teamMemberSchema)

export default TeamMember
