const meusVideos = [
    {
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/3bca561e90ff4d64909bcb2df6a67142_gpxqvn.mp4',
        user: '@lisboa',
        legenda: 'Um dia especial com você ❤️ #amor',
        republicado: true,
        curtidas: '15.2K',
        comentarios: '842',
        salvos: '1.2K',
        compartilhados: '150'
    },
    {
        // vc_h264,ac_aac reconstrói o áudio perfeitamente a partir do .mov do iPhone
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/vc_h264,ac_aac/v1778893910/3E6D21B6-64B6-4D27-8DC6-230A4D4F10B4_u8vav7.mp4',
        user: '@amor',
        legenda: 'Nossa música favorita 🎵',
        republicado: false,
        curtidas: '2.5M',
        comentarios: '12K',
        salvos: '500K',
        compartilhados: '25K'
    },
    {
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/vc_h264,ac_aac/v1778893812/fb0e13af1ba0432fb04e12f7ccd3e9dc_mh5fpz.mp4',
        user: '@amor',
        legenda: 'Nossa música favorita 🎵',
        republicado: false,
        curtidas: '2.5M',
        comentarios: '12K',
        salvos: '500K',
        compartilhados: '25K'
    },
    {
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/vc_h264,ac_aac/v1778893660/25767321a17f45bebcd71ead8a07b5b7_b3ajq3.mp4',
        user: '@amor',
        legenda: 'Nossa música favorita 🎵',
        republicado: false,
        curtidas: '2.5M',
        comentarios: '12K',
        salvos: '500K',
        compartilhados: '25K'
    },
    {
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/vc_h264,ac_aac/v1778893602/76e1e155d94c47cd9d576db9c9b1888e_sdkyuv.mp4',
        user: '@amor',
        legenda: 'Nossa música favorita 🎵',
        republicado: false,
        curtidas: '2.5M',
        comentarios: '12K',
        salvos: '500K',
        compartilhados: '25K'
    },
    {
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/vc_h264,ac_aac/v1778893582/44a55e2e4f6646b7844f8328bd65a50a_rfv0jp.mp4',
        user: '@amor',
        legenda: 'Nossa música favorita 🎵',
        republicado: false,
        curtidas: '2.6M',
        comentarios: '12K',
        salvos: '500K',
        compartilhados: '25K'
    },
    {
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/vc_h264,ac_aac/v1778893598/45a59d3d38544b0b8f54bf80e3dbbea6_mwvyvx.mp4',
        user: '@amor',
        legenda: 'Nossa música favorita 🎵',
        republicado: false,
        curtidas: '2.6M',
        comentarios: '12K',
        salvos: '500K',
        compartilhados: '25K'
    },
    {
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/vc_h264,ac_aac/v1778895261/5ad802931a6f48c8b8986a6e46136613_dh8jjs.mp4',
        user: '@amor',
        legenda: 'Nossa música favorita 🎵',
        republicado: false,
        curtidas: '2.6M',
        comentarios: '12K',
        salvos: '500K',
        compartilhados: '25K'
    },
    {
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/vc_h264,ac_aac/v1778893549/16e6ac1fd188460ab5a7b58c4a5d056d_wvqa4a.mp4',
        user: '@amor',
        legenda: 'Nossa música favorita 🎵',
        republicado: false,
        curtidas: '2.6M',
        comentarios: '12K',
        salvos: '500K',
        compartilhados: '25K'
    }
];

// Variável global para sabermos se o usuário já liberou o som alguma vez na sessão
let somLiberadoPeloUsuario = false;

// --- INTERSECTION OBSERVER ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        
        if (entry.isIntersecting) {
            if (!video.src && video.dataset.src) {
                video.src = video.dataset.src;
                video.load();
            }
            
            // Se o usuário já liberou o som antes, os próximos já entram com som!
            video.muted = !somLiberadoPeloUsuario;
            video.volume = 1.0;

            video.play().catch(() => {
                console.log("Autoplay retido pelo navegador.");
            });
        } else {
            video.pause();
            video.currentTime = 0; 
            
            if (video.src) {
                video.dataset.src = video.src; 
                video.removeAttribute('src');  
                video.load();                  
            }
        }
    });
}, { 
    threshold: 0.6 
});

function carregarVideos() {
    const feed = document.getElementById('feed');
    feed.innerHTML = ''; 

    meusVideos.forEach(video => {
        const section = document.createElement('section');
        section.classList.add('slide');

        // Tag de vídeo pura e limpa
        const elementoMidia = `<video data-src="${video.url}" muted loop playsinline></video>`;

        section.innerHTML = `
            ${elementoMidia}
            
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

    const videosNaTela = document.querySelectorAll('video');
    videosNaTela.forEach(video => observer.observe(video));
}

carregarVideos();

// --- SOLUÇÃO DEFINITIVA: ESCUTA GLOBAL DE TOQUE NO FEED INTEIRO ---
document.getElementById('feed').addEventListener('click', (e) => {
    // Se clicar nos botões laterais ou links, deixa o clique funcionar normal
    if (e.target.closest('.menu-lateral') || e.target.closest('.creditos') || e.target.closest('.return') || e.target.closest('.search') || e.target.closest('.repostado-wrapper')) {
        return; 
    }

    // Procura o slide onde o clique aconteceu
    const slideAtual = e.target.closest('.slide');
    if (!slideAtual) return;

    const videoAtual = slideAtual.querySelector('video');

    if (videoAtual) {
        if (!somLiberadoPeloUsuario) {
            // Ativa o sistema global de som
            somLiberadoPeloUsuario = true;
            
            // Desmuta TODOS os vídeos do documento para garantir que o navegador libere o canal de áudio
            document.querySelectorAll('video').forEach(v => {
                v.muted = false;
                v.volume = 1.0;
            });
            
            // Garante o play com áudio no vídeo atual
            videoAtual.muted = false;
            videoAtual.volume = 1.0;
            videoAtual.play().catch(err => console.log(err));
            console.log("Canal de áudio desbloqueado globalmente!");
        } else {
            // Se o som já foi liberado antes, funciona como Play/Pause comum do TikTok
            if (videoAtual.paused) {
                videoAtual.play().catch(err => console.log(err));
            } else {
                videoAtual.pause();
            }
        }
    }
});