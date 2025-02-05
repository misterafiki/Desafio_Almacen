import {Sequelize} from "sequelize";

export const handleError = (err,res) => {

    if (err.message === 'El correo electrónico ya está en uso') {
        return res.status(400).json({
            'msg': 'El correo electrónico ya está en uso',
            status: false
        });
    };
    if (err.message == 'No se encontraron tareas') {
        return res.status(404).json({
            'msg': 'No se encontraron tareas',
            status: false
        });
    };
    if (err.message == 'Usuario no encontrado') {
        return res.status(404).json({
            'msg': 'Usuario no encontrado',
            status: false
        });
    };
    if (err.message == 'Rol no encontrado') {
        return res.status(404).json({
            'msg': 'Rol no encontrado',
            status: false
        });
    };
    res.status(500).json({
        'msg': 'Error interno del servidor',
        status:false
    });
}

export const handleSuccess = (res, statusCode, message, data = null) => {
    switch (statusCode) {
        case 200:
            // Respuesta con exitosa 200 OK
            return res.status(200).json({
                'msg': message,
                'status': true,
                'data': data || null
            });

        case 201:
            // Respuesta con exitosa 201 Creado
            return res.status(201).json({
                'msg': message,
                'status': true,
                'data': data || null
            });
        
        case 202:
            // Respuesta con exitosa 202 Procesando
            return res.status(202).json({
                'msg': message,
                'status': true,
                'data': data || null
            });
        
        case 100:
            // Respuesta con exitosa 100 Continua
            return res.status(100).json({
                'msg': message,
                'status': true
            });
        
        default:
            // Si el statusCode no es ninguno de los anteriores, puedes manejarlo como desees.
            return res.status(418).json({
                'msg': 'Código de estado no reconocido, soy una tetera.',
                'status': false
            });

    }
};
