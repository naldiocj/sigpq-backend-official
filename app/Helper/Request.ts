export default class RequestHelper {
    constructor() {
    }

    public async replaceNullWithNull(obj: any) {
      for (const key in obj) {
        if (obj[key] === 'null') {
          obj[key] = null;
        } else if (typeof obj[key] === 'object') {
          this.replaceNullWithNull(obj[key]);
        }
      }
      return obj;
    }
}