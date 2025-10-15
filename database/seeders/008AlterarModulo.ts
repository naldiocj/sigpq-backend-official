import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run() {


    await Database.from('modulos').where('sigla', 'SIGE').update({ sigla: 'SIGEF', img: "./../../../assets/img/User Manual.png" })

    const modulos = [
      {
        sigla: 'SIGPQ',
        img: "./../../../assets/img/Admin Settings Male.png",
      },
      {
        sigla: 'PIPNA',
        img: "./../../../assets/img/Police.png",
      },
      {
        sigla: "SIGT",
        img: "./../../../assets/img/Public Transportation.png",
      },
      {
        sigla: "SIGPJ",
        img: "./../../../assets/img/Scales.png",
      },
      {
        sigla: "SIGIAC",
        img: "./../../../assets/img/Detective.png",
      },
      {
        sigla: "PA",
        img: "./../../../assets/img/Administrator Male.png",
      }
    ]


    for (let item of modulos) {
      await Database.from('modulos').where('sigla', item.sigla).update({ img: item.img })
    }

  }
}
