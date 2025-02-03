import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
// import { Server as serverWebSocket } from 'socket.io';
// import { socketController } from '../controllers/websocket-controller.js';
import fileUpload from 'express-fileupload';

import {router as userRoutes} from '../routes/userRoutes.js';
// import {router as rolRoutes} from '../routes/rolesRoutes.js';
// import {router as rolesAsignadosRoutes} from '../routes/roles_asignados_routes.js';
// import {router as photoRoutes} from '../routes/photo-routes.js';
import {router as authRouters} from '../routes/authRoutes.js'
import { router as grupRoutes } from '../routes/grupsRoutes.js'; 
import { router as subjectRoutes } from '../routes/subjectsRoutes.js'; 

//https://sequelize.org/docs/v6/getting-started/

class Server {

    constructor() {
        this.app = express();
        this.userPath = '/api/user';
        this.authPath = '/api/auth';
        this.rolesPath = '/api/roles';
        this.rolesAsignados = '/api/assignedRoles';
        this.photoPath  = '/api/img';
        this.grupPath = '/api/grup';
        this.subjectPath = '/api/subject';

      

        this.serverExpress = createServer(this.app);
        // this.serverWebSocket = createServer(this.app);
        // this.io = new  Server(this.serverWebSocket)

        //Middlewares
        this.middlewares();

        this.routes();

        // this.sockets();
        
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

    // sockets(){
    //     this.io.on('connection', socketController);
    // }


    routes(){
        this.app.get('/', (req, res) => {
            res.send('API funcionando correctamente 🚀');
        });
        this.app.use(this.userPath , userRoutes);
        this.app.use(this.authPath , authRouters);
        this.app.use(this.grupPath , grupRoutes);
        this.app.use(this.subjectPath , subjectRoutes);
        // this.app.use(this.rolesPath , rolRoutes);
        // this.app.use(this.rolesAsignados, rolesAsignadosRoutes);
        // this.app.use(this.photoPath, photoRoutes);
    }


    listen() {
        this.serverExpress.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        });
        // this.serverWebSocket.listen(process.env.WEBSOCKETPORT, () => {
        //     console.log(`Servidor de WebSockets escuchando en: ${process.env.WEBSOCKETPORT}`);
        // });
    }
}

export {Server};