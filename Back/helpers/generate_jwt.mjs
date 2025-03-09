import jwt from 'jsonwebtoken'


export const generarJWT = (uid = '') => {
    //En el token podemos hacer que viaje (en el payload) el id de ese usuario. No supone un gran fallo de seguridad y nos permite sacar la información del mismo en los middleware.
    console.log("UID:" + uid)
    let token = jwt.sign({ uid }, process.env.SECRETORPRIVATEKEY, {
        expiresIn: '12h' 
      });
    return token;
}

export const generarJWT_Roles = (uid = '', roles = []) => {
  //En el token podemos hacer que viaje (en el payload) el id de ese usuario. No supone un gran fallo de seguridad y nos permite sacar la información del mismo en los middleware.
  console.log("UID:" + uid)
  let token = jwt.sign({ uid, roles }, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '4h' 
    });
  return token;
}