<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]

<br />
<div align="center">
  <h1 align="center">Anime Watcher</h1>
  <h2>Front End</h2>

  <p align="center">
    <a href="https://github.com/RobertoAssumpcao/animeWatcherFront/issues">Report Bug</a>
    ·
    <a href="https://github.com/RobertoAssumpcao/animeWatcherFront/issues">Request Feature</a>
  </p>
</div>

## About

Este é o front-end do projeto **Anime Watcher**, construído com **Next.js**, **TypeScript**, **Material UI** e **Axios**, consumindo uma API em Flask.

Ele permite a visualização de animes cadastrados, com uma interface moderna e responsiva, além de integração com a funcionalidade analítica de estatísticas fornecida pelo back-end.

---

## Como usar

1. **Clone o repositório:**

```bash
git clone https://github.com/RobertoAssumpcao/animeWatcherFront.git
```

2. **Acesse a pasta do projeto:**

```bash
cd animeWatcherFront
cd watch
```

3. **Instale as dependências:**

```bash
npm install
```

4. **Rode em modo desenvolvimento:**

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 🧠 Funcionalidade Criativa

Este front consome a rota `/animes/estatisticas`, exibindo:

- Total de animes cadastrados
- Média de episódios
- Quantidade por status (Assistido, Assistindo, etc.)
- Top 3 animes com mais episódios

---

## 🐳 Docker

1. **Build do projeto:**

```bash
npm run build
npm run export
```

2. **Build da imagem Docker:**

```bash
docker build -t anime-watcher-front .
```

3. **Rodar o container:**

```bash
docker run -p 3000:80 anime-watcher-front
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura

```
animeWatcherFront/
├── src/
│   ├── app/
│   │   └── page.tsx          # Página inicial com listagem
│   ├── components/
│   ├── services/
│   │   └── api.ts            # Axios configurado
│   └── types/
│       └── anime.ts          # Tipagem do Anime
├── Dockerfile
├── package.json
```

---

## Contribuição

Contribuições são sempre bem-vindas! 💡

1. Faça um fork do projeto  
2. Crie sua Branch de Feature (`git checkout -b feature/MinhaFuncionalidade`)  
3. Commit suas alterações (`git commit -m 'Adiciona minha funcionalidade'`)  
4. Faça o push da sua Branch (`git push origin feature/MinhaFuncionalidade`)  
5. Abra um Pull Request  

<p align="right">(<a href="#top">voltar ao topo</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/RobertoAssumpcao/animeWatcherFront.svg?style=for-the-badge  
[contributors-url]: https://github.com/RobertoAssumpcao/animeWatcherFront/graphs/contributors  
[issues-shield]: https://img.shields.io/github/issues/RobertoAssumpcao/animeWatcherFront.svg?style=for-the-badge  
[issues-url]: https://github.com/RobertoAssumpcao/animeWatcherFront/issues
