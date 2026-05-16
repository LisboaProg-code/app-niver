const meusVideos = [
    {
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/v1778897964/3bca561e90ff4d64909bcb2df6a67142_uf8hez.mp4',
        perfil: 'imgs/perfil1.jpg', // Adicione o caminho da foto de cada um aqui
        user: '@MeuAmor',
        legenda: 'Ops sensualizei #ops',
        republicado: true,
        curtidas: '100k',
        comentarios: '12.5k',
        salvos: '15.2K',
        compartilhados: '12k'
    },
    {
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/f_mp4/v1778893910/3E6D21B6-64B6-4D27-8DC6-230A4D4F10B4_u8vav7.mp4',
        perfil: 'imgs/perfil2.jpg',
        user: '@LíviaLindona',
        legenda: 'Clara alienígina #KAKAKAKA',
        republicado: true,
        curtidas: '2.5M',
        comentarios: '12K',
        salvos: '500K',
        compartilhados: '25K'
    },
    {
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/f_mp4/v1778893812/fb0e13af1ba0432fb04e12f7ccd3e9dc_mh5fpz.mp4',
        perfil: 'imgs/perfil3.jpg',
        user: '@MulherLindona',
        legenda: 'Eu de tranças #tranças',
        republicado: true,
        curtidas: '5.5M',
        comentarios: '50K',
        salvos: '200K',
        compartilhados: '250K'
    },
    {
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/f_mp4/v1778893660/25767321a17f45bebcd71ead8a07b5b7_b3ajq3.mp4',
        perfil: 'imgs/perfil4.jpg',
        user: '@Linducha',
        legenda: 'Namorando #FuiPedidaEmNamoro',
        republicado: true,
        curtidas: '2M',
        comentarios: '50K',
        salvos: '250K',
        compartilhados: '205K'
    },
    {
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/f_mp4/v1778893602/76e1e155d94c47cd9d576db9c9b1888e_sdkyuv.mp4',
        perfil: 'imgs/perfil5.jpg',
        user: '@GinastaFodona',
        legenda: 'Eu de laço #cabeloCurto',
        republicado: true,
        curtidas: '7M',
        comentarios: '6M',
        salvos: '2M',
        compartilhados: '3M'
    },
    {
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/f_mp4/v1778893582/44a55e2e4f6646b7844f8328bd65a50a_rfv0jp.mp4',
        perfil: 'imgs/perfil6.jpg',
        user: '@CabeloLiso',
        legenda: 'Eu de cabelo liso #liso',
        republicado: true,
        curtidas: '1M',
        comentarios: '50k',
        salvos: '50K',
        compartilhados: '250K'
    },
    {
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/f_mp4/v1778893598/45a59d3d38544b0b8f54bf80e3dbbea6_mwvyvx.mp4',
        perfil: 'imgs/perfil7.jpg',
        user: '@Boobie&Goods',
        legenda: 'Eu e minha labubu #labubonica',
        republicado: true,
        curtidas: '5M',
        comentarios: '120K',
        salvos: '502K',
        compartilhados: '225K'
    },
    {
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/f_mp4/v1778895261/5ad802931a6f48c8b8986a6e46136613_dh8jjs.mp4',
        perfil: 'imgs/perfil8.jpg',
        user: '@Escola',
        legenda: 'Franklin dançando #dancagatinho',
        republicado: true,
        curtidas: '3M',
        comentarios: '312K',
        salvos: '300K',
        compartilhados: '225K'
    },
    {
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/f_mp4/v1778893549/16e6ac1fd188460ab5a7b58c4a5d056d_wvqa4a.mp4',
        perfil: 'imgs/perfil9.jpg',
        user: '@Deusa',
        legenda: 'Eu de cabelo liso 2 #medoAlisamentoTermico',
        republicado: true,
        curtidas: '2.6M',
        comentarios: '122K',
        salvos: '500K',
        compartilhados: '252K'
    },
    {
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/v1778899220/WhatsApp_Video_2026-05-15_at_23.38.21_smcxbf.mp4',
        perfil: 'imgs/perfil10.jpg',
        user: '@MaquiagemMaisLinda',
        legenda: 'Eu com a maquiagem mais linda #arrasei',
        republicado: true,
        curtidas: '2.1M',
        comentarios: '112K',
        salvos: '210K',
        compartilhados: '125K'
    },
    {
        url: 'https://res.cloudinary.com/dysi7pelw/video/upload/v1778899220/WhatsApp_Video_2026-05-15_at_23.39.05_atpcgs.mp4',
        perfil: 'imgs/perfil11.jpg',
        user: '@sixseven',
        legenda: 'Bob dos ovao #ovaograndao',
        republicado: true,
        curtidas: '10M',
        comentarios: '2M',
        salvos: '5M',
        compartilhados: '5M'
    }
];

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
            
            if (somLiberadoPeloUsuario) {
                video.removeAttribute('muted');
                video.muted = false;
                video.volume = 1.0;
            } else {
                video.muted = true;
            }

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

        const elementoMidia = `<video data-src="${video.url}" muted loop playsinline></video>`;

        section.innerHTML = `
            ${elementoMidia}
            
            ${video.republicado ? `
                <div class="repostado-wrapper">
                    <div class="repostado-tag">
                        <!-- Pega a foto correspondente do array para a bolinha do republicado -->
                        <div class="ft-republicado" style="background-image: url('${video.perfil}');"></div>
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
                    <!-- Injeta a foto de perfil dinamicamente como background -->
                    <div class="foto-perfil" style="background-image: url('${video.perfil}');"></div>
                    
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

// --- EVENTO DE CLIQUE DO FEED ---
document.getElementById('feed').addEventListener('click', (e) => {
    if (e.target.closest('.menu-lateral') || e.target.closest('.creditos') || e.target.closest('.return') || e.target.closest('.search') || e.target.closest('.repostado-wrapper')) {
        return; 
    }

    const slideAtual = e.target.closest('.slide');
    if (!slideAtual) return;

    const videoAtual = slideAtual.querySelector('video');

    if (videoAtual) {
        if (!somLiberadoPeloUsuario) {
            somLiberadoPeloUsuario = true;
            
            document.querySelectorAll('video').forEach(v => {
                v.removeAttribute('muted');
                v.muted = false;
                v.volume = 1.0;
            });
            
            videoAtual.muted = false;
            videoAtual.volume = 1.0;
            videoAtual.play().catch(err => console.log(err));
        } else {
            if (videoAtual.paused) {
                videoAtual.play().catch(err => console.log(err));
            } else {
                videoAtual.pause();
            }
        }
    }
});