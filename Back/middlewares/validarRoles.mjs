export const esAdmin = (req, res, next) => {
    if (!req.roles.includes('Administrador')){ //Hacemos una comprobación rutinaria de si se ha establecido.
        return res.status(500).json({'msg':'No es posible el acceso como admin.'})
    }
    console.log(req.idToken + " accediendo como admin...")
    next()
}

export const esUsuario = (req, res, next) => {
    console.log(req.roles)
    if (!req.roles.includes('Usuario')){ //Hacemos una comprobación rutinaria de si se ha establecido.
        return res.status(500).json({'msg':'No es posible el acceso como usuario.'})
    }
    console.log(req.idToken + " accediendo como usuario...")
    next()
}

