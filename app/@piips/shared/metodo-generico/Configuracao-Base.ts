

import Application from '@ioc:Adonis/Core/Application'
const baseUrl = Application.publicPath('./../')
const baseUrlFile = baseUrl + 'app/@piips/files'

module.exports = {
    baseUrl,
    baseUrlFile
}
