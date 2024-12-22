const http = require('http');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const params = new URLSearchParams(url.search);

  const numberType = params.get('number');
  const numLen = parseInt(params.get('numlen'));
  const qty = parseInt(params.get('qty'));

  if (!numberType || !numLen || !qty) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Missing required parameters' }));
    return;
  }

  if (numberType !== 'float' && numberType !== 'integer') {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid number type. Allowed values: float, integer' }));
    return;
  }

  res.setHeader('Content-Type', 'application/json');

  const generateNumber = () => {
    if (numberType === 'float') {
      const min = Math.pow(10, numLen - 1); 
      const max = Math.pow(10, numLen) - 1; 
      return Math.random() * (max - min) + min; 
    } else if (numberType === 'integer') {
      const min = Math.pow(10, numLen - 1); 
      const max = Math.pow(10, numLen) - 1;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };

  const numbers = [];
  for (let i = 0; i < qty; i++) {
    numbers.push(generateNumber());
  }

  res.end(JSON.stringify(numbers));
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});