import express from 'express';
import { AuthHandler } from './auth.handler';
import { requiresAuthentication } from '../../middlewares/authentication';

const router = express.Router();

router.post('/register', AuthHandler.signup);
router.post('/login', AuthHandler.login);
router.get('/profile', requiresAuthentication, AuthHandler.profile);
export default router;
