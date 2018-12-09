import express from 'express';
import authRouter from './auth/auth.controller';
import helloRouter from './hello/hello.controller';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/hello', helloRouter);
router.use('/auth', authRouter);
export default router;
