import dotenv from 'dotenv';
dotenv.config()
import { MiServer } from './server.js';

//Lanzamos el servidor.
const server = new MiServerr();
server.listen();


console.log(`Datos de conexión: ${process.env.DB_DEV} ${process.env.DB_USER} ${process.env.DB_PASSWORD}`);

