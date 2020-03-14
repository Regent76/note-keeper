export default {
  code200: (res, data) => {
    return res.status(200).json(data);
  },
  code201: (res, data) => {
    return res.status(201).json(data);
  },
  code204: res => {
    return res.status(204).send();
  },
  code400: (res, message) => {
    return res.status(400).send({
      name: 'Bad Request',
      message: message
    });
  },
  code401: (res, message) => {
    return res.status(401).send({
      name: 'Unauthorized',
      message: message
    });
  },
  code403: (res, message) => {
    return res.status(403).send({
      name: 'Forbidden',
      message: message
    });
  },
  code404: (res, message) => {
    return res.status(404).send({
      name: 'Not found',
      message: message
    });
  },
  code422: (res, message, name = 'Data validation failed') => {
    return res.status(422).send({
      name: name,
      message: message
    });
  },
  code500: (res, err) => {
    return res.status(500).send({
      name: err.name || 'Error',
      message: err.message || 'Some error occurred'
    });
  }
};
