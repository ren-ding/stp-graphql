const {RESTDataSource} = require('apollo-datasource-rest');

class UserAPI extends RESTDataSource {
    
    constructor() {
        super();
        this.baseURL = 'https://stp.payroll.dev.myob.com/';
    }

    willSendRequest(request) {
      const headers = this.context.headers;
      request.headers.set('Content-Type', headers['content-type']);
      request.headers.set('Authorization', headers.authorization);
      request.headers.set('x-myobapi-source', headers['x-myobapi-source']);
      request.headers.set('x-myobapi-resourceid', headers['x-myobapi-resourceid']);
    }

    async getUser({businessId}) {
        const response = await this.get(`businesses/${businessId}/users`)
                                  .catch(error => console.log(error));
        return this.convertGetUserDTO(response);
    }

    convertGetUserDTO(response) {
        const {data} = response;

        return {
          id: data.id,
          type: data.type,
          userId: data.attributes.userId,
          globalId: data.attributes.globalId,
          agentAbn: data.attributes.agentAbn,
          agentNumber: data.attributes.agentNumber
        };
    }
  }

module.exports = UserAPI;
