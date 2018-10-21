const chai = require('chai');
const index = require('./../index');
const leboncoinHelper = require('./../leboncoin.helper');

describe('Leboncoin Chatbot', () => {
	describe('#Webhook Handler', () => {
		it('should handle the webhook', () => {
			index.handleConversation(); // Don't know what to test
		});
	});

	describe('#getDialogflowParameters(agent)', () => {
		it('should return a param object', () => {
			const params = leboncoinHelper.getDialogflowParameters();
			const paramsKeys = ['propertyContract', 'propertyType', 'department', 'zipCode'];
			chai.expect(Object.keys(params)).to.equal(paramsKeys);
		});
	});

	describe('#createLeboncoinPromise(params)', () => {
		it('should return a Promise', () => {
			const params = {
				propertyContract: 'locations',
				propertyType: 'appartement',
				department: 'paris',
				zipCode: '75012',
			};
			leboncoinHelper.createLeboncoinPromise(params).then((promise) => {
				chai.expect(typeof promise).to.equal('object');
			});
		});
	});
});
