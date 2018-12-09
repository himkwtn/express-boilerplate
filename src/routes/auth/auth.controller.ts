import express from 'express';
import { AuthHandler } from './auth.handler';

const router = express.Router();

router.post('/register', AuthHandler.signup);
export default router;
