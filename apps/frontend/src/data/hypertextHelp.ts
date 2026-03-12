interface IHypertextHelp {
  title: string;
  description: string;
  example: string;
  visualExample?: string;
  page: number;
}

const hypertextData: IHypertextHelp[] = [
  {
    title: "Negrito",
    description: "Para utilizar negrito, use a tag [b], dessa forma:",
    example: "[b]Texto em Negrito![/b]",
    visualExample: "[b]Texto em Negrito![/b]",
    page: 1,
  },
  {
    title: "Itálico",
    description: "Para utilizar itálico, use a tag [i], dessa forma:",
    example: "[i]Texto em Itálico![/i]",
    visualExample: "[i]Texto em Itálico![/i]",
    page: 2,
  },
  {
    title: "Link",
    description: "Para utilizar um Hyperlink, use a tag [l], dessa forma:",
    example: "[l](https://google.com)Google[/l]",
    visualExample: "[l](https://google.com)Google[/l]",
    page: 3,
  },
  {
    title: "Underline",
    description: "Para utilizar Underline, use a tag [u], dessa forma:",
    example: "[u]Text sublinhado![/u]",
    visualExample: "[u]Text sublinhado![/u]",
    page: 4,
  },
  {
    title: "Sup e Sub",
    description:
      "Para utilizar Sup e Sub, use a tag [sp] para Sup e [sb] para Sub, dessa forma respectivamente:",
    example: "4[sp]2[/sp] = 16\nLog(16)[sb]2[/sb] = 4",
    visualExample: "4[sp]2[/sp] = 16\nLog(16)[sb]2[/sb] = 4",
    page: 5,
  },
  {
    title: "Marcação de Texto",
    description:
      "Para utilizar a marcação de texto, use a tag [mark], dessa forma:",
    example: "[mark]Texto com Marcação![/mark]",
    visualExample: "[mark]Texto com Marcação![/mark]",
    page: 6,
  },
  {
    title: "Grande e Pequeno",
    description:
      "Para utilizar um Texto grande ou pequeno, use a tag [big] para Grande e [small] para Pequeno, dessa forma respectivamente:",
    example: "[small]Pequeno[/small] - Normal - [big]Grande[/big]",
    visualExample: "[small]Pequeno[/small] - Normal - [big]Grande[/big]",
    page: 7,
  },
  {
    title: "Citação",
    description: "Para utilizar uma Citação, use a tag [quote], dessa forma:",
    example:
      "[quote](https://www.pensador.com/autor/alan_turing/)Eu acredito que às vezes são as pessoas que ninguém espera nada que fazem as coisas que ninguém consegue imaginar.[/quote]",
    visualExample: "[quote](<url>)Eu acredito que às vezes são as ...[/quote]",
    page: 8,
  },
  {
    title: "Citação Simples",
    description:
      "Para utilizar uma Citação Simples, use a tag [q], dessa forma:",
    example:
      "[q]Eu acredito que às vezes são as pessoas que ninguém espera nada que fazem as coisas que ninguém consegue imaginar.[/q]",
    visualExample: "[q]Eu acredito que às vezes são as ...[/q]",
    page: 9,
  },
  {
    title: "Cores",
    description:
      "Para utilizar alguma cor em um texto, use as tags [rgb], [hsl] e [hex] dessa forma:",
    example:
      "[rgb](200,0,0)Vermelho[/rgb]\n[hsl](210,50%,50%)Azul[/hsl]\n[hex](#44ff44)Verde[/hex]",
    visualExample:
      "[rgb](200,0,0)Vermelho[/rgb]\n[hsl](210,50%,50%)Azul[/hsl]\n[hex](#44ff44)Verde[/hex]",
    page: 10,
  },
  {
    title: "Tabela",
    description:
      "Para utilizar uma Tabela: Use a tag [table] para definir uma tabela, dessa forma: \n\t[table][/table]. \nDentro dela deverá ser adicionado: \n\t[r] - Linhas;\n\t[h] - Cabeçalho;\n\t[c] - Celula.",
    example: `[table]\n\t[r]\n\t\t[h]País[/h]\n\t\t[h]Estado[/h]\n\t\t[h]Cidade[/h]\n\t[/r]\n\t[r]\n\t\t[c]Brasil[/c]\n\t\t[c]São Paulo[/c]\n\t\t[c]São Paulo[/c]\n\t[/r]\n\t[r]\n\t\t[c]Estados Unidos[/c]\n\t\t[c]New York[/c]\n\t\t[c]New York City[/c]\n\t[/r]\n\t[r]\n\t\t[c]Reino Unido[/c]\n\t\t[c]London[/c]\n\t\t[c]London[/c]\n\t[/r]\n[/table]`,
    page: 11,
  },
  {
    title: "Endereço",
    description:
      "Para utilizar um endereço: \n[addr]\n\t(b=<bairro>)\n\t(c=<cidade>)\n\t(e=<estado>)\n[/addr].",
    example:
      "[addr](b=Pinheiros)(c=São Paulo)(e=São Paulo)[/addr]\n[addr](b=0)(c=New York City)(e=0)[/addr]\n[addr](b=0)(c=London)(e=0)[/addr]",
    page: 12,
  },
  {
    title: "Código JavaScript",
    description:
      "Para utilizar um trecho de código, use a tag [code], dessa forma:",
    example:
      "[code javascript]const greeting = 'Hello World';\nfunction sayHello() {\n\tconsole.log(greeting);\n};\nsayHello();[/code]",
    visualExample:
      "[code javascript]\nconst greeting = 'Hello World';\nfunction sayHello() {\n\tconsole.log(greeting);\n};\nsayHello();\n[/code]",
    page: 13,
  },
  {
    title: "Código Python",
    description:
      "Para utilizar um trecho de código, use a tag [code], dessa forma:",
    example:
      "[code python]greeting = 'Hello World'\ndef say_hello(): \n\tprint(greeting)\nsay_hello();\n[/code]",
    visualExample:
      "[code python]\ngreeting = 'Hello World'\ndef say_hello(): \n\tprint(greeting)\nsay_hello();\n[/code]",
    page: 14,
  },
  {
    title: "Lista Não Ordenada",
    description: "Para utilizar uma lista use a tag [ul], dessa forma:",
    example:
      "[ul]\n\t[li]Item[/li]\n\t[li]Item 2[/li]\n\t[li]Item 3[/li]\n[/ul]",
    visualExample: "[ul]\n\t[li]Item 1[/li]\n[/ul]",
    page: 15,
  },
  {
    title: "Lista Ordenada",
    description: "Para utilizar uma lista use a tag [ol], dessa forma:",
    example:
      "[ol]\n\t[li]Item 1[/li]\n\t[li]Item 2[/li]\n\t[li]Item 3[/li]\n[/ol]",
    visualExample: "[ol]\n\t[li]Item 1[/li]\n[/ol]",
    page: 16,
  },
];

export default hypertextData;
