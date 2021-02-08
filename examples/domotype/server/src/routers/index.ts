import * as cors from 'cors';
import { Router } from 'express';
import { AuthService } from '../auth.service';
import { router as homeRouter } from './home';
import { router as userRouter } from './user';
import { router as wsTicketRouter } from './websocket-ticket';

const authService = AuthService.getInstance();
const router = Router();

router.use(cors());
router.use('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});
router.use('/', authService.authentication());

router.use('/homes', homeRouter);
router.use('/users', userRouter);
router.use('/ws/tickets', wsTicketRouter);

export { router };
