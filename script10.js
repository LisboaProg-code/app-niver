const informacoesDatas = {
    "16-4-2008": {
        titulo: "Lívia Nasceu",
        desc: "Nascimento da protagonista da história",
        fotos: ["imgs/calendario/nascimento.jpg", "imgs/calendario/alvaro.jpg"]
    },
    "15-1-2023": {
        titulo: "Entrei no Álvaro",
        desc: "No Álvaro começou tudo",
        fotos: ["imgs/calendario/alvaro.JPG", "imgs/calendario/alvaro2.jpg"]
    },

    "14-7-2025": {
        titulo: "Gincana",
        desc: "Onde virei amiga de muita gente (ainda mais eu criador do site)",
        fotos: ["imgs/calendario/gincana1.jpg", "imgs/calendario/gincana2.jpg"]
    },
    "2-8-2025": {
        titulo: "Começamos a conversar",
        desc: "Mario deu o primeiro passo (sou o fodao)",
        fotos: ["imgs/calendario/conversar.jpg", "imgs/calendario/conversar2.jpg"]
    },
    "13-8-2025": {
        titulo: "Primeiro beijo",
        desc: "Demos o primeiro beijo (sonho realizado)",
        fotos: ["imgs/calendario/nos-escola.jpg"]
    },
    "29-10-2025": {
        titulo: "Primeiro encontro",
        desc: "Fomos pro Teatro com Gio, Emilly e Mikael",
        fotos: ["imgs/calendario/nos4.jpg"]
    },
    "14-11-2025": {
        titulo: "Me formei",
        desc: "Terminei o ensino médio",
        fotos: ["imgs/calendario/formatura.jpg", "imgs/calendario/formatura2.jpg" ]
    },
    "30-11-2025": {
        titulo: "Piscina ano novo",
        desc: "Dia da piscina e quando a gente voltou a conversar desde o dia 24",
        fotos: ["imgs/calendario/piscina.jpg", "imgs/calendario/nos3.jpg"]
    },
    "7-1-2026":{
        titulo: "Voltamos a ser nós",
        desc: "O dia que eu mandei mensagem pra voltarmos (eu aceitei claramente, tava quase morrendo)",
        fotos: ["imgs/calendario/nos.jpg", "imgs/calendario/nos4.jpg"]
    },
    "13-3-2026": {
        titulo: "Fui pedida em namoroo",
        desc: "Fui pedida em namoro no Evaldo Cruz, num piquenique (melhor dia da minha vida)",
        fotos: ["imgs/calendario/namoro.jpg", "imgs/calendario/namoro3.jpeg"]
    },
    "16-4-2026": {
        titulo: "18tao",
        desc: "Minha festa de peruca de 18 anos",
        fotos: ["imgs/calendario/18.png", "imgs/calendario/18-2.jpeg"]
    },
};

const meses = [
    "Janeiro","Fevereiro","Março","Abril",
    "Maio","Junho","Julho","Agosto",
    "Setembro","Outubro","Novembro","Dezembro"
];

const semana = ["D","S","T","Q","Q","S","S"];
const container = document.getElementById("container");

const inicioAno = 2008;
const inicioMes = 4; // maio

const hoje = new Date();
const fimAno = hoje.getFullYear();
const fimMes = 4; 

// --- GERAÇÃO DO CALENDÁRIO ---

for(let ano = inicioAno; ano <= fimAno; ano++){
    let mesInicial = ano === inicioAno ? inicioMes : 0;
    let mesFinal = ano === fimAno ? fimMes : 11;

    for(let mes = mesInicial; mes <= mesFinal; mes++){
        criarMes(mes, ano);
    }
}

function criarMes(mes, ano) {
    const section = document.createElement("section");
    section.classList.add("mes");

    // Define o ID para navegação (apenas no primeiro mês do ano para o menu de anos)
    if (mes === 0 || (ano === inicioAno && mes === inicioMes)) {
        section.id = `ano-${ano}`;
    }
    
    // Define um atributo para busca específica de mês no menu
    section.setAttribute("data-data", `${mes}-${ano}`);

    const titulo = document.createElement("div");
    titulo.classList.add("titulo");
    titulo.innerHTML = `<h1>${meses[mes]}</h1><p>${ano}</p>`;
    section.appendChild(titulo);

    const semanaDiv = document.createElement("div");
    semanaDiv.classList.add("semana");
    semana.forEach(dia => {
        const el = document.createElement("div");
        el.textContent = dia;
        semanaDiv.appendChild(el);
    });
    section.appendChild(semanaDiv);

    const diasDiv = document.createElement("div");
    diasDiv.classList.add("dias");

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const totalDias = new Date(ano, mes + 1, 0).getDate();

    for (let i = 0; i < primeiroDia; i++) {
        const vazio = document.createElement("div");
        vazio.classList.add("dia", "vazio");
        diasDiv.appendChild(vazio);
    }

    for (let dia = 1; dia <= totalDias; dia++) {
        const diaDiv = document.createElement("div");
        diaDiv.classList.add("dia");
        diaDiv.textContent = dia;

        const dataChave = `${dia}-${mes}-${ano}`;

        // Verifica se a data está marcada para abrir o modal
        if (informacoesDatas[dataChave]) {
            diaDiv.classList.add("marcado"); 
            diaDiv.addEventListener("click", () => abrirModal(dia, mes, ano));
        }

        if (dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear()) {
            diaDiv.classList.add("hoje");
        }
        diasDiv.appendChild(diaDiv);
    }

    section.appendChild(diasDiv);
    container.appendChild(section);
}

// --- LOGICA DO MENU (ANOS E MESES) ---

const abrirMenu = document.querySelector(".abrir-menu");
const anosLista = document.getElementById("anosLista");

for (let ano = inicioAno; ano <= fimAno; ano++) {
    const anoGroup = document.createElement("div");
    anoGroup.style.marginBottom = "10px";

    const btnAno = document.createElement("button");
    btnAno.classList.add("ano-btn");
    btnAno.textContent = ano;
    btnAno.addEventListener("click", () => {
        const destino = document.getElementById(`ano-${ano}`);
        if(destino) container.scrollTo({ top: destino.offsetTop, behavior: "smooth" });
        anosLista.classList.remove("ativo");
    });
    anoGroup.appendChild(btnAno);

    // Grid de meses dentro do menu
    const mesesGrid = document.createElement("div");
    mesesGrid.classList.add("meses-lista"); // Use o estilo CSS fornecido anteriormente
    
    let mInicial = (ano === inicioAno) ? inicioMes : 0;
    let mFinal = (ano === fimAno) ? fimMes : 11;

    for (let m = mInicial; m <= mFinal; m++) {
        const btnMes = document.createElement("button");
        btnMes.classList.add("mes-btn");
        btnMes.textContent = meses[m].substring(0, 3);
        btnMes.addEventListener("click", (e) => {
            e.stopPropagation();
            const destino = document.querySelector(`section[data-data="${m}-${ano}"]`);
            if(destino) container.scrollTo({ top: destino.offsetTop, behavior: "smooth" });
            anosLista.classList.remove("ativo");
        });
        mesesGrid.appendChild(btnMes);
    }
    anoGroup.appendChild(mesesGrid);
    anosLista.appendChild(anoGroup);
}

// --- MODAL E EVENTOS ---

const modal = document.getElementById("modalInfo");
const spanFechar = document.querySelector(".fechar");

function abrirModal(dia, mes, ano) {
    const chave = `${dia}-${mes}-${ano}`;
    const info = informacoesDatas[chave];

    if(info) {
        document.getElementById("modalTitulo").textContent = info.titulo;
        document.getElementById("modalDescricao").textContent = info.desc;
        
        // Seleciona o container onde as imagens devem ficar
        const containerImagens = document.querySelector(".modal-imagens");
        
        // Limpa as imagens antigas para não acumular fotos de cliques anteriores
        containerImagens.innerHTML = "";

        // Verifica se existem fotos cadastradas nesta data
        if(info.fotos && info.fotos.length > 0) {
            // Cria uma tag <img> para cada foto que você colocou na lista daquela data
            info.fotos.forEach((fotoUrl, index) => {
                const novaImg = document.createElement("img");
                
                // IMPORTANTE: Ajuste o caminho se suas fotos estiverem dentro de uma pasta (ex: "imgs/" + fotoUrl)
                novaImg.src = fotoUrl; 
                novaImg.alt = `${info.titulo} - Imagem ${index + 1}`;
                
                // Adiciona a nova imagem dentro do modal
                containerImagens.appendChild(novaImg);
            });
        }
        
        modal.style.display = "flex";
    }
}

spanFechar.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

abrirMenu.addEventListener("click", () => anosLista.classList.toggle("ativo"));
document.addEventListener("click", (e) => {
    if(!e.target.closest(".menu-anos")) anosLista.classList.remove("ativo");
});

// Auto-scroll para o final
setTimeout(() => { container.scrollTop = container.scrollHeight; }, 100);