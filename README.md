# Consultório Odontológico Dra. Joyce – São José dos Pinhais (PR)

Landing page institucional moderna, acolhedora e responsiva para o consultório odontológico da **Dra. Joyce**, com foco principal em agendamentos de consulta via WhatsApp.

---

## 🌟 Visão Geral

- **Localização:** Rua XV de Novembro, 2175, 4º andar, sala 19 – Shopping Celli – Centro, São José dos Pinhais – PR.
- **Contato / WhatsApp:** (41) 99133-1607.
- **Objetivo:** Canal de atração e agendamento humanizado para pacientes no Centro de São José dos Pinhais e região metropolitana de Curitiba.
- **Diferencial Clínico:** Foco em atendimento sem pressa, escuta empática, superação de traumas e medo de dentista, e odontopediatria com carinho.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico:** Estrutura acessível com metatags Open Graph e Schema.org (`Dentist` / `LocalBusiness`).
- **CSS3 Puro:** Design system modular com CSS Custom Properties, layout flexbox/grid, tipografia fluida com `clamp()` e suporte a `prefers-reduced-motion`.
- **JavaScript Vanilla:** Lógica client-side sem dependências:
  - Menu hambúrguer acessível para mobile.
  - Sincronização e renderização dinâmica da grade de tratamentos via array de dados.
  - Carrossel interativo de depoimentos reais do Google (com suporte a swipe touch e navegação por teclado).
  - Acordeão de perguntas frequentes (FAQ).
  - Cálculo dinâmico do status de funcionamento (*"Aberto agora"* / *"Fechado agora"*) com base no Horário Oficial de Brasília (UTC-3).
  - Lightbox modal para visualização em alta resolução da foto do consultório.
- **Identidade Visual:** Paleta refinada em tons de vinho (`#7A1F45`, `#4A1230`), rosa suave (`#FCE8EE`, `#F8D3DF`) e monograma "J" vetorial em SVG.

---

## 📁 Estrutura do Projeto

```text
├── index.html            # Página inicial completa
├── .gitignore            # Arquivos ignorados pelo Git
├── README.md             # Documentação do projeto
├── css/
│   └── style.css         # Estilização completa e responsiva
├── js/
│   └── main.js           # Lógica dos componentes interativos
└── assets/
    └── img/
        ├── dra-joyce.png     # Retrato da Dra. Joyce
        ├── consultorio.png   # Vista panorâmica do consultório
        ├── monogram.svg      # Monograma "J" vetorial da marca
        └── favicon.svg       # Favicon do site
```

---

## 🚀 Como Executar Localmente

Como o projeto é totalmente estático e não utiliza frameworks pesados, basta:

1. Clonar ou baixar o repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/dra-joyce-odontologia.git
   ```
2. Abrir o arquivo `index.html` diretamente em qualquer navegador moderno (Chrome, Edge, Firefox, Safari).

---

## 📝 Como Personalizar Conteúdos

- **Tratamentos:** Edite o array `TREATMENTS_DATA` no arquivo `js/main.js`.
- **Depoimentos:** Edite o array `TESTIMONIALS_DATA` no arquivo `js/main.js`.
- **Horário de Atendimento:** Ajuste as variáveis de horário na função `initBusinessStatus()` em `js/main.js`.
- **Campos Pendentes:** Procure pelas tags `[PREENCHER]` no arquivo `index.html` para inserir o CRO e detalhes de formação da profissional.

---

## ⚖️ Conformidade Ética (CFO / CRO)

Este site foi desenvolvido em rigorosa conformidade com o Código de Ética Odontológica do Conselho Federal de Odontologia (CFO), com finalidade estritamente informativa e sem promessas sensacionalistas ou divulgação de preços.
