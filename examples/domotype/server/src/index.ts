import * as express from 'express';
import * as mongoose from 'mongoose';
import * as http from 'http';
import * as WebSocket from 'ws';
import { json } from 'body-parser';
import * as cors from 'cors';
import { useWebsocket } from './websocket';
import { TaskService } from './task.service';
import { router } from './routers';

const app = express();
app.use(json());
app.use('/', router);
app.use(cors());

const server: http.Server = http.createServer(app);
useWebsocket(server);

const dbUser: string = process.env.MONGO_USER as string;
const dbPass: string = process.env.MONGO_PASSWORD as string;
const dbName: string = process.env.MONGO_DATABASE as string;
const dbHost: string = process.env.MONGO_HOST as string;
const dbPort: string = process.env.MONGO_PORT as string;

mongoose.connect(
  `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('connected to database');
  },
);
mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:'),
);

try {
  server.listen(process.env.SERVER_PORT || 7001, () => {
    const address = server.address() as WebSocket.AddressInfo;
    console.log(`Server started at ${address.port}.`);
    const taskService = TaskService.getInstance();
    taskService.start();
  });
} catch (e) {
  console.error(e);
}
