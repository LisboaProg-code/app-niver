document.addEventListener('DOMContentLoaded', () => {
    const albuns = document.querySelectorAll('.album');
    const overlay = document.getElementById('albumOverlay');
    const closeBtn = document.getElementById('closeOverlay');
    const overlayTitle = document.getElementById('overlayTitle');
    const photoGrid = document.getElementById('photoGrid');

    // Seletores do Visualizador de Imagem (Lightbox)
    const imageViewer = document.getElementById('imageViewer');
    const fullImage = document.getElementById('fullImage');
    const closeViewer = document.getElementById('closeViewer');

    // Simulação de fotos
    const fotosDummy = [
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300"
    ];

    // Função para abrir a imagem em tela cheia
    function openImage(src) {
        fullImage.src = src;
        imageViewer.style.display = 'flex';
    }

    albuns.forEach((album, index) => {
        album.addEventListener('click', () => {
            const titulo = album.querySelector('h1').innerText;
            overlayTitle.innerText = titulo;
            
            // Limpa e carrega as fotos
            photoGrid.innerHTML = '';
            fotosDummy.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                
                // --- NOVO: Evento para expandir a imagem individual ---
                img.addEventListener('click', (e) => {
                    e.stopPropagation(); // Evita que o clique afete elementos pai
                    openImage(url);
                });

                photoGrid.appendChild(img);
            });

            // Mostra o overlay do álbum
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden'; 
        });
    });

    // Fechar o Álbum
    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    });

    // --- NOVO: Fechar o Visualizador de Imagem ---
    closeViewer.addEventListener('click', () => {
        imageViewer.style.display = 'none';
        fullImage.src = ''; // Limpa o src para economizar memória
    });

    // Fechar ao clicar fora da imagem (no fundo preto)
    imageViewer.addEventListener('click', (e) => {
        if (e.target === imageViewer) {
            imageViewer.style.display = 'none';
            fullImage.src = '';
        }
    });
});