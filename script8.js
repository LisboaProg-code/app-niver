const pergunta = document.querySelector(".pergunta h1")

const btnLivia = document.querySelector(".livia")
const btnMario = document.querySelector(".eu")

/* criar leaderboard */

/* criar leaderboard */

const leaderboard = document.createElement("div")

leaderboard.classList.add("leaderboard")

leaderboard.style.display = "none"

leaderboard.innerHTML = `

    <div class="placar">

        <div class="player">
            <span>Lívia</span>
            <strong class="pontos-livia">0</strong>
        </div>

        <div class="player">
            <span>Mario</span>
            <strong class="pontos-mario">0</strong>
        </div>

    </div>

    <h1 class="vencedor"></h1>

`

document.body.appendChild(leaderboard)

/* perguntas */

const perguntas = [

    "Quem tem mais chance de dormir primeiro?",
    "Quem é mais ciumento?",
    "Quem manda mais mensagem?",
    "Quem demora mais pra responder?",
    "Quem fala mais 'eu te amo'?",
    "Quem sente mais saudades?",
    "Quem é mais dramático?",
    "Quem faria surpresa romântica?",
    "Quem tem mais chance de esquecer algo?",
    "Quem é mais carente?",
    "Quem é mais engraçado?",
    "Quem fica mais bravo rápido?",
    "Quem seria mais provável chorar em filme?",
    "Quem faz mais birra?",
    "Quem tem mais chance de acordar de mau humor?"
]

/* pontuação */

let pontos = {

    livia: 0,
    mario: 0

}

/* pergunta atual */

let perguntaAtual = 0

/* mostrar primeira pergunta */

pergunta.innerHTML = perguntas[perguntaAtual]

/* votar */

btnLivia.addEventListener("click", () => {

    votar("livia")

})

btnMario.addEventListener("click", () => {

    votar("mario")

})

/* função votar */

function votar(escolha){

    pontos[escolha]++

    atualizarLeaderboard()

    animarEscolha(escolha)

    setTimeout(() => {

        proximaPergunta()

    }, 600)

}

/* próxima pergunta */

function proximaPergunta(){

    perguntaAtual++

    if(perguntaAtual >= perguntas.length){

        mostrarResultadoFinal()

        return

    }

    pergunta.innerHTML = perguntas[perguntaAtual]

}

/* atualizar leaderboard */

function atualizarLeaderboard(){

    document.querySelector(".pontos-livia").innerHTML =
    pontos.livia

    document.querySelector(".pontos-mario").innerHTML =
    pontos.mario

}

/* animação escolha */

function animarEscolha(escolha){

    if(escolha === "livia"){

        btnLivia.style.transform = "scale(1.05)"
        btnLivia.style.backgroundColor = "#7c145d"

        setTimeout(() => {

            btnLivia.style.transform = "scale(1)"
            btnLivia.style.backgroundColor = "#580f41"

        }, 400)

    }

    else{

        btnMario.style.transform = "scale(1.05)"
        btnMario.style.backgroundColor = "#14508a"

        setTimeout(() => {

            btnMario.style.transform = "scale(1)"
            btnMario.style.backgroundColor = "#0d3b66"

        }, 400)

    }

}

/* resultado final */

function mostrarResultadoFinal(){

    /* esconder escolhas */

    btnLivia.style.display = "none"
    btnMario.style.display = "none"

    /* mudar pergunta */

    pergunta.innerHTML = "Resultado final 🏆"
    leaderboard.style.transform = "translateY(-40%)"

    /* atualizar placar */

    document.querySelector(".pontos-livia").innerHTML =
    pontos.livia + " votos"

    document.querySelector(".pontos-mario").innerHTML =
    pontos.mario + " votos"

    /* mostrar leaderboard */

    leaderboard.style.display = "flex"

}