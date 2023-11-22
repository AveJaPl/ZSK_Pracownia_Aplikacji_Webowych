import express, {Express} from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import usersRouter from './routes/user.routes';

const prisma = new PrismaClient();
const app: Express = express();
const PORT = 3000;
const host = 'localhost';


app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('json spaces', 2);

app.use('/users', usersRouter)
app.use('/posts', postsRoutes)
app.use('/comments', commentsRoutes)
app.use('/categories', categoriesRoutes)
app.use('/profiles', profilesRoutes)

app.listen(PORT, host, () => {
    console.log(`Server is running at http://${host}:${PORT}`);
});