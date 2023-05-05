import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

const categoryModel = mongoose.model('Category', categorySchema);

export default categoryModel;
