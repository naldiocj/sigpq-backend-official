import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import Permission from 'App/Models/Permission'
import RolePermission from 'App/Models/RolePermission'
import Modulo from 'App/Models/Modulo'

export default class extends BaseSeeder {
  public async run() {
    // Lista de siglas
    const siglas = ['SIGT', 'PA', 'PIPNA', 'SIGAE', 'SIGPJ'];

    // Iterar sobre cada sigla
    for (const sigla of siglas) {
      const modulo = await Modulo.findBy('sigla', sigla);

      const root = await Role.create({
        // modulo_id: modulo?.id,
        // user_id: 1,
        nome: 'Root',
        name: 'Root',
        descricao: 'Criado automaticamente pelo sistema.',
      });

      const allPermission = await Permission.all();

      for (const item of allPermission) {
        await RolePermission.create({ role_id: root.id, permission_id: item.id })
      }

      const admin = await Role.create({
        modulo_id: modulo?.id,
        user_id: 1,
        nome: 'Administrador',
        name: 'admin',
        descricao: 'Criado automaticamente pelo sistema.',
      })

      for (const item of allPermission) {
        await RolePermission.create({ role_id: admin.id, permission_id: item.id })
      }

      // Operador normal
      await Role.create({
        modulo_id: modulo?.id,
        user_id: 1,
        nome: 'Operador',
        name: 'operador',
        descricao: 'Criado automaticamente pelo sistema.',
      });
    }
  }
}