"use strict";
import { MongoClient } from 'mongodb'
import Config from '@ioc:Adonis/Core/Config'

const config = Config.get('mongodb')
const client = new MongoClient(config.connectionString)


// const mongoose = require("mongoose");
// const Brokher = require("../../config/brokher");

// const { Cache } = use("App/Services/CacheService");
// const Event = require("Event");

// const ExcelJS = use("App/Helpers/Exceljs");
// const dayjs = require("dayjs");

// const Env = require("Env");
// const Audit = use("App/Models/Audit");
// const InternalServerException = use("App/Exceptions/InternalServerException");
// const NotFoundException = use("App/Exceptions/NotFoundException");

// const CUSTOMLABELS = {
//   data: "data",
//   totalPages: "lastPage",
//   limit: 'perPage',
//   total: "total"
// };

class BaseMongoDBRepository {

  /**
   *
   * @param { object } [payload] - a object of log to register via rabbitmq
   * @returns { null }
   */
  static async registar(doc, payload) {

    await client.connect()
    const db = client.db()
    const usersCollection = db.collection(doc)

    // // Para inserir um novo documento
    await usersCollection.insertOne(payload)

    // // Para buscar documentos
    // const users = await usersCollection.find({}).toArray()
    // console.log(users);

    await client.close()

    return
    // this.brokher = await Brokher.connect()

    // payload.created_at = new Date();
    // Event.fire("cache:clear");

    // return this.brokher
    //   .setExchange("logs")
    //   .setRoutingKey("normal")
    //   .publish(payload);
  }

  // static async getAllRecords(
  //   page = 1,
  //   perPage = 10,
  //   where = { search: null, start: null, end: null }
  // ) {
  //   try {
  //     let start = new Date(where.start).getTime();
  //     let end = new Date(where.end).getTime();

  //     if (start > end) {
  //       throw new NotFoundException(
  //         "Data de inicio não pode ser maior que data final!"
  //       );
  //     }
  //   } catch (error) {
  //     throw new NotFoundException(
  //       "Data de inicio não pode ser maior que data final!"
  //     );
  //   }

  //   const findWhere = LoggerRepository.serializeWhere(where);

  //   try {
  //     const availableLogsCache = await Cache(
  //       `logs-page-${page}-perPage-${perPage}-where-${JSON.stringify(
  //         findWhere
  //       )}`,
  //       () => {
  //         return LoggerRepository.query(async () => {
  //           const options = {
  //             sort: { created_at: -1 },
  //             page: page,
  //             limit: perPage,
  //             customLabels: CUSTOMLABELS,
  //           };

  //           const logsFinded = await Audit
  //           .paginate(findWhere, options, function (err, result) {
  //             return result
  //           });

  //           const { data, ...paginator } = logsFinded;
  //           const mappedData = data.map((log) => ({
  //             ...log["_doc"],
  //             created_at: dayjs(log["_doc"].created_at).format(
  //               "DD/MM/YYYY HH:mm:ss"
  //             ),
  //           }));

  //           return { ...paginator, data: mappedData }
  //         });
  //       }
  //     );

  //     return availableLogsCache;
  //   } catch {
  //     throw new InternalServerException();
  //   }
  // }

  // static async getAllrecordsNoPaginated(
  //   where = { search: null, start: null, end: null }
  // ) {
  //   try {
  //     let start = new Date(where.start).getTime();
  //     let end = new Date(where.end).getTime();

  //     if (start > end) {
  //       throw new NotFoundException(
  //         "Data de inicio não pode ser maior que data final!"
  //       );
  //     }
  //   } catch (error) {
  //     throw new NotFoundException(
  //       "Data de inicio não pode ser maior que data final!"
  //     );
  //   }
  //   try {
  //     const findWhere = LoggerRepository.serializeWhere(where);
  //     return LoggerRepository.query(async () => {
  //       const logs = await Audit.find(findWhere).sort([["created_at", -1]]);
  //       return logs;
  //     });

  //   } catch (error) {
  //     throw new InternalServerException(
  //       "Ocorreu um erro ao listar, tente mais tarde!"
  //     );
  //   }
  // }

  // static async findedById(id) {
  //   return LoggerRepository.query(async () => {
  //     const logs = await Audit.find({ _id: id });
  //     return logs;
  //   });
  // }

  static async query(callback) {
    // return await client.connect(Env.get("MONGODB_URL"), {
    // useNewUrlParser: true,
    // reconnectTries: Number.MAX_VALUE,
    // reconnectInterval: 500,
    // connectTimeoutMS: 10000,
    // })
    // .then(async () => {
    // const result = await callback();
    // await LoggerRepository.close();
    // return result;
    // });
  }

  async userActivities(userId, options) {
    // const findWhere = {
    //   "user.id": userId,
    // };

    //   options.page = parseInt(options.page);
    //   options.perPage = parseInt(options.perPage);

    //   return LoggerRepository.query(async () => {
    // const skip = options.page * options.perPage - options.perPage;
    // const totalRecords = [] //await Audit.find(findWhere).countDocuments();
    // const logs = [] //await Audit.find(findWhere)
    //       .select({
    //         event: true,
    //         _id: false,
    //         ip: true,
    //         success: true,
    //         created_at: true,
    //         auditable: true,
    //         city: true,
    //         isp: true,
    //       })
    //       .sort([["created_at", -1]])
    //       .skip(skip)
    //       .limit(options.perPage)
    //       .then((logs) =>
    //         logs.map((log) => ({
    //           ...log["_doc"],
    //           created_at: dayjs(log.created_at).format("DD/MM/YYYY HH:mm:ss"),
    //         }))
    //       );

    // return {
    //   page: options.page,
    //   lastPage: options.page === 1 ? 1 : options.page - 1,
    //   perPage: options.perPage,
    //   total: totalRecords,
    //   data: logs,
    // };
    //   });
  }

  // static serializeWhere(where) {
  //   const findWhere = {};

  //   if (where.search) {
  //     findWhere["$or"] = [
  //       {
  //         ip: {
  //           $regex: where.search,
  //         },
  //       },
  //       {
  //         "user.name": {
  //           $regex: where.search,
  //         },
  //       },
  //       {
  //         "user.email": {
  //           $regex: where.search,
  //         },
  //       },
  //       {
  //         event: {
  //           $regex: String(where.search).toUpperCase(),
  //         },
  //       },
  //     ];
  //   }

  //   if (where.start) {
  //     findWhere.created_at = {
  //       $gte: new Date(where.start).toISOString(),
  //     };
  //   }

  //   if (where.start === where.end && where.start != null) {
  //     findWhere.created_at = {
  //       $gte: new Date(where.start).toISOString(),
  //       $lt: dayjs(where.end).add(1, "day"),
  //     };
  //   } else {
  //     if (where.end && (where.end > where.start || !where.start)) {
  //       findWhere.created_at = {
  //         ...findWhere.created_at,
  //         $lt: dayjs(where.end).add(1, "day"),
  //       };
  //     }
  //   }

  //   return findWhere;
  // }

  static async close() {
    await client.close();
  }

  // static async exportData(data, type) {
  //   try {
  //     if (type == "xlsx") {
  //       var totalRecords = await data.map((element) => {
  //         return {
  //           id: element._id,
  //           user: element.user ? element.user.name : "",
  //           email: element.user ? element.user.email : "",
  //           ip: element.ip,
  //           url: element.url,
  //           event: element.event,
  //           auditable: element.auditable,
  //           success: element.success == true ? "Sim" : "Não",
  //           message: element.message,
  //           created_at: dayjs(element.created_at).format("DD/MM/YYYY HH:mm"),
  //           old_data: element.old_data,
  //           new_data: element.new_data,
  //         };
  //       });

  //       const header = [
  //         { header: "ID", key: "id" },
  //         { header: "UTILIZADOR", key: "user" },
  //         { header: "EMAIL", key: "email" },
  //         { header: "IP", key: "ip" },
  //         { header: "URL", key: "url" },
  //         { header: "EVENTO", key: "event" },
  //         { header: "TABELA", key: "auditable" },
  //         { header: "SUCESSO", key: "success" },
  //         { header: "MENSAGEM", key: "message" },
  //         { header: "CRIAÇÃO", key: "created_at" },
  //         { header: "DADOS ANTIGOS", key: "old_data" },
  //         { header: "DADOS NOVOS", key: "new_data" },
  //       ];

  //       const resultExport = await ExcelJS.exportXlsx(header, totalRecords);
  //       return resultExport;
  //     }
  //     throw new NotFoundException("Formato de documento não encontrado!");
  //   } catch (error) {
  //     throw new InternalServerException(
  //       error.message || "Ocorreu um erro ao exportar, tente mais tarde!"
  //     );
  //   }
  // }
}

module.exports = BaseMongoDBRepository;
