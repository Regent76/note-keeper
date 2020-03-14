import response from '../../../services/response';

function health(req, res) {
  return response.code200(res, { test: 'ok' });
}

export { health };
