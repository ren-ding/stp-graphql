const {RESTDataSource} = require('apollo-datasource-rest');

class StpAPI extends RESTDataSource {
    
    constructor({store}) {
        super();
        this.baseURL = 'https://stp.payroll.dev.myob.com/';
        this.headers = store.headers;
    }

    willSendRequest(request) {
      request.headers.set('Content-Type', this.headers['content-type']);
      request.headers.set('Authorization', this.headers.authorization);
      request.headers.set('x-myobapi-source', this.headers['x-myobapi-source']);
      request.headers.set('x-myobapi-resourceid', this.headers['x-myobapi-resourceid']);
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
