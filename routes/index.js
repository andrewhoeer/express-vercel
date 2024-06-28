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

r.post('/mock/api/post', (req, res) => {
  const body = req.body;
  res.status(200).json({ success: true, body });
});

module.exports = r;
