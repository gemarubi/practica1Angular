import { conexion } from "./Conexion.mjs";
import mysql from 'mysql2';
//import Usuario from '../models/usuario.mjs';
import { Sequelize, QueryTypes, Op } from 'sequelize';
//import {Rol_Asignado} from '../models/rol_asignado.mjs'
//import {Rol} from '../models/rol.mjs'
import {Usuario, Rol_Asignado, Rol, Tarea} from '../models/asociacion.mjs'
class ConexionUser {
   
 
    registrarUsuario = async(usuario,rol=1) => {
       usuario=new Usuario(usuario);
        let resultado;
        let maxId;
        try {
        
        resultado=await usuario.save();
        maxId = await Usuario.findAll({
            attributes:[[Sequelize.fn('MAX', Sequelize.col('id')), 'maxId']]
        });
        usuario.id=maxId[0].dataValues.maxId
        
        const rol_Asignado={id_rol:rol, id_usuario:usuario.id}
        
        Rol_Asignado.create(rol_Asignado)
        } catch (error) {
            resultado=error.errors[0].message
            //throw error;
           
        }
        return resultado;
    }
  

   getUsuario = async(correo) => {
        let resultado = [];
        try {
            resultado = await Usuario.findAll({
                where: {
                    correo: { [Op.eq]: correo } 
                }
            })
            // console.log('Y aquí');
        } catch (error) {
            throw error;
        }
        return resultado;
    }

   getRoles = async(id)=>{
        let resultado = [];
        //ejemplo raw query
       /* try {
            resultado =  await conexion.query('SELECT rols.descripcion FROM rols JOIN rol_asignados ON rols.id=rol_asignados.id_rol JOIN usuarios ON rol_asignados.id_usuario=usuarios.id  WHERE usuarios.id = :id_usuario', {
                replacements: { id_usuario: id },
                type: QueryTypes.SELECT,
              });
        } catch (error) {
            throw error;
        }*/

          resultado=  await Rol_Asignado.findAll({
                include: [
                    {
                        model: Usuario, 
                        as: 'RolAsignadoUs', 
                      // attributes: ['id'], 
                    },
                    {
                        model: Rol, 
                        as: 'RolAsignadoRol', 
                        attributes: [ 'descripcion'], 
                    }
                ],
                where:{
                    id_usuario: { [Op.eq]: id } 
                }
                //attributes: ['idra'], 
            });
        
            if (!resultado) {
                throw new Error('No se encontraron resultados.');
            }
            return resultado;
        return resultado;
    }

    listarUsuarios= async()=>{
        let resultado = [];
        try {
            resultado = await Usuario.findAll()
            
        } catch (error) {
            throw error;
        }
        return resultado;
    }
    guardarFoto= async(id,url)=>{
       
        let resultado = [];
        try {
            const usuario = await Usuario.findByPk(id)
       
            resultado = await usuario.update({ foto: url });
            
        } catch (error) {
            throw error;
        }
        return resultado;
    }
}
export {ConexionUser}