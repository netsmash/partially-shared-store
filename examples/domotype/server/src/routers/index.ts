import { Router, Request, Response } from 'express';
import { AuthService } from '../auth.service';
import { router as homeRouter } from './home';
import { router as userRouter } from './user';
import { router as stateRouter } from './state';

const authService = AuthService.getInstance();
const router = Router();

router.use(async (req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Identity-Token',
  );
  next();
});

router.use('/', authService.authentication());

router.use('/homes', homeRouter);
router.use('/users', userRouter);
router.use('/states', stateRouter);

export { router };
