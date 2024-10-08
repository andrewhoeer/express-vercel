const { Router } = require('express');
const { SuccessResponseObject } = require('../common/http');
const demo = require('./demo.route');

const r = Router();

r.use('/demo', demo);

r.get('/', (req, res) => res.json(new SuccessResponseObject('express vercel boiler plate')));

r.get('/mock/api/get', (req, res) => {
  const data = [
    { id: '0', title: 'content1', description: 'description of content1' },
    { id: '1', title: 'content2', description: 'description of content2' },
    { id: '2', title: 'content3', description: 'description of content3' },
    { id: '3', title: 'content4', description: 'description of content4' },
    { id: '4', title: 'content5', description: 'description of content6' },
  ];
  res.status(200).json({ success: true, data });
});

r.get('/mock/api/get-with-param', (req, res) => {
  const requestParams = req.query;
  res.status(200).json({ success: true, query: requestParams });
});

r.post('/mock/api/post', (req, res) => {
  const body = req.body;
  console.log('req', req.headers, req.originalUrl, req.params, req.query, req.body);
  res.status(200).json({ success: true, body });
});

// Hoang API
r.put('/v2/admin/truetest/usage', (req, res) => {
  const headers = req.headers;
  const accountId = headers['x-account-id'];
  if (!accountId) {
    return res.status(400).json({ success: false, message: 'Missing x-account-id header' });
  }
  res.status(200).json({ usedQuota: 3, generatedTestCases: 181 });
});

r.get('/v2/admin/truetest/quota', (req, res) => {
  const accountId = req?.query?.accountId;

  if (!accountId) {
    return res.status(400).json({ error: 'Missing accountId query parameter' });
  }

  const response = {
    "enabled": true,
    "accountId": 101,
    "quota": 9,
    "source": "TRIAL_REQUEST", // RECURLY | TRIAL_REQUEST
    "startDate": "2024-08-08T00:00:00Z",
    "expiryDate": "2025-07-07T00:00:00Z",
    "testcases": 1000
  };
  res.status(200).json({ ...response });
});

module.exports = r;
