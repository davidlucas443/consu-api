# TMDB Movie App

App mobile em React Native + Expo para explorar filmes da API TMDB.

## Funcionalidades

- Lista de filmes populares
- Busca por título
- Tela de detalhes do filme
- Favoritos com persistência local (AsyncStorage)
- Tratamento de erro e carregamento

## Stack

- React Native
- Expo
- React Navigation
- Axios
- AsyncStorage

## Arquitetura (resumo)

O projeto segue uma separacao simples por responsabilidade:

- `components`: UI reutilizavel
- `screens`: composicao das telas
- `services`: chamadas HTTP para TMDB
- `routes`: navegacao (tabs + stack)
- `utils`: persistencia local e helpers
- `styles`: tema centralizado

## Estrutura do projeto

```text
src/
  components/   # Componentes reutilizáveis
  screens/      # Telas principais
  routes/       # Navegação
  services/     # Integração com API
  styles/       # Tema e estilos
  utils/        # Utilitários (ex.: storage)
```

## Como rodar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
git clone https://github.com/davidlucas443/consu-api.git
cd consu-api
npm install
```

### Configurar API Key do TMDB

1. Crie sua chave em https://www.themoviedb.org/settings/api
2. Configure a chave no arquivo `src/services/api.js`
3. Use a chave no parametro `api_key` das requisicoes

### Executar

```bash
# Mobile
npx expo start
# atalho: "a" para Android e "i" para iOS

# Web
npx expo start --web
```

## Fluxo das telas

- Home: lista populares + busca
- Details: informacoes completas do filme selecionado
- Favorites: lista local de filmes favoritados

## Comportamentos importantes

- Loading durante requisicoes
- Alertas para erros de rede/API
- Favoritos persistidos com AsyncStorage

## Licença

MIT
