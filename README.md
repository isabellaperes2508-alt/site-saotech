# Site Saotech Geotecnologia

Site institucional estático (HTML, CSS e JavaScript, sem etapa de build), publicado no Netlify.

## Páginas
- `index.html` — Início, com terreno 3D em WebGL e história contada na rolagem
- `servicos.html`, `como-funciona.html`, `sobre.html`, `contato.html`
- `blog.html` — lista de artigos · `post.html#slug-do-artigo` — artigo

## Como publicar um artigo novo
Abra `assets/posts.js`, copie um bloco `{ ... }`, troque os campos e salve. O artigo aparece no blog automaticamente.

## Publicação
Cada alteração enviada para a branch `main` é publicada automaticamente pelo Netlify.
