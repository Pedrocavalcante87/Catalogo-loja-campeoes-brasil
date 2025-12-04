const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQs2XSIALiN2xZ0MgG0GJwMwiuGyA-oJexA4qPdWzPrFqJFWujjeik7Dk3BmYkUlepSV2LkoMUBJkL_/pub?output=csv";

// Ocultar loading ao carregar
document.addEventListener('DOMContentLoaded', () => {
  const loadingState = document.getElementById('loadingState');
  if (loadingState) loadingState.style.display = 'flex';
});

fetch(sheetURL)
  .then(response => response.text())
  .then(data => {
    const linhas = data.split('\n').slice(1);
    const grid = document.getElementById('gridProdutos');
    const loadingState = document.getElementById('loadingState');
    const productCount = document.getElementById('productCount');
    
    // Ocultar loading
    if (loadingState) loadingState.style.display = 'none';
    
    // Criar modal premium se não existir
    if (!document.getElementById('imgModal')) {
      const modal = document.createElement('div');
      modal.id = 'imgModal';
      modal.className = 'hidden fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in';
      modal.innerHTML = `
        <div class="relative max-w-7xl mx-auto px-4">
          <button id="imgModalClose" class="absolute -top-12 right-4 bg-white hover:bg-gray-100 text-black rounded-full w-12 h-12 flex items-center justify-center shadow-2xl transition-all hover:scale-110 font-bold text-2xl">
            ×
          </button>
          <img id="imgModalImg" src="" alt="Imagem ampliada" class="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl animate-zoom-in">
        </div>
      `;
      document.body.appendChild(modal);
      
      // Eventos do modal
      const closeBtn = document.getElementById('imgModalClose');
      closeBtn.onclick = () => modal.classList.add('hidden');
      modal.onclick = (e) => {
        if (e.target === modal) modal.classList.add('hidden');
      };
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modal.classList.add('hidden');
      });
    }

    let produtosValidos = 0;
    linhas.forEach((linha, index) => {
      let [nome, preco, imagem, codigo] = linha.split(',');
      
      if (imagem) imagem = imagem.replace(/"/g, '').trim();
      
      if (nome && nome.trim()) {
        produtosValidos++;
        const card = document.createElement('div');
        card.className = "group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in";
        card.style.animationDelay = `${index * 0.05}s`;
        card.innerHTML = `
          <div class="relative overflow-hidden aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200">
            <img src="${imagem}" 
                 alt="Camisa ${nome} - Loja Campeões Brasil" 
                 loading="lazy" 
                 class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27400%27 height=%27500%27%3E%3Crect fill=%27%23f3f4f6%27 width=%27400%27 height=%27500%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 font-family=%27Arial%27 font-size=%2720%27 fill=%27%23666%27%3ESem imagem%3C/text%3E%3C/svg%3E'">
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
            <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="bg-white/90 backdrop-blur-sm text-black px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                </svg>
                Ver ampliado
              </div>
            </div>
          </div>
          <div class="p-5 space-y-4">
            <div class="space-y-2">
              <h3 class="font-display text-lg md:text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-black transition">${nome}</h3>
              <div class="flex items-baseline gap-2">
                <span class="text-2xl md:text-3xl font-bold text-black">R$ ${preco}</span>
                <span class="text-xs text-gray-500">à vista</span>
              </div>
            </div>
            <a href="https://wa.me/5522996037657?text=Olá!%20Gostaria%20de%20comprar%20a%20camisa%20${encodeURIComponent(nome)}%20(código:%20${codigo}).%0A%0APor%20favor,%20informe%20os%20dados%20abaixo:%0A-%20Nome%20completo:%0A-%20Telefone:%0A-%20CPF:%0A-%20Endereço:%0A-%20CEP:%0A-%20Forma%20de%20pagamento%20(Pix%20ou%20Cartão):"
               target="_blank"
               class="group/btn relative w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold overflow-hidden transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <span class="relative z-10 flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.1 3.2 5.077 4.348.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.075-.124-.272-.198-.57-.347m-5.421 7.617h-.001a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.954.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.455 4.436-9.89 9.893-9.89 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.991c-.003 5.453-4.438 9.888-9.895 9.888m8.413-18.303a11.815 11.815 0 0 0-8.414-3.488c-6.627 0-12.021 5.393-12.024 12.018a11.96 11.96 0 0 0 1.633 6.006l-1.086 3.966a1 1 0 0 0 1.237 1.237l4.003-1.07a11.96 11.96 0 0 0 5.819 1.482h.005c6.627 0 12.021-5.393 12.024-12.019a11.82 11.82 0 0 0-3.487-8.132"/>
                </svg>
                Comprar pelo WhatsApp
                <svg class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
            </a>
          </div>
        `;
        
        // Evento para abrir modal
        card.querySelector('img').addEventListener('click', function() {
          const modal = document.getElementById('imgModal');
          const modalImg = document.getElementById('imgModalImg');
          modalImg.src = imagem;
          modal.classList.remove('hidden');
        });
        
        grid.appendChild(card);
      }
    });
    
    // Atualizar contador de produtos
    if (productCount) {
      productCount.textContent = `${produtosValidos} produtos disponíveis`;
    }
  })
  .catch(error => {
    console.error('Erro ao carregar produtos:', error);
    const loadingState = document.getElementById('loadingState');
    if (loadingState) {
      loadingState.innerHTML = `
        <div class="text-center">
          <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-gray-600 font-medium">Erro ao carregar produtos</p>
          <button onclick="location.reload()" class="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">Tentar novamente</button>
        </div>
      `;
    }
  });
