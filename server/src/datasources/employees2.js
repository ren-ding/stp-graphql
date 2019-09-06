const {RESTDataSource} = require('apollo-datasource-rest');

class Employees2API extends RESTDataSource {
    
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

    async listEmployees2({businessId, year}) {
        const response = await this.get(`businesses/${businessId}/employees2?year=${year}`)
                                  .catch(error => console.log(error));
        return this.convertListEmployeesDTO(response);
    }

    convertListEmployeesDTO(response) {
        const {data} = response;

        return {
          id: data.id,
          type: data.type,
          payrunId: data.attributes.payrunId,
          employees: data.attributes.employees
        };
    }
  }

module.exports = Employees2API;
