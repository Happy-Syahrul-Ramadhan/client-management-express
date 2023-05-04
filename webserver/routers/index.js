import userRouter from './authRouter.js'


export default function routes(app) {

  app.use("/api/v1/", userRouter());

}
