import Usuario from './usuario.mjs'
import Rol from './rol.mjs'
import Rol_Asignado from './rol_asignado.mjs';
import Tarea from './tarea.mjs'
Usuario.hasMany(Rol_Asignado, 
    { as: 'RolesdeUsuario', 
     foreignKey: 'id_usuario' 
});

Rol.hasMany(Rol_Asignado,
     { as: 'UsuarioConRoles', 
    foreignKey: 'id_rol'
 });

 Rol_Asignado.belongsTo(Usuario, 
    { as: 'RolAsignadoUs', 
    foreignKey: 'id_usuario' });
 Rol_Asignado.belongsTo(Rol,
    { as: 'RolAsignadoRol',
      foreignKey:'id_rol'
 })
 Tarea.belongsTo(Usuario, { as: 'user', foreignKey: 'id_usuario' });
 Usuario.hasMany(Tarea,{
      as: 'tareasdeUsuario',
       foreignKey: 'id_usuario'
 })
 export {Usuario, Rol_Asignado, Rol, Tarea}