import Route from "@ioc:Adonis/Core/Route";
import HttpMetrics from "App/Middleware/HttpMetrics";
import v1 from "./api/v1";

Route.get("/", async () => {
  return { hello: "Hi,the backend is running ..." };
});

v1(Route);
Route.get("/metrics", async (ctx) => {
  return new HttpMetrics().metrics(ctx);
});
