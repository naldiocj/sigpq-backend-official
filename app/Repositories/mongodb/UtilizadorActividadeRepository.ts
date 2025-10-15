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

const CUSTOMLABELS = {
  data: "data",
  totalPages: "lastPage",
  limit: 'perPage',
  total: "total"
};

class UtilizadorActividadeRepository {

  /**
   *
   * @param { object } [payload] - a object of log to register via rabbitmq
   * @returns { null }
   */
  static async registar(payload) {
    await client.connect()
    const db = client.db()
    const usersCollection = db.collection('utilizadoractividades')
    // Para inserir um novo documento
    await usersCollection.insertOne(payload) 
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
  
}

module.exports = UtilizadorActividadeRepository;
