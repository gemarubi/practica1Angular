import dotenv from 'dotenv';
import express from 'express';
import { MiServer } from './server.mjs';


dotenv.config()
const app = express();
const server = new MiServer();
server.listen();
app.use(express.json())




console.log(`Datos de conexión: ${process.env.DB_DEV} ${process.env.DB_USER} ${process.env.DB_PASSWORD}`);
