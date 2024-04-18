function basicAuthMiddleware (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    logger.error('Error Unauthorized user whithout  credentials');
    return res.status(401).send('Unauthorized');
  }
  
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [email, password] = credentials.split(':');
  
  logger.error(`Error email / pass ${credentials}`)
  
  // const userRole = getuserRole()
  // IF userRole IS NOT ADMIN Or JEST
  
  // if (email !== getUserEmail || password !== getUserPass) { // INSERT LOGIC TO CALL USER AND VERIFY IF IS OK
  //   return res.status(401).send('Unauthorized');
  // }
  // const userAllowedEndpoints = [ // endpoints a serem criados
  //   'PATCH /clientes/:id', // Atualização de um cliente (próprios dados)
  //   'GET /livros', // Consultar os livros cadastrados
  //   'GET /livros/:id', // Consultar um livro em específico
  //   'GET /autores/:id/livros', // Consultar os livros cadastrados de um autor em específico
  //   'POST /avaliacoes', // Cadastrar uma avaliação
  //   'POST /vendas', // Cadastrar uma venda
  //   'GET /clientes/:id/vendas' // Consultar as vendas de um cliente em específico (próprio usuário)
  // ];

  // const requestedEndpoint = `${req.method} ${req.baseUrl}${req.path}`;
  // if (!userAllowedEndpoints.includes(requestedEndpoint)) {
  //   return res.status(403).send('Forbidden');
  // }


  next();
};

export default basicAuthMiddleware
