import { Sequelize, DataTypes, Model } from 'sequelize';
import conexion from '../database/Conexion.mjs';
import Rol_Asignado from './rol_asignado.mjs';
  export class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rol.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true
    },
    descripcion: DataTypes.STRING
  }, {
    sequelize: conexion,
    modelName: 'Rol',
  });
 


export default Rol