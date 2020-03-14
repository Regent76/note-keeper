import { Schema, model, Types } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import timestamps from 'mongoose-timestamp';

let userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    notes: [{ type: Types.ObjectId, ref: 'Note' }]
  },
  { collection: 'users', versionKey: false }
);

userSchema.plugin(timestamps, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});
userSchema.plugin(paginate);

export default model('User', userSchema);
