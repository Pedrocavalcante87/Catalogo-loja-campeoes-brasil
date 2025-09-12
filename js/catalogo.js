
// Link da planilha publicada como CSV
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQs2XSIALiN2xZ0MgG0GJwMwiuGyA-oJexA4qPdWzPrFqJFWujjeik7Dk3BmYkUlepSV2LkoMUBJkL_/pub?output=csv";

fetch(sheetURL)
  .then(response => response.text())
  .then(data => {
    const linhas = data.split('\n').slice(1); // ignora cabeçalho
    const grid = document.getElementById('gridProdutos');

    // Adiciona modal ao body se não existir
    if (!document.getElementById('imgModal')) {
      const modal = document.createElement('div');
      modal.id = 'imgModal';
      modal.style.display = 'none';
          modal.innerHTML = `
            <div id="imgModalOverlay" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;">
              <div style="position:relative;display:flex;flex-direction:column;align-items:center;">
                <button id="imgModalClose" style="position:absolute;top:-2.5rem;right:0;background:#fff;color:#222;border:none;border-radius:50%;width:2.5rem;height:2.5rem;font-size:1.5rem;box-shadow:0 2px 8px #000;cursor:pointer;display:flex;align-items:center;justify-content:center;">&times;</button>
                <img id="imgModalImg" src="" alt="Imagem ampliada" style="max-width:90vw;max-height:80vh;border-radius:1rem;box-shadow:0 0 32px #000;">
              </div>
            </div>
          `;
          // Adiciona evento ao botão de fechar
          setTimeout(() => {
            const closeBtn = document.getElementById('imgModalClose');
            if (closeBtn) {
              closeBtn.onclick = function() {
                modal.style.display = 'none';
              };
            }
          }, 100);
      document.body.appendChild(modal);
      // Fecha ao clicar fora da imagem
      modal.addEventListener('click', function(e) {
        if (e.target.id === 'imgModalOverlay') {
          modal.style.display = 'none';
        }
      });
    }

    linhas.forEach(linha => {
      let [nome, preco, imagem, codigo] = linha.split(',');
      // Remove aspas e espaços extras do link da imagem
      if (imagem) {
        imagem = imagem.replace(/"/g, '').trim();
      }

      if(nome) {
        const card = document.createElement('div');
        card.className = "bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition";
        card.innerHTML = `
          <img src="${imagem}" alt="Camisa ${nome} - Loja Campeões Brasil" loading="lazy" class="w-full h-64 object-cover cursor-zoom-in" style="cursor:pointer">
          <div class="p-4 text-center">
            <h3 class="text-xl font-semibold mb-1">${nome}</h3>
            <p class="text-gray-700 mb-4">R$ ${preco}</p>
            <a href="https://wa.me/5522996037657?text=Olá! Gostaria de comprar a camisa ${nome} (código: ${codigo}).%0A%0APor favor, informe os dados abaixo:%0A- Nome completo:%0A- Telefone:%0A- CPF:%0A- Endereço:%0A- Cep%0A- Forma de pagamento (Pix ou Cartão):"
               target="_blank"
               class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
              Comprar no WhatsApp
            </a>
          </div>
        `;
        // Adiciona evento para abrir modal ao clicar na imagem
        card.querySelector('img').addEventListener('click', function() {
          const modal = document.getElementById('imgModal');
          const modalImg = document.getElementById('imgModalImg');
          modalImg.src = imagem;
          modal.style.display = 'block';
        });
        grid.appendChild(card);
      }
    });
  });
