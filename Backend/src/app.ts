import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config'
const app = express();


app.get('/', (req,res) => {
    res.send('Yooo!')
});

app.use((error: unknown, req: Request, res:Response, next:NextFunction) => {
    console.log(error);
    let errorMessage: string = "An unknown error occurred";
    if(error instanceof Error ) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });    
})

export default app;