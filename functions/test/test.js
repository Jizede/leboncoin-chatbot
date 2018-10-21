const chai = require('chai');
const leboncoinHelper = require('./../leboncoin.helper');

describe('Leboncoin Helper', () => {
	describe('#getDialogflowParameters(agent)', () => {
		it('should return a param object', () => {
			const params = leboncoinHelper.getDialogflowParameters();
			const paramsKeys = ['propertyContract', 'propertyType', 'department', 'zipCode'];
			chai.expect(Object.keys(params)).to.equal(paramsKeys);
		});
	});

	describe('#createLeboncoinPromise(params)', () => {
		it('should return a Promise', async () => {
			const params = {
				propertyContract: 'locations',
				propertyType: 'appartement',
				department: 'paris',
				zipCode: '75012',
			};
			const promise = await leboncoinHelper.createLeboncoinPromise(params);
			chai.expect(typeof promise).to.equal('object');
		});
	});
});
