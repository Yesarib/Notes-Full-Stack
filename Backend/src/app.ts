import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config'
import notesRoutes from './routes/notes'
import morgan from 'morgan';
import createHttpError, { isHttpError } from 'http-errors';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

// End Points
app.use('/api/notes', notesRoutes);


app.use((req,res,next) => {
    next(createHttpError(404,'Endpoint not found'))
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res:Response, next:NextFunction) => {
    console.log(error);
    let errorMessage: string = "An unknown error occurred";
    let statusCode:number = 500;
    if(isHttpError(error)) {
        statusCode = error.status
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });    
})

export default app;