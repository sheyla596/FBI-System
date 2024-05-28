import express from "express";
const app=express();
const PORT = process.env.PORT || 3000;
import router from "./routes/routes.js";

app.listen(PORT, () => {
    console.log(`El servidor está inicializado en el puerto http://localhost:${PORT}`);
  });

//middlewares
app.use(express.json());
app.use("/",router);

