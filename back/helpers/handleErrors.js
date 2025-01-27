
export const handleError = (err,res) => {
    console.log(err);
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