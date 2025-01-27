import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()

let db;

if (!db) {
    console.log('Conexión establecida correctamente.');
    db = new Sequelize(process.env.DB_USERS, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
        pool: {
            max: parseInt(process.env.DB_MAXCONNECTIONS), //Número máximo de conexiones en el grupo de conexiones.
            min: 1, //Número mínimo de conexiones en el grupo de conexiones.
            acquire: 30000, //Tiempo máximo, en milisegundos, que un grupo de conexiones intentará adquirir una conexión antes de lanzar un error.
            idle: 10000, //Tiempo máximo, en milisegundos, que una conexión puede estar inactiva antes de ser liberada.
        },
        define: { // Aquí se configuran opciones globales para los modelos
            timestamps: true, // Activa/desactiva automáticamente los campos createdAt y updatedAt
            underscored: true, // Usa snake_case en lugar de camelCase en los nombres de columnas
            paranoid: true, // Activa/desactiva automáticamente el campo deletedAt
        },
        logging: console.log //Habilita el registro de consultas, las consultas se lanzan por consola.
    });
}

process.on('SIGINT', async() => {
    try {
        await db.close().then(() => { //Espera a que se cierre la conexión
            console.log('Conexión cerrada correctamente.');
            process.exit(0); //Salida exitosa
        })
        .catch((error) => {
            console.error('Error al cerrar la conexión:', error);
            process.exit(1); //Error en la salida.
        });
    } catch (error) {
        console.error('No se pudo cerrar la conexión a la base de datos:', error);
    }
});



export default  db ;

/*
El pool de conexiones es una característica muy útil que permite reutilizar las conexiones existentes en lugar de abrir y 
cerrar conexiones para cada consulta. Esto puede reducir significativamente la sobrecarga de tiempo y recursos tanto para 
tu aplicación como para la base de datos
*/