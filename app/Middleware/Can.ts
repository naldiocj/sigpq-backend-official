import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Config from '@ioc:Adonis/Core/Config'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

const userRoleTable = Config.get('user_roles', 'user_roles')
const rolePermissionTable = Config.get('role_permissions', 'role_permissions')
const permissionTable = Config.get('permission_table', 'permissions')

/**
 * Permission authentication to check if user has any of the specified permissions
 *
 * Should be called after auth middleware
 */
export default class Can {
  /**
   * Handle request
   */
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    permissionNames: string[]
  ) {

    /**
     * Check if user is logged-in
     */
    const user = await auth.user
    if (!user) {
      return response.unauthorized({ error: 'Must be logged in' })
    }
    let hasRole = await this.checkHasRoles(user, permissionNames)
    if (!hasRole) {
      return response.unauthorized({
        error: `Doesn't have required role(s): ${permissionNames.join(',')}`,
      })
    }
    await next()
  }

  private async checkHasRoles(user: User, permissionNames: Array<string>): Promise<boolean> {

    let rolePlaceHolder = '('
    let placeholders = new Array(permissionNames.length).fill('?')
    rolePlaceHolder += placeholders.join(',')
    rolePlaceHolder += ')'

    let {
      0: {
        0: { permissionCount },
      },
    } = await Database.rawQuery(
      ' SELECT count(ur.id) as permissionCount FROM ' + userRoleTable + ' ur ' +
      ' INNER JOIN ' + rolePermissionTable + ' rp ON rp.role_id = ur.role_id ' +
      ' INNER JOIN ' + permissionTable + ' p ON p.id = rp.permission_id ' +
      ' WHERE ur.user_id =? AND p.name in ' + rolePlaceHolder +
      ' LIMIT 1',
      [user.id, ...permissionNames]
    )
    
    return permissionCount > 0
  }
}
