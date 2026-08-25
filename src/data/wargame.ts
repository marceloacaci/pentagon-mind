import { WargameScenario } from '../types';

export const wargameScenarios: WargameScenario[] = [
  {
    id: 'wg-taiwan-blockade',
    title: 'Contingência de Quarentena / Bloqueio Naval no Estreito de Taiwan',
    crisisTrigger: 'Forças navais e aéreas do PLA declaram zona de exclusão marítima total ao redor de Taiwan, interceptando navios de carga de semicondutores e energia.',
    geopoliticalContext: 'Ação na "Zona Cinzenta" abaixo do limiar de uma invasão cinética direta, visando estrangular a economia de Taiwan sem disparar um casus belli imediato com os EUA.',
    initialDefcon: 'DEFCON 3',
    adversaryAction: 'Desdobramento de 40+ fragatas e destróieres, bloqueio de cabos submarinos e patrulhas constantes de caças J-20 sobre a linha média.',
    historicalAnalogy: 'Crise dos Mísseis de Cuba (1962) — quarentena naval como instrumento coercitivo.',
    usCommandOptions: [
      {
        id: 'opt-hellscape',
        label: 'Opção A: Emprego Imediato da Doutrina "Hellscape" (Enxames Autônomos Replicator)',
        doctrineApplied: 'Operações Multidomínio (MDO) & Estratégia Replicator',
        outcomeTitle: 'Ruptura do Bloqueio por Saturação Autônoma',
        outcomeDescription: 'Desdobramento massivo de milhares de embarcações de superfície não tripuladas e drones aéreos de baixo custo no estreito, forçando os navios chineses a recuarem sem expor tripulações americanas a risco de vida imediato.',
        riskAssessment: 'Moderado',
        jadc2Involvement: 'O nó CJADC2 aloca alvos em milissegundos via satélites SDA, coordenando os enxames de forma descentralizada.'
      },
      {
        id: 'opt-csg-escort',
        label: 'Opção B: Escolta Direta por Grupos de Combate de Porta-Aviões (CSG) com FONOPS',
        doctrineApplied: 'Doutrina Powell (Força Esmagadora Convencional)',
        outcomeTitle: 'Enfrentamento Direto e Escalada de Alto Risco',
        outcomeDescription: 'Dois porta-aviões da US Navy (USS Ronald Reagan e USS Nimitz) cruzam o estreito escoltando cargueiros. Ocorre confronto de guerra eletrônica intensa e risco iminente de disparos de advertência ou colisão cinética.',
        riskAssessment: 'Alto',
        jadc2Involvement: 'Radares Aegis de destróieres linkados via CEC (Cooperative Engagement Capability) mantêm guarda contra mísseis antinavio DF-21D.'
      },
      {
        id: 'opt-distant-blockade',
        label: 'Opção C: Contrabraqueio Estratégico Distante no Estreito de Malaca',
        doctrineApplied: 'Dissuasão Integrada & Estrangulamento Geoeconômico',
        outcomeTitle: 'Pressão Econômica Global Sem Combate Cinético no Estreito',
        outcomeDescription: 'A Marinha dos EUA e aliados da Commonwealth (AUKUS) bloqueiam as importações de petróleo e matérias-primas para a China no Oceano Índico e Estreito de Malaca, forçando Pequim a negociar o fim do cerco a Taiwan.',
        riskAssessment: 'Baixo',
        jadc2Involvement: 'Vigilância via drones MQ-4C Triton e satélites comerciais de observação terrestre.'
      }
    ],
    source: 'CSIS / Center for a New American Security (CNAS) Gaming Scenarios',
    lastVerified: '2026-08-20',
  },
  {
    id: 'wg-space-cyber-blind',
    title: 'Ataque Cibernético e Antissatélite à Infraestrutura Espacial (SDA)',
    crisisTrigger: 'Cibercriminosos apoiados por estado hostil realizam ataque de negação de serviço e malware wiper em estações de solo da constelação GPS e SDA.',
    geopoliticalContext: 'Abertura de hostilidades em domínio invisível para cegar os sistemas de comando e controle (C2) dos EUA antes de uma ofensiva regional.',
    initialDefcon: 'DEFCON 2',
    adversaryAction: 'Guerra eletrônica com bloqueadores laser terrestres cegando sensores ópticos de satélites e sequestro de links de telemetria.',
    historicalAnalogy: 'Ataque de Pearl Harbor (1941) em versão ciber-espacial de desativação de sensores.',
    usCommandOptions: [
      {
        id: 'opt-cyber-retaliation',
        label: 'Opção A: Contra-ataque Ofensivo no Ciberespaço (USCYBERCOM)',
        doctrineApplied: 'Defesa Persistente / Operações no Ciberespaço (JP 3-12)',
        outcomeTitle: 'Desativação da Infraestrutura Elétrica e de Comando Inimiga',
        outcomeDescription: 'O US Cyber Command ativa acessos pré-posicionados nas redes militares do adversário, desligando radares de alerta precoce e redes de transmissão elétrica que alimentam as estações de ataque.',
        riskAssessment: 'Moderado',
        jadc2Involvement: 'Isolamento automático das redes comprometidas e migração de tráfego para nuvens táticas distribuídas seguras (JWCC).'
      },
      {
        id: 'opt-tactical-launch',
        label: 'Opção B: Lançamento Espacial de Resposta Rápida (Tactically Responsive Space - TacRS)',
        doctrineApplied: 'Resiliência Espacial da US Space Force',
        outcomeTitle: 'Reconstituição da Constelação em Menos de 24 Horas',
        outcomeDescription: 'A Força Espacial dos EUA utiliza foguetes comerciais rápidos para lançar micro-satélites de reserva em órbita baixa (LEO), restabelecendo o sinal de navegação e comunicações táticas antes que o inimigo explore a brecha.',
        riskAssessment: 'Baixo',
        jadc2Involvement: 'Integração instantânea dos novos nós orbitais à malha de dados táticos das forças terrestres e navais.'
      }
    ],
    source: 'Mitchell Institute for Aerospace Studies / US Space Force Doctrine Publication 1-0',
    lastVerified: '2026-08-20',
  },
  {
    id: 'wg-baltics-suwalki',
    title: 'Fechamento Rápido do Corredor de Suwalki no Flanco Leste da OTAN',
    crisisTrigger: 'Sob pretexto de exercícios militares não anunciados ("Zapad"), tropas mecanizadas realizam avanço relâmpago de 65 km fechando a fronteira Polônia-Lituânia.',
    geopoliticalContext: 'Tentativa de isolar os três Estados Bálticos (Estônia, Letônia e Lituânia) da retaguarda europeia e testar a determinação do Artigo 5 da OTAN.',
    initialDefcon: 'DEFCON 2',
    adversaryAction: 'Criação de uma "bolha A2/AD" densa a partir de Kaliningrado com sistemas S-400 e mísseis balísticos Iskander-M.',
    historicalAnalogy: 'Bloqueio de Berlim (1948) e Batalha das Ardenas (1944).',
    usCommandOptions: [
      {
        id: 'opt-nato-art5',
        label: 'Opção A: Ativação Imediata do Artigo 5 e Contraofensiva da Força de Resposta da OTAN (ARF)',
        doctrineApplied: 'Doutrina de Dissuasão Avançada da OTAN & AirLand Battle Multidomínio',
        outcomeTitle: 'Ataque Simultâneo contra Nós A2/AD em Kaliningrado',
        outcomeDescription: 'Emprego de caças F-35A com mísseis antirradar AARGM-ER e salvas de HIMARS/PrSM para suprimir defesas aéreas inimigas, abrindo corredor para blindados da 1ª Divisão de Cavalaria dos EUA.',
        riskAssessment: 'Alto',
        jadc2Involvement: 'Coordenação em tempo real entre sistemas de armas de 32 nações aliadas sob a infraestrutura unificada FMN (Federated Mission Networking).'
      },
      {
        id: 'opt-airlift-island',
        label: 'Opção B: Ponte Aérea Maciça e Desdobramento de Forças Especiais (SOF)',
        doctrineApplied: 'Operações Especiais e Dissuasão por Negação',
        outcomeTitle: 'Sustentação dos Bálticos e Guerra Urbana de Desgaste',
        outcomeDescription: 'Uso de aeronaves C-17 Globemaster III sob cobertura aérea pesada para reforçar as capitais bálticas, transformando as cidades em fortalezas impenetráveis e forçando o invasor a negociar um cessar-fogo.',
        riskAssessment: 'Moderado',
        jadc2Involvement: 'Emprego de links táticos Link 16 e inteligência de satélite para guiar mísseis portáteis Javelin e Stinger.'
      }
    ],
    source: 'RAND Corporation Reports on Baltic Defense / NATO Supreme Allied Commander Europe (SACEUR) Briefings',
    lastVerified: '2026-08-20',
  }
];
