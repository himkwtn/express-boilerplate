import express from 'express';
import { HelloHandler } from './hello.handler';

const router = express.Router();

router.get('/', HelloHandler.hello);
router.get('/error', HelloHandler.reject);

export default router;
