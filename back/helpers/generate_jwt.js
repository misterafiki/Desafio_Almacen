import jwt from 'jsonwebtoken'


export const generarJWT = (uid = '') => {
    //En el token podemos hacer que viaje (en el payload) el id de ese usuario. No supone un gran fallo de seguridad y nos permite sacar la información del mismo en los middleware.
    console.log("UID:" + uid)
    let token = jwt.sign({ uid }, process.env.SECRETORPRIVATEKEY, {
        expiresIn: '4h' 
      });
    return token;
}


export const generarJWT_Roles = (uid = '', roles = []) => {
    //En el token podemos hacer que viaje (en el payload) el id de ese usuario. No supone un gran fallo de seguridad y nos permite sacar la información del mismo en los middleware.
    console.log("UID:" + uid)
    console.log("ROLES:" + roles)
    let token = jwt.sign({ uid, roles }, process.env.SECRETORPRIVATEKEY, {
        expiresIn: '4h' 
      });
    return token;
}


/*
Si proporcionas un número al parámetro expiresIn sin especificar una unidad de tiempo como 'h' (horas), jsonwebtoken interpretará ese número como segundos. Por lo tanto, si pones expiresIn: 3600, el token expirará después de una hora.

Es importante recordar que los valores para expiresIn pueden ser números que representan segundos, o cadenas de texto que representan períodos de tiempo. Las cadenas de texto pueden incluir las siguientes combinaciones de letras y números:

's' para segundos
'm' para minutos
'h' para horas
'd' para días
'w' para semanas
'M' para meses
'y' para años
*/

/*

Para revocar tokens no hay instruccions establecidas. Se pueden usar técnicas de programación para saber aquellos que están revocados. Ejemplo:

let blacklistedTokens = [];

const revokeToken = (token) => {
    blacklistedTokens.push(token);
 }

 const verifyToken = (token) => {
    if (blacklistedTokens.includes(token)) {
        throw new Error('Token has been revoked');
    }

    // Verificar el token...
}
*/