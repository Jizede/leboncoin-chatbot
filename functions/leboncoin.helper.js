// @flow

const leboncoin = require('leboncoin-api');

function getDialogflowParameters(agent) {
	const [propertyContract, propertyType, department, zipCode] = [
		agent.parameters.property_contract,
		agent.parameters.property_type,
		agent.parameters.department.replace('-', '_').toLowerCase(),
		agent.parameters.zip_code,
	];

	return {
		propertyContract,
		propertyType,
		department,
		zipCode,
	};
}
exports.getDialogflowParameters = getDialogflowParameters;

function createLeboncoinPromise(params) {
	const request = new leboncoin.Search()
		.setCategory(params.propertyContract)
		.setRegion('ile_de_france')
		.setDepartment(params.department)
		.setLocation([{ zipcode: params.zipCode }])
		.setQuery(params.propertyType)
		.setFilter(leboncoin.FILTERS.ALL);

	return request.run();
}
exports.createLeboncoinPromise = createLeboncoinPromise;

exports.searchLeboncoin = (agent) => {
	const params = getDialogflowParameters(agent);

	return createLeboncoinPromise(params).then((data) => {
		const linkList = [];
		const keys = Object.keys(data.results);

		for (let i = 0; i < keys.length; i += 1) {
			linkList.push(data.results[keys[i]].link);
		}
		linkList.push(`\n ${data.nbResult} resultats ont été trouvés.`);

		return agent.add(linkList.join('\n\n'));
	}).catch(err => agent.add(err));
};
