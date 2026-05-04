# TMDB Movie App - Documentação Completa

Um aplicativo mobile desenvolvido em React Native com Expo para explorar filmes da API TMDB. O projeto foi construído seguindo boas práticas de Clean Architecture e componentização modular.

---

## 1. Fase de Planejamento e Requisitos

### 1.1 API Escolhida
**The Movie Database (TMDB)** - API pública de filmes e séries.
- **Endpoint Base:** `https://api.themoviedb.org/3`
- **Autenticação:** Via `api_key` como parâmetro de query

### 1.2 Requisitos Funcionais (RF)

| RF | Descrição | Status |
|---|---|---|
| RF-01 | Listar filmes populares na tela inicial | ✅ Implementado |
| RF-02 | Buscar filmes por termo/palavra-chave | ✅ Implementado |
| RF-03 | Visualizar detalhes completos de um filme | ✅ Implementado |
| RF-04 | Adicionar/remover filmes dos favoritos | ✅ Implementado |

### 1.3 Requisitos Não Funcionais (RNF)

| RNF | Descrição | Implementação |
|---|---|---|
| RNF-01 | Tratamento de erros de conexão | Alert nativo com mensagens amigáveis |
| RNF-02 | Carregamento assíncrono de dados | ActivityIndicator customizado (LoadingSpinner) |
| RNF-03 | Persistência local de favoritos | AsyncStorage |
| RNF-04 | Interface responsiva | SafeAreaProvider + Styles dinâmicos |
| RNF-05 | Consumo eficiente de API | Axios com cache de requisições |

### 1.4 Style Guide

#### Cores Principais
```json
{
  "primary": "#FF6B6B",        // Vermelho coral (CTAs e destaques)
  "background": "#000000",     // Preto (fundo principal)
  "surface": "#121212",        // Cinza escuro (cards e superfícies)
  "surfaceAlt": "#1A1A1A",     // Cinza mais claro (variações)
  "border": "#2A2A2A",         // Cinza para bordas
  "text": "#F5F5F5",           // Branco (texto principal)
  "muted": "#A0A0A0"           // Cinza (texto secundário)
}
```

#### Tipografia
- **Títulos:** FontWeight `bold` (700), tamanho 22-24px
- **Subtítulos:** FontWeight `600`, tamanho 16-18px
- **Corpo:** FontWeight `400`, tamanho 14-16px
- **Labels:** FontWeight `600`, tamanho 12px, maiúsculas

#### Componentes Principais
- **Header:** Dark background com borda discreta e ícone de branding
- **Card de Filme:** Layout vertical (poster + título + rating), fundo #111111
- **Botão:** Fundo #FF6B6B com texto branco, borda arredondada
- **Input de Busca:** Surface dark com borda fina

---

## 2. Configuração e Estrutura de Pastas

### 2.1 Arquitetura do Projeto

```
consu-api/
├── App.js                          # Componente raiz da aplicação
├── index.js                        # Entry point do Expo
├── app.json                        # Configuração do Expo
├── package.json                    # Dependências do projeto
├── README.md                       # Este arquivo
├── assets/                         # Imagens, ícones e fontes
│   ├── icon.png
│   ├── splash-icon.png
│   └── adaptive-icon.png
├── src/
│   ├── components/                 # Componentes reutilizáveis
│   │   ├── Header.js              # Cabeçalho padrão da app
│   │   ├── MovieCard.js           # Card individual de filme
│   │   ├── LoadingSpinner.js      # Indicador de carregamento
│   │   └── index.js               # Exportações centralizadas
│   ├── screens/                    # Telas principais
│   │   ├── HomeScreen.js          # Tela inicial com lista e busca
│   │   ├── MovieDetailsScreen.js  # Tela de detalhes do filme
│   │   ├── FavoritesScreen.js     # Tela de favoritos
│   │   └── index.js               # Exportações centralizadas
│   ├── services/                   # Integração com APIs
│   │   └── api.js                 # Configuração do Axios e endpoints
│   ├── routes/                     # Navegação
│   │   └── RootNavigator.js       # Stack e Tab Navigation
│   ├── styles/                     # Temas e estilos globais
│   │   └── theme.js               # Paleta de cores e espaçamento
│   └── utils/                      # Funções utilitárias
│       └── storage.js             # AsyncStorage para persistência
```

### 2.2 Por que essa estrutura?

**Modularidade:** Cada responsabilidade fica isolada, facilitando manutenção e testes.
- `components/`: Componentes pequenos e reutilizáveis
- `screens/`: Telas compostas por componentes
- `services/`: Lógica de API separada da UI
- `routes/`: Navegação centralizada
- `styles/`: Tema global evita duplicação de cores
- `utils/`: Funções auxiliares reutilizáveis

**Escalabilidade:** Adicionar novas telas, componentes ou endpoints é simples.

**Manutenção:** Bug em um component não afeta outros; mudança de API é isolada em `services/`.

---

## 3. Desenvolvimento Técnico

### 3.1 Consumo de API

**Configuração (src/services/api.js):**
```javascript
import axios from 'axios';

const TMDB_API_KEY = 'YOUR_API_KEY';
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
});

// Endpoints implementados:
export const getPopularMovies = (page = 1) => 
  api.get('/movie/popular', { params: { api_key, page, language: 'pt-BR' } });

export const searchMovies = (query, page = 1) => 
  api.get('/search/movie', { params: { api_key, query, page, language: 'pt-BR' } });

export const getMovieDetails = (movieId) => 
  api.get(`/movie/${movieId}`, { params: { api_key, language: 'pt-BR' } });
```

**Uso em Componentes (useState + useEffect):**
```javascript
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadMovies = async () => {
    try {
      const res = await getPopularMovies(1);
      setMovies(res.data.results);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar filmes');
    } finally {
      setLoading(false);
    }
  };
  loadMovies();
}, []);
```

### 3.2 Interface de Usuário (UI)

**FlatList para Renderização:**
```javascript
<FlatList
  data={movies}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => <MovieCard movie={item} onPress={...} />}
  numColumns={2}  // Grid 2 colunas
  columnWrapperStyle={{ justifyContent: 'space-between' }}
/>
```

**SafeAreaView/Provider:**
```javascript
<SafeAreaProvider>
  <RootNavigator />
</SafeAreaProvider>
```

### 3.3 Navegação

**Stack & Tab Navigation (React Navigation):**
```javascript
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeList" component={HomeScreen} />
    <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
  </Stack.Navigator>
);

export const RootNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);
```

### 3.4 Estilização

**StyleSheet + Tema Centralizado:**
```javascript
import { COLORS, SPACING } from '../styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.surface,
    margin: SPACING.medium,
    borderRadius: 18,
  }
});
```

---

## 4. Testes e Validação

### 4.1 Testando em Emulador/Dispositivo

**Android (Android Studio):**
```bash
npx expo start
# Pressione 'a' para abrir no emulador
```

**iOS (Xcode):**
```bash
npx expo start
# Pressione 'i' para abrir no simulador
```

**Web (Desktop):**
```bash
npx expo start --web
# Abre em http://localhost:19006
```

**Dispositivo Físico:**
```bash
npx expo start
# Escanear QR code com Expo Go
```

### 4.2 Validações Realizadas

✅ **Responsividade:** Testado em telas de 4.5" até 6.7"  
✅ **Orientação:** Suporta Portrait e Landscape  
✅ **SafeAreaView:** Conteúdo não sobrepõe barra de status  
✅ **Conexão:** Tratamento de erros de rede com feedback visual  
✅ **Persistência:** Favoritos salvos localmente e recuperados ao reiniciar

---

## 5. Entrega e Versionamento

### 5.1 Repositório GitHub

```bash
# Clonar o projeto
git clone https://github.com/davidlucas443/consu-api.git
cd consu-api
```

### 5.2 Commits Semânticos

O projeto utiliza **Conventional Commits:**

```bash
# Feature nova
git commit -m "feat(ui): add dark theme"

# Bug fix
git commit -m "fix(api): use tmdb api key params"

# Configuração
git commit -m "config: add web platform to expo"

# Refatoração
git commit -m "refactor: split styles into theme module"

# Documentação
git commit -m "docs: update readme with architecture"
```

### 5.3 Histórico de Commits

```
01051b6 chore: sync app config and lockfile
f730392 fix(api): use tmdb api key params
0eb23ca feat(ui): polish app header
c5b45c5 feat(ui): switch app to dark background
e797151 feat(ui): standardize movie cards
```

---

## 6. Como Executar

### Pré-requisitos
- Node.js v18+
- npm ou yarn
- Expo CLI

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/davidlucas443/consu-api.git
cd consu-api

# 2. Instale as dependências
npm install
npx expo install

# 3. Configure sua API key do TMDB em src/services/api.js
# Visite: https://www.themoviedb.org/settings/api
```

### Execução

```bash
# Mobile (Android/iOS)
npx expo start
# Pressione 'a' para Android ou 'i' para iOS

# Web
npx expo start --web
```

---

## 7. Tecnologias Utilizadas

| Tecnologia | Versão | Função |
|---|---|---|
| React Native | 0.73+ | Framework mobile |
| Expo | 54+ | Plataforma de desenvolvimento |
| React Navigation | 6+ | Navegação entre telas |
| Axios | 1.6+ | Cliente HTTP |
| AsyncStorage | 1.21+ | Persistência local |
| React Native Safe Area | 4.8+ | Proteção de áreas de segurança |

---

## 8. Licença

MIT License - Veja LICENSE para detalhes.

---

## 9. Autor

Desenvolvido como projeto de aprendizado em React Native e Expo.
