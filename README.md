
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

O front-end do **Anime Watcher** é uma aplicação em React/Next.js com Material UI, voltada para o gerenciamento de animes assistidos.

Ele consome uma API Flask (back-end do projeto) e oferece ao usuário uma interface moderna, com recursos como:

- Cadastro de novos animes
- Listagem com cards e imagens da Jikan API
- Edição e exclusão
- Filtros por status e busca por título
- Tela de estatísticas (total, média, top 3, etc)

---

## Como usar

1. **Clone o repositório:**

```bash
git clone https://github.com/RobertoAssumpcao/animeWatcherFront.git
```

2. **Acesse o diretório do projeto:**

```bash
cd animeWatcherFront
```

3. **Instale as dependências:**

```bash
npm install
```

4. **Execute a aplicação localmente:**

```bash
npm run dev
```

Acesse via navegador: [http://localhost:3000](http://localhost:3000)

---

## 🐳 Executando com Docker

1. **Build da imagem:**

```bash
docker build -t anime-front .
```

2. **Execute o container:**

```bash
docker run -p 3000:3000 anime-front
```

---

## 📁 Rotas da aplicação

| Caminho                   | Descrição                             |
|---------------------------|----------------------------------------|
| `/`                       | Tela de boas-vindas (home)             |
| `/animes`                 | Listagem de animes em cards            |
| `/animes/cadastrar`       | Formulário para adicionar novo anime   |
| `/animes/[id]/editar`     | Edição de um anime                     |
| `/animes/estatisticas`    | Tela com gráficos e dados agregados    |

---

## 🧩 Exemplo de objeto (Anime)

```json
{
  "id": 1,
  "titulo": "Naruto",
  "genero": "Ação",
  "episodios": 220,
  "status": "Assistindo",
  "data_insercao": "2025-04-10T14:22:00"
}
```

---

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [Axios](https://axios-http.com/)
- [Jikan API](https://docs.api.jikan.moe/) – para buscar gênero e imagens de animes

---

## Contribuição

Contribuições são o que fazem a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito apreciada**.

Se você tiver uma sugestão que possa melhorar este projeto, por favor, faça um fork do repositório e crie um pull request. Você também pode simplesmente abrir uma issue. Não se esqueça de dar uma estrela ao projeto! Muito obrigado!

1. Faça um fork do projeto  
2. Crie uma branch de funcionalidade (`git checkout -b feature/MinhaFeature`)  
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`)  
4. Push para sua branch (`git push origin feature/MinhaFeature`)  
5. Abra um Pull Request  

<p align="right">(<a href="#top">voltar ao topo</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/RobertoAssumpcao/animeWatcherFront.svg?style=for-the-badge  
[contributors-url]: https://github.com/RobertoAssumpcao/animeWatcherFront/graphs/contributors  
[issues-shield]: https://img.shields.io/github/issues/RobertoAssumpcao/animeWatcherFront.svg?style=for-the-badge  
[issues-url]: https://github.com/RobertoAssumpcao/animeWatcherFront/issues
