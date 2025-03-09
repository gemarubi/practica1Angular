import {response,request} from 'express';
import {ConexionUser} from '../database/ConexionUser.mjs';
import { Usuario } from '../models/usuario.mjs';
import { subirArchivoS3 } from '../helpers/aws.mjs';
import { readFile } from "fs/promises";
import  pkg  from  "bcrypt" ;

const conx=new ConexionUser()
const bcrypt =pkg;
const saltRounds=10;
const  salt=bcrypt.genSaltSync ( saltRounds ) ;
const controladorUser = {

    registrarUsuario : async (req = request, res = response) => {
       req.body.pass= bcrypt.hashSync( req.body.pass.toString(),salt) ;
       
         conx.registrarUsuario(req.body)  
            .then( msg => {
                console.log('Insertado correctamente!');

                res.status(201).json(msg);
            })
            .catch( err => {
                
                console.log('Fallo en el registro!');
                console.log(err)
                res.status(203).json(err);
            });
    },

    verTodos: async (req =request, res = response) => {
        conx.listarUsuarios()
        .then( msg => {
            

            res.status(201).json(msg);
        })
        .catch( err => {
           
            console.log(err)
            res.status(203).json(err);
        });
    },

    cargarArchivo: async (req =request, res = response) => {
       console.log(req.files)
        try {
            //--------------------- Usando el helper ----------------------
            //Comentando/descomentando lo siguiente se admiten textos/imágenes. Los nombres de las carpetas, en lugar de literalmente, deberían estar definidos en .env.
            //const {secure_url, public_id} = await subirArchivoS3( req.files, ['txt','md'], 'textos' );
            const { secure_url, public_id } = await subirArchivoS3(req.files, undefined, process.env.AWS_DIRECTORY);
            conx.guardarFoto(req.idToken,secure_url)
            console.log("Archivo subido a S3:", { secure_url, public_id })
            res.json({ secure_url, public_id });
        } catch (msg) {
            res.status(400).json({ msg });
        }
    
    }
    
}
export default controladorUser