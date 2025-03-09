
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config()

export let conexion;

if (!conexion) {
    console.log('Conexión establecida correctamente.');
    conexion = new Sequelize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
        pool: {
            max: parseInt(process.env.DB_MAXCONNECTIONS), //Número máximo de conexiones en el grupo de conexiones.
            min: 1, //Número mínimo de conexiones en el grupo de conexiones.
            acquire: 30000, //Tiempo máximo, en milisegundos, que un grupo de conexiones intentará adquirir una conexión antes de lanzar un error.
            idle: 10000, //Tiempo máximo, en milisegundos, que una conexión puede estar inactiva antes de ser liberada.
        },
        logging: console.log //Habilita el registro de consultas, las consultas se lanzan por consola.
    });
}
    
        //Cierra el pool al recibir SIGINT
        process.on('SIGINT', async () => {
            try {
                await this.conexion.close().then(() => { //Espera a que se cierre la conexión
                    console.log('Conexión cerrada correctamente.');
                    process.exit(0); //Salida exitosa
                })
                .catch((error) => {
                    console.error('Error al cerrar la conexión:', error);
                    process.exit(1); //Error en la salida.
                });
                console.log('Conexión cerrada correctamente.');
            } catch (error) {
                console.error('No se pudo cerrar la conexión a la base de datos:', error);
            }
        });
  

export default conexion
