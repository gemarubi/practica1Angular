import {response,request} from 'express';
import {ConexionTareasUser} from '../database/ConexionTareasUser.mjs'
import {Tarea} from '../models/tarea.mjs'

const conexion= new ConexionTareasUser()

const controladorTareaUser = {

    tareasUserFiltradas:(req=request, res=response)=>{
          
            conexion.tareasToDo(req.idToken,req.params.realizada)   
            
            .then( msg => {
                console.log('Tarea actualizada correctamente!');
                res.status(201).json(msg);
            })
            .catch( err => {
                console.log('sin resultados!');
                
                res.status(203).json(err);
            });
        },
    tareaSinAsignar:(req=request, res=response)=>{
          
            conexion.tareaSinAsignar()   
            
            .then( msg => {
                console.log('Tarea actualizada correctamente!');
                res.status(201).json(msg);
            })
            .catch( err => {
                console.log('sin resultados!');
                
                res.status(203).json(err);
            });
        },
    cambiarEstado:(req=request, res=response)=>{
          
            conexion.cambiarEstado(req.params.id)   
            
            .then( msg => {
                console.log('Tarea actualizada correctamente!');
                console.log(msg)
                res.status(201).json(msg);
            })
            .catch( err => {
                console.log('sin resultados!');
                console.log(err)
                res.status(203).json(err);
            });
        },
    asignarTarea:(req=request, res=response)=>{
          
        conexion.asignarTarea(req.idToken, req.params.idTarea)   
        
        .then( msg => {
            console.log('Tarea actualizada correctamente!');
            console.log(msg)
            res.status(201).json(msg);
        })
        .catch( err => {
            console.log('sin resultados!');
            console.log(err)
            res.status(203).json(err);
        });
    }
}

export default controladorTareaUser