const brand = {};
const outletSettings = {};

class BrandService {
    constructor(Http, AppConstants, $window, STRINGS, BrandData) {
        'ngInject';

        this.Http = Http;     
    }

   

    updateOrderOnlineManager(data){
            return this.Http.sendRequest('/orders/updateOrderOnline', 'POST' , {brandData : data})
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }
    
    getSettings(brandId){

            return this.Http.sendRequest('/orders/getBrandSettings?brandId=' + brandId, 'GET')
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }


  
}

export default BrandService;
