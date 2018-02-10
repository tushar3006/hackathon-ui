let DataObjectParser = require('dot-object');
let dop = new DataObjectParser('_');
let _ = require('lodash');

const QUERY_FIELDS = require('nconf').get('QUERY_FIELDS').split(',');

let DTOFields = null;

const generateDTOFields = (tableAttributes) => {
	if (DTOFields === null) {
		DTOFields = {};
		for (var key in tableAttributes) {
			if (tableAttributes.hasOwnProperty(key)) {
				let parent = (key.split('_')[0]);
				if (!DTOFields[parent]) {
					DTOFields[parent] = [];
				}
				DTOFields[parent].push(key);
			}
		}
		delete DTOFields.deletedAt;
	}
	return DTOFields;
};

const fieldParser = (Model, fields) => {
	let attributes = Model.tableAttributes;
	delete attributes.deletedAt;
	const DTOFields = generateDTOFields(attributes);
	if (_.isEmpty(fields)) {
		return [];
	}
	let parsedFields = [];
	let queryFields = fields.split(',');
	queryFields.forEach((f) => {
		if (f in DTOFields) {
			parsedFields = _.concat(parsedFields, DTOFields[f]);
		}
	}, this);
	if (parsedFields.length === 0) {
		if (_.includes(queryFields, 'contents')) {
			return [];
		}
		return [];
	}
	return parsedFields;
};

const sortParser = (fieldsString) => {
	if (_.isEmpty(fieldsString)) {
		return [];
	}
	let fields = fieldsString.split(',');
	for (var i = 0; i < fields.length; i++) {
		if (fields[i][0] === '-') {
			fields[i] = fields[i].substring(1) + ' DESC';
		}
	}
	return fields.join(',');
};

const queryParser = (fields) => {
	if (fields === {}) {
		return {};
	}
	let query = {};
	for (var field in fields) {
		if (fields.hasOwnProperty(field)) {
			if (Array.isArray(fields[field])) {
				throw new Error('Duplicate queries not allowed');
			}
			if (_.includes(QUERY_FIELDS, field)) {
				query[field] = fields[field];
			}
		}
	}
	return query;
};

const convertToDTO = (flatObject) => {
	let jsonResult = dop.object(flatObject.toJSON());
	if (!jsonResult.contents.appliedOffers) {
		delete jsonResult.contents.appliedOffers;
	}
	if (!jsonResult.contents.additionalCharges) {
		delete jsonResult.contents.additionalCharges;
	}
	if (Object.keys(jsonResult.contents).length === 0) {
		delete jsonResult.contents;
	}
	return jsonResult;
};

const convertFromDTO = (DTO) => {
	let dto = _.cloneDeep(DTO);
	let items = [], paymentDetails = [], appliedOffers = [], additionalCharges= [];
	if (dto.contents && dto.contents.items) {
		//Separate the items object and delete from the root order object
		items = dto.contents.items;
		delete dto.contents.items;
	}
	if (dto.paymentDetails) {
		//Separate the paymentDetails object and delete from the root order object
		paymentDetails = dto.paymentDetails;
		delete dto.paymentDetails;
	}
	if (dto.contents && dto.contents.appliedOffers) {
		//Separate the items object and delete from the root order object
		appliedOffers = dto.contents.appliedOffers;
		delete dto.contents.appliedOffers;
	}
	if (dto.contents && dto.contents.additionalCharges) {
		//Separate the items object and delete from the root order object
		additionalCharges = dto.contents.additionalCharges;
		delete dto.contents.additionalCharges;
	}
	let flatOrder = dop.dot(dto);
	flatOrder.paymentDetails = paymentDetails;
	flatOrder['contents_items'] = items;
	flatOrder['contents_appliedOffers'] = appliedOffers;
	flatOrder['contents_additionalCharges'] = additionalCharges;
	return flatOrder;
};

module.exports = {
	generateDTOFields : generateDTOFields,
	fieldParser : fieldParser,
	sortParser : sortParser,
	queryParser : queryParser,
	convertToDTO : convertToDTO,
	convertFromDTO : convertFromDTO
};