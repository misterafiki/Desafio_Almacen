import express from 'express';
import cors from 'cors';
import {router as userRoutes} from '../routes/userRoutes.js';
import {router as rolRoutes} from '../routes/rolesRoutes.js';
import {router as rolesAsignadosRoutes} from '../routes/roles_asignados_routes.js';
import {router as taskRoutes} from '../routes/taskRouter.js';
import {router as uploadsRoutes} from '../routes/uploads-routes.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { socketController } from '../controllers/websocket-controller.js';
import fileUpload from 'express-fileupload';

//https://sequelize.org/docs/v6/getting-started/

class MiServer {

    constructor() {
        this.app = express();
        this.usuariosPath = '/api/user';
        this.rolesPath = '/api/roles';
        this.rolesAsignados = '/api/assignedRoles';
        this.uploadsPath  = '/api/img';

      

        this.serverExpress = createServer(this.app);
        this.serverWebSocket = createServer(this.app);
        this.io = new  Server(this.serverWebSocket)

        //Middlewares
        this.middlewares();

        this.routes();

        this.sockets();
        
    }

    middlewares() {
       
        this.app.use(cors());
       
        this.app.use(express.json());

        // Fileupload - Carga de archivos.
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true  //Con esta opción si la carpeta de destino no existe, la crea.
        }));

        this.app.use(express.static('public'));
    }

    sockets(){
        this.io.on('connection', socketController);
    }


    routes(){
        this.app.use(this.usuariosPath , userRoutes);
        this.app.use(this.rolesPath , rolRoutes);
        this.app.use(this.rolesAsignados, rolesAsignadosRoutes);
        this.app.use(this.tasksPath , taskRoutes);
        this.app.use(this.uploadsPath, uploadsRoutes);
    }


    listen() {
        this.serverExpress.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        });
        this.serverWebSocket.listen(process.env.WEBSOCKETPORT, () => {
            console.log(`Servidor de WebSockets escuchando en: ${process.env.WEBSOCKETPORT}`);
        });
    }
}

export {MiServer};