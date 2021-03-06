export const characters = [{
    id: "wanda",
    name: "Wanda",
    "default-skill": "2 Zonas por ação de movimento",
    text: "Tira a mão daí, senão eu corto fora!",

    levels: [{
      yellow: {
        "skill-options": [{
          skill: "+1 Ação"
        }],
      },

      orange: {
        "skill-options": [{
            skill: "+1 Re-rolagem de dado: Faca"
          },
          {
            skill: "Lisa"
          },
        ],
      },

      red: {
        "skill-options": [{
            skill: "+1 Dado: Combate"
          },
          {
            skill: "+1 Ação de movimento"
          },
          {
            skill: "+1 Zona por movimento"
          },
        ],
      },
    }, ],
  },

  {
    id: "amy",
    name: "Amy",
    "default-skill": "+1 ação livre de movimento",
    text: "Não, eu não quero explicar por que precisamos saquear a loja de maquiagem.",

    levels: [{
      yellow: {
        "skill-options": [{
          skill: "+1 Ação"
        }],
      },

      orange: {
        "skill-options": [{
            skill: "+1 Ação de combate"
          },
          {
            skill: "+1 Ação de movimento"
          },
        ],
      },

      red: {
        "skill-options": [{
            skill: "+1 Dado: Combate"
          },
          {
            skill: "+1 Rolagem de dados: Combate"
          },
          {
            skill: "Médica"
          },
        ],
      },
    }, ],
  },

  {
    id: "doug",
    name: "Doug",
    "default-skill": "Dupla Letal",
    text: "Pelo lado positivo, não tenho mais que enviar relatórios de produtividade.",

    levels: [{
      yellow: {
        "skill-options": [{
          skill: "+1 Ação"
        }],
      },

      orange: {
        "skill-options": [{
            skill: "+1 Dado: Alcance"
          },
          {
            skill: "+1 Ação de Combate"
          },
        ],
      },

      red: {
        "skill-options": [{
            skill: "+1 Rolagem de dados: Combate"
          },
          {
            skill: "Ambidestro"
          },
          {
            skill: "Liso"
          },
        ],
      },
    }, ],
  },

  {
    id: "josh",
    name: "Josh",
    "default-skill": "Liso",
    text: "Eu não quero o seu dinheiro. Que diabos eu faria com ele?",

    levels: [{
      yellow: {
        "skill-options": [{
          skill: "+1 Ação"
        }],
      },

      orange: {
        "skill-options": [{
            skill: "+1 Dado: Corpo-a-corpo"
          },
          {
            skill: "+1 Re-rolagem por turno"
          },
        ],
      },

      red: {
        "skill-options": [{
            skill: "+1 Ação de movimento"
          },
          {
            skill: "+1 Dado: Combate"
          },
          {
            skill: "Sortudo"
          },
        ],
      },
    }, ],
  },

  {
    id: "ned",
    name: "Ned",
    "default-skill": "+1 Ação de Procura",
    text: "…adicione um pouco de alvejante e BUM! He he he…",

    levels: [{
      yellow: {
        "skill-options": [{
          skill: "+1 Ação"
        }],
      },

      orange: {
        "skill-options": [{
            skill: "+1 Dado: Alcance"
          },
          {
            skill: "+1 Ação de Combate"
          },
        ],
      },

      red: {
        "skill-options": [{
            skill: "+1 Dado: Combate"
          },
          {
            skill: "+1 Rolagem de dados: Combate"
          },
          {
            skill: "Resistente"
          },
        ],
      },
    }, ],
  },

  {
    id: "phil",
    name: "Phil",
    "default-skill": "Inicia com uma pistola",
    text: "Eu te dou cobertura. Fique fora da minha linha de tiro! Vai vai vai!",

    levels: [{
      yellow: {
        "skill-options": [{
          skill: "+1 Ação"
        }],
      },

      orange: {
        "skill-options": [{
            skill: "+1 Ação de Procura"
          },
          {
            skill: "+1 Dado: Alcance"
          },
        ],
      },

      red: {
        "skill-options": [{
            skill: "+1 Dado: Alcance"
          },
          {
            skill: "Nacido pra liderar"
          },
          {
            skill: "Sniper"
          },
        ],
      },
    }, ],
  },
];
