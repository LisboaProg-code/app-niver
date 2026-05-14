const meusVideos = [
    {
        url: 'caminho/do/seu-video-1.mp4',
        user: '@lisboa',
        legenda: 'Um dia especial com você ❤️ #amor',
        republicado: true,
        curtidas: '15.2K',
        comentarios: '842',
        salvos: '1.2K',
        compartilhados: '150'
    },
    {
        url: 'caminho/do/seu-video-2.mp4',
        user: '@amor',
        legenda: 'Nossa música favorita 🎵',
        republicado: false,
        curtidas: '2.5M',
        comentarios: '12K',
        salvos: '500K',
        compartilhados: '25K'
    }
];

function carregarVideos() {
    const feed = document.getElementById('feed');
    feed.innerHTML = ''; // Limpa o feed antes de carregar

    meusVideos.forEach(video => {
        const section = document.createElement('section');
        section.classList.add('slide');

        section.innerHTML = `
            <video src="${video.url}" loop playsinline></video>
            
            ${video.republicado ? `
                <div class="repostado-wrapper">
                    <div class="repostado-tag">
                        <div class="ft-republicado"></div>
                        <p>Republicado por Lisboa</p>
                    </div>
                    <i class="ri-repeat-2-line icone-fora"></i>
                </div>` : ''}

            <div class="overlay">
                <div class="creditos">
                    <p>${video.user}</p>
                    <p>${video.legenda}</p>
                </div>

                <div class="menu-lateral">
                    <div class="foto-perfil"></div>
                    
                    <div class="item-lateral curtida">
                        <i class="ri-heart-fill"></i>
                        <span>${video.curtidas}</span>
                    </div>
                    
                    <div class="item-lateral">
                        <i class="ri-chat-3-fill"></i>
                        <span>${video.comentarios}</span>
                    </div>
                    
                    <div class="item-lateral">
                        <i class="ri-bookmark-fill"></i>
                        <span>${video.salvos}</span>
                    </div>
                    
                    <div class="item-lateral">
                        <i class="ri-share-forward-fill"></i>
                        <span>${video.compartilhados}</span>
                    </div>
                </div>
            </div>
        `;
        feed.appendChild(section);
    });

    // É necessário re-selecionar os vídeos após criá-los dinamicamente
    const videosNaTela = document.querySelectorAll('video');
    videosNaTela.forEach(video => observer.observe(video));
}

// Chame a função após definir o observer
carregarVideos();