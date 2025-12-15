import { getLogFormated } from "Config/constants";
import Logger from "Config/winston";

export const useLogger = (request, auth, endpoint, resource) => {
  const { user } = auth;
  const clientIp = request.ip();

  Logger.info(getLogFormated(user, endpoint, resource), {
    user_id: user?.id,
    ip: clientIp,
  });
};
