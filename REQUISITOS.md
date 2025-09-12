# Documento de Requisitos – Catálogo Loja de Camisas

## 1. Descrição Geral
O sistema é um catálogo online de camisas de futebol, desenvolvido em HTML, CSS e JavaScript. Ele apresenta uma interface responsiva, profissional e minimalista, permitindo que usuários visualizem produtos, imagens ampliadas e naveguem facilmente pelo catálogo.

## 2. Funcionalidades
- Exibição de produtos em grid responsivo.
- Visualização ampliada das imagens dos produtos via modal.
- Navegação por sidebar com ícones profissionais.
- Layout adaptado para dispositivos móveis e desktop.
- Integração com planilha Google Sheets para atualização dinâmica dos produtos.

## 3. Limitações
- O sistema não possui backend próprio; toda a lógica é client-side.
- Não há sistema de login, carrinho ou pagamento.
- A atualização dos produtos depende da planilha Google Sheets.
- Não há proteção contra edição indevida da planilha.
- O site não armazena dados do usuário.

## 4. Integração com Planilhas Google
- Os dados dos produtos (nome, imagem, preço, etc.) são carregados de uma planilha Google Sheets pública.
- Para alterar os produtos exibidos, o usuário deve acessar a planilha vinculada ao sistema.
- A planilha deve estar configurada como "pública para leitura" para que o site consiga acessar os dados.
- O link da planilha está definido no código JavaScript (`js/catalogo.js`).

### Como o usuário pode alterar os produtos:
1. Acesse a planilha Google Sheets vinculada ao sistema.
2. Edite, adicione ou remova linhas conforme necessário (cada linha representa um produto).
3. Salve as alterações na planilha.
4. O site irá refletir as mudanças automaticamente ao ser recarregado.

**Observação:**
- Para trocar a planilha, é necessário alterar o link no código JavaScript e publicar novamente o site.
- Recomenda-se manter o formato das colunas igual ao original para evitar erros de exibição.

## 5. Requisitos Técnicos
- Navegador moderno (Chrome, Firefox, Edge, Safari).
- Acesso à internet para carregar dados da planilha.
- Permissão de leitura pública na planilha Google Sheets.

## 6. Possíveis Melhorias Futuras
- Adicionar sistema de login/admin para edição segura dos produtos.
- Implementar carrinho de compras e integração com meios de pagamento.
- Adicionar filtros e busca por produtos.
- Melhorar segurança e privacidade dos dados.

---
Este documento resume o funcionamento, limitações e instruções para manutenção do catálogo de camisas. Para dúvidas ou sugestões, entre em contato com o desenvolvedor.