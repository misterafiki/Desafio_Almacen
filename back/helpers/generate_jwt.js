import jwt from 'jsonwebtoken'

export const generateJWT = (uid = '') => {

    let token = jwt.sign({ uid }, process.env.SECRETORPRIVATEKEY, {
        expiresIn: '4h' 
      });
    return token;
}

export const generateJWT_Roles = (user) => {
    const tokenData = {
        uid: user.id,
        roles: user.User_roles.map(userRole => userRole.Rol.name), 
    };
    console.log(user)
    let token = jwt.sign(tokenData, process.env.SECRETORPRIVATEKEY, {
        expiresIn: '4h' 
      });
    return token;
}