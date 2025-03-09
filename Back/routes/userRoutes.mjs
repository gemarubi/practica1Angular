import { Router } from 'express';
import controladorUser from '../controllers/userController.mjs';
import {validarJWT} from "../middlewares/validarToken.mjs";
import { esAdmin, esUsuario } from '../middlewares/validarRoles.mjs';
export const router = Router();


router.post('/registrar', controladorUser.registrarUsuario);
router.get('/verUsuarios', validarJWT, esAdmin, controladorUser.verTodos)
router.post('/subirFoto', validarJWT, controladorUser.cargarArchivo);
