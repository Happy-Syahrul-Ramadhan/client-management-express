import userRouter from './authRouter.js'
import homeRouter from './homeRouter.js'

export default function routes(app) {

  app.use("/", userRouter());

}
