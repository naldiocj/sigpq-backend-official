const {mysql2} = require('../database/database');

function listarUm(id) {
    return mysql2.from('users').where('id', id).first();
}

function listarTodos() {
    return mysql2.from('users').select('*');
}

function registar(userData) {
    return mysql2('users').insert(userData);
}

function actualizar(id, updatedData) {
    return mysql2('users').where('id', id).update(updatedData);
}

function eliminar(id) {
    return mysql2('users').where('id', id).del();
}

function mysql2Destroy() {
    mysql2.destroy();
}

module.exports = {
    listarUm,
    listarTodos,
    registar,
    actualizar,
    eliminar,
    mysql2Destroy
};
