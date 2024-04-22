import clientRepository  from '../repositories/client.repository.js';

async function basicAuthMiddleware (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    logger.error('Error Unauthorized user whithout  credentials');
    return res.status(401).send('Unauthorized');
  }
  
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [email, password] = credentials.split(':');

  if (email === process.env.JEST_USR && password === process.env.JEST_PASS) {
    next();
    return
  }
  
  const user = await getUser(email, password)

  if (!user || user?.password !== password) {
    return res.status(403).send('Forbidden')
  }

  if (!isEndpointAllowed(req, user.id)) {
    return res.status(403).send('Forbidden');
  }


  next();
};

async function getUser (email) {
  return  clientRepository.getClentByEmail(email)
}

function isEndpointAllowed(req, userId) {
  const requestedEndpoint = `${req.method} ${req.baseUrl}${req.path}`;
  const userAllowedEndpoints = [
    'GET /api/book/',
    'GET /api/book/:id',
    'GET /api/book/info/all',
    'POST /api/book/:id/review',
  ];
  const userPrivateEndpoints = [
    'PUT /api/client/', 
    'POST /api/sale/',
  ]

  if (['POST', 'PUT'].includes(req.method) && userPrivateEndpoints.includes(requestedEndpoint)) {
    const { body } = req
    const userBodyId = body.id || body.clientId
    
    return userBodyId === userId
  }

  const queryId = req.query?.clientId 
  if (requestedEndpoint === 'GET /api/sale/' && queryId) return queryId == userId

  for (const endpoint of userAllowedEndpoints) {
    const regexPattern = endpoint.replace(/:id/g, '\\d+');
    const regex = new RegExp('^' + regexPattern + '$');
    if (regex.test(requestedEndpoint)) {
      return true;
    }
  }
  return false;
}

export default basicAuthMiddleware
