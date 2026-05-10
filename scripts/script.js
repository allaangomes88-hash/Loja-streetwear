import api from "../simulando-backend/api.js"

const produtosVazio = document.getElementById("produtos-vazio")
const carrinhoCount = document.getElementById("carrinho-count")
const carrinhoTotal = document.getElementById("carrinho-total")
const carrinhoVazio = document.getElementById("carrinho-vazio")
const carrinhoRodape = document.getElementById("carrinho-rodape")
const overlay = document.getElementById("overlay")
const btnCarrinho = document.getElementById("btn-carrinho")
const btnFecharCarrinho = document.getElementById("btn-fechar-carrinho")
const listaProdutos = document.getElementById("lista-produtos")

let produtos= []  
let carrinho = []

const crud={
    async renderizar(){
        const mostrarTudo= await api.buscarDados()
        mostrarTudo.forEach(roupas => todosOsProdutos(roupas))
        produtos=mostrarTudo
        const quantidadeDeProdutos=document.getElementById("produtos-count")
        console.table(mostrarTudo)

        quantidadeDeProdutos.textContent=`${produtos.length} peças `
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    crud.renderizar()
})


const filtrosBtns = document.querySelectorAll(".filtro-btn")
filtrosBtns.forEach(botoes => botoes.addEventListener("click", (e) => botaoAtivo(e)))

function botaoAtivo(e){
    filtrosBtns.forEach(botaoAtivado => {
        botaoAtivado.classList.remove("filtro-btn--ativo")
    })

    const classeAtiva= e.target 
    const categoriaAtiva= e.target.dataset.categoria

    listaProdutos.innerHTML=""
    
    const quantidadeDeProdutos=document.getElementById("produtos-count")
    if(categoriaAtiva === "todos"){
        produtos.forEach(filtrados=> todosOsProdutos(filtrados))
        quantidadeDeProdutos.textContent=`${produtos.length} peças `

    }else{
        let produtosFiltrados= produtos.filter(btnFiltrado=> categoriaAtiva === btnFiltrado.categoria)
        produtosFiltrados.forEach(filtrados => todosOsProdutos(filtrados))
        quantidadeDeProdutos.textContent=`${produtosFiltrados.length} peças `
    }

    classeAtiva.classList.add("filtro-btn--ativo")

}

// cria todos os produtos
async function todosOsProdutos(roupas, filtrados){
    const cardProdutos = document.createElement("li")
    cardProdutos.classList.add("produto-card")
    cardProdutos.setAttribute("data-id", roupas.id)

    const topo = document.createElement("div")
    topo.classList.add("produto-card__topo")

    const categoria = document.createElement("p")
    categoria.classList.add("produto-card__categoria")
    categoria.textContent = roupas.categoria

    const estoque = document.createElement("p")
    estoque.classList.add("produto-card__estoque")
    estoque.textContent = roupas.estoque

    topo.append(categoria, estoque)

    const imagemWrapper = document.createElement("div")
    imagemWrapper.classList.add("produto-card__imagem-wrapper")

    const placeholder = document.createElement("div")
    placeholder.classList.add("produto-card__placeholder")

    const placeholderNome = document.createElement("span")
    placeholderNome.classList.add("produto-card__placeholder-nome")
    placeholderNome.textContent = "SEM IMAGEM"
    placeholder.append(placeholderNome)

    const btnAdd = document.createElement("button")
    btnAdd.classList.add("produto-card__btn-add")
    btnAdd.textContent = "ADICIONAR"
    btnAdd.onclick = () => {
        carrinho.push(roupas)
        carrinhoCount.textContent = carrinho.length
        renderizarCardsNoCarrinho()
        // live server está com problemas em usar o method POST
    }

    imagemWrapper.append(placeholder, btnAdd)
  
    const info = document.createElement("div")
    info.classList.add("produto-card__info")

    const nome = document.createElement("h3")
    nome.classList.add("produto-card__nome")
    nome.textContent = roupas.nome

    const cor = document.createElement("p")
    cor.classList.add("produto-card__cor")
    cor.textContent = roupas.cor

    const descricao = document.createElement("p")
    descricao.classList.add("produto-card__descricao")
    descricao.textContent = roupas.descricao

    const precos = document.createElement("div")
    precos.classList.add("produto-card__precos")

    const preco = document.createElement("span")
    preco.classList.add("produto-card__preco")
    preco.textContent = `R$ ${roupas.preco.toFixed(2)}`
    precos.append(preco)

    const divPaiTamanhos = document.createElement("div")
    divPaiTamanhos.classList.add("produto-card__tamanhos")

    roupas.tamanhos.forEach(tam => {
        const span = document.createElement("span")
        span.classList.add("produto-card__tamanho")
        span.textContent = tam
        divPaiTamanhos.append(span)
    })

    info.append(nome, cor, descricao, precos, divPaiTamanhos)
    cardProdutos.append(topo, imagemWrapper, info)
    listaProdutos.append(cardProdutos)
}
    

// abrir e fechar modal
const carrinhoSidebar = document.getElementById("carrinho-sidebar")

btnCarrinho.addEventListener("click", () => {
    carrinhoSidebar.classList.add("carrinho--aberto")
    overlay.classList.add("overlay--ativo")

    renderizarCardsNoCarrinho()
})


btnFecharCarrinho.addEventListener("click", ()=>{
    carrinhoSidebar.classList.remove("carrinho--aberto")
    overlay.classList.remove("overlay--ativo")
})

overlay.addEventListener("click", () => {
    carrinhoSidebar.classList.remove("carrinho--aberto")
    overlay.classList.remove("overlay--ativo")
})

// renderizar os produtos selecionados no container do carrinho
function renderizarCardsNoCarrinho(){
    const listaCarrinho = document.getElementById("lista-carrinho")
        listaCarrinho.innerHTML = ""
    
    const precoTotal= carrinho.reduce((acc, roupaSelecionada) => acc + roupaSelecionada.preco, 0)
    carrinhoTotal.textContent= `R$${precoTotal.toFixed(2)}`

   carrinho.forEach(produtosSelecionados => {
        const li = document.createElement("li")
        li.classList.add("carrinho-item")

        const categoriaCarrinho = document.createElement("span")
        categoriaCarrinho.classList.add("carrinho-item__categoria")
        categoriaCarrinho.textContent = produtosSelecionados.categoria

        const nomeCarrinho = document.createElement("p")
        nomeCarrinho.classList.add("carrinho-item__nome")
        nomeCarrinho.textContent = produtosSelecionados.nome

        const divCarrinho=document.createElement("div")
        divCarrinho.classList.add("carrinho-item__rodape")

        const precoCarrinho=document.createElement("span")
        precoCarrinho.classList.add("carrinho-item__preco")
        precoCarrinho.textContent= produtosSelecionados.preco

        const divCarrinhoAgrupar=document.createElement("div")
        divCarrinhoAgrupar.classList.add("carrinho-item__quantidade")

        const btnRemoverCarrinho=document.createElement("button")
        btnRemoverCarrinho.classList.add("carrinho-item__remover")
        btnRemoverCarrinho.textContent= "Remover"
        btnRemoverCarrinho.onclick= () =>{
            removerProdutosNoCarrinho(produtosSelecionados)
            renderizarCardsNoCarrinho()
            // reenderiza com a lista filtrada
        }

        const quantidade = document.createElement("span")
        quantidade.classList.add("carrinho-item__quantidade-num")
        quantidade.textContent = "1"

        const btnDiminuir=document.createElement("button")
        btnDiminuir.classList.add("carrinho-item__quantidade-btn")
        btnDiminuir.textContent="-"
        btnDiminuir.onclick= () =>{
            let numero = Number(quantidade.textContent)
                numero--
           quantidade.textContent = numero

           if(numero === 0){
               removerProdutosNoCarrinho(produtosSelecionados)
           }
        }

        const btnAumentar=document.createElement("button")
        btnAumentar.classList.add("carrinho-item__quantidade-btn")
        btnAumentar.textContent="+"
        btnAumentar.onclick= () =>{
           let numero = Number(quantidade.textContent)
                numero++
           quantidade.textContent = numero
        }

        divCarrinhoAgrupar.append(btnRemoverCarrinho, btnDiminuir, btnAumentar, quantidade)
        divCarrinho.append(precoCarrinho, divCarrinhoAgrupar)
        li.append(categoriaCarrinho, nomeCarrinho,divCarrinho )
        listaCarrinho.append(li)

})
    // mensagem bag vazia
     const bagVazia=document.getElementById("carrinho-vazio")
     bagVazia.hidden = carrinho.length > 0
     carrinhoRodape.hidden = carrinho.length === 0



}


    function removerProdutosNoCarrinho(produtosSelecionados){
        carrinho= carrinho.filter(itemRemovido => itemRemovido.id !== produtosSelecionados.id)
        // mantem tudo que for diferente (id) do clicado
            renderizarCardsNoCarrinho()
}

const finalizarCompra=document.querySelector(".carrinho__finalizar")
finalizarCompra.addEventListener("click", () => carrinhoFinalizado())

function carrinhoFinalizado(){
    localStorage.setItem("carrinho", JSON.stringify(carrinho))
    // salva o carrinho atual e leva pra finalizar a compra

    window.location.href = "checkout.html"
}

const destaque=document.getElementById("btn-ver-destaque")
destaque.onclick= async () => {

    const listaDeBotoes=document.querySelectorAll(".filtro-btn")
    listaDeBotoes.forEach(todos => {
        const categoriaTodos= todos.dataset.categoria
        if(categoriaTodos === "todos"){
            todos.click()
        }
    })
    

    await new Promise(resolve => setTimeout(resolve, 100));
    // setTimeout para esperar o navegador carregar os cards antes de buscar

    const cardAlvo = document.querySelector(`[data-id="11"]`);

    if (cardAlvo) {
        cardAlvo.scrollIntoView({ behavior: "smooth", block: "center" });
    }
};

