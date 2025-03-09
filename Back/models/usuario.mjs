'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';
import conexion from '../database/Conexion.mjs';
import Rol_Asignado from './rol_asignado.mjs';

  export class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuario.init({
    id:{
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    pass: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
    sequelize: conexion,
    modelName: 'Usuario',
  });





export default Usuario;