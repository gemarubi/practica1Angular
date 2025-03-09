import { Router } from 'express';
import controladorTareaUser from '../controllers/tareasUserController.mjs'
import {validarJWT} from "../middlewares/validarToken.mjs";
import { esUsuario } from '../middlewares/validarRoles.mjs';
export const router = Router();

router.get('/tareasToDo/:realizada', validarJWT, esUsuario, controladorTareaUser.tareasUserFiltradas)
router.get('/tareaSinAsignar', validarJWT, esUsuario, controladorTareaUser.tareaSinAsignar)
router.get('/cambiarEstado/:id', validarJWT, esUsuario, controladorTareaUser.cambiarEstado)
router.put('/asignarTarea/:idTarea', validarJWT, esUsuario, controladorTareaUser.asignarTarea)