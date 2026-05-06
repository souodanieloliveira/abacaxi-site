export const siteContent = {
  home: {
    hero: {
      title: "Roteiro Financeiro para Momentos Decisivos",
      paragraph1:
        "Não importa o que vem em seguida, te ajudamos a navegar com tranquilidade",
      paragraph2:
        "Ajudamos pessoas, empresas e instituições a organizar suas finanças, planejar o futuro e tomar decisões com mais clareza.",
      cta: "Vamos Conversar",
      image: "/hero-abacaxi.png",
    },

    services: [
      {
        title: "Para você.",
        subtitle: "Faça mais com o seu dinheiro.",
        description:
          "Seja para ajustar o mês a mês ou para atingir seus objetivos de vida, tenha um roteiro financeiro para todas as decisões importantes.",
        href: "/pessoas",
      },
      {
        title: "Para o seu negócio.",
        subtitle: "Eleve o patamar da sua empresa.",
        description:
          "Ter um parceiro confiável faz toda a diferença no dia a dia. Contribuímos com estrutura financeira, rotinas organizadas e apoio estratégico para sua empresa crescer com segurança.",
        href: "/empresas",
      },
      {
        title: "Educação.",
        subtitle: "Cursos online e presenciais.",
        description:
          "A educação financeira apropriada vai além do conhecimento técnico: promove clareza, tranquilidade e melhores decisões para pessoas, grupos, empresas e instituições.",
        href: "/educacao",
      },
    ],

    statement: {
      tagline: "Processo organizado para o que importa para você.",
      description:
        "Sem fórmulas prontas. Cada jornada começa com escuta — e evolui em cinco marcos que transformam a sua realidade financeira em um plano concreto e realizável.",
    },

    coroa: {
      title: "Os 5 Marcos",
      subtitle: "Jornada COROA",
      items: [
        {
          number: 1,
          name: "Clareza",
          description:
            "Antes de qualquer plano, mapeamos receitas, dívidas, gastos e patrimônio para criar uma fotografia fiel do momento atual.",
        },
        {
          number: 2,
          name: "Organização",
          description:
            "Com o diagnóstico em mãos, organizamos suas finanças em um sistema simples e sustentável que funciona no dia a dia.",
        },
        {
          number: 3,
          name: "Roteiro",
          description:
            "Definimos seus objetivos e traçamos um plano concreto com metas, prazos e prioridades. Não uma lista de desejos — um caminho real.",
        },
        {
          number: 4,
          name: "Otimização",
          description:
            "Revisamos investimentos, seguros e custos para garantir que cada real está trabalhando a seu favor.",
        },
        {
          number: 5,
          name: "Autonomia",
          description:
            "O objetivo final não é sua dependência de um consultor. Saímos juntos quando você está preparado para seguir com segurança.",
        },
      ],
      cta: "Agende sua conversa gratuita.",
    },

    momentos: {
      statement: "Você tem objetivos e preocupações. Nós traçamos caminhos.",
      items: [
        {
          icon: "Sunset",
          title: "Aposentadoria",
          description:
            "Transformar uma vida de trabalho em segurança e liberdade financeira, com um plano que sustente seus próximos anos.",
        },
        {
          icon: "Briefcase",
          title: "Novos negócios",
          description:
            "Separar as finanças pessoais das empresariais e estruturar uma base sólida para empreender com menos risco.",
        },
        {
          icon: "Scissors",
          title: "Divórcio",
          description:
            "Reorganizar a vida financeira após uma separação, com clareza e sem deixar decisões importantes para depois.",
        },
        {
          icon: "Heart",
          title: "Casamento",
          description:
            "Alinhar objetivos, hábitos e planos com quem você vai construir o futuro — antes que os conflitos apareçam.",
        },
      ],
    },

    ctaFinal: {
      headline: "Descubra onde você está, e para onde pode ir.",
      sub: "Um diagnóstico financeiro gratuito para entender sua situação atual e dar o primeiro passo com clareza.",
      cta: "Quero meu diagnóstico gratuito",
      ctaHref: "/contato",
    },

    credibilidade: {
      statement:
        "A Abacaxi nasceu da crença de que todo mundo merece um plano financeiro feito para a sua vida — não para a vida dos outros.",
      numeros: [
        { valor: "+8", label: "anos de mercado" },
        { valor: "+600", label: "pessoas e empresas atendidas" },
        { valor: "+500", label: "alunos em workshops e palestras" },
      ],
      cta: "Conheça a Abacaxi",
      ctaHref: "/sobre",
    },

    educationPreview: {
      statement:
        "Conhecimento financeiro para tomar decisões com mais confiança.",
      sub: "Em breve, cursos online da Abacaxi.",
      formPlaceholder: "Seu e-mail",
      formCta: "Quero ser avisado",
      formDisclaimer: "Sem spam. Só avisamos quando estiver pronto.",
    },
  },

  empresas: {
    hero: {
      title: "Estrutura financeira para empresas que querem crescer com segurança.",
      subtitle:
        "Da organização do dia a dia ao planejamento estratégico — a Abacaxi oferece suporte financeiro completo para o seu negócio.",
      // Placeholder — substituir por foto de ambiente corporativo/equipe
      image: "/hero-abacaxi.png",
    },
    services: [
      {
        featured: true,
        tag: "A base financeira que toda empresa precisa.",
        title: "Rotinas Financeiras",
        description:
          "As Rotinas Financeiras são o nosso serviço de BPO Financeiro — uma estrutura completa de gestão financeira terceirizada para que você foque no que realmente importa: o seu negócio. Disponível em três modelos adaptados ao porte e à complexidade da sua empresa.",
        cta: "Quero conhecer as Rotinas Financeiras",
        href: "/contato",
        // Foto: equipe financeira organizada, ambiente profissional
        image: null as string | null,
        testimonial: null as string | null,
      },
      {
        featured: false,
        tag: "Contabilidade integrada à sua gestão financeira.",
        title: "Contabilidade",
        description:
          "Oferecemos um serviço de contabilidade completo — simples ou com conciliação bancária e registro de ponto inclusos. Tudo intermediado pela Abacaxi para garantir consistência entre a sua contabilidade e a sua gestão financeira.",
        cta: "Quero saber mais",
        href: "/contato",
        // Foto: documentos e relatórios financeiros organizados
        image: null as string | null,
        testimonial: null as string | null,
      },
      {
        featured: false,
        tag: "Para decisões que impactam o futuro da empresa.",
        title: "Consultoria Estratégica",
        description:
          "Precificação, planejamento financeiro, valuation e muito mais — sob demanda, para clientes que já estão na base da Abacaxi. Trabalhamos na complexidade do seu momento, com profundidade e critério.",
        cta: "Quero saber mais",
        href: "/contato",
        // Foto: reunião de consultoria, tomada de decisão estratégica
        image: null as string | null,
        testimonial: null as string | null,
      },
    ],
    ctaFinal: {
      headline: "Pronto para estruturar as finanças da sua empresa?",
      cta: "Agendar conversa gratuita",
      ctaHref: "/contato",
    },
  },

  contato: {
    hero: {
      title: "Vamos conversar?",
      subtitle:
        "Preencha o formulário ou escolha o canal que preferir. Respondemos em até 1 dia útil.",
    },
    canais: {
      whatsapp: {
        numero: "+55 61 99966-5697",
        href: "https://wa.me/5561999665697",
      },
      email: {
        endereco: "fale-com@abacaxi.cc",
        href: "mailto:fale-com@abacaxi.cc",
      },
    },
  },

  sobre: {
    hero: {
      title: "Existimos para ajudar a construir liberdade e mostrar às pessoas que elas podem ser o que quiserem.",
      // Placeholder — substituir por foto da equipe ou ambiente Abacaxi
      image: "/hero-abacaxi.png",
    },
    origem: {
      title: "Por que a Abacaxi existe",
      paragraphs: [
        "Se você já pesquisou sobre finanças na internet, sabe do que estamos falando: um bombardeio de anúncios, cursos, gurus e fórmulas mágicas começa a aparecer na sua tela. O curso de 3 dias que vai resolver a sua vida financeira. A mentoria com aquele influenciador que vai te deixar milionário. A imersão que vai te tornar o próximo trader de sucesso.",
        "E você, que gostaria simplesmente de ter uma relação mais saudável com o seu dinheiro, fica perdido — sem saber o que fazer. Já pagou um curso, fez uma mentoria, mas o problema continua lá, intacto.",
        "Nós acreditamos que todas as pessoas merecem liberdade e segurança financeira. Segurança para empreender, trabalhar e fazer negócios sem se preocupar com o aluguel no fim do mês. Liberdade para aproveitar o tempo com as pessoas que ama, fazendo o que gosta.",
        "Nossa abordagem é pessoal, prática e realista. Sem fórmulas prontas, sem 7 passos, sem o guia definitivo. Acreditamos que a sua realidade merece personalização — feita a quatro mãos, respeitando as diferenças entre cada pessoa e sua própria vida financeira.",
      ],
      closing: "O seu abacaxi pode se transformar no que você quiser. Aproveite o caminho.",
    },
    pilares: [
      {
        title: "De pessoa pra pessoa",
        description:
          "Antes de qualquer planilha, tem uma conversa. Ouvimos desde o início — porque entender a sua vida vem antes de organizar o seu dinheiro.",
      },
      {
        title: "Excelência para servir",
        description:
          "Não nos contentamos com o suficiente. Cada detalhe do processo importa — porque consistência é o que transforma um bom plano em resultado real.",
      },
      {
        title: "Proporcionar mudanças",
        description:
          "Não saímos da sua vida quando o trabalho termina. Saímos quando você está pronto para seguir — com autonomia, sem preocupações.",
      },
    ],
    mvv: [
      {
        title: "Missão",
        text: "Tornamos a vida mais fácil. Eliminamos barreiras e inspiramos pessoas para que construam um mundo melhor.",
        items: null as string[] | null,
      },
      {
        title: "Visão",
        text: "Cada pessoa, família e organização com a oportunidade de atingir seu máximo potencial, livre de medos e segura de si mesma.",
        items: null as string[] | null,
      },
      {
        title: "Valores",
        text: null as string | null,
        items: [
          "Sempre trabalhamos para exceder as expectativas",
          "Pessoas acima de qualquer número",
          "Ouvir com empatia é o primeiro passo",
          "Acreditamos no poder da consistência",
          "Desafiamos o estado das coisas com audácia",
          "Acreditamos na simplicidade",
          "Acreditamos no poder do conjunto e da integração",
        ],
      },
    ],
    daniel: {
      paragraphs: [
        "Daniel não entrou no mercado financeiro pelos produtos — entrou pelas pessoas. Desde 2007 trabalha com vendas consultivas, personalizando soluções para pessoas e empresas em contextos complexos. Em 2016 foi apresentado ao mercado financeiro e em 2017 atendeu seu primeiro cliente de planejamento financeiro.",
        "A experiência com clientes de alta renda revelou algo que poucos profissionais do setor admitem: renda alta não resolve problema financeiro mal estruturado. Essa constatação foi o ponto de partida da Abacaxi — e da Metodologia COROA.",
        "Trabalhamos de forma fiduciária — sem vínculo com bancos, corretoras ou qualquer instituição financeira. Sem conflito de interesses. Quem nos remunera é você, e só você.",
      ],
      // Placeholder — substituir por foto real do Daniel
      image: null as string | null,
    },
    numeros: [
      { valor: "+8", label: "anos de mercado" },
      { valor: "+600", label: "pessoas e empresas atendidas" },
      { valor: "+500", label: "alunos em workshops e palestras" },
    ],
    ctaFinal: {
      headline: "Vamos descascar o seu abacaxi juntos?",
      cta: "Agendar conversa gratuita",
      ctaHref: "/contato",
    },
  },

  educacao: {
    hero: {
      title: "Educação financeira para empresas e órgãos que cuidam das pessoas.",
      subtitle:
        "Oferecemos aulas e cursos estruturados de educação financeira para programas corporativos — com foco especial em preparação para aposentadoria.",
      // Placeholder — substituir por foto de palestra/aula corporativa
      image: "/hero-abacaxi.png",
    },
    main: {
      tag: "Para empresas e órgãos",
      subtitle: "Uma aula que transforma a relação das pessoas com o dinheiro.",
      description:
        "Há mais de 4 anos levamos educação financeira para colaboradores de empresas e órgãos como CNI, SESC/SENAC e Ministério Público de Minas Gerais. Nossas aulas têm entre 2h e 3h e podem ser contratadas de forma avulsa ou como parte de um programa estruturado de preparação para aposentadoria.",
      items: [
        "Aulas avulsas de educação financeira",
        "Cursos pré-formatados para programas de aposentadoria",
        "Conteúdo personalizado de acordo com o perfil dos colaboradores",
      ],
    },
    cursosOnline: {
      title: "Em breve: cursos online para pessoas físicas.",
      description:
        "Estamos desenvolvendo uma biblioteca de cursos gravados para quem quer aprender no próprio ritmo. Deixe seu e-mail e avisamos quando estiver pronto.",
      formPlaceholder: "Seu e-mail",
      formCta: "Quero ser avisado",
      formDisclaimer: "Sem spam. Só avisamos quando estiver pronto.",
    },
  },

  pessoas: {
    hero: {
      title: "Cuide das suas finanças com quem entende o seu momento.",
      subtitle:
        "Independente de onde você está — organizando o dia a dia, planejando o futuro ou enfrentando uma transição — a Abacaxi tem um serviço feito para você.",
      // Placeholder — substituir por foto de conexão humana/conversa
      image: "/hero-abacaxi.png",
    },
    services: [
      {
        badge: "Comece por aqui",
        tag: "Para quem precisa de clareza rápida.",
        title: "Encontros Individuais",
        description:
          "Os Encontros Individuais são sessões focadas para resolver questões pontuais ou avançar em uma decisão financeira específica. Disponíveis de forma avulsa ou em pacotes de 2 ou 3 encontros — 100% online, sem burocracia.",
        cta: "Saiba mais",
        href: "/contato",
        // Foto: conversa entre consultor e cliente, ambiente acolhedor
        image: null as string | null,
        testimonial: null as string | null,
      },
      {
        badge: null as string | null,
        tag: "Para quem quer um plano completo e personalizado.",
        title: "Projetos de Planejamento Financeiro",
        description:
          "Cada projeto é construído do zero, a partir da sua realidade. Entre 6 e 15 encontros, trabalhamos juntos para mapear, organizar e traçar um roteiro financeiro concreto para a sua vida. Começa com uma conversa — sem compromisso.",
        cta: "Quero conhecer os projetos",
        href: "/contato",
        // Foto: cliente revisando plano financeiro com consultor
        image: null as string | null,
        testimonial: null as string | null,
      },
      {
        badge: null as string | null,
        tag: "Para quem já deu o primeiro passo e quer continuar evoluindo.",
        title: "Acompanhamento Abacaxi",
        description:
          "O Acompanhamento é o serviço de continuidade da Abacaxi — disponível para quem já passou por um Encontro ou Projeto. Com encontros mensais, trimestrais ou semestrais, garantimos que o seu plano continue vivo e atualizado.",
        cta: "Quero saber mais",
        href: "/contato",
        // Foto: cliente confiante, olhando para o futuro
        image: null as string | null,
        testimonial: null as string | null,
      },
    ],
    ctaFinal: {
      headline: "Não sabe por onde começar? Comece por uma conversa.",
      cta: "Agendar conversa gratuita",
      ctaHref: "/contato",
    },
  },
};