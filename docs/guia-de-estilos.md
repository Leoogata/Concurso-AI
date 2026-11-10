# Concurso AI — Guia de estilos

## Propósito do guia

Este guia define a linguagem visual do Concurso AI. Ele serve de referência para design e desenvolvimento, para que todas as telas transmitam a mesma mensagem: a plataforma é confiável, gratuita e ajuda o estudante a dar o próximo passo na preparação.

As decisões consideram o público descrito na [proposta do projeto](proposta-do-projeto.md): pessoas que estudam por conta própria, muitas vezes pelo celular, com pouco tempo e sem experiência na leitura de editais.

## Referências

O guia se baseia em práticas de plataformas educacionais e sistemas de design públicos, adaptadas ao contexto dos concursos.

| Referência | O que aproveitamos |
| --- | --- |
| Coursera | Uma única cor saturada reservada para ações, fundo branco predominante e cartões com borda fina em vez de sombra. A diferença de formato entre botões (retangulares) e filtros (cápsulas) também orienta o nosso padrão. |
| Khan Academy (Wonder Blocks) | Cores organizadas por função (fundo, borda, texto) e por contexto (sucesso, atenção, erro), com cada combinação testada quanto ao contraste. |
| edX (Paragon) | Acessibilidade como requisito dos componentes, com verificação automática durante o desenvolvimento. |
| Padrão Digital de Governo (gov.br) | Familiaridade com os padrões de serviços públicos que o candidato já conhece, sem reproduzir a identidade visual do governo. |

## Princípios

- **Clareza antes de estética.** Cada tela deve responder a uma pergunta do estudante: "Posso me inscrever?", "Quando é a prova?", "O que estudo hoje?".
- **Transparência com a fonte.** Toda informação extraída do edital mostra de onde veio e indica quando precisa ser conferida.
- **Leveza.** As páginas devem carregar bem em celulares simples e em conexões lentas, com poucas imagens e nenhum elemento decorativo pesado.
- **Acessível por padrão.** Os componentes nascem atendendo às diretrizes de acessibilidade, e não recebem ajustes depois.
- **Um passo de cada vez.** A interface destaca uma ação principal por tela e evita sobrecarregar quem está começando.

## Cores

A paleta usa um azul para ações, um azul-marinho para momentos de marca e tons neutros para a maior parte da interface. As cores de contexto comunicam estados e nunca aparecem como decoração. Todos os valores abaixo foram verificados quanto ao contraste segundo a WCAG 2.2.

### Cores principais

| Token | Valor | Uso | Contraste sobre branco |
| --- | --- | --- | --- |
| `cor-acao` | `#1F4FC9` | Botões primários, links e elementos selecionados. | 6,95:1 |
| `cor-acao-forte` | `#183E9E` | Estados de passar o cursor e pressionado da cor de ação. | 9,45:1 |
| `cor-marca` | `#0E2A55` | Cabeçalho, faixas de destaque e cartões de chamada. | 14,18:1 |
| `cor-destaque` | `#FFC845` | Detalhes sobre o azul-marinho, como selos e ícones de conquista. Não deve ser usada sobre fundo branco. | 9,18:1 sobre `cor-marca` |

### Neutros

| Token | Valor | Uso | Contraste sobre branco |
| --- | --- | --- | --- |
| `texto-principal` | `#1B1F27` | Títulos e textos corridos. | 16,51:1 |
| `texto-secundario` | `#4A5363` | Descrições, metadados e legendas. | 7,75:1 |
| `texto-terciario` | `#646D7E` | Textos auxiliares e marcadores de posição em campos. | 5,21:1 |
| `borda-campo` | `#7D879A` | Contorno de campos de formulário e caixas de seleção. | 3,62:1 |
| `borda-sutil` | `#D5DBE5` | Divisórias e contorno de cartões. | Decorativa |
| `fundo-superficie` | `#F5F7FA` | Áreas de apoio, barras laterais e fundos de seção. | — |
| `fundo-base` | `#FFFFFF` | Fundo predominante das páginas. | — |

### Cores de contexto

Cada contexto tem uma cor de texto e um fundo claro correspondente. O texto mantém contraste mínimo de 4,5:1 tanto sobre branco quanto sobre o fundo do próprio contexto.

| Contexto | Texto | Fundo | Quando usar |
| --- | --- | --- | --- |
| Sucesso | `#17773A` | `#E7F5EC` | Inscrições abertas, atividade concluída, plano em dia. |
| Atenção | `#9A5B00` | `#FFF4DB` | Informação a conferir no edital, prazo próximo do fim, retificação publicada. |
| Erro | `#B42318` | `#FDECEA` | Inscrições encerradas, falhas de envio, campos inválidos. |
| Informação | `#1F4FC9` | `#EAF0FC` | Dicas, explicações de termos do edital e avisos neutros. |

A cor nunca deve ser o único sinal de um estado. Sempre há também um ícone, um texto ou os dois.

## Tipografia

A fonte padrão é a **Inter**, de licença aberta, com boa leitura em telas pequenas e suporte completo aos acentos da língua portuguesa. Na falta dela, a interface usa a fonte do sistema (`system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`). Os números de datas, horários e tabelas usam algarismos de largura fixa (`font-variant-numeric: tabular-nums`), para que fiquem alinhados.

| Estilo | Tamanho / altura da linha | Peso | Uso |
| --- | --- | --- | --- |
| Título de página | 32px / 40px | 700 | Um por página, como o nome do concurso. |
| Título de seção | 24px / 32px | 600 | Blocos como "Requisitos" ou "Cronograma da semana". |
| Subtítulo | 20px / 28px | 600 | Títulos de cartões e de disciplinas. |
| Texto | 16px / 24px | 400 | Texto corrido e descrições. |
| Texto pequeno | 14px / 20px | 400 | Metadados, legendas e referências ao edital. |
| Rótulo | 14px / 20px | 600 | Botões, etiquetas e rótulos de campos. |
| Nota | 12px / 16px | 400 | Uso pontual, como avisos legais. Não deve conter informação essencial. |

Em telas com menos de 600px, os títulos de página e de seção diminuem para 28px e 22px. O texto corrido nunca fica abaixo de 16px, e as linhas de leitura longa devem ter no máximo 72 caracteres.

## Espaçamento, grade e formas

O espaçamento segue uma escala com base em 4px: **4, 8, 12, 16, 24, 32, 48 e 64px**. Elementos relacionados ficam mais próximos (8 a 12px) e seções distintas ficam mais afastadas (32 a 64px).

| Elemento | Padrão |
| --- | --- |
| Largura de conteúdo | Até 1200px, centralizada. Textos longos, como o resumo do edital, ficam em uma coluna de até 720px. |
| Margens laterais | 16px no celular, 24px no tablet e 32px no computador. |
| Grade | 4 colunas no celular, 8 no tablet e 12 no computador, com espaçamento de 16px entre colunas. |
| Arredondamento | 8px em botões e campos, 12px em cartões, 16px em painéis grandes e formato de cápsula em filtros e etiquetas. |
| Elevação | Cartões usam borda de 1px em `borda-sutil` e não usam sombra. Sombras ficam restritas a elementos flutuantes, como menus, janelas e avisos temporários. |

A interface é projetada primeiro para o celular, com largura mínima de 360px, e se expande para telas maiores.

## Ícones e imagens

- Os ícones vêm de uma única biblioteca de traço, como a Lucide, em 20px ou 24px e espessura de traço 2.
- Ícones que acompanham texto herdam a cor do texto. Ícones isolados precisam de um rótulo acessível.
- Ilustrações são opcionais e simples, usadas em estados vazios ou de boas-vindas. Fotos de bancos de imagem devem ser evitadas.
- Logotipos de bancas, órgãos ou plataformas de vídeo aparecem apenas para identificar a fonte de um conteúdo, nunca como decoração.

## Componentes

| Componente | Como funciona |
| --- | --- |
| Botão primário | Fundo `cor-acao`, texto branco, altura mínima de 44px. No máximo um por área da tela, para a ação mais importante, como "Gerar cronograma". |
| Botão secundário | Fundo branco, borda e texto em `cor-acao`. Usado para ações alternativas, como "Ver edital completo". |
| Botão de texto | Sem fundo nem borda, em `cor-acao`. Usado para ações de menor peso, como "Editar disponibilidade". |
| Filtro | Cápsula com borda `borda-campo`. Quando selecionado, recebe fundo `cor-acao`, texto branco e um ícone de confirmação. |
| Etiqueta de situação | Cápsula com as cores de contexto e um ícone: "Inscrições abertas" (sucesso), "Previsto" (informação), "Encerrado" (erro). |
| Cartão de concurso | Nome do órgão e do cargo, escolaridade exigida, local, etiqueta de situação, datas principais e link para a publicação oficial. O cartão inteiro leva ao resumo do edital. |
| Referência ao edital | Texto pequeno em `texto-secundario` com um ícone de documento, ao lado da informação extraída, por exemplo "Edital nº 1/2027, item 4.2, p. 12". Abre o trecho correspondente da publicação oficial. |
| Aviso "Confira no edital" | Caixa com as cores de atenção, usada quando a IA não tem certeza de uma informação. Explica o motivo da dúvida e leva à fonte. |
| Cartão de material | Título do material, tipo (videoaula, artigo, exercício), fonte, duração estimada e um aviso de que o link abre o site original. |
| Atividade do cronograma | Tópico, disciplina, tempo previsto e material indicado, com uma caixa de seleção para marcar como concluída e uma opção para indicar dificuldade. |
| Barra de progresso | Mostra a proporção de atividades concluídas na semana, sempre acompanhada do valor em texto, como "6 de 10 atividades". |
| Campo de formulário | Rótulo sempre visível acima do campo, borda `borda-campo`, mensagem de erro abaixo com ícone e texto em `#B42318`. |

## Acessibilidade

A plataforma segue a WCAG 2.2 no nível AA como requisito mínimo.

- Contraste de pelo menos 4,5:1 para textos e 3:1 para ícones, bordas de campos e textos grandes.
- Áreas de toque com no mínimo 44 × 44px e espaço entre elas.
- Indicador de foco sempre visível, com contorno de 2px em `cor-acao` e afastamento de 2px.
- Navegação completa por teclado, na ordem de leitura da página.
- Estrutura de títulos em sequência, rótulos em todos os campos e textos alternativos em imagens informativas.
- Animações curtas (até 200ms) e desativadas quando o sistema indicar preferência por movimento reduzido.
- Conteúdo legível com zoom de 200% e em telas de 320px de largura, sem rolagem horizontal.
- Testes com leitores de tela (NVDA e TalkBack) e verificação automática, como a do axe, durante o desenvolvimento.

## Manutenção do guia

As cores, tamanhos e espaçamentos deste guia devem ser implementados como variáveis (tokens) com os mesmos nomes usados aqui, para que uma mudança no guia chegue a todas as telas. Novos componentes ou cores só entram após verificação de contraste e registro neste documento.

Durante o piloto, o guia deve ser revisado a partir do uso real: dúvidas recorrentes dos estudantes, mensagens que não foram compreendidas e problemas de acessibilidade relatados.

## Fontes consultadas

- [Guia de marca da Coursera](https://www.coursera.org/about/brand-guide)
- [Resumo da linguagem visual da Coursera (shadcn.io)](https://www.shadcn.io/design/coursera)
- [Como a Khan Academy reconstruiu seu sistema de cores](https://blog.khanacademy.org/how-we-rebuilt-khan-academys-color-system-from-the-ground-up)
- [Wonder Blocks, sistema de design da Khan Academy](https://www.designsystems.com/about-wonder-blocks-khan-academys-design-system-and-the-story-behind-it/)
- [Princípios do sistema de design Paragon (Open edX)](https://openedx.atlassian.net/wiki/spaces/BPL/pages/1918304754/Design+System+Principles)
- [Padrão Digital de Governo (gov.br/ds)](https://www.gov.br/ds)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
