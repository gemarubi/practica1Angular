import {response,request} from 'express';
import {ConexionTareas} from '../database/ConexionTareas.mjs'
import {Tarea} from '../models/tarea.mjs'
import { socketController } from './webSocketController.mjs';
import { subirArchivoS3 } from '../helpers/aws.mjs';
const conexion= new ConexionTareas()

const controladorTarea = {

    registrarTarea:   (req = request, res = response) => {
        
        conexion.registrarTarea(req.body)    
            .then( msg => {
                
                console.log('Tarea insertada correctamente!');
                res.status(201).json(msg);
            })
            .catch( err => {
                console.log(err);
                res.status(203).json(err);
            });
   
    },

    buscarTarea :  (req = request, res = response) => {
        const tareas=conexion.getTarea(req.params.id)    
            .then( tasks => {
                //const tarea=new Tarea()
                res.status(201).json(tasks);
            })
            .catch( err => {
                console.log('sin resultados!');
                res.status(203).json(err);
            });
    },

    verTodas : (req = request, res=response)=>{
        const tareas=conexion.verTodas()    
        .then( tasks => {
            //const tarea=new Tarea()
            res.status(201).json(tasks);
        })
        .catch( err => {
            console.log('sin resultados!');
            res.status(203).json(err);
        });
    },

    borrar: (req = request, res=response)=>{
        conexion.borrarTarea(req.params.id)    
        .then( msg => {
            console.log('Tarea borrada correctamente!');
            res.status(201).json(msg);
        })
        .catch( err => {
            console.log('sin resultados!');
            res.status(203).json(err);
        });
    },
    modificar: (req = request, res=response)=>{
        if (req.body.id_usuario==0&& req.body.id_usuario== null ){
            req.body.realizada=0
        }
        conexion.modificarTarea(req.body)   
        
        .then( msg => {
            console.log('Tarea actualizada correctamente!');
            res.status(201).json(msg);
        })
        .catch( err => {
            console.log('sin resultados!');
            res.status(203).json(err);
        });
    },
    filtroComplejidad:(req=request, res=response)=>{
        console.log(req.params.dificultad)
        conexion.filtroComplejidad(req.params.dificultad)   
        
        .then( msg => {
            console.log('Tarea actualizada correctamente!');
            res.status(201).json(msg);
        })
        .catch( err => {
            console.log('sin resultados!');
            
            res.status(203).json(err);
        });
    },

    rangoComplejidad:(req=request, res=response) => {
        const {min, max}=req.body
        conexion.rangoComplejidad(min, max)   
        
        .then( msg => {
            console.log('Tarea actualizada correctamente!');
            res.status(201).json(msg);
        })
        .catch( err => {
            console.log('sin resultados!');
            
            res.status(203).json(err);
        });
    },
    maximaDificultad:(req=request, res=response) => {
       
        conexion.maximaDificultad()   
        
        .then( msg => {
            console.log('Tarea actualizada correctamente!');
            res.status(201).json({cantidad:msg.length});
        })
        .catch( err => {
            console.log(err)
            console.log('sin resultados!');
            
            res.status(203).json(err);
        });
    },
    tareaPorUsuario:(req=request, res=response) => {
       
        conexion.tareaPorUsuario(req.params.id)   
        
        .then( msg => {
            console.log('Tarea actualizada correctamente!');
            res.status(201).json(msg);
        })
        .catch( err => {
            console.log(err)
            console.log('sin resultados!');
            
            res.status(203).json(err);
        });
    },
    tareaPorUsuarioDificultad:(req=request, res=response) => {
       
        conexion.tareaPorUsuarioDificultad(req.params.id,req.params.dificultad)   
        
        .then( msg => {
            console.log('Tarea actualizada correctamente!');
            res.status(201).json(msg);
        })
        .catch( err => {
            console.log(err)
            console.log('sin resultados!');
            
            res.status(203).json(err);
        });
    },
    tareasOrdenadas:(req=request, res=response) => {
       
        conexion.tareasOrdenadas()   
        
        .then( msg => {
            console.log('Tarea actualizada correctamente!');
            res.status(201).json(msg);
        })
        .catch( err => {
            console.log(err)
            console.log('sin resultados!');
            
            res.status(203).json(err);
        });
    },
    filtroDescripcion:(req=request, res=response) => {
       
        conexion.filtroDescripcion(req.body.texto.toLowerCase())   
        
        .then( msg => {
            console.log('Tarea actualizada correctamente!');
            res.status(201).json(msg);
        })
        .catch( err => {
            console.log(err)
            console.log('sin resultados!');
            
            res.status(203).json(err);
        });
    },
    cargarArchivo:async(req =request, res = response) => {
           console.log(req.files)
            try {
                //--------------------- Usando el helper ----------------------
                //Comentando/descomentando lo siguiente se admiten textos/imágenes. Los nombres de las carpetas, en lugar de literalmente, deberían estar definidos en .env.
                //const {secure_url, public_id} = await subirArchivoS3( req.files, ['txt','md'], 'textos' );
                const { secure_url, public_id } = await subirArchivoS3(req.files, undefined, process.env.AWS_DIRECTORY);
                conexion.guardarFoto(req.params.id,secure_url)
                console.log("Archivo subido a S3:", { secure_url, public_id })
                res.json({ secure_url, public_id });
            } catch (msg) {
                res.status(400).json({ msg });
            }
        
        },
    
    verFotos:async(req =request, res = response) => {
        console.log(req.files)
       
             conexion.verFotos()
             .then( msg => {
                console.log('Tarea actualizada correctamente!');
                res.status(201).json(msg);
            })
            .catch( err => {
                console.log(err)
                console.log('sin resultados!');
                
                res.status(203).json(err);
            });
             
         
     }
}

export default controladorTarea