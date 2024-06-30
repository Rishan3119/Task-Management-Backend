const express = require('express');
const app = express();
require("dotenv").config();
require('./Conn/conn');
const cors = require('cors');
const UserAPI = require("./routes/user")
const TaskAPI =require("./routes/task")
app.use(cors());
app.use(express.json());
app.use('/api/v1', UserAPI);
app.use('/api/v2', TaskAPI);

//localhost:4000/api/sign-in
app.use("/",(req,res)=>{
    res.send("Hello from Backend")
});

const PORT = 4000;

app.listen(PORT, ()=>console.log(`Server started on Port ${PORT}`));