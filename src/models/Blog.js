const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    imagenUrl: { type: String },
    autor: { type: String }, // o referencia a User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    destacado: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Blog', blogSchema);
