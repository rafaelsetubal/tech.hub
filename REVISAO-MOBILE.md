# Revisão mobile — 04/10/2026

Revisão da imagem enviada, do código das páginas públicas e dos estilos responsivos. A inspeção visual completa permanece pendente: o navegador integrado exibiu o carregamento inicial e depois informou que a página travou; as tentativas de recuperação também falharam. Não foram confirmados layouts em dispositivos reais nem em uma matriz de resoluções. Os testes de componentes não substituem essa validação.

| Achado | Evidência | Tratamento |
| --- | --- | --- |
| “Um projeto.Todo” sem espaço | Imagem enviada e `CasesSection.tsx`: quebra de linha escondida no mobile sem espaço entre os textos | Espaços explícitos antes das quebras; a composição desktop permanece com suas quebras |
| Seta isolada no link de acompanhamento | Imagem enviada; `/sites` não importava `editorial.css`, onde estavam `display:inline-flex`, espaçamento e proteção do ícone | Estilo de `.text-link` movido para o CSS global; texto do link agrupado em um span e ícone sem encolher |
| Rodapé depende da página aberta antes | `Privacy.tsx` usa o rodapé sem importar seu CSS; a folha estava nas páginas Home e Sites | Folha do rodapé importada globalmente |
| Área de toque do portfólio menor que a dos demais CTAs | Regra mobile de `.portfolio-preview-link` com altura mínima de 38px | Altura mínima de 44px |
| Painel de acompanhamento apertado em telas estreitas | Duas colunas e rótulos de barras com largura fixa; risco identificado no CSS, sem reprodução visual | Colunas com `minmax(0,1fr)`; gráficos empilhados até 360px; filhos podem encolher |

| Área revisada no código | Situação e limites |
| --- | --- |
| Menu compartilhado | Botão de 44px, links de pelo menos 50px, painel com limite de altura e rolagem; fechamento por Escape e clique externo. Testes existentes de navegação executados. Falta validar toque e paisagem visualmente. |
| Hero da Home e de Sites | Regras de empilhamento, escala tipográfica e tamanho das ilustrações inspecionadas. Falta confirmar quebras, altura da primeira tela e cena 3D no navegador. |
| Manifesto, processo e jornada | Existem alternativas para movimento reduzido e janelas baixas. As cenas fixas continuam merecendo validação em celulares de altura intermediária: o processo/jornada habilitam rolagem a partir de 620px e usam altura fixa de uma tela com conteúdo e padding. Possível corte ainda não reproduzido. |
| Serviços, banner e case | Grades passam a uma coluna; CTAs de serviços têm 48px. Correção de espaçamento aplicada ao case. Falta validação de todos os cartões e textos renderizados. |
| Portfólio e formatos | Portfólio empilha cartões; formatos empilham abas e conteúdo. Área de toque corrigida. Reprodução de vídeos, expansão do portfólio e abas ainda precisam de teste visual. |
| Acompanhamento e equipe | Link e colunas do painel ajustados; equipe empilha cartões. Rótulos ilustrativos de 8–11px no painel ainda merecem revisão de legibilidade em tela real. |
| FAQ | Uso de details/summary e indicadores de abertura inspecionado. Falta conferir respostas longas e toque no mobile. |
| Formulário compartilhado | Campos em uma coluna por largura do container, fonte de 16px no mobile, etapas e retorno ao projeto; testes existentes do formulário executados. Teclado virtual e envio real não foram testados. |
| WhatsApp flutuante | Botão de 56px e lógica para ocultar ao visualizar o formulário inspecionados. Falta confirmar sobreposição com CTAs e áreas seguras de cada dispositivo. |
| Rodapé, privacidade e 404 | CSS do rodapé passou a carregar independentemente da rota. Privacidade tem sumário mobile; 404 empilha ações. Falta confirmação visual das três áreas. |

Validação executada: 13 arquivos de teste, 84 testes aprovados; build de produção e verificação do diff. O build mantém um aviso de chunk grande da cena 3D. Não houve publicação.

Para fechar a auditoria visual: conferir Home, Sites, privacidade e 404 em 320, 360, 390 e 430px de largura, uma tela em paisagem e desktop; entrar diretamente em cada rota; percorrer todas as seções e estados das cenas; abrir menu e FAQ; alternar formatos; expandir portfólio; avançar e voltar no formulário sem enviar; conferir rolagem lateral, textos cortados, ícones e sobreposições. Esses itens estão pendentes, não aprovados.
