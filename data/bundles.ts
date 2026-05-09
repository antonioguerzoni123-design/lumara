export type BundleItem = {
  name: string;
  slug: string;
  includedItems: string[];
};

export type BundleStat = {
  percent: number;
  claim: string;
};

export type BundleFaq = {
  q: string;
  a: string;
};

export type Bundle = {
  id: string;
  shopifyHandle?: string;
  defaultVariant?: string;
  name: string;
  subtitle: string;
  headline: string;
  hookEmotional: string;
  description: string;
  headlineSecondary: string;
  paragraphSecondary: string;
  mainBenefits: string[];
  secondaryBenefits: { title: string; text: string }[];
  stats: BundleStat[];
  faqs: BundleFaq[];
  items: BundleItem[];
  productSlugs: string[];
  originalTotal: number;
  bundlePrice: number;
  savings: number;
  savingsPercent: number;
  badge: string;
  featured: boolean;
  tone: string;
  accent: string;
  image: string;
  statsDisclaimer: string;
  detailsNote: string;
};

export const bundles: Bundle[] = [
  {
    id: 'bundle-styling-completo',
    shopifyHandle: 'bundle-styling-completo',
    defaultVariant: 'Preto / Rosa',
    name: 'Bundle Styling Completo',
    subtitle: 'LumaGlide Pro + VelAir Pro Kit',
    headline: 'O duo que substitui o salão — na tua bancada, todos os dias.',
    hookEmotional:
      'Imagina ter o secador profissional e a escova alisadora que os cabeleireiros usam — prontos a usar em casa, em menos tempo do que demoras a chegar ao salão.',
    description:
      'O Bundle Styling Completo foi pensado para quem quer acabar com os dias em que o cabelo não coopera. O VelAir Pro Kit seca com potência e tecnologia iónica que sela a cutícula desde o primeiro contacto com o ar quente — elimina o frisado, devolve o brilho e reduz o tempo de secagem a metade. A LumaGlide Pro entra a seguir: aquece, desliza e estiliza em movimentos livres, sem cabo, sem limitações, com resultados de alisamento ou ondulado que duram.\nJuntos, os dois substituem a combinação de ferramentas e técnica que antes exigia uma visita ao salão. A diferença é visível na primeira sessão.',
    headlineSecondary: 'Seca. Estiliza. Repete. Sem sair de casa.',
    paragraphSecondary:
      'Diz adeus às visitas ao salão para um simples alisamento ou ao cabelo que chega frisado ao destino porque a ferramenta que tens em casa não faz o trabalho! O Bundle Styling Completo entrega o par certo de ferramentas — profissionais, complementares e pensadas para funcionar juntas.\nO VelAir Pro Kit prepara o fio com secagem iónica de alto desempenho. A LumaGlide Pro finaliza onde o secador termina — em movimento, sem fios, em qualquer lugar. Em conjunto, entregam aquele resultado que antes só saías de casa para conseguir.\nExperimenta e percebe por que tantas pessoas pararam de marcar consultas de styling.',
    mainBenefits: [
      'Seca em minutos com tecnologia iónica profissional',
      'Alisa, ondula e modela com uma única ferramenta sem fios',
      'Sem frisado, sem danos térmicos — do primeiro uso em diante',
      'Tudo o que o salão usa, disponível onde e quando precisas',
    ],
    secondaryBenefits: [
      {
        title: 'Secagem Iónica Profissional',
        text: 'O VelAir Pro Kit elimina o frisado durante a secagem com 1600–1999W e tecnologia de iões negativos',
      },
      {
        title: 'Styling Sem Fios',
        text: 'A LumaGlide Pro estiliza sem dependência de tomadas — em casa, em viagem, em qualquer lugar',
      },
      {
        title: 'Resultado Completo em Uma Sessão',
        text: 'Seca e estiliza de seguida, sem perda de tempo entre ferramentas',
      },
      {
        title: 'Sem Danos Térmicos',
        text: 'Iões negativos no VelAir Pro + 200 milhões de iões negativos na LumaGlide Pro protegem cada fio durante todo o processo',
      },
    ],
    stats: [
      { percent: 97, claim: 'afirmaram que o bundle substituiu completamente as suas visitas ao salão para styling diário' },
      { percent: 91, claim: 'notaram redução visível do frisado desde a primeira sessão combinada' },
      { percent: 84, claim: 'reduziram o tempo total de styling semanal em mais de uma hora' },
    ],
    faqs: [
      {
        q: 'Como devo usar as duas ferramentas em conjunto?',
        a: 'A sequência ideal é secar primeiro com o VelAir Pro Kit — começa com o difusor ou bocal de volume para secagem uniforme, finaliza com o concentrador para direcionar o fio. Depois, com o cabelo seco, usa a LumaGlide Pro para alisar, ondular ou modelar as secções que queres trabalhar.',
      },
      {
        q: 'Consigo usar o bundle se tiver cabelo muito encaracolado ou grosso?',
        a: 'Sim. O VelAir Pro Kit tem controlo termostático preciso e cinco bocais para qualquer tipo de cabelo. A LumaGlide Pro tem desempenho confirmado em cabelo grosso e encaracolado com ligeira pressão e passagem mais lenta.',
      },
      {
        q: 'A LumaGlide Pro recarrega enquanto uso o VelAir Pro Kit?',
        a: 'Sim. Podes ligar a LumaGlide Pro a carregar via USB enquanto secas com o VelAir Pro Kit, de forma a tê-la com carga completa quando chegares à fase de styling.',
      },
      {
        q: 'Posso viajar com as duas ferramentas?',
        a: 'Sim. O VelAir Pro Kit tem voltagem dual 100–240V e design dobrável para viagem. A LumaGlide Pro é sem fios, compacta e compatível com regulamentos de bagagem de mão. O par viaja sem complicações.',
      },
      {
        q: 'E se não ficar satisfeita com um dos produtos do bundle?',
        a: 'O nosso teste de 30 dias sem risco aplica-se a todo o bundle. Se não estiveres completamente satisfeita, contacta o apoio ao cliente e tratamos da devolução sem perguntas.',
      },
    ],
    items: [
      {
        name: 'VelAir Pro Kit',
        slug: 'velair-pro-kit',
        includedItems: [
          'Secador VelAir Pro',
          'Bocal concentrador, difusor, de precisão, de volume e de finalização com ar frio',
          'Suporte de mesa',
          'Manual do utilizador',
        ],
      },
      {
        name: 'LumaGlide Pro',
        slug: 'lumaglide-pro',
        includedItems: ['Escova alisadora LumaGlide Pro', 'Cabo USB', 'Manual do utilizador'],
      },
    ],
    productSlugs: ['lumaglide-pro', 'velair-pro-kit'],
    originalTotal: 126.98,
    bundlePrice: 114.99,
    savings: 11.99,
    savingsPercent: 9,
    badge: 'Mais Popular',
    featured: true,
    tone: 'linear-gradient(135deg, #F3EFFE 0%, #E0D4F9 100%)',
    accent: '#8B6BE0',
    image: '/bundles/bundle-styling-completo.png',
    statsDisclaimer: 'Com base num painel independente de clientes com 4 semanas de duração',
    detailsNote: 'CARREGADOR DE TOMADA NÃO INCLUÍDO (LumaGlide Pro). Ficha EU incluída (VelAir Pro Kit). Voltagem dual 100–240V no VelAir Pro Kit.',
  },
  {
    id: 'bundle-skin-ritual',
    shopifyHandle: 'bundle-skin-ritual',
    name: 'Bundle Skin Ritual',
    subtitle: 'Eelhoe Centella Óleo + Essência Caracol + Milk Glow Tónico',
    headline: 'A rotina de três passos que transforma a pele — uma vez que começas, não paras.',
    hookEmotional:
      'Imagina uma rotina de skin care que funciona de verdade — não porque usas muitos produtos, mas porque usas os três certos, na ordem certa, com os activos certos a trabalhar em conjunto.',
    description:
      'O Bundle Skin Ritual não é uma seleção aleatória de três produtos. É uma sequência deliberada baseada na lógica do skin care coreano: limpar fundo, equilibrar, e depois tratar — com cada passo a preparar a pele para o que vem a seguir.\nO Eelhoe Centella Óleo de Limpeza remove tudo o que a água não consegue — maquilhagem resistente, protetor solar, sebo — enquanto a centella asiatica calma e protege. A pele chega ao segundo passo limpa e tranquila. O Milk Glow Tónico reequilibra o pH, repõe a humidade perdida e prepara a barreira cutânea para absorver o que vem a seguir com o dobro da eficácia. Por último, a Essência de Mucina de Caracol a 96% entra numa pele preparada — e actua em profundidade: repara, firma, atenua linhas e mantém a hidratação ao longo de todo o dia.\nTrês passos. Activos que se multiplicam. Pele que mostra a diferença.',
    headlineSecondary: 'Limpa. Equilibra. Trata. A rotina que nunca mais quererás trocar.',
    paragraphSecondary:
      'Diz adeus à rotina de skin care que nunca parece funcionar realmente, à pele que fica tirante após a limpeza e aos séruns caros que absorvem mal porque a preparação não estava feita! O Bundle Skin Ritual resolve o problema pela raiz — literalmente.\nUsa o óleo de centella em rosto seco, massaja e emulsiona com água. Aplica o tónico milk glow com movimentos suaves de patting. Termina com duas a três gotas da essência de caracol pressionadas suavemente no rosto. Em menos de três minutos tens a sequência completa — de manhã e à noite.\nExperimenta durante 30 dias e observa o que três activos coreanos bem combinados fazem pela tua pele.',
    mainBenefits: [
      'Limpa, equilibra, trata e hidrata em sequência perfeita',
      'Activos clinicamente validados do skin care coreano num único ritual',
      'Fórmulas pensadas para se potenciarem mutuamente em camadas',
      'Resultados visíveis em menos de duas semanas de uso regular',
    ],
    secondaryBenefits: [
      {
        title: 'Limpeza Profunda sem Agressão',
        text: 'O óleo de centella remove tudo sem comprometer a barreira cutânea',
      },
      {
        title: 'Base Perfeita para os Activos',
        text: 'O tónico milk glow potencia a absorção de qualquer produto aplicado a seguir',
      },
      {
        title: 'Reparação Celular em Profundidade',
        text: 'A mucina de caracol a 96% actua nas camadas mais internas da epiderme',
      },
      {
        title: 'Rotina Completa e Equilibrada',
        text: 'Do primeiro ao último passo, os três produtos trabalham juntos sem conflitos de formulação',
      },
    ],
    stats: [
      { percent: 96, claim: 'notaram a pele mais luminosa e hidratada em menos de duas semanas de rotina completa' },
      { percent: 89, claim: 'afirmaram que os activos da essência de caracol absorveram melhor após adicionar o tónico à sequência' },
      { percent: 82, claim: 'tornaram os três passos do bundle insubstituíveis na sua rotina diária' },
    ],
    faqs: [
      {
        q: 'Qual a ordem correcta de aplicação dos três produtos?',
        a: 'Primeiro o óleo de limpeza em rosto seco (massaja, emulsiona com água, enxagua). Depois o tónico milk glow (aplica com as palmas ou algodão). Por último, a essência de mucina de caracol (duas a três gotas, pressiona suavemente no rosto). Esta é a sequência que maximiza a eficácia de cada activo.',
      },
      {
        q: 'Posso usar os três produtos de manhã e à noite?',
        a: 'O óleo de limpeza é mais indicado para a rotina nocturna (remoção de maquilhagem, protetor solar e impurezas do dia). O tónico e a essência de caracol são adequados para manhã e noite, sempre na ordem correcta.',
      },
      {
        q: 'O bundle é adequado para pele sensível?',
        a: 'Sim. Os três produtos têm formulações adequadas a peles sensíveis. A centella asiatica no óleo tem acção calmante reconhecida; o tónico tem fórmula suave e equilibrada; a mucina de caracol é geralmente bem tolerada. Recomendamos sempre um teste de tolerância antes da primeira aplicação completa.',
      },
      {
        q: 'Quanto tempo demora a notar resultados com a rotina completa?',
        a: 'A melhoria na hidratação e luminosidade é percetível nas primeiras semanas. A acção da mucina de caracol sobre linhas de expressão e firmeza acumula-se ao longo de 4-6 semanas de uso consistente.',
      },
      {
        q: 'E se não ficar satisfeita com algum dos produtos do bundle?',
        a: 'O teste de 30 dias sem risco aplica-se a todo o bundle. Contacta o nosso apoio ao cliente e tratamos da situação sem perguntas nem complicações.',
      },
    ],
    items: [
      {
        name: 'Eelhoe Centella Óleo de Limpeza',
        slug: 'eelhoe-centella-oleo-limpeza',
        includedItems: ['Frasco de óleo de limpeza com centella asiatica e vitamina E', 'Manual de utilização'],
      },
      {
        name: 'Milk Glow Tónico',
        slug: 'milk-glow-tonico',
        includedItems: ['Frasco de tónico milk glow', 'Manual de utilização'],
      },
      {
        name: 'Essência de Mucina de Caracol',
        slug: 'essencia-mucina-caracol',
        includedItems: ['Frasco de essência a 96% de filtrado de secreção de caracol', 'Manual de utilização'],
      },
    ],
    productSlugs: ['eelhoe-centella-oleo-limpeza', 'milk-glow-tonico', 'essencia-mucina-caracol'],
    originalTotal: 51.15,
    bundlePrice: 39.99,
    savings: 11.16,
    savingsPercent: 22,
    badge: 'Skin Care',
    featured: false,
    tone: 'linear-gradient(135deg, #FDF0F5 0%, #F9D8E8 100%)',
    accent: '#E0689F',
    image: '/bundles/bundle-skin-ritual.png',
    statsDisclaimer: 'Com base num painel independente de clientes com 4 semanas de duração',
    detailsNote: 'Aplicar sempre o óleo em rosto seco. O tónico e a essência são adequados para uso matinal e nocturno.',
  },
  {
    id: 'bundle-sono-cabelo',
    shopifyHandle: 'bundle-sono-cabelo',
    name: 'Bundle Sono & Cabelo',
    subtitle: 'Touca de Cetim + Fronha de Seda + Eelhoe Rosemary Hair Oil',
    headline: 'O ritual que trabalha enquanto dormes — e o cabelo agradece de manhã.',
    hookEmotional:
      'Imagina acordar de manhã com o cabelo mais hidratado, mais definido e mais forte do que quando te deitaste — e perceber que o único ritual que fizeste foi preparar a cama.',
    description:
      'O Bundle Sono & Cabelo parte de uma premissa simples: a noite é a janela de cuidado mais subestimada de qualquer rotina capilar. Enquanto dormes, o cabelo está horas em contacto com superfícies que absorvem humidade, criam fricção e desfazem o trabalho de toda a semana — a menos que as superfícies sejam as certas.\nO Eelhoe Rosemary Hair Oil é aplicado no couro cabeludo antes de dormir — o momento ideal para a absorção máxima do activo de alecrim clinicamente validado, que actua nos folículos durante horas. A Touca de Cetim encapsula o cabelo, elimina o atrito com a fronha e retém os produtos aplicados. A Fronha de Seda 100% vai mais longe: a superfície de deslizamento ultra-suave protege as mechas que ficam fora da touca, preserva a hidratação do fio e reduz as marcas na pele ao acordar.\nTrês peças, um ritual de três minutos antes de dormir, e uma diferença que se vê de manhã.',
    headlineSecondary: 'Três minutos antes de dormir. Um cabelo diferente ao acordar.',
    paragraphSecondary:
      'Diz adeus ao cabelo frisado e embaraçado de manhã, à queda que não para e à sensação de que todos os produtos de cuidado desapareceram durante a noite! O Bundle Sono & Cabelo transforma as horas de sono no tratamento capilar mais eficaz que já fizeste — porque é contínuo, sem interrupções e sem esforço.\nAntes de dormir: aplica 5-8 gotas de óleo de alecrim no couro cabeludo e massaja suavemente. Coloca a touca de cetim. Deita-te na fronha de seda. É tudo. De manhã, o óleo actuou, o cabelo está protegido, e a definição que tinhas antes de dormir ainda lá está.\nExperimenta durante 30 dias e observa o que acontece quando o teu sono passa a ser parte do teu ritual de cuidado.',
    mainBenefits: [
      'Protecção nocturna completa contra o atrito que danifica o fio e a cutícula',
      'Óleo de alecrim com evidência clínica actua no couro cabeludo durante o sono',
      'Menos frisado, mais definição, mais crescimento — sem esforço adicional',
      'Touca, fronha e tratamento pensados para funcionar juntos durante a noite',
    ],
    secondaryBenefits: [
      {
        title: 'Crescimento Activo Durante o Sono',
        text: 'O alecrim actua nos folículos durante horas sem interferência externa',
      },
      {
        title: 'Zero Atrito Nocturno',
        text: 'Cetim e seda eliminam a fricção que fragiliza a cutícula e desfaz os caracóis',
      },
      {
        title: 'Retenção Total dos Produtos',
        text: 'Touca e fronha não absorvem o óleo nem os produtos aplicados antes de dormir',
      },
      {
        title: 'Resultados Cumulativos',
        text: 'Cada noite soma ao seguinte — os benefícios crescem com o tempo',
      },
    ],
    stats: [
      { percent: 95, claim: 'notaram redução do frisado matinal e melhoria da definição desde a primeira semana com o bundle completo' },
      { percent: 88, claim: 'observaram redução visível da queda capilar após 6 semanas de uso noturno do óleo de alecrim' },
      { percent: 86, claim: 'afirmaram que não conseguem imaginar a rotina nocturna sem os três elementos do bundle' },
    ],
    faqs: [
      {
        q: 'Qual a sequência correcta antes de dormir?',
        a: 'Aplica o óleo de alecrim no couro cabeludo e massaja 1-2 minutos. A seguir, dobra o cabelo suavemente e coloca a touca de cetim. Por último, deita-te na fronha de seda. Esta sequência garante que o óleo actua no couro cabeludo enquanto a touca e a fronha protegem o resto do fio.',
      },
      {
        q: 'A touca fica presa durante a noite com o óleo aplicado?',
        a: 'Sim. A banda elástica regulável da touca está dimensionada para manter a touca segura independentemente dos produtos aplicados. O cetim não é afectado pelo óleo.',
      },
      {
        q: 'A fronha de seda absorve o óleo de alecrim que escapa da touca?',
        a: 'A seda tem absorção significativamente menor do que o algodão. Ao contrário de uma fronha convencional, a fronha de seda preserva os produtos — incluindo o óleo que possa escapar das bordas da touca.',
      },
      {
        q: 'Em quanto tempo o óleo de alecrim mostra resultados nesta rotina nocturna?',
        a: 'A maioria das pessoas nota redução da queda entre as 4-6 semanas. A melhoria de densidade e o aparecimento de novos fios são mais visíveis entre as 8-12 semanas de uso noturno consistente.',
      },
      {
        q: 'E se não ficar satisfeita com algum dos produtos do bundle?',
        a: 'O teste de 30 dias sem risco aplica-se a todo o bundle. Contacta o nosso apoio ao cliente e tratamos da devolução sem perguntas.',
      },
    ],
    items: [
      {
        name: 'Eelhoe Rosemary Hair Oil',
        slug: 'rosemary-hair-oil',
        includedItems: ['Frasco de óleo de alecrim com conta-gotas', 'Manual de utilização'],
      },
      {
        name: 'Touca de Cetim Lumara',
        slug: 'touca-cetim-lumara',
        includedItems: ['Touca de cetim (1 unidade) — disponível em 3 cores', 'Instruções de cuidado'],
      },
      {
        name: 'Fronha de Seda Lumara',
        slug: 'fronha-seda-lumara',
        includedItems: [
          'Fronha de seda 100% (1 unidade) — disponível em mais de 15 cores, 2 tamanhos',
          'Instruções de lavagem e cuidado',
        ],
      },
    ],
    productSlugs: ['rosemary-hair-oil', 'touca-cetim-lumara', 'fronha-seda-lumara'],
    originalTotal: 56.95,
    bundlePrice: 44.99,
    savings: 11.96,
    savingsPercent: 21,
    badge: 'Hair Care',
    featured: false,
    tone: 'linear-gradient(135deg, #F3EFFE 0%, #FDF0F5 100%)',
    accent: '#8B6BE0',
    image: '/bundles/bundle-sono-cabelo.png',
    statsDisclaimer: 'Com base num painel independente de clientes com 4 semanas de duração',
    detailsNote:
      'Recomendamos aplicar o óleo, colocar a touca e depois deitar-te na fronha de seda — nesta ordem — para maximizar a protecção e a absorção dos activos.',
  },
  {
    id: 'bundle-iniciante-perfeito',
    shopifyHandle: 'bundle-iniciante-perfeito',
    defaultVariant: 'Preto',
    name: 'Bundle Iniciante Perfeito',
    subtitle: 'LumaGlide Mini + Sérum PDRN para Olheiras',
    headline: 'O essencial que muda tudo — cabelo e pele, num único passo em frente.',
    hookEmotional:
      'Imagina que o teu próximo nível de cuidado pessoal começa com apenas dois produtos — um para o cabelo que não coopera fora de casa, outro para a pele que parece sempre cansada.',
    description:
      'O Bundle Iniciante Perfeito foi construído para quem quer resultados reais sem entrar num ritual complexo de dez passos e cinco ferramentas. Dois produtos complementares, cada um líder na sua categoria, com uma curva de aprendizagem de zero.\nA LumaGlide Mini resolve o problema que qualquer pessoa com cabelo já conhece: o retoque fora de casa que nunca é possível porque o alisador fica em casa com o cabo preso à parede. Compacta, sem fios e recarregável via USB, cabe em qualquer mala e entrega cabelo liso e brilhante em minutos. O Sérum PDRN para Olheiras resolve outro problema igualmente universal: a pele que, por mais que se durma, continua a parecer cansada. O PDRN de ADN de salmão — o activo que a medicina estética injectável usa em protocolos de regeneração — actua nas olheiras, nas manchas e na luminosidade com resultados progressivos que se vêem.\nDois problemas reais. Duas soluções directas. Um bundle que faz sentido desde o primeiro dia.',
    headlineSecondary: 'Um retoque de cabelo. Uma pele descansada. O essencial, sem complicar.',
    paragraphSecondary:
      'Diz adeus ao cabelo que fica por alisar quando sais de casa e às olheiras que nenhum corretivo parece esconder! O Bundle Iniciante Perfeito resolve os dois problemas mais comuns — com dois produtos que se encaixam em qualquer rotina existente, sem substituir o que já funciona.\nA LumaGlide Mini entra na mala para os retoques fora de casa. O sérum PDRN entra na casa de banho depois da limpeza. Dois minutos de diferença na rotina — em cabelo e pele — que se traduzem num resultado visível ao espelho.\nExperimenta durante 30 dias. Se gostares do resultado — e vais gostar — o próximo passo é o bundle completo.',
    mainBenefits: [
      'Alisamento portátil sem fios para um cabelo impecável em qualquer lugar',
      'Activo de medicina estética para olheiras e luminosidade — em casa, no dia a dia',
      'Dois rituais, dois resultados visíveis — com o mínimo de complexidade',
      'O ponto de partida ideal para elevar o cuidado sem comprometer o orçamento',
    ],
    secondaryBenefits: [
      {
        title: 'Portabilidade Total',
        text: 'A LumaGlide Mini cabe em qualquer mala e funciona sem tomadas nem cabos',
      },
      {
        title: 'Activo Clínico para Casa',
        text: 'O PDRN traz os benefícios da medicina estética para o ritual diário',
      },
      {
        title: 'Complexidade Zero',
        text: 'Dois produtos com aplicação simples e resultados visíveis sem curva de aprendizagem',
      },
      {
        title: 'Entrada Inteligente',
        text: 'O ponto de partida ideal antes de expandir para um ritual mais completo',
      },
    ],
    stats: [
      { percent: 95, claim: 'afirmaram que a LumaGlide Mini resolveu definitivamente o problema dos retoques de cabelo fora de casa' },
      { percent: 91, claim: 'notaram melhoria visível na luminosidade da pele e redução das olheiras em menos de 3 semanas com o sérum PDRN' },
      { percent: 87, claim: 'afirmaram que o bundle foi o ponto de partida que os levou a expandir o ritual de cuidado Lumara' },
    ],
    faqs: [
      {
        q: 'Este bundle é adequado para quem está a começar a criar uma rotina de beleza?',
        a: 'É exactamente para isso que foi criado. Os dois produtos têm aplicação intuitiva, resultados visíveis rapidamente e integram-se em qualquer rotina existente sem complicar. É o ponto de entrada ideal.',
      },
      {
        q: 'Posso levar o bundle completo em viagem?',
        a: 'Sim. A LumaGlide Mini cumpre os regulamentos de bagagem de mão e não precisa de tomada. O sérum PDRN está em frasco de fácil transporte. Ambos são compactos e pensados para acompanhar qualquer deslocação.',
      },
      {
        q: 'O sérum PDRN é adequado para quem está a usar skin care pela primeira vez?',
        a: 'Sim. Apesar de conter um activo de nível clínico, o sérum tem formulação suave e adequada para peles sensíveis e reactivas. É um activo de regeneração — não um ácido ou esfoliante — o que o torna uma excelente entrada no mundo dos séruns de tratamento.',
      },
      {
        q: 'Em que momento do dia devo usar cada produto?',
        a: 'A LumaGlide Mini usa-se quando precisares — em casa ou fora, antes de uma reunião, numa viagem ou num retoque rápido. O sérum PDRN aplica-se de manhã e à noite, após o tónico e antes do hidratante, em dois a três gotas distribuídas suavemente no rosto.',
      },
      {
        q: 'Se gostar do bundle, o que me recomendas a seguir?',
        a: 'Depende do que queres desenvolver. Para styling profissional em casa, o Bundle Styling Completo com a LumaGlide Pro e o VelAir Pro Kit é o próximo nível natural. Para uma rotina de skin care completa, o Bundle Skin Ritual com o tónico, o óleo de limpeza e a essência de caracol complementa o sérum PDRN com a base que o potencia.',
      },
      {
        q: 'E se não ficar satisfeita com algum dos produtos?',
        a: 'O teste de 30 dias sem risco aplica-se a todo o bundle. Contacta o nosso apoio ao cliente e tratamos da devolução sem perguntas, sem complicações.',
      },
    ],
    items: [
      {
        name: 'LumaGlide Mini',
        slug: 'lumaglide-mini',
        includedItems: ['Escova alisadora LumaGlide Mini', 'Cabo USB', 'Tampa de protecção', 'Manual do utilizador'],
      },
      {
        name: 'Sérum PDRN para Olheiras',
        slug: 'serum-pdrn-olheiras',
        includedItems: ['Frasco de sérum PDRN', 'Manual de utilização'],
      },
    ],
    productSlugs: ['lumaglide-mini', 'serum-pdrn-olheiras'],
    originalTotal: 51.68,
    bundlePrice: 44.99,
    savings: 6.69,
    savingsPercent: 13,
    badge: 'Starter',
    featured: false,
    tone: 'linear-gradient(135deg, #FAF8FB 0%, #F3EFFE 100%)',
    accent: '#E0689F',
    image: '/bundles/bundle-iniciante-perfeito.png',
    statsDisclaimer: 'Com base num painel independente de clientes com 4 semanas de duração',
    detailsNote:
      'CARREGADOR DE TOMADA NÃO INCLUÍDO (LumaGlide Mini). O sérum PDRN é adequado para uso matinal e nocturno. Aplicar após o tónico, antes do hidratante.',
  },
];

export function getBundleBySlug(slug: string): Bundle | undefined {
  return bundles.find((b) => b.id === slug);
}
