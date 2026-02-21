import mongoose, { Schema, Document } from "mongoose";

export interface IArticle extends Document {
  article_id: string;
  title: string;
  link: string;
  description: string | null;
  content: string | null;
  creator: string[] | null;
  language: string;
  country: string[];
  category: string[];
  datatype: string;
  pubDate: Date;
  image_url: string | null;
  source_id: string;
  source_name: string;
}

const ArticleSchema: Schema = new Schema({
  article_id: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  link: { type: String },
  description: { type: String },
  content: { type: String },
  creator: { type: [String], default: null },
  language: { type: String },
  country: { type: [String] },
  category: { type: [String] },
  datatype: { type: String },
  pubDate: { type: Date, index: true },
  image_url: { type: String },
  source_id: { type: String },
  source_name: { type: String },
});

export default mongoose.model<IArticle>("Article", ArticleSchema);
