import mysql from 'mysql2';
import { conexion } from "./Conexion.mjs";
import {Tarea} from '../models/tarea.mjs'
import { Sequelize, QueryTypes, Op } from 'sequelize';
import Usuario from '../models/usuario.mjs';

class ConexionTareasUser{

    tareasToDo= async(id,realizada)=>{
        let resultado = [];
        
        resultado = await Tarea.findAll({
            where: {
                [Op.and]: [
                { id_usuario: { [Op.eq]: id }},
                { realizada: {[Op.eq]:realizada} }
                ]
             }
            
        })
       
        if(resultado==null){
            throw error
        }
        return resultado
    }
    tareaSinAsignar= async()=>{
        let resultado = [];
        
        resultado = await Tarea.findAll({
            where: {
                [Op.or]: [
                { id_usuario: { [Op.eq]: 0 }},
                { id_usuario: {[Op.eq]: null} }
                ]
             }
            
        })
       
        if(resultado==null){
            throw error
        }
        return resultado
    }

    cambiarEstado= async(id)=>{ 
        let resultado = [];
        const tarea = await Tarea.findByPk(id)
       
        resultado = await tarea.increment({
            realizada: 1
          });
       
        if(resultado==null){
            throw error
        }
        return resultado
    }
    asignarTarea= async(iduser,idTarea)=>{ 
        let resultado = [];
        const tarea = await Tarea.findByPk(idTarea)
       
        resultado = await tarea.update({ id_usuario: iduser });
       
        if(resultado==null){
            throw error
        }
        return resultado
    }
    
}

export {ConexionTareasUser}