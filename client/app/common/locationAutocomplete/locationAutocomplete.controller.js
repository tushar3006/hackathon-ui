 	class locationAutocompleteController {
 	    constructor(GeoLocationService, STRINGS) {
 	        'ngInject';
 	        this.STRINGS = STRINGS;
 	        this.GeoLocationService = GeoLocationService;
 	    }

 	    getLocationSuggestions(val) {
 	        this.loading = true;
 	        return this.GeoLocationService.getSuggestions(this.city, val).then((suggestions) => {
 	            this.loading = false;
 	            return suggestions.slice(0, 5);

 	        }, (error) => {

 	            this.loading = false;
 	            // console.log(error)
 	            throw {
 	                message: error
 	            };
 	        });
 	    }

 	    onSelect(item, model, label) {
 	        this.clear();
 	        this.onSelectAddress({
 	            item: item,
 	            model: model,
 	            label: label
 	        });
 	    }

 	    clear() {
 	        this.selectedAddress = null;
 	    }
 	}

 	export default locationAutocompleteController;
