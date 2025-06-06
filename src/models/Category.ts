import  { Document, model, models, Schema } from 'mongoose';

export interface IImage extends Document {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
}

export interface ICategory extends Document {
  _id: string;
  name: string;
  slug: string;
  tags ?: string;
  description?: string;
  images: IImage[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ImageSchema: Schema = new Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  width: { type: Number },
  height: { type: Number },
  format: { type: String },
});

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true },
    tags: { type: String },
    images: [ImageSchema],
  },
  { timestamps: true }
);




// Create or retrieve the model
const Category = models?.Category || model<ICategory>("Category", CategorySchema);

export default Category;