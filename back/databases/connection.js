import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()

let db;

if (!db) {
    console.log('Conexión establecida correctamente.');
    db = new Sequelize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
        pool: {
            max: parseInt(process.env.DB_MAXCONNECTIONS),
            min: 1,
            acquire: 30000,
            idle: 10000,
        },
        define: {
            timestamps: true,
            underscored: true,
            paranoid: true,
        },
        logging: console.log
    });
}

process.on('SIGINT', async() => {
    try {
        await db.close().then(() => {
            console.log('Conexión cerrada correctamente.');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Error al cerrar la conexión:', error);
            process.exit(1);
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