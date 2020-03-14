import { Schema, model, Types } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import timestamps from 'mongoose-timestamp';

let noteSchema = new Schema(
  {
    message: {
      type: String,
      trim: true,
      maxlength: 256000
    },
    created_by: {
      type: String,
      required: true
    },
    owner: { type: Types.ObjectId, ref: 'User' }
  },
  { collection: 'notes', versionKey: false }
);

noteSchema.plugin(paginate);
noteSchema.plugin(timestamps, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default model('Note', noteSchema);
