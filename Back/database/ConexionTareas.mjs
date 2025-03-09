
import mysql from 'mysql2';
import { conexion } from "./Conexion.mjs";
import {Tarea} from '../models/tarea.mjs'
import { Sequelize, QueryTypes, Op } from 'sequelize';
import Usuario from '../models/usuario.mjs';

class ConexionTareas{
   

    registrarTarea = async(tarea) => {
       const newtarea=new Tarea(tarea);
        let resultado = 0;
        try {
               
               resultado=await newtarea.save();
              
               } catch (error) {
                   resultado=error.errors[0].message
                   //throw error;
                  
               }
               return resultado;
    }
    getTarea=async (id) => {
        let resultado = [];
        try {
            resultado = await Tarea.findByPk(id)
         
        } catch (error) {
            throw error;
        }
        return resultado;
    }

    verTodas= async ()=>{
        let resultado = [];
        try {
            resultado = await Tarea.findAll();
         
        } catch (error) {
            throw error;
        }
        return resultado;
    
    }

    borrarTarea= async (id)=>{
        let resultado = [];
        
            resultado = await Tarea.findByPk(id)
         
            if(resultado==null){
                throw error
            }
            resultado=resultado.destroy()

       
        return resultado;
    
    }

    modificarTarea= async (body)=>{
        console.log({"la que llega ":body});
        const tarea=new Tarea(body)
        let resultado = [];
        
        resultado = await Tarea.findByPk(body.id)
      
        if(resultado==null){
            throw error
        }
        resultado=await resultado.update(body)
        console.log({"la que envio ":resultado})
       
   
    return resultado;
    }
    filtroComplejidad = async(dificultad)=>{
        let resultado = [];
        
        resultado = await Tarea.findAll({
            where:{
                    dificultad: { [Op.eq]: dificultad } 
                           }
            
        })
       
        if(resultado==null){
            throw error
        }
        return resultado
    }

    rangoComplejidad= async(min,max)=>{
        let resultado = [];
        
        resultado = await Tarea.findAll({
            where: { dificultad: 
                { [Op.between]: [min, max] }
             },
            
        })
       
        if(resultado==null){
            throw error
        }
        return resultado
    }

    maximaDificultad= async()=>{
        const resultado = await Tarea.findAll({
            where: {dificultad: 
                {[Op.eq]:Sequelize.literal(`(
                SELECT MAX(dificultad) AS maxDificultad
                FROM tareas
            )`)}}
        })
       
        console.log(resultado)
       
        return  resultado;
    }
    tareaPorUsuario= async(id)=>{
        let resultado = [];
        
        resultado = await Usuario.findAll({
            where: 
            { id: 
                { [Op.eq]: id }
             },
            
            include:
            [{
                model: Tarea,  
                as: 'tareasdeUsuario',   //Alias definido en la asociación
                
            }
                 
            ],
            attributes:['nombre','correo'] 
            
        })
       
        if(resultado==null){
            throw error
        }
        return resultado
    }
    tareaPorUsuarioDificultad= async(id,dificultad)=>{
        let resultado = [];
        
        resultado = await Usuario.findAll({
            where: 
            { id: 
                { [Op.eq]: id }
             },
            
            include:
            [{
                model: Tarea,  
                as: 'tareasdeUsuario',   //Alias definido en la asociación
                where: {dificultad:
                    { [Op.eq]: dificultad}
                }       
            }
                 
            ],
            attributes:['nombre','correo'] 
            
        })
       
        if(resultado==null){
            throw error
        }
        return resultado
    }
    tareasOrdenadas= async()=>{
        let resultado = [];
        
        resultado = await Tarea.findAll({
           order:['duracion','dificultad']
            
        })
       
        if(resultado==null){
            throw error
        }
        return resultado
    }

    filtroDescripcion= async(texto)=>{
        let resultado = [];
        
        resultado = await Tarea.findAll({
      
           where:{
            descripcion:{[Op.like]: `%${texto}%`}
           
           }
        })
       
        if(resultado==null){
            throw error
        }
        return resultado
    }

      guardarFoto= async(id,url)=>{
           
            let resultado = [];
            try {
                const tarea = await Tarea.findByPk(id)
           
                resultado = await tarea.update({ foto: url });
                
            } catch (error) {
                throw error;
            }
            return resultado;
        }
    
        verFotos=async(id,url)=>{
            let resultado = [];
            try {
                resultado = await Tarea.findAll({

                    attributes:['descripcion','foto']
                })
                
            } catch (error) {
                throw error;
            }
            return resultado;
        }
}

export {ConexionTareas}