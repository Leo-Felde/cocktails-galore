# Front-end TheCocktailDB

Neste projeto foram implementados alguns endpoints do [TheCocktailDB](https://www.thecocktaildb.com/api.php).\
As tecnologias utilizadas foram, Vue 3, Nuxt 3, TypeScript e Vuetify.
## Instalação

Certifique-se de estar com o [Ultima versão](https://nodejs.org/en/download) do Node.js.\
Instale as dependencias do projeto:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Servidor de desenvolvimento

Iniciar o servidor de desenvolvimento no endereço `http://localhost:3000`

```bash
# npx nuxi dev

```

## Produção

Criar build de produção

```bash
npx nuxi  build

```

Rodar a build de produção localmente

```bash
npx nuxi preview

```

## Decisões e outros comentários
### vuetify
O vuetify é um framework de UI para o Vue, foi utilizado para facilitar o desenvolvimento em diversos aspects, principalmente na velocidade e responsividade.\
### Listagem
O endpoint de listagem do TheCocktailDB é bastante limitado, retornando apenas o id, nome e imagem. Portanto, a fim de utilizar o máximo das informações e inspirado em outros sites do tipo, a listagem foi realizada dando foco na imagem da bebida.

### Problemas
Foram notados aluguns problemas nos endpoints.\
Nem todas as categorias possuem bebidas, ou então não foi devidamente documentado o seu uso. Algumas categorias são: Coffee_Tea e Others_Unknown;

Algumas bebidas não possuem instruções de preparo, como por exemplo a 410 Gone (id 13581), para este caso foi adicioando um texto genérico indicando que não existem instruções em inglês (neste exemplo existem em alemão);

Como não existe um banco de dados para armazenar as bebidas favoritas, foi criado um estado global para armazena-las, portanto, ao dar f5 elas podem ser perdidas.

