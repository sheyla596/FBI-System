import path from "path";
const __dirname = import.meta.dirname;
import "dotenv/config";
import { agentes } from "../data/agentes.js";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;

//Ruta raíz
export const home = async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
};

//generar token
export const generarToken = (req, res) => {
  try {
    const token = jwt.sign(agentes, secretKey);
    res.send(token).status(200);
  } catch (error) {
    res.status(401).json({ error: "401 Unathorized", message: error.message });
  }
};



export const loginAgente = (req, res) => {
  try {
    const { email, password } = req.query;
    const user = agentes.find(
      (agente) => agente.email === email && agente.password === password
    );
    if (user) {
      const token = jwt.sign(user, secretKey, { expiresIn: "30s" });
      res.send(`<a href="/Dashboard?token=${token}"> <p> Ir al Dashboard </p> </a>Bienvenido, ${email}.
        <script>
        sessionStorage.setItem('token', JSON.stringify("${token}"))
        </script>
        `);
    } else {
      res.status(401)
        .send(`<h1>⚠</h1><h2>Usuario o contraseña incorrecta</h2><a href="http://localhost:3000/"><button class="boton" type="button">Volver a inicio</button></a><style>
        * {
          margin: 0;
          padding: 0;
        }
        body {
          background: #1c1c1c;
          color: yellow;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 60vh;
          font-family: monospace
        }
        .boton{
          margin: 10px;
          padding: 10px;
          background: #FFC107
        }
      </style>`);
    }
    return user;
  } catch (error) {
    res
      .status(500)
      .json({ error: "500 Internal Server Error", message: error.message });
  }
};


//decodificar el token
export const validarAgente=(req,res)=>{
  let {token}= req.query;
  try{
const decoded= jwt.verify(token, secretKey);
res.send(`Bienvenido, agente ${decoded.email}`)
  }catch(error){
      res.status(401).json({ error: '401 Unathorized', message: error.message })
  }
};