const userCrud = require('./crud/userCrud');
// const db = require('./database/database');
 
async function main() {
    //     try {
    console.log(await userCrud.listarUm(2));
    //         console.log(await userCrud.listarTodos());
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    userCrud.mysql2Destroy();
}

main();
