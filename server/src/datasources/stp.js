const {RESTDataSource} = require('apollo-datasource-rest');

class StpAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://stp.payroll.dev.myob.com/';
    }

    willSendRequest(request) {
        request.headers.set('Content-Type', '');
        request.headers.set('Authorization', '');
        request.headers.set('x-myobapi-source', '');
        request.headers.set('x-myobapi-resourceid', '');
    }

    async getBusinessById({businessId}) {
        const response = await this.get(`businesses/${businessId}`);
        return this.convertBusinessDTO(response);
    }

    convertBusinessDTO(business) {
        const {data} = business; 
        return {
            id: data.attributes.globalId,
            type: data.type,
            abn: data.attributes.abn            
        }
    }
}

module.exports = StpAPI;