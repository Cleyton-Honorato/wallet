# Prompt — Gerar o Design System do **Wallet** no Claude (Artifacts)

> Cole **todo o conteúdo abaixo da linha** em uma conversa no claude.ai e peça para gerar.
> O resultado deve ser um **Artifact React** interativo: um *style guide vivo* que renderiza
> todos os tokens e componentes do Wallet, com alternância de tema claro/escuro.

---

## PROMPT (copie a partir daqui) ⬇️

Você é um(a) designer de produto + engenheiro(a) frontend. Crie um **Artifact React único e
interativo** que seja a **página de Design System (style guide) do app "Wallet"** — uma aplicação
de gestão financeira pessoal. O objetivo é uma página de referência visual, navegável, que
demonstre cada token e componente.

### Requisitos gerais
- **Um único componente React** (Artifact), sem dependências externas além de `react` e
  `lucide-react` (ícones). Não use Tailwind; use **CSS via tag `<style>` com variáveis CSS (custom properties)**
  exatamente como os tokens abaixo.
- Implemente **tema claro e escuro** com um botão de toggle no topo (alternando `data-theme="dark"`
  num wrapper). Todas as cores semânticas devem trocar conforme o tema.
- Layout: cabeçalho fixo com nome "Wallet", logo (um quadrado com gradiente índigo), toggle de tema,
  e uma navegação por seções (âncoras). Conteúdo centralizado, `max-width: 1200px`, fundo
  `--surface-secondary`.
- Fonte **Inter** (importe do Google Fonts). Números podem usar mono.
- Visual: limpo, moderno, denso em dados, cantos arredondados generosos, sombras suaves, acento
  azul-índigo.

### Seções obrigatórias (nesta ordem)
1. **Capa / Intro** — nome do design system, breve descrição e o toggle de tema.
2. **Cores** — mostre swatches com nome do token + valor hex para cada grupo:
   - Primária (índigo), Sucesso, Aviso, Perigo, escala de Cinza.
   - Cores semânticas financeiras: Receita, Despesa, Transferência (com seus fundos translúcidos).
3. **Tipografia** — amostra de cada tamanho (`--text-xs` … `--text-5xl`) e cada peso
   (light→bold), com o nome do token ao lado.
4. **Espaçamento** — barras horizontais ilustrando a escala `--space-*` (rótulo + px).
5. **Raio de borda** — quadrados demonstrando `--radius-xs` … `--radius-2xl` e `--radius-full`.
6. **Sombras** — cartões demonstrando `--shadow-xs` … `--shadow-2xl`.
7. **Componentes** — renderize versões funcionais de:
   - **Card de KPI**: título, valor grande, subtítulo, ícone (lucide). Variantes `neutral`,
     `income` (valor verde), `expense` (valor vermelho), `investment` (valor índigo). Borda
     `--border-primary`, `--radius-lg`, `padding --space-5`, sombra `--shadow-sm` no hover.
   - **Select** estilizado: label em cima, chevron à direita, anel de foco índigo.
   - **ProgressBar** de orçamento: trilho arredondado + preenchimento colorido por status
     (`ok`=verde até 80%, `warning`=âmbar 80–100%, `over`=vermelho >100%). Mostre 3 exemplos.
   - **Botão primário**: fundo `--color-primary-500`, texto branco, `--font-semibold`,
     `--radius-md`; estados hover e disabled (opacity 0.6).
   - **Input de formulário**: label + input com borda `--border-primary`, foco muda borda para
     índigo; inclua um exemplo de mensagem de erro (`--color-danger-500`).
   - **Header flutuante** (miniatura): barra com `backdrop-filter: blur(16px)`, fundo translúcido,
     `--radius-2xl`, `--shadow-lg`, com logo, itens de nav e ícones de ação (Bell, Sol/Lua, avatar).
8. **Animações** — botões que disparam e mostram: fade-in-up, fade-in-scale, pulse, spin, shimmer
   (skeleton) e bounce.

### TOKENS DE DESIGN — use exatamente estes valores

```css
:root {
  /* Primária (índigo) */
  --color-primary-50:#f0f4ff; --color-primary-100:#dbe4ff; --color-primary-200:#bac8ff;
  --color-primary-300:#91a7ff; --color-primary-400:#748ffc; --color-primary-500:#4f6ef7;
  --color-primary-600:#3b5bdb; --color-primary-700:#2b4acb; --color-primary-800:#1e3a8a;
  --color-primary-900:#1a2f6d;

  /* Sucesso / Aviso / Perigo */
  --color-success-50:#f0fdf4; --color-success-100:#dcfce7; --color-success-500:#22c55e;
  --color-success-600:#16a34a; --color-success-700:#15803d;
  --color-warning-50:#fffbeb; --color-warning-100:#fef3c7; --color-warning-500:#f59e0b;
  --color-warning-600:#d97706;
  --color-danger-50:#fef2f2; --color-danger-100:#fee2e2; --color-danger-500:#ef4444;
  --color-danger-600:#dc2626; --color-danger-700:#b91c1c;

  /* Cinzas */
  --color-gray-50:#f9fafb; --color-gray-100:#f3f4f6; --color-gray-200:#e5e7eb;
  --color-gray-300:#d1d5db; --color-gray-400:#9ca3af; --color-gray-500:#6b7280;
  --color-gray-600:#4b5563; --color-gray-700:#374151; --color-gray-800:#1f2937;
  --color-gray-900:#111827; --color-gray-950:#030712;

  /* Semânticas financeiras */
  --color-income:#22c55e; --color-income-bg:rgba(34,197,94,0.1);
  --color-expense:#ef4444; --color-expense-bg:rgba(239,68,68,0.1);
  --color-transfer:#3b82f6; --color-transfer-bg:rgba(59,130,246,0.1);

  /* Superfícies / Bordas / Texto (tema claro) */
  --surface-primary:#ffffff; --surface-secondary:#f9fafb; --surface-elevated:#ffffff;
  --surface-overlay:rgba(0,0,0,0.5); --surface-card:#ffffff;
  --border-primary:#e5e7eb; --border-secondary:#f3f4f6; --border-focus:var(--color-primary-500);
  --text-primary:#111827; --text-secondary:#6b7280; --text-tertiary:#9ca3af;
  --text-inverse:#ffffff; --text-link:var(--color-primary-600);

  /* Espaçamento (base 4px) */
  --space-0:0; --space-0-5:.125rem; --space-1:.25rem; --space-1-5:.375rem; --space-2:.5rem;
  --space-2-5:.625rem; --space-3:.75rem; --space-3-5:.875rem; --space-4:1rem; --space-5:1.25rem;
  --space-6:1.5rem; --space-7:1.75rem; --space-8:2rem; --space-9:2.25rem; --space-10:2.5rem;
  --space-12:3rem; --space-14:3.5rem; --space-16:4rem; --space-20:5rem; --space-24:6rem;

  /* Tipografia */
  --font-sans:'Inter',system-ui,-apple-system,sans-serif;
  --font-mono:'JetBrains Mono',ui-monospace,Consolas,monospace;
  --text-xs:.75rem; --text-sm:.875rem; --text-base:1rem; --text-lg:1.125rem; --text-xl:1.25rem;
  --text-2xl:1.5rem; --text-3xl:1.875rem; --text-4xl:2.25rem; --text-5xl:3rem;
  --leading-none:1; --leading-tight:1.25; --leading-snug:1.375; --leading-normal:1.5; --leading-relaxed:1.625;
  --font-light:300; --font-regular:400; --font-medium:500; --font-semibold:600; --font-bold:700;

  /* Raio */
  --radius-xs:.25rem; --radius-sm:.375rem; --radius-md:.5rem; --radius-lg:.75rem;
  --radius-xl:1rem; --radius-2xl:1.5rem; --radius-full:9999px;

  /* Sombras */
  --shadow-xs:0 1px 2px rgba(0,0,0,.04);
  --shadow-sm:0 1px 3px rgba(0,0,0,.06),0 1px 2px rgba(0,0,0,.04);
  --shadow-md:0 4px 6px -1px rgba(0,0,0,.08),0 2px 4px -2px rgba(0,0,0,.06);
  --shadow-lg:0 10px 15px -3px rgba(0,0,0,.08),0 4px 6px -4px rgba(0,0,0,.04);
  --shadow-xl:0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.06);
  --shadow-2xl:0 25px 50px -12px rgba(0,0,0,.2);

  /* Transições */
  --transition-fast:150ms cubic-bezier(.4,0,.2,1);
  --transition-base:250ms cubic-bezier(.4,0,.2,1);
  --transition-slow:350ms cubic-bezier(.4,0,.2,1);
  --transition-spring:500ms cubic-bezier(.34,1.56,.64,1);

  --content-max-width:1200px;
}

[data-theme="dark"] {
  --surface-primary:#0c0d12; --surface-secondary:#131520; --surface-elevated:#1a1d2b;
  --surface-overlay:rgba(0,0,0,.7); --surface-card:#161825;
  --border-primary:#2a2d3a; --border-secondary:#1f2233;
  --text-primary:#f1f3f9; --text-secondary:#94a3b8; --text-tertiary:#64748b;
  --text-link:var(--color-primary-400);
  --color-gray-50:#0f1117; --color-gray-100:#1a1d27; --color-gray-200:#2a2d3a;
  --color-gray-300:#3f4354; --color-gray-400:#64748b; --color-gray-500:#94a3b8;
  --color-gray-600:#cbd5e1; --color-gray-700:#e2e8f0; --color-gray-800:#f1f5f9; --color-gray-900:#f8fafc;
  --color-income-bg:rgba(34,197,94,.15); --color-expense-bg:rgba(239,68,68,.15);
  --color-transfer-bg:rgba(59,130,246,.15);
  --shadow-xs:0 1px 2px rgba(0,0,0,.2);
  --shadow-sm:0 1px 3px rgba(0,0,0,.3),0 1px 2px rgba(0,0,0,.2);
  --shadow-md:0 4px 6px -1px rgba(0,0,0,.4),0 2px 4px -2px rgba(0,0,0,.3);
  --shadow-lg:0 10px 15px -3px rgba(0,0,0,.5),0 4px 6px -4px rgba(0,0,0,.4);
  --shadow-xl:0 20px 25px -5px rgba(0,0,0,.5),0 8px 10px -6px rgba(0,0,0,.4);
  --shadow-2xl:0 25px 50px -12px rgba(0,0,0,.7);
}
```

### Keyframes a incluir
`fadeIn`, `fadeInUp` (translateY 12px→0), `fadeInScale` (scale .95→1), `pulse` (opacity 1↔.5),
`spin` (rotate 360), `shimmer` (background-position -200%→200%, com gradiente cinza), `bounce`.
Respeite `@media (prefers-reduced-motion: reduce)`.

### Diretrizes de fidelidade
- A barra de progresso usa o status: ≤80% verde, 80–100% âmbar, >100% vermelho.
- O Card de KPI colore **apenas o valor** conforme a variante (income/expense/investment).
- Foco visível: `outline: 2px solid var(--border-focus); outline-offset: 2px`.
- Ícones lucide com `size={18}` na nav e `size={16}` em itens menores.
- Todos os textos da demo em **português (pt-BR)** e com exemplos financeiros (ex.: "Saldo do mês",
  "R$ 4.250,00", "Receitas", "Despesas", "Orçamento de Alimentação").

Gere agora o Artifact React completo e funcional.

## ⬆️ (fim do prompt)
