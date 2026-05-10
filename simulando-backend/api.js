const URL_BASE = "http://localhost:3000"

const api = {
    async buscarDados(){
      try{
        const response= await fetch(`${URL_BASE}/produtos`)
        return await  response.json()
      }catch(error){
      throw new Error("Não foi possivel buscar os dados no API")
    }
  },

  async buscarCarrinho(){
    try{
        const response = await fetch(`${URL_BASE}/carrinho`)
        return await response.json()
    }catch(error){
        throw new Error("Não foi possivel buscar o carrinho")
    }
  },
  
  async enviarDadosCarrinho(roupa){
      try{
        const response= await fetch(`${URL_BASE}/carrinho`, {
          method: "POST",
          headers:{
              "Content-Type": "application/json"
          },
           body: JSON.stringify(roupa)
        })
        return await  response.json()
      }catch(error){
      throw new Error("Não foi possivel enviar os dados para o carrinho")
    }
  }
}

export default api
