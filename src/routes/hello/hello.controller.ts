import express from 'express';
import { HelloHandler } from './hello.handler';
import { requiresAuthentication } from '../../middlewares/authentication';

const router = express.Router();

router.get('/', HelloHandler.hello);
router.get('/error', HelloHandler.reject);
router.get('/pingAuth', requiresAuthentication, HelloHandler.pingAuth);

export default router;
