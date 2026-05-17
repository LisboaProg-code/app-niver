const conversas = document.querySelectorAll(".conversa")
const chatScreen = document.querySelector(".chat-screen")
const mensagens = document.querySelector(".mensagens")
const voltar = document.querySelector(".voltar")
const status = document.querySelector(".status")
const input = document.querySelector(".chat-input input")
const enviar = document.querySelector(".chat-input button")
const somMsg = document.querySelector("#som-msg")

const foto = document.querySelector(".chat-photo")
const fotoFull = document.querySelector(".foto-full")

const chatName = document.querySelector(".chat-name")
const chatPhoto = document.querySelector(".chat-photo")

let chatAtual = null

/* abrir foto */

foto.addEventListener("click", () => {
    fotoFull.classList.add("ativo")
})

fotoFull.addEventListener("click", () => {
    fotoFull.classList.remove("ativo")
})

/* chats */

const chats = [
    {
        nome: "Bbzonildo💐",
        foto: "imgs/zap/eu.jpeg",
        status: "online",

        mensagens: [
            {
                tipo: "digitando",
                tempo: 2000
            },
            {
                tipo: "texto",
                autor: "ela",
                mensagem: "Oiiii meu amorr lindo",
                horario: "18:00"
            },
            {
                tipo: "audio",
                autor: "ela",
                audio: "audios/meu.mp3",
                horario: "18:00"
            },
            {
                tipo: "audio",
                autor: "ela",
                audio: "audios/meu2.mp3",
                horario: "18:00"
            },
            {
                tipo: "texto",
                autor: "ela",
                mensagem: "Eu te amo meu amor lindo",
                horario: "18:00"
            }
        ]
    },

    {
        nome: "Emilly",
        foto: "imgs/zap/emilly.jpeg",
        status: "visto por último hoje às 18:00",

        mensagens: [
            {
                tipo: "digitando",
                tempo: 2000
            },
            {
                tipo: "texto",
                autor: "ela",
                mensagem: "Oiiii bbzinhaa",
                horario: "18:00"
            },
            {
                tipo: "audio",
                autor: "ela",
                audio: "audios/emilly.mp3",
                horario: "18:00"
            }
        ]
    },

    {
        nome: "Esther",
        foto: "imgs/zap/esther.jpeg",
        status: "online",

        mensagens: [
            {
                tipo: "digitando",
                tempo: 2000
            },
            {
                tipo: "texto",
                autor: "ela",
                mensagem: "Oiiii Líviaa",
                horario: "18:00"
            },
            {
                tipo: "audio",
                autor: "ela",
                audio: "audios/Esther.mp3",
                horario: "18:00"
            }
        ]
    },
    {
        nome: "DIVA Myllena",
        foto: "imgs/zap/mylena.jpeg",
        status: "online",

        mensagens: [
            {
                tipo: "digitando",
                tempo: 2000
            },
            {
                tipo: "texto",
                autor: "ela",
                mensagem: "Oiiii Líviaa",
                horario: "18:00"
            },
            {
                tipo: "audio",
                autor: "ela",
                audio: "audios/Myllena.mp3",
                horario: "18:00"
            }
        ]
    },
    {
        nome: "Ana Clara",
        foto: "imgs/zap/l-c.jpeg",
        status: "online",

        mensagens: [
            {
                tipo: "digitando",
                tempo: 2000
            },
            {
                tipo: "texto",
                autor: "ela",
                mensagem: "Oiiii Líviaa",
                horario: "18:00"
            },
            {
                tipo: "texto",
                autor: "ela",
                mensagem: "feliz aniversário bb, te desejo sempre as melhores coisas que a vida possa oferecer, que essa nova fase seja incrível e cheia de oportunidades. eu te amo bebê ! conte cmg sempre , sempre, sempre , considero vc como uma irmã 🌟💕",
                horario: "18:00"
            }
        ]
    },
    {
        nome: "Duda",
        foto: "imgs/zap/duda.jpeg",
        status: "online",

        mensagens: [
            {
                tipo: "digitando",
                tempo: 2000
            },
            {
                tipo: "texto",
                autor: "ela",
                mensagem: "Oiiii Líviaa",
                horario: "18:00"
            },
            {
                tipo: "texto",
                autor: "ela",
                mensagem: "Feliz aniversário liviiiaaaa bebee💗💗💗 te amo muito voce eh a mulher mais engraçada lesa boba que eu conheço beijoooos",
                horario: "18:00"
            }
        ]
    }
]

/* abrir chat */

conversas.forEach((conversaCard, index) => {
    conversaCard.addEventListener("click", async () => {
        mensagens.innerHTML = ""
        chatAtual = chats[index]

        if(!chatAtual) return

        chatName.innerHTML = chatAtual.nome
        status.innerHTML = chatAtual.status
        chatPhoto.style.backgroundImage = `url(${chatAtual.foto})`
        fotoFull.querySelector("img").src = chatAtual.foto
        chatScreen.classList.add("ativo")

        await iniciarConversa(chatAtual)
    })
})

/* voltar */

voltar.addEventListener("click", () => {
    chatScreen.classList.remove("ativo")
})

/* iniciar conversa */

async function iniciarConversa(chat){
    for(const item of chat.mensagens){
        if(item.tipo === "digitando"){
            mostrarDigitando()
            await esperar(item.tempo)
            removerDigitando()
            mostrarStatus(chat.status)
        }

        if(item.tipo === "texto"){
            criarMensagem(
                item.mensagem,
                item.autor,
                item.horario
            )
        }

        if(item.tipo === "audio"){
            criarAudio(
                item.audio,
                item.autor,
                item.horario
            )
        }

        await esperar(1000)
    }
}

/* criar mensagem */

function criarMensagem(texto, autor, horario){
    somMsg.currentTime = 0
    somMsg.play()

    const msg = document.createElement("div")
    msg.classList.add("msg")

    if(autor === "ela"){
        msg.classList.add("recebida")
    } else {
        msg.classList.add("enviada")
    }

    msg.innerHTML = `
        <p>${texto}</p>
        <span>
            ${horario}
            ${autor === "eu"
                ? '<i class="ri-check-double-fill visualizado"></i>'
                : ''
            }
        </span>
    `

    mensagens.appendChild(msg)
    scrollFinal()
}

/* criar audio */

function criarAudio(src, autor, horario){
    somMsg.currentTime = 0
    somMsg.play()

    const msg = document.createElement("div")
    msg.classList.add("msg")

    if(autor === "ela"){
        msg.classList.add("recebida")
    } else {
        msg.classList.add("enviada")
    }

    msg.innerHTML = `
        <div class="audio-msg">
            <button class="play-audio">
                <i class="ri-play-fill"></i>
            </button>
            <div class="barra-audio">
                <div class="progresso-audio"></div>
            </div>
            <audio src="${src}"></audio>
        </div>
        <span>
            ${horario}
            ${autor === "eu"
                ? '<i class="ri-check-double-fill visualizado"></i>'
                : ''
            }
        </span>
    `

    mensagens.appendChild(msg)
    scrollFinal()
}

/* controle do audio corrigido com addEventListener estável */

document.addEventListener("click", e => {
    const btn = e.target.closest(".play-audio")
    if (!btn) return

    const box = btn.parentElement
    const audio = box.querySelector("audio")
    const progresso = box.querySelector(".progresso-audio")

    if(audio.paused){
        audio.play()
        btn.innerHTML = '<i class="ri-pause-fill"></i>'
    } else {
        audio.pause()
        btn.innerHTML = '<i class="ri-play-fill"></i>'
    }

    // Usando event listeners nativos do elemento de áudio para evitar bugs de concorrência
    audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
            const porcentagem = (audio.currentTime / audio.duration) * 100
            progresso.style.width = porcentagem + "%"
        }
    })

    audio.addEventListener("ended", () => {
        btn.innerHTML = '<i class="ri-play-fill"></i>'
        progresso.style.width = "0%"
    })
})

/* digitando */

function mostrarDigitando(){
    status.innerHTML = "digitando..."

    const typing = document.createElement("div")
    typing.classList.add("typing")
    typing.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `
    typing.id = "typing"

    mensagens.appendChild(typing)
    scrollFinal()
}

function removerDigitando(){
    const typing = document.querySelector("#typing")
    if(typing){
        typing.remove()
    }
}

function mostrarStatus(texto){
    status.innerHTML = texto
}

/* enviar msg */

enviar.addEventListener("click", enviarMensagem)

input.addEventListener("keydown", e => {
    if(e.key === "Enter"){
        enviarMensagem()
    }
})

function enviarMensagem(){
    if(input.value.trim() === "") return

    const hora = new Date()
    const horario = `${hora.getHours()}:${String(hora.getMinutes()).padStart(2,"0")}`

    criarMensagem(
        input.value,
        "eu",
        horario
    )

    input.value = ""
    responderAutomatico()
}

/* resposta automática */

async function responderAutomatico(){
    mostrarDigitando()
    await esperar(2000)
    removerDigitando()
    mostrarStatus(chatAtual.status)

    criarMensagem(
        "aaaaaa vc eh perfeito 💚",
        "ela",
        "agora"
    )
}

/* util */

function esperar(ms){
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function scrollFinal(){
    mensagens.scrollTop = mensagens.scrollHeight
}