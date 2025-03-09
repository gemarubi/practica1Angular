const bcrypt = require('bcrypt');
const { genUsers } = require('../factories/factoriaUser.cjs');
const Conexion = require('../database/ConexionFactoria.cjs');
'use strict';
let conexion = new Conexion()
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('rols', [{
      id: 1,
      descripcion: "Usuario"
    }, {
      id: 2,
      descripcion: "Administrador"
    }

    ]);
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    pass = bcrypt.hashSync("1234", salt)
    await queryInterface.bulkInsert('usuarios', [{

      id: 1,
      nombre: "Admin",
      correo: "admin@node.com",
      pass: pass
    }

    ]);
    await queryInterface.bulkInsert('rol_asignados', [{

      id: 1,
      id_rol: 2,
      id_usuario: 1,

    }

    ]);

    const usuariosGenerados = await genUsers(4);
    usuariosGenerados.forEach(async element => {
      const result = await conexion.registrarUsuario(element)
      console.log(result)
    });


    //await queryInterface.bulkInsert('usuarios', usuariosGenerados, {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
