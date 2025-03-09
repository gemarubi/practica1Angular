import {response,request} from 'express';
import {ConexionUser} from '../database/ConexionUser.mjs';
import {generarJWT, generarJWT_Roles} from '../helpers/generate_jwt.mjs'
import  pkg  from  "bcrypt" ;

const bcrypt =pkg;
const login =  async(req, res = response) => {
    const {correo, pass} = req.body;
    try{
        //Verificar si existe el usuario.
        const conx = new ConexionUser();
        const user = await conx.getUsuario(correo)
        const coincide = await bcrypt.compare(pass.toString(), user[0].pass.toString());
        //res.status(200).json({user});
       conx.getRoles(user[0].id)    
            .then( us => {
                
               
                console.log('Usuario correcto!  ' + user[0].id);
                const token = generarJWT_Roles(user[0].id, [us[0].RolAsignadoRol.descripcion])
                console.log(user)
                console.log(token);
                
                res.status(200).json({us, token});
            })
                

            .catch( err => {
                console.log(err);
                res.status(500).json({'msg':'Login incorrecto.'});
            });
            
    }
    catch(error){
        console.log(error);
        res.status(500).json({'msg':'Error en el servidor.'});
    }
    
}

export default login