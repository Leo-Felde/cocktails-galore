# Front-end TheCocktailDB

Neste projeto foram implementados alguns endpoints do [TheCocktailDB](https://www.thecocktaildb.com/api.php).\
As tecnologias utilizadas foram, Vue 3, Nuxt 3, TypeScript e Vuetify.
## Instalação

Primeiro certifique-se de ter instalado a [ultima versão do Node.js](https://nodejs.org/en/download).\
Depois instale as dependencias rodando o seguinte comandos em um terminal dentro da pasta do projeto:
```bash
npm install

```

## Rodar o projeto

Após instalar as dependencias, rode o seguinte comando em um terminal dentro da pasta do projeto:

```bash
npx nuxi dev

```
Após alguns segundos o servidor poderá ser aberto em qualquer navegador pela url `localhost:3000`

## Decisões e outros comentários
### vuetify
O vuetify é um framework de UI para o Vue, foi utilizado para facilitar o desenvolvimento em diversos aspectos, principalmente na velocidade e responsividade.
### Listagem
O endpoint de listagem do TheCocktailDB é bastante limitado, retornando apenas o id, nome e imagem. Portanto, a fim de utilizar o máximo das informações e inspirado em outros sites do tipo, a listagem foi realizada dando foco na imagem da bebida.

### Visualização
Apesar de que seria mais fácil abrir um diálogo contendo o componente de detalhes da bebida, achei interessante utilizar o roteamento do nuxt de alguma forma, portanto fiz o componente utilizar a paginação dinâmica com o id na url.

### Problemas
Foram notados aluguns problemas nos endpoints.\
Nem todas as categorias possuem bebidas, ou então não foi devidamente documentado o seu uso. Algumas categorias são: Coffee_Tea e Others_Unknown;

Algumas bebidas não possuem instruções de preparo, como por exemplo a 410 Gone (id 13581), para este caso foi adicioando um texto genérico indicando que não existem instruções em inglês (neste exemplo existem em alemão);

Como não existe um banco de dados para armazenar as bebidas favoritas, foi criado um estado global para armazena-las, portanto, ao dar f5 elas podem ser perdidas.

