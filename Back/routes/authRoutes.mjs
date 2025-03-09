import { Router } from 'express';
import login from '../controllers/authController.mjs'
export const router = Router();


router.post('/login', login);

