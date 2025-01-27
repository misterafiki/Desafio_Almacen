export const esAdmin = (req, res, next) => {
    if (!req.roles.includes('Administrador')){ //Hacemos una comprobación rutinaria de si se ha establecido.
        return res.status(500).json({'msg':'No es posible el acceso como Adim.'})
    }
    console.log(req.dniToken + " accediendo como Admin...")
    next()
}

export const esProfe = (req, res, next) => {
    console.log(req.roles)
    if (!req.roles.includes('Profesor')){ 
        return res.status(500).json({'msg':'No es posible el acceso como Usuario.'})
    }
    console.log(req.dniToken + " accediendo como Profesor...")
    next()
}

export const esJefe = (req, res, next) => {
    if (!req.roles.includes('JefeDepartamento')){ 
        return res.status(500).json({'msg':'No es posible el acceso como Adim.'})
    }
    console.log(req.dniToken + " accediendo como Jefe de Departamento...")
    next()
}

export const esDirectivo = (req, res, next) => {
    if (!req.roles.includes('Direccion')){ 
        return res.status(500).json({'msg':'No es posible el acceso como Adim.'})
    }
    console.log(req.dniToken + " accediendo como Direccion...")
    next()
}