const informacoesDatas = {
    "20-4-2024": {
        titulo: "Viagem para a Praia",
        desc: "Dia incrível de sol com a galera.",
        fotos: ["praia1.jpg", "praia2.jpg"]
    },
    "14-4-2026": {
        titulo: "Aniversário",
        desc: "Comemorando mais um ano!",
        fotos: ["bolo.jpg", "festa.jpg"]
    }
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
        
        const imgs = document.querySelectorAll(".modal-imagens img");
        if(info.fotos && imgs.length >= 2) {
            imgs[0].src = info.fotos[0];
            imgs[1].src = info.fotos[1];
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