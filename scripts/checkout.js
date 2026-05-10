const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

const ul=document.getElementById("checkout-itens")

function carrinhoFinalizado(){

    carrinho.forEach(finalizarCompra => {
        const li=document.createElement("li")
        li.classList.add("checkout__item")

        const nomeDoProduto=document.createElement("span")
        nomeDoProduto.classList.add("checkout__item-nome")
        nomeDoProduto.textContent= finalizarCompra.nome

        const preco=document.createElement("span")
        preco.classList.add("checkout__item-preco")
        preco.textContent= `R$${finalizarCompra.preco}`

        li.append(nomeDoProduto, preco)
        ul.append(li)
    })

    const subtotalSpan= document.getElementById("checkout-subtotal")
    const subtotal= carrinho.reduce((acc, precoTotal) => acc + precoTotal.preco, 0)
          subtotalSpan.textContent= `R$${subtotal.toFixed(2)}`
        
    const frete=document.getElementById("checkout-frete")
    const valorFrete= subtotal > 399 ? "gratis" : "R$20,00"
    frete.textContent= valorFrete

    const valorDosProdutos= document.getElementById("checkout-total")
    const valorTotalComFrete= subtotal > 399 ? 0 : 20

    valorDosProdutos.textContent= `R$${(valorTotalComFrete + subtotal).toFixed(2)}`
}

document.addEventListener("DOMContentLoaded",() => {
    carrinhoFinalizado()
    ul.hidden= ul.length > 0
    // se a lista tiver mais que zero itens retorna true
})


document.getElementById("cep").addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "")
})

const botaoFinalizar=document.getElementById("btn-finalizar")
botaoFinalizar.addEventListener("click", (e) => finalizarCompra(e))


function finalizarCompra(e) {
    const nomeInput = document.getElementById("nome").value.trim()
    const cidadeInput = document.getElementById("cidade").value.trim()
    const enderecoInput = document.getElementById("endereco").value.trim()
    const emailInput = document.getElementById("email").value.trim()
    const cepInput = document.getElementById("cep").value.trim()

    // pega o primeiro span depois da tag
    const nomeAviso = document.querySelector("#nome + span")
    const cepAviso = document.querySelector("#cep + span")
    const cidadeAviso = document.querySelector("#cidade + span")
    const enderecoAviso = document.querySelector("#endereco + span")
    const emailAviso = document.querySelector("#email + span")
    const emailInvalido = document.getElementById("email-invalido")

    //  mostra avisos de campo vazio
    nomeAviso.hidden = nomeInput !== ""
    cepAviso.hidden = cepInput !== ""
    cidadeAviso.hidden = cidadeInput !== ""
    enderecoAviso.hidden = enderecoInput !== ""
    emailAviso.hidden = emailInput !== ""

    // para se tiver algum vazio
    if(nomeInput === "" || cepInput === "" || cidadeInput === "" || enderecoInput === "" || emailInput === "") {
        return
    }

    //valida email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const emailValido = emailRegex.test(emailInput)
    emailInvalido.hidden = emailValido

    if(!emailValido) return

    // tudo ok
    document.getElementById("confirmacao").hidden = false
}


const botaoCartao=document.querySelectorAll(".checkout__metodo")

botaoCartao.forEach(cartao =>{
    cartao.addEventListener("change", opcoesCartao)
})

function opcoesCartao(e){
    const elementoClicado= e.target
    const opcoesCartaoAberto=document.getElementById("campos-cartao")
    if(elementoClicado.value === "cartao"){
        opcoesCartaoAberto.hidden= false
    }else{
        opcoesCartaoAberto.hidden= true
    }
}