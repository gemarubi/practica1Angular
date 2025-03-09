import { Router } from 'express';
import controladorTarea from '../controllers/tareasController.mjs'
import {validarJWT} from "../middlewares/validarToken.mjs";
import { esAdmin, esUsuario } from '../middlewares/validarRoles.mjs';
export const router = Router();


router.post('/registrar',/*validarJWT,esAdmin,*/ controladorTarea.registrarTarea);
router.get('/buscar/:id',/*validarJWT,esAdmin,*/controladorTarea.buscarTarea)
router.get('/verTareas',/*validarJWT,esAdmin,*/ controladorTarea.verTodas)
router.get('/borrar/:id',/*validarJWT,esAdmin,*/controladorTarea.borrar)
router.put('/modificar',/*validarJWT,esAdmin,*/controladorTarea.modificar)
router.get('/complejidad/:dificultad',/*validarJWT,esAdmin,*/controladorTarea.filtroComplejidad)
router.post('/complejidad',/*validarJWT,esAdmin,*/controladorTarea.rangoComplejidad)
router.get('/complejidad',/*validarJWT,esAdmin,*/controladorTarea.maximaDificultad)
router.get('/tareaUsuario/:id',/*validarJWT,esAdmin,*/controladorTarea.tareaPorUsuario)
router.get('/tareaUsuario/:id/:dificultad',/*validarJWT,esAdmin,*/controladorTarea.tareaPorUsuarioDificultad)
router.get('/tareasOrdenadas',/*validarJWT,esAdmin,*/controladorTarea.tareasOrdenadas)
router.post('/filtroDescripcion',/*validarJWT,esAdmin,*/controladorTarea.filtroDescripcion)
router.post('/guardarFoto/:id',controladorTarea.cargarArchivo)
router.get('/verFotos',controladorTarea.verFotos)
