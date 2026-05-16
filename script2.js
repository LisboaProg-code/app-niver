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

    // BANCO DE DADOS DE FOTOS: Cada número aqui corresponde ao 'data-id' do HTML
    // Substitua os links de exemplo abaixo pelas URLs reais das suas fotos no Cloudinary
    const fotosPorAlbum = {
        0: [ // Fotos do álbum "Momentos Lindos" (data-id="0")
            "https://res.cloudinary.com/dysi7pelw/image/upload/f_auto,q_auto/v1778902488/eu-elaaaaaa_a8eby4.jpg",
            "https://res.cloudinary.com/dysi7pelw/image/upload/v1778902492/alianca_dngchd.jpg",
            "https://res.cloudinary.com/dysi7pelw/image/upload/v1778902491/alien_z6opnc.jpg",
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902492/eu-e-elaa_zvfzf9.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902491/alianca2_hzxcde.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902488/eu-e-ela-abracado_fuz1bh.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902487/eu-e-ela-escola_zu2oge.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902486/ela-dormindo_gdqxjd.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902486/noises_hqr8td.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902488/flordomeuamor_gadka6.jpg'
        ],
        1: [ // Fotos do álbum "Nossas Viagens" (data-id="1")
            "https://res.cloudinary.com/dysi7pelw/image/upload/v1778902486/lian-sogra_pvbp1g.jpg",
            "https://res.cloudinary.com/dysi7pelw/image/upload/v1778902486/lian3_ymrda4.jpg",
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902483/lian_aiq3kw.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902483/sogro-lian-brendo_oqfbfy.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902483/gio_o92en7.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902482/amor-sogra_wzo3jl.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902482/prims_lcvgtj.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902481/ela-sogro_qcwn35.jpg'
        ],
        2: [ // Fotos do álbum "Dates Especiais" (data-id="2")
            "https://res.cloudinary.com/dysi7pelw/image/upload/v1778902481/emilly5_jfaoi6.jpg",
            "https://res.cloudinary.com/dysi7pelw/image/upload/v1778902480/emilly3_finyr3.jpg",
            "https://res.cloudinary.com/dysi7pelw/image/upload/v1778902479/emilly_nzvoib.jpg",
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902479/l-j-c_tlyejh.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902479/l-c_xprpnl.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902478/emilly4_hvv2rp.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902478/esther_wqunmu.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902477/esther3_m65rln.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902476/emilly2_uis4v9.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902476/esther2_xj4wa0.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902474/l-c-_jlvmxu.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902474/lislayne_wla3je.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902474/ryan_tx8v9w.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902473/emilly6_wnkhpx.jpg'
        ],
        3: [ // Fotos do álbum "Zueiras Nossas" (data-id="3")
            "https://res.cloudinary.com/dysi7pelw/image/upload/v1778903483/WhatsApp_Image_2026-05-15_at_23.36.51_1_zsm1ma.jpg",
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902473/ginastica_m70j7q.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902472/amulhermaislinda_moyhhu.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902472/amorrrr_xvrxal.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902441/amor-cabelo-curto_t5a0ev.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902441/amor-lindo_t9xylg.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902440/unha-namoro_pmcpbp.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902440/meuwallpaper_sarc0w.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902440/meu-amor_z8jxne.jpg',
            'https://res.cloudinary.com/dysi7pelw/image/upload/v1778902440/formatura_xlyq96.jpg'
        ]
    };

    // Função para abrir a imagem em tela cheia
    function openImage(src) {
        fullImage.src = src;
        imageViewer.style.display = 'flex';
    }

    // Configura o evento de clique para cada álbum
    albuns.forEach((album) => {
        album.addEventListener('click', () => {
            const titulo = album.querySelector('h1').innerText;
            // Pega o ID numérico definido no HTML (data-id)
            const idAlbum = album.getAttribute('data-id');
            
            overlayTitle.innerText = titulo;
            photoGrid.innerHTML = ''; // Limpa as fotos do álbum anterior

            // Busca as fotos do álbum clicado. Se não houver fotos cadastradas no ID, retorna um array vazio []
            const fotosDoAlbumAtual = fotosPorAlbum[idAlbum] || [];

            // Renderiza as fotos dinamicamente dentro da grid
            fotosDoAlbumAtual.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                
                // Evento para expandir a imagem individual
                img.addEventListener('click', (e) => {
                    e.stopPropagation(); // Evita conflitos de cliques com elementos pai
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

    // Fechar o Visualizador de Imagem
    closeViewer.addEventListener('click', () => {
        imageViewer.style.display = 'none';
        fullImage.src = ''; 
    });

    // Fechar ao clicar fora da imagem (no fundo preto)
    imageViewer.addEventListener('click', (e) => {
        if (e.target === imageViewer) {
            imageViewer.style.display = 'none';
            fullImage.src = '';
        }
    });
});