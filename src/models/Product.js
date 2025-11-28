const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    nombre: { type: String, required: true },

    clasificacion: { type: String, default: "" },
    nombreAlternativo: { type: String, default: "" },

    autor: { type: String, default: "" },
    artista: { type: String, default: "" },

    genero: { type: String, default: "" },
    tipo: { type: String, default: "Cómic" },
    estado: { type: String, default: "OnGoing" },

    descripcion: { type: String, default: "" },

    precio: { type: Number, required: true },
    imagen: { type: String, default: "" },

    link: { type: String, default: "" },

  },
  {
    timestamps: true
  }
);

// Campo virtual para que el frontend siga usando "id"
productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

productSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Product", productSchema);
