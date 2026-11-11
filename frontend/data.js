export const contest = {
  title: 'Escrevente Técnico Judiciário',
  institution: 'Tribunal de Justiça de São Paulo',
  registrationStart: '2026-10-28',
  registrationEnd: '2026-12-10',
  examDate: '2027-03-14',
  salary: 'R$ 6.782,54',
  examPage: 'https://www.vunesp.com.br/TJSP2607',
  notice: 'https://documento.vunesp.com.br/documento/stream/NzkyMDQ1Nw%3d%3d',
  news: 'https://www.tjsp.jus.br/Imprensa/Noticias/Noticia?codigoNoticia=115772',
  summary: [
    {
      icon: 'graduation', title: 'Requisitos',
      text: 'É necessário ter ensino médio completo até a posse. O concurso forma cadastro de reserva para a 2ª à 10ª Região Administrativa Judiciária.',
      source: 'Edital 02/2026, requisitos para a posse', page: 1,
    },
    {
      icon: 'calendar', title: 'Inscrições',
      text: 'De 28 de outubro a 10 de dezembro de 2026, pelo site da Vunesp. A taxa de inscrição é de R$ 81,00.',
      source: 'Edital 02/2026, cronograma de inscrições', page: 52,
    },
    {
      icon: 'clipboard', title: 'Como é a prova',
      text: 'A etapa única tem 70 questões de múltipla escolha e uma redação, previstas para 14 de março de 2027.',
      source: 'Comunicado do TJSP, seção Provas',
    },
  ],
};

const todaMateria = 'https://www.todamateria.com.br/';
const planalto = 'https://www.planalto.gov.br/ccivil_03/';
const microsoft = 'https://support.microsoft.com/pt-br/';

export const subjects = [
  {
    id: 'portugues', name: 'Língua Portuguesa', icon: 'book',
    modules: [
      {
        name: 'Leitura e compreensão',
        activities: [
          {
            id: 'interpretacao',
            title: 'Interpretação de textos',
            minutes: 25,
            task: 'Identifique o tema e a ideia principal de um texto. Depois, separe o que está explícito do que precisa ser inferido.',
            material: {
              title: 'Exercícios de interpretação de texto',
              source: 'Toda Matéria',
              type: 'Exercícios',
              url: todaMateria + 'exercicios-de-interpretacao-de-texto/',
            },
            quiz: {
              question: 'Em “Apesar da chuva, a prova aconteceu”, qual relação a expressão “apesar de” indica?',
              options: ['Causa', 'Concessão', 'Finalidade'],
              answer: 1,
              explanation: 'A chuva poderia impedir a prova, mas ela aconteceu. Essa quebra de expectativa indica concessão.',
            },
          },
          {
            id: 'coesao',
            title: 'Coesão e coerência',
            minutes: 25,
            task: 'Compare como pronomes e conectivos ligam as ideias de um parágrafo. Reescreva um trecho para remover repetições.',
            material: {
              title: 'Coesão e coerência',
              source: 'Toda Matéria',
              type: 'Artigo',
              url: todaMateria + 'coesao-e-coerencia/',
            },
          },
        ],
      },
      {
        name: 'Gramática em contexto',
        activities: [
          {
            id: 'concordancia',
            title: 'Concordância verbal e nominal',
            minutes: 30,
            task: 'Localize o sujeito e o verbo em cinco frases. Observe os casos em que a ordem da frase muda.',
            material: {
              title: 'Concordância verbal',
              source: 'Toda Matéria',
              type: 'Artigo',
              url: todaMateria + 'concordancia-verbal/',
            },
          },
          {
            id: 'pontuacao',
            title: 'Pontuação',
            minutes: 25,
            task: 'Pratique o uso da vírgula em enumerações e expressões explicativas.',
            material: {
              title: 'Pontuação',
              source: 'Toda Matéria',
              type: 'Artigo',
              url: todaMateria + 'pontuacao/',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'direito', name: 'Conhecimentos em Direito', icon: 'scale',
    modules: [
      {
        name: 'Direito Constitucional e Administrativo',
        activities: [
          {
            id: 'direitos',
            title: 'Direitos e garantias fundamentais',
            minutes: 30,
            task: 'Leia o art. 5º da Constituição e selecione três garantias relacionadas à atuação do Poder Judiciário.',
            material: {
              title: 'Constituição Federal, art. 5º',
              source: 'Planalto',
              type: 'Legislação',
              url: planalto + 'constituicao/constituicao.htm#art5',
            },
          },
          {
            id: 'administracao',
            title: 'Princípios da administração pública',
            minutes: 30,
            task: 'Leia o caput do art. 37 e escreva um exemplo de aplicação para cada princípio.',
            material: {
              title: 'Constituição Federal, art. 37',
              source: 'Planalto',
              type: 'Legislação',
              url: planalto + 'constituicao/constituicao.htm#art37',
            },
            quiz: {
              question: 'Qual destes princípios está expresso no caput do art. 37 da Constituição Federal?',
              options: ['Publicidade', 'Proporcionalidade', 'Razoabilidade'],
              answer: 0,
              explanation: 'O caput enumera legalidade, impessoalidade, moralidade, publicidade e eficiência.',
            },
          },
        ],
      },
      {
        name: 'Processo Civil e Processo Penal',
        activities: [
          {
            id: 'atos',
            title: 'Atos processuais e prazos',
            minutes: 30,
            task: 'Leia os arts. 188 a 192 e os arts. 218 a 224. Compare a forma dos atos com as regras de contagem dos prazos.',
            material: {
              title: 'Código de Processo Civil, arts. 188 e seguintes',
              source: 'Planalto',
              type: 'Legislação',
              url: planalto + '_ato2015-2018/2015/lei/l13105.htm#art188',
            },
          },
          {
            id: 'citacao',
            title: 'Citações e intimações',
            minutes: 25,
            task: 'Leia o início do Título X do Código de Processo Penal e compare o papel da citação com o da intimação.',
            material: {
              title: 'Código de Processo Penal, arts. 351 e seguintes',
              source: 'Planalto',
              type: 'Legislação',
              url: planalto + 'decreto-lei/del3689.htm#art351',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'informatica', name: 'Informática', icon: 'monitor',
    modules: [
      {
        name: 'Ferramentas de escritório',
        activities: [
          {
            id: 'word',
            title: 'Edição e formatação no Word',
            minutes: 25,
            task: 'Em um documento de teste, aplique títulos, numere as páginas e insira uma tabela.',
            material: {
              title: 'Ajuda e aprendizado do Word',
              source: 'Microsoft',
              type: 'Tutorial',
              url: microsoft + 'word',
            },
          },
          {
            id: 'excel',
            title: 'Fórmulas básicas no Excel',
            minutes: 30,
            task: 'Monte uma tabela e use as funções SOMA e MÉDIA. Depois, teste uma referência absoluta.',
            material: {
              title: 'Ajuda e aprendizado do Excel',
              source: 'Microsoft',
              type: 'Tutorial',
              url: microsoft + 'excel',
            },
            quiz: {
              question: 'Qual referência mantém fixas a coluna e a linha quando uma fórmula é copiada?',
              options: ['A1', '$A1', '$A$1'],
              answer: 2,
              explanation: 'O cifrão fixa a parte da referência que vem logo depois dele.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'matematica', name: 'Matemática', icon: 'calculator',
    modules: [
      {
        name: 'Proporcionalidade',
        activities: [
          {
            id: 'porcentagem',
            title: 'Porcentagem',
            minutes: 30,
            task: 'Resolva exercícios com aumentos e descontos. Compare dois descontos sucessivos com um desconto único.',
            material: {
              title: 'Porcentagem',
              source: 'Toda Matéria',
              type: 'Artigo e exercícios',
              url: todaMateria + 'porcentagem/',
            },
            quiz: {
              question: 'Quanto custa um produto de R$ 80 após um desconto de 25%?',
              options: ['R$ 20', 'R$ 55', 'R$ 60'],
              answer: 2,
              explanation: '25% de R$ 80 são R$ 20. O preço após o desconto é R$ 60.',
            },
          },
          {
            id: 'regra-de-tres',
            title: 'Regra de três simples',
            minutes: 25,
            task: 'Resolva um problema com grandezas diretamente proporcionais e outro com grandezas inversamente proporcionais.',
            material: {
              title: 'Regra de três simples',
              source: 'Toda Matéria',
              type: 'Artigo e exercícios',
              url: todaMateria + 'regra-de-tres-simples/',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'logica', name: 'Raciocínio Lógico', icon: 'blocks',
    modules: [
      {
        name: 'Fundamentos de lógica',
        activities: [
          {
            id: 'proposicoes',
            title: 'Proposições e conectivos',
            minutes: 30,
            task: 'Crie duas proposições simples e monte a tabela-verdade para “e” e “ou”.',
            material: {
              title: 'Tabela-verdade',
              source: 'Toda Matéria',
              type: 'Artigo',
              url: todaMateria + 'tabela-verdade/',
            },
            quiz: {
              question: 'Quando a conjunção “P e Q” é verdadeira?',
              options: ['Quando P e Q são verdadeiras', 'Quando apenas P é verdadeira', 'Quando pelo menos uma é verdadeira'],
              answer: 0,
              explanation: 'Na conjunção, as duas proposições precisam ser verdadeiras.',
            },
          },
          {
            id: 'negacao',
            title: 'Negação de proposições',
            minutes: 25,
            task: 'Escreva a negação de frases com “todo”, “algum” e “nenhum”.',
            material: {
              title: 'Operadores lógicos',
              source: 'Toda Matéria',
              type: 'Artigo',
              url: todaMateria + 'o-que-e-logica/',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'atualidades', name: 'Atualidades e PCD', icon: 'file',
    modules: [
      {
        name: 'Atualidades e inclusão',
        activities: [
          {
            id: 'noticias',
            title: 'Leitura de notícias',
            minutes: 25,
            task: 'Escolha uma notícia recente, identifique os fatos principais e resuma por que o tema é relevante.',
            material: {
              title: 'Notícias da Agência Brasil',
              source: 'EBC',
              type: 'Portal de notícias',
              url: 'https://agenciabrasil.ebc.com.br/',
            },
          },
          {
            id: 'inclusao',
            title: 'Estatuto da Pessoa com Deficiência',
            minutes: 30,
            task: 'Leia os arts. 1º a 5º e identifique as definições de acessibilidade, barreiras e discriminação.',
            material: {
              title: 'Lei Brasileira de Inclusão da Pessoa com Deficiência',
              source: 'Planalto',
              type: 'Legislação',
              url: planalto + '_ato2015-2018/2015/lei/l13146.htm',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'redacao', name: 'Redação', icon: 'pen',
    modules: [
      {
        name: 'Texto dissertativo-argumentativo',
        activities: [
          {
            id: 'tese',
            title: 'Tese e estrutura do texto',
            minutes: 25,
            task: 'Escolha um tema e faça um esboço com tese, dois argumentos e uma conclusão.',
            material: {
              title: 'Texto dissertativo-argumentativo',
              source: 'Toda Matéria',
              type: 'Artigo',
              url: todaMateria + 'texto-dissertativo-argumentativo/',
            },
          },
          {
            id: 'pratica-redacao',
            title: 'Prática de redação',
            minutes: 30,
            task: 'Escreva uma redação a partir de uma proposta anterior. Revise se cada parágrafo sustenta a sua tese.',
            material: {
              title: 'Proposta de redação do concurso de 2025',
              source: 'Vunesp',
              type: 'Prova anterior',
              url: 'https://www.vunesp.com.br/TJSP2503',
            },
          },
        ],
      },
    ],
  },
];

export const activities = subjects.flatMap(subject => subject.modules.flatMap(module =>
  module.activities.map(activity => ({ ...activity, subject: subject.name, subjectId: subject.id, module: module.name })),
));

export const previousExams = [
  { year: '2025', location: 'Capital e 1ª Região Administrativa Judiciária', code: 'TJSP2503', url: 'https://www.vunesp.com.br/TJSP2503', answerKey: 'https://documento.vunesp.com.br/documento/stream/NzUxNDY5Ng%3D%3D' },
  { year: '2024', location: 'Capital e circunscrições do interior', code: 'TJSP2401', url: 'https://www.vunesp.com.br/TJSP2401', answerKey: 'https://documento.vunesp.com.br/documento/stream/NjYwMzkyNQ%3D%3D' },
];
