const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid'); // Importar la función uuidv4 para generar UUIDs

module.exports = (sequelize) => {
  sequelize.define('Driver', {
    id: {
      type: DataTypes.STRING, // Cambiar el tipo de dato a STRING para utilizar UUIDs
      primaryKey: true,
      defaultValue: () => uuidv4() // Establecer un valor predeterminado utilizando uuidv4()
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
};
