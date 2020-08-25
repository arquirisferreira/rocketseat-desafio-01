const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  //Retorna todos os respositorios
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  //Pegando os dados da requisição
  const {title, url, techs} = request.body;
  
  //Criando um novo item
  const repos = {id: uuid(), title, url, techs,likes:0};
  
  //Cadastrando o repositório enviado na lista de repositórios
  repositories.push(repos);

  //retornando o repositório criado
  return response.json(repos);
});

app.put("/repositories/:id", (request, response) => {
  //Alteração de Dados

  //pegando o ID do registro que deve ser alterado
  const { id } = request.params;

  //pegando os novos dados
  const { title, url, techs } = request.body;

  //localizando o registro que deve ser alterado através do ID
  const reposIndex = repositories.findIndex(repos => repos.id == id);

    if (reposIndex < 0) {
        return response.status(400).json({error: "Project not found!"});
    }
    //criando novo objeto JSON com os dados
    const repos = {
      id,
      title,
      url,
      techs
  }
  //armazenando no logal do objeto antigo
  repositories[reposIndex] = repos;

  //retornando  os dados
  return response.json(repos);
  
  
});

app.delete("/repositories/:id", (request, response) => {
  //Excluindo todos os dados
    //pegando o ID do registro que deve ser excluído
    const { id } = request.params;
  
    //localizando o registro que deve ser excluído através do ID
    const reposIndex = repositories.findIndex(repos => repos.id == id);
  
      if (reposIndex < 0) {
          return response.status(400).json({error: "Project not found!"});
      }
   
    repositories.splice(reposIndex,1);
  
    //retornando  os dados
    return response.status(204).send()
});

app.put("/repositories/:id/like", (request, response) => {
  //Aumentando o número de Likes

  //pegando o ID do registro que deve ser alterado
  const { id } = request.params;
  console.log(id);
  
  //localizando o registro que deve ser alterado através do ID
  const reposIndex = repositories.findIndex(repos => repos.id == id);

    if (reposIndex < 0) {
        return response.status(400).json({error: "Project not found!"});
    }
  //Aumentando o número de likes

  repos = repositories[reposIndex];

  repos.likes = repos.likes+1;

  //armazenando no logal do objeto antigo
  repositories[reposIndex] = repos;

  //retornando  os dados
  return response.json(repos);
});

module.exports = app;
