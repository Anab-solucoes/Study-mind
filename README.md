# ElektraStudy — Repositório de Estudos

Site estático (HTML/CSS/JS puro, sem build, sem dependências) com todo o
conteúdo de aula do semestre passado, extraído do app "Academic Mentor AI"
(elektrastudymind), organizado por matéria:

- **Lições Preliminares de Direito e Parte Geral do Direito Civil** — 21 materiais
- **Teoria da Constituição** — 9 materiais
- **Teoria Política e Direitos Fundamentais** — 16 materiais

Todo o texto de PDFs, PPT e PPTX anexados foi extraído e embutido diretamente
nas páginas — o site não depende de nenhum servidor, banco de dados ou link
externo para funcionar. É só HTML estático.

## Estrutura

```
index.html                     — página inicial (índice das matérias)
materias/direito-civil.html
materias/teoria-da-constituicao.html
materias/teoria-politica.html
assets/style.css                — todo o visual
assets/script.js                 — busca client-side (sem framework)
```

## Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub (pode ser público ou privado — se
   privado, o GitHub Pages exige plano pago para servir; público é de
   graça).

2. Na pasta deste site (a que contém `index.html`), rode:

   ```bash
   git init
   git add .
   git commit -m "Site inicial — conteúdo do semestre"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   git push -u origin main
   ```

3. No GitHub, vá em **Settings → Pages** do repositório.

4. Em "Build and deployment", selecione **Source: Deploy from a branch**,
   branch **main**, pasta **/ (root)**. Salve.

5. Em alguns minutos o site estará em:
   `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`

Nenhum passo de build é necessário — é HTML/CSS/JS puro, o GitHub Pages
serve os arquivos como estão.

## Observações importantes

- **Conteúdo pessoal e sensível**: este site contém suas anotações de aula,
  transcrições e exercícios. Se o repositório for público, qualquer pessoa
  com o link pode ler tudo. Se quiser manter privado, use GitHub Pages com
  repositório privado (requer GitHub Pro/Team/Enterprise) ou hospede em
  outro lugar (Vercel, Netlify, Cloudflare Pages — todos com plano grátis
  que aceita repositórios privados).
- O app original (`elektrastudymind`) tinha um bug: a função de upload usa
  `getPublicUrl()` para montar o link do arquivo, mas o bucket de storage
  no Supabase está configurado como **privado**. Isso quer dizer que o
  botão "Ver arquivo anexo" dentro do próprio app provavelmente está
  quebrado para você hoje (link 404). Vale corrigir isso no projeto Lovable
  se quiser continuar usando o app.
