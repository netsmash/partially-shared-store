import * as express from 'express';
import * as mongoose from 'mongoose';
import * as http from 'http';
import * as WebSocket from 'ws';
import { json } from 'body-parser';
import { useWebsocket } from './websocket';
import { TaskService } from './task.service';
import { router } from './routers';

const app = express();
app.use(json());
app.use('/', router);

const server: http.Server = http.createServer(app);
useWebsocket(server);

const dbUser: string = process.env.MONGODB_USER || 'user';
const dbPass: string = process.env.MONGODB_PASS || 'abc123';
const dbName: string = process.env.MONGODB_DATABASE || 'domotype';
const dbHost: string = process.env.MONGODB_HOST || 'localhost';
const dbPort: string = process.env.MONGODB_PORT || '27017';

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
