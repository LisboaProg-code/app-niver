const blocos = document.querySelectorAll(".bloco");

blocos.forEach(bloco => {

    bloco.addEventListener("click", () => {

        // fecha todos
        blocos.forEach(item => {

            if(item !== bloco){
                item.classList.remove("ativo");
            }

        });

        // abre o clicado
        bloco.classList.toggle("ativo");

    });

});

/* ===== BOTÃO VOLTAR ===== */

const botoes = document.querySelectorAll(".voltar");

botoes.forEach(botao => {

    botao.addEventListener("click", (e) => {

        e.stopPropagation();

        botao.closest(".bloco")
        .classList.remove("ativo");

    });

});