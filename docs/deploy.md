# Guia de Deploy e Manutenção — PENTAGON-MIND

> Processo para manter o site estático, seguro e versionado.

## 1. Natureza do Deploy

O PENTAGON-MIND é **100% estático**: HTML/CSS/JS + assets. Não há build obrigatório nem runtime server-side. Qualquer CDN/static host serve o conteúdo da raiz do repositório.

## 2. Opções de Host

| Plataforma | Configuração |
|---|---|
| **GitHub Pages** | Settings → Pages → branch `main` → `/ (root)`. Ou GitHub Actions com `actions/deploy-pages`. |
| **Netlify / Vercel** | Conectar repo; build command vazio; publish directory `.` (raiz). |
| **Qualquer web server** | `cp -r` da raiz para o document root. |

> O `assets/serve.cjs` é **apenas para desenvolvimento local** (`node assets/serve.cjs` → `http://127.0.0.1:8726`).

## 3. Pipeline Automatizado (sugerido)

GitHub Actions (`.github/workflows/deploy.yml`):

```yaml
name: deploy-static
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Verify
        run: node assets/verify.js
      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .
  deploy:
    needs: build
    permissions:
      pages: write
      id-token: write
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4
```

Isto garante que **só conteúdo que passa em `verify.js` é publicado**.

## 4. Versionamento e Backup

- **Git é a fonte da verdade**: todo conteúdo e código versionado em `main`.
- **Backup**: o vault MEGA BRAIN (Obsidian) faz reindex periódico; backup adicional via `git clone` espelhado ou `backup_vault.ps1` (agendado).
- **Rollback**: `git revert <commit>` restaura qualquer página.
- **Branches**: contribuições via `feature/*` → PR → review editorial → merge.

## 5. Manutenção Contínua

- **Imagens:** manter `assets/img/` versionado; não referenciar URLs externas que possam rotacionar.
- **Glossário:** adicionar novas siglas em `data/glossary.js` com `full` (EN), `pt` e `gloss`.
- **Ontologia:** atualizar `data/ontology.json` ao cruzar novos presidentes/conflitos/armas.
- **Verificação pré-publicação:** `node assets/verify.js` + `docs/checklists.md`.

## 6. Segurança

- Site estático = sem superfície de ataque server-side.
- Nenhum dado pessoal coletado (sem analytics de terceiros por padrão; se houver, conformidade LGPD/GDPR).
- `Content-Security-Policy` pode ser adicionado no host (ex.: Netlify `_headers`) para reforçar.
