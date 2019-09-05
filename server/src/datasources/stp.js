const {RESTDataSource} = require('apollo-datasource-rest');

class StpAPI extends RESTDataSource {
    
    constructor() {
        super();
        this.baseURL = 'https://stp.payroll.dev.myob.com/';
    }

    willSendRequest(request) {
      const headers = this.context.headers;
      console.log(headers);
      request.headers.set('Content-Type', headers['content-type']);
      request.headers.set('Authorization', headers.authorization);
      request.headers.set('x-myobapi-source', headers['x-myobapi-source']);
      request.headers.set('x-myobapi-resourceid', headers['x-myobapi-resourceid']);
    }

    async getBusinessById({businessId}) {
        const response = await this.get(`businesses/${businessId}`)
                                  .catch(error => console.log(error));
        return this.convertBusinessDTO(response);
    }

    convertBusinessDTO(response) {
        const {data} = response;
        return {
            id: data.attributes.globalId,
            type: data.type,
            abn: data.attributes.abn
        }
    }

    async getPayruns({businessId, startDate, endDate}) {
        const response = await this.get(`businesses/${businessId}/payruns?startDate=${startDate}&endDate=${endDate}`)
            .catch(error => console.log(error));

        return this.convertPayrunsDTO(response);
    }

    convertPayrunsDTO(response) {
        const {data} = response;

        return {
          id: data.id,
          type: data.type,
          submissionLogs: data.attributes.submissionLogs  // submission logs array
        };
    }
}

module.exports = StpAPI;
