
const mysql =require('mysql2');

const { Sequelize, QueryTypes, Op } =require('sequelize'); 
const { INSERT } = require('sequelize/lib/query-types');


class Conexion{
    
    constructor() {
        this.db = new Sequelize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect:process.env.DB_DIALECT, /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
             }
          });

          process.on('SIGINT', () => {
            this.desconectar()
        });
    }
        
   
    desconectar = async () => {
        try {
            await this.db.close().then(() => { //Espera a que se cierre la conexión
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
    }
    registrarUsuario = async(usuario,rol=1) => {
        // usuario=new Usuario(usuario);
          let resultado;
          let maxId;
          try {
          
          resultado=await this.db.query('INSERT INTO usuarios VALUES (?,?,?,?)', [usuario.id,usuario.nombre, usuario.correo, usuario.pass]);
        
          maxId = await this.db.query('SELECT MAX(id) FROM usuarios')
          usuario.id=maxId[0].dataValues.maxId
          
          resultado = await this.db.query('INSERT INTO rols_asignados VALUES (?,?)', [rol,usuario.id]);
            console.log(resultado)
          } catch (error) {
             // resultado=error.errors[0].message
              console.log(error)
              throw error;
             
          }
          return resultado;
      }
}
module.exports = Conexion;
 