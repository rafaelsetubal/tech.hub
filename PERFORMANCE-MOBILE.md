# Otimização mobile

## Resultado verificado em 01/10/2026

O relatório fornecido da home publicada tinha performance 71, acessibilidade 100, boas práticas 100 e SEO 100. O desktop fornecido tinha 100 nas quatro categorias.

A versão final local da home apresentou:

| Medição | Performance | Acessibilidade | Boas práticas | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Final 1 | 88 | 100 | 100 | 100 | 3,3 s | 100 ms | 0 |
| Final 2 | 90 | 100 | 100 | 100 | 3,2 s | 90 ms | 0 |

Relatórios locais: `lighthouse-mobile-final-verified.report.html` e `lighthouse-mobile-final-repeat.report.html`. A auditoria de `/sites` também apresentou 100 em acessibilidade, boas práticas e SEO.

**Limite da comparação:** os relatórios fornecidos usam Lighthouse 13.4.1; a verificação local usa Lighthouse 12.8.2, rede mobile simulada padrão e desaceleração de CPU 1,5×. O computador apresentou capacidade de CPU inferior à registrada no relatório fornecido, motivando a calibração. Os resultados locais não equivalem a uma nova nota do PageSpeed em produção. Ver a [orientação oficial de calibração do Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md#calibrating-the-cpu-slowdown).

## Mudanças implementadas

- Home pré-renderizada: títulos, textos e estilos já estão no HTML entregue pelo servidor. Outras rotas recebem uma página SPA independente.
- Hidratação das seções abaixo da dobra adiada até a aproximação do usuário, preservando o conteúdo estático.
- Google Analytics executado com Partytown, reduzindo trabalho na thread principal. As auditorias anteriores da implementação confirmaram carregamento do GA e envio de coleta sem erros de console.
- Imagens responsivas de 480, 768 e 1024 px; removido preload obsoleto que baixava uma segunda versão da foto.
- Prioridades de carregamento ajustadas, animações da primeira dobra simplificadas e cálculos da navegação agrupados por frame.
- Geometria real preservada nas seções interativas para impedir sobreposição de alvos de toque.
- Contraste e identificação de links corrigidos nos formulários, badges e FAQ.
- Chave de Resend embutida na configuração removida; envio depende da variável de ambiente configurada.

## Validação e próxima etapa

Build de produção concluído e 80 testes passaram em 12 arquivos. Confirmados HTML estático da home, ausência de referências a assets de desenvolvimento, página SPA independente e arquivos do worker incluídos no build.

Ainda não foi publicada esta versão. Após publicar na Vercel, repetir três auditorias mobile do PageSpeed na home e em `/sites`, usar a mediana e verificar formulário, navegação e coleta do Analytics. Para buscar 95–100, a próxima prioridade é reduzir o LCP observado (3,2–3,3 s), orientando os próximos ajustes pelo relatório dessa versão em produção. Não há confirmação de 100 em performance mobile neste momento.
