'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';
import conexion from '../database/Conexion.mjs';
import RolAsignado from './rol_asignado.mjs';


 export  class Tarea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   
  }
  Tarea.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    descripcion:Sequelize.STRING ,
    duracion: Sequelize.INTEGER,
    dificultad: Sequelize.INTEGER,
    realizada: DataTypes.INTEGER,
    foto:DataTypes.STRING,
    id_usuario:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    } 
  }, {
    sequelize: conexion,
    modelName: 'Tarea',
  });
  

  export default Tarea;