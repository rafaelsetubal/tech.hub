# Revisão de layout e funcionamento

## Correções

- Política de privacidade: grade própria, índice sticky à esquerda no desktop, acordeão com as seis seções acima do texto no mobile, espaçamento de leitura e âncoras com compensação do cabeçalho.
- Rodapé: o componente importa seu próprio CSS. Abrir a política diretamente não depende mais de visitar Home ou Sites para carregar estilos. Links da política levam às seções da Home.
- WhatsApp: botão fixo também no desktop, mantendo a regra de aparecer após o hero e ocultar quando o contato está visível.
- Hero de Sites: título menor, coluna mais larga, três linhas equilibradas e descrição mais curta. Símbolo dimensionado para desktop e celular.
- Orçamento: eliminada a subdivisão em colunas estreitas dentro de outra coluna. Campos passam a responder à largura real do formulário; canal direto fica abaixo quando não há espaço para uma segunda coluna.
- Campo de contato: a máscara numérica não apaga mais letras de um e-mail.
- Serviços: títulos e texto redimensionados, rodapés com margens internas, botões alinhados e cabeçalho com largura adequada.
- Equipe e FAQ: tipografia mais legível, espaçamento e grade próprios; o FAQ de Sites não depende de CSS carregado pela Home.
- Brand: cabeçalho mobile com marca sem quebra e ação curta para baixar o ZIP.
- Links diretos com fragmentos: páginas carregadas sob demanda reposicionam a seção após a montagem.
- API: removida a chave de e-mail embutida no código. O teste do provedor agora simula o envio, sem enviar mensagens reais.

## Validação

- Build de produção concluído.
- Suíte existente: 79 testes aprovados, com provedor de e-mail simulado.
- Inspeção no navegador: Home, Sites, Privacidade, Brand e 404; larguras de celular (390 px) e desktop (1280–1440 px).
- Home e Sites sem links de fragmento para IDs inexistentes na conferência.
- Sem rolagem horizontal nas páginas conferidas.
- Política: índice sticky no desktop e seis títulos no acordeão mobile confirmados.
- WhatsApp presente no desktop após sair do hero.

## Pendências operacionais

- Trocar a chave anteriormente exposta no Resend e configurar a nova `RESEND_API_KEY` no ambiente de hospedagem. Remover do código não invalida a chave nem a apaga do histórico Git.
- O envio real de orçamento depende do backend e da configuração do ambiente; a validação usa um provedor simulado.
- O build ainda informa que o módulo de renderização 3D tem cerca de 600 kB antes de gzip. Ele já é carregado sob demanda; permanece como oportunidade de otimização de desempenho.
- Esta revisão alterou apresentação e funcionamento da política, preservando o texto jurídico existente.
