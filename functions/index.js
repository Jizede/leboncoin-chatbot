// @flow

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const leboncoinHelper = require('./leboncoin.helper');

exports.handleConversation = functions.https.onRequest((request, response) => {
	const agent = new WebhookClient({ request, response });
	const intentMap = new Map();

	intentMap.set('[Search] Leboncoin', leboncoinHelper.searchLeboncoin);
	agent.handleRequest(intentMap);
});
