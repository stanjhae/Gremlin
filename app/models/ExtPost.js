/**
 * @author emmanuelolaojo
 * @since 10/3/18
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const REQUIRED = "{PATH} is required";

let ExtPostSchema = new Schema({
  url: {type: String, required: REQUIRED},
  imgId: {type: Schema.Types.ObjectId, required: REQUIRED},
  title: {type: String, required: REQUIRED},
  description: {type: String, required: REQUIRED},
  date: {type: String, required: REQUIRED},
  rank: {type: Number, default: 0}
});

exports.ExtPost = mongoose.model("ExtPosts", ExtPostSchema);