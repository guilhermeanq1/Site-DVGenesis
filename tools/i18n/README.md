# Idiomas do site DVGenesis

O conteúdo original em português fica nos arquivos HTML da raiz e em `script.js`.
As versões completas ficam em `en/` e `es/`, com os mesmos nomes de páginas.
Imagens, vídeo, estilos e logotipos são compartilhados entre as três versões.

## Atualizar conteúdo

1. Edite a página em português na raiz.
2. Atualize a entrada correspondente em `translations.json`. Cada chave é o texto
   original em português; os dois valores são a versão inglesa e a espanhola.
3. Para textos gerados por JavaScript, atualize `dynamic.json`, cujas entradas são
   `[português, inglês, espanhol]`. Endereços, nomes próprios e caminhos não são traduzidos.
4. Execute `python tools/i18n/build.py` a partir da raiz do projeto.
5. Revise as páginas geradas e publique os arquivos juntos. O gerador interrompe
   a execução se encontrar texto novo sem tradução e pode ser executado novamente
   sem duplicar os seletores de idioma.

O seletor e os links do rodapé preservam a página e a seção atual. A escolha não
é inferida pelo país ou navegador e não é guardada em cookies ou armazenamento local.
Cada idioma tem canonical próprio, referências hreflang recíprocas e entradas no sitemap.
Textos de artigos externos foram traduzidos na apresentação; os links continuam
apontando aos originais em português. Logotipos e artes oficiais são preservados.


A arte do curso na Home tem versões próprias por idioma: a original em português
fica em `assets/governance-ai-poster-dvgenesis.png`; inglês e espanhol usam os
arquivos com sufixos `-en.png` e `-es.png`. O gerador seleciona a arte correspondente
automaticamente para manter a tradução dentro da imagem nas próximas atualizações.
