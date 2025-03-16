import express from "express";
import connection from "./db.js"; 
import cors from 'cors';
import authRouter from './routers/register.js';
import login from './routers/login.js'  ;  
const app = express();

app.use(cors());
app.use(express.json())

app.use("/register", authRouter); 
app.use("/login", login); 

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).send("Error fetching users");
      return;
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
