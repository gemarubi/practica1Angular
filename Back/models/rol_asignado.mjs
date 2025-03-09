'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';
import conexion from '../database/Conexion.mjs';
import Usuario from './usuario.mjs';
 export class Rol_Asignado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rol_Asignado.init({
    id_rol:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Rol',
        key: 'id'
      }
    },
    id_usuario:{
        type:DataTypes.INTEGER,
        references: {
          model: 'Usuario',
          key: 'id'
        }
      } 
    }, 
    {
    sequelize: conexion,
    modelName: 'Rol_Asignado'
  });






export default Rol_Asignado;