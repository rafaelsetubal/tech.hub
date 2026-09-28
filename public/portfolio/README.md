# Portfólio de sites

Os vídeos e capas otimizados ficam em `public/portfolio/videos-techub/`.
As gravações originais foram preservadas fora da pasta pública, em
`portfolio-originals/videos-techub/`, para não entrarem no download do site.

Cadastre cada projeto em `src/data/sitePortfolio.ts`:

```ts
{
  id: 'nome-do-projeto',
  title: 'Nome do projeto',
  description: 'O que é o projeto e o que a página apresenta.',
  videoSrc: '/portfolio/videos-techub/nome-do-projeto.mp4',
  posterSrc: '/portfolio/videos-techub/nome-do-projeto.webp',
  previewUrl: 'https://sua-previa.com', // opcional
  categoryId: 'institutional', // opcional; categorias podem ser definidas depois
  featured: true,
  placeholderVariant: 0,
  theme: 'blue',
}
```

- No desktop, a prévia toca ao passar o cursor; no celular, ao entrar na tela.
- O vídeo pausa quando sai de vista. Movimento reduzido respeita a preferência do visitante.
- `previewUrl` só exibe o link externo quando preenchido.
- Use nomes simples com hífens e mantenha vídeo e capa com o mesmo nome-base.
