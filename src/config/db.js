const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser y useUnifiedTopology ya no son necesarios en últimas versiones,
      // pero se pueden dejar si se quiere.
    });
    console.log('MongoDB conectado correctamente');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1); // Cierra la app si falla la conexión
  }
};

module.exports = connectDB;
