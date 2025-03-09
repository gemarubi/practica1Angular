import cors from 'cors'
import express from 'express'
import { createServer } from 'http';
import { Server  } from 'socket.io';
import fileUpload from 'express-fileupload';
import { socketController } from '../controllers/webSocketController.mjs';
import {router as userRoutes} from '../routes/userRoutes.mjs';
import {router as authRoutes} from '../routes/authRoutes.mjs';
import {router as tareasRoutes} from '../routes/tareasRoutes.mjs';
import {router as tareasUserRoutes} from '../routes/tareasUserRoutes.mjs'

class MiServer {

    constructor() {
        this.app = express();
        this.usuariosPath = '/api/usuarios';
        this.authPath  = '/api/auth';
        this.tareasPath = '/api/tareas';
        this.tareasUserPath ='/api/tareasUser'
       
        this.server=createServer(this.app);
        this.serverWebSocket = createServer(this.app);
        this.io = new Server(this.serverWebSocket, {
            cors: {
                origin: '*', 
                methods: ['GET', 'POST'], 
                allowedHeaders: ['Content-Type'], 
                credentials: true 
            }
        });   
        //Middlewares
        this.middlewares();

        this.routes();

        this.sockets();
        
    }

    middlewares() {
        //En esta sección cargamos una serie de herramientas necesarias para todas las rutas.
        //Para los middlewares como estamos acostumbrados a usarlos en Laravel ver userRoutes y middlewares.
        //Para cors
        this.app.use(cors());
        //Para poder recibir la información que venga del body y parsearla de JSON, necesitamos importar lo siguiente.
        this.app.use(express.json());
        // this.app.use(body_parser.json());
        // this.app.use(body_parser.urlencoded({ extended: false }));
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true  //Con esta opción si la carpeta de destino no existe, la crea.
        }));
    }

    sockets(){
        this.io.on('connection', socketController);
    }

    routes(){
        this.app.use(this.authPath , authRoutes);
        this.app.use(this.usuariosPath , userRoutes);
        this.app.use(this.tareasPath, tareasRoutes);
        this.app.use(this.tareasUserPath, tareasUserRoutes);
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
        this.serverWebSocket.listen(process.env.WEBSOCKETPORT, () => {
            console.log(`Servidor de WebSockets escuchando en: ${process.env.WEBSOCKETPORT}`);
        });
    }

  
}

export {MiServer};