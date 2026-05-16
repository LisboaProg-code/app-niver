let touchStartY = 0;
let isDragging = false;

document.addEventListener('DOMContentLoaded', () => {
  const mainScreen = document.getElementById('main-lock-screen');
  const lockScreen = document.getElementById('lock-screen');

  // --- VERIFICAÇÃO DE SESSÃO ---
  // Se ela já digitou a senha antes, esconde as duas telas direto sem animação
  if (sessionStorage.getItem('siteDesbloqueado') === 'true') {
    if (mainScreen) mainScreen.style.display = 'none';
    if (lockScreen) lockScreen.style.display = 'none';
    document.body.style.overflow = 'auto';
    return; // Para a execução do código aqui
  }

  if (mainScreen) {
    // 1. FUNCIONAMENTO NO CELULAR (Touch)
    mainScreen.addEventListener('touchstart', e => {
      touchStartY = e.touches[0].clientY;
    });
    
    mainScreen.addEventListener('touchend', e => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (diff > 60) {
        subirTelaLock();
      }
    });

    // 2. FUNCIONAMENTO NO COMPUTADOR (Arrastar com o Mouse)
    mainScreen.addEventListener('mousedown', e => {
      touchStartY = e.clientY;
      isDragging = true;
    });

    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const diff = touchStartY - e.clientY;
      if (diff > 60) {
        subirTelaLock();
        isDragging = false;
      }
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // 3. FUNCIONAMENTO NO COMPUTADOR (Rolar o Scroll do mouse para baixo)
    window.addEventListener('wheel', e => {
      if (e.deltaY > 0 && !mainScreen.classList.contains('hidden')) {
        subirTelaLock();
      }
    });

    // 4. FUNCIONAMENTO NO COMPUTADOR (Apertar qualquer tecla)
    window.addEventListener('keydown', () => {
      if (!mainScreen.classList.contains('hidden')) {
        subirTelaLock();
      }
    });
  }
});

// Função para subir a tela do relógio
function subirTelaLock() {
  const mainScreen = document.getElementById('main-lock-screen');
  if (mainScreen) {
    mainScreen.classList.add('hidden');
  }
}

// --- CONFIGURAÇÃO DA SENHA DE 6 DÍGITOS ---
const SENHA_CORRETA = "742404"; 
let senhaDigitada = "";

function pressKey(num) {
  if (senhaDigitada.length < 6) {
    senhaDigitada += num;
    atualizarBolinhas();
    
    if (senhaDigitada.length === 6) {
      setTimeout(validarSenha, 200); 
    }
  }
}

function deleteKey() {
  if (senhaDigitada.length > 0) {
    senhaDigitada = senhaDigitada.slice(0, -1);
    atualizarBolinhas();
  }
}

function atualizarBolinhas() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index < Array.from(senhaDigitada).length) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function validarSenha() {
  const lockScreen = document.getElementById('lock-screen');
  const container = document.querySelector('.lock-container');

  if (senhaDigitada === SENHA_CORRETA) {
    // SALVA A SESSÃO: Diz ao navegador que o site já foi desbloqueado
    sessionStorage.setItem('siteDesbloqueado', 'true');

    // Sucesso: Esconde o teclado e libera a home
    lockScreen.classList.add('lock-screen-hidden');
    document.body.style.overflow = 'auto'; 
  } else {
    // Erro: Tremedeira do iOS e limpa os campos
    container.classList.add('shake');
    
    setTimeout(() => {
      container.classList.remove('shake');
      senhaDigitada = "";
      atualizarBolinhas();
    }, 400);
  }
}