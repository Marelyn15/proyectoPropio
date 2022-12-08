//componentes
const express = require("express");
const morgan = require("morgan");

const app = express();

let dataBase = [
    {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
      {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
      },
      {
        "userId": 1,
        "id": 3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
      },
      {
        "userId": 1,
        "id": 4,
        "title": "eum et est occaecati",
        "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
      },
      {
        "userId": 1,
        "id": 5,
        "title": "nesciunt quas odio",
        "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
      }
];

//loger
app.use(morgan("dev"));
app.use(express.json('dev'));


//config
app.set("appName","JsonHolder CRUD");
app.set("port", 7000);


//rutas

//get
app.get('/usuarios', (req, res) => {
    res.json(dataBase);
});

//get by id
app.get('/usuarios/:id', (req,res)=>{
  console.log(req.params.id);

  const encontrarUsuario = dataBase.find((usuario) =>  usuario.id === parseInt(req.params.id));

  if(!encontrarUsuario)
    return res.status(404).json({
      message: "Usuario no encontrado"
    });

    res.json(encontrarUsuario);
    console.log(encontrarUsuario);
});

//post
app.post('/usuarios', (req, res)=>{

    console.log(req.body);
    dataBase.push(req.body);
    res.send("creando nuevos usuarios");

});

//put
app.put('/usuarios/:id', (req,res)=>{
  const newData = req.body; 
  
  const encontrarUsuario = dataBase.find((usuario) =>  usuario.id === parseInt(req.params.id));

  if(!encontrarUsuario)
    return res.status(404).json({
      message: "Usuario no encontrado"
    });

   dataBase = dataBase.map((user)=>user.id === parseInt(req.params.id) ? {...user, ...newData} : user);

    console.log(dataBase)
    res.json({
      message: "Usuario actualizado"
    });

    console.log(newData);
});

app.delete('/usuarios/:id',(req,res) =>{
  const encontrarUsuario = dataBase.find((usuario) =>  usuario.id === parseInt(req.params.id));

  if(!encontrarUsuario)
    return res.status(404).json({
      message: "Usuario no encontrado"
    });

    dataBase = dataBase.filter((user)=>user.id !== parseInt(req.params.id));

    console.log(dataBase);
    res.sendStatus(204);

})


app.listen(app.get("port"));

console.log(`Servidor ${(app.get("appName"))} conectado al puerto ${(app.get("port"))}`);





