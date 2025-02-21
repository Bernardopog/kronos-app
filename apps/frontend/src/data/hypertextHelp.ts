interface IHypertextHelp {
  title: string;
  description: string;
  example: string;
  page: number;
}

const hypertextData: IHypertextHelp[] = [
  {
    title: "Negrito",
    description:
      "Para utilizar negrito, use a tag [b], dessa forma: \n\t[b]<Texto>[/b].",
    example: "[b]Texto em Negrito![/b]",
    page: 1,
  },
  {
    title: "Itálico",
    description:
      "Para utilizar itálico, use a tag [i], dessa forma: \n\t[i]<Texto>[/i].",
    example: "[i]Texto em Itálico![/i]",
    page: 2,
  },
  {
    title: "Link",
    description:
      "Para utilizar um Hyperlink, use a tag [l], dessa forma: \n\t[l](URL)<Texto>[/l].",
    example: "[l](https://google.com)Google[/l]",
    page: 3,
  },
  {
    title: "Underline",
    description:
      "Para utilizar Underline, use a tag [u], dessa forma: \n\t[u]<Texto>[/u].",
    example: "[u]Text sublinhado![/u]",
    page: 4,
  },
  {
    title: "Sup e Sub",
    description:
      "Para utilizar Sup e Sub, use a tag [sp] para Sup e [sb] para Sub, dessa forma respectivamente: \n\t[sp]<Texto>[/sp] \n\t[sb]<Texto>[/sb].",
    example: "4[sp]2[/sp] = 16\nLog(16)[sb]2[/sb] = 4",
    page: 5,
  },
  {
    title: "Marcação de Texto",
    description:
      "Para utilizar a marcação de texto, use a tag [mark], dessa forma: \n\t[mark]<Texto>[/mark].",
    example: "[mark]Texto com Marcação![/mark]",
    page: 6,
  },
  {
    title: "Grande e Pequeno",
    description:
      "Para utilizar um Texto grande ou pequeno, use a tag [big] para Grande e [small] para Pequeno, dessa forma respectivamente: \n\t[big]<Texto>[/big] \n\t[small]<Texto>[/small].",
    example: "[small]Pequeno[/small] - Normal - [big]Grande[/big]",
    page: 7,
  },
  {
    title: "Citação",
    description:
      "Para utilizar uma Citação, use a tag [quote], dessa forma: \n\t[quote](<URL Opcional>)<Texto>[/quote].",
    example:
      "[quote](https://www.pensador.com/autor/alan_turing/)Eu acredito que às vezes são as pessoas que ninguém espera nada que fazem as coisas que ninguém consegue imaginar.[/quote]",
    page: 8,
  },
  {
    title: "Citação Simples",
    description:
      "Para utilizar uma Citação Simples, use a tag [q], dessa forma: \n\t[q]<Texto>[/q].",
    example:
      "[q]Eu acredito que às vezes são as pessoas que ninguém espera nada que fazem as coisas que ninguém consegue imaginar.[/q]",
    page: 9,
  },
  {
    title: "Cores",
    description:
      "Para utilizar alguma cor em um texto, use as tags [rgb], [hsl] e [hex] dessa forma: \n\t[rgb](R,G,B)<Texto>[/rgb]\n\t[hsl](H,S%,L%)<Texto>[/hsl]\n\t[hex](#HEX)<Texto>[/l].",
    example:
      "[rgb](200,0,0)Vermelho[/rgb]\n[hsl](210,50%,50%)Azul[/hsl]\n[hex](#44ff44)Verde[/hex]",
    page: 10,
  },
  {
    title: "Tabela",
    description:
      "Para utilizar uma Tabela, use a tag [table] para definer uma tabela, dessa forma: \n\t[table][/table]. \nDentro dela deverá ser adicionado cada linha da Tabela, que pode ser feito com a tag [r], \npara o cabeçalho se utiliza a tag [h] \npara cada célula a tag [c]",
    example: `[table]\n\t[r]\n\t\t[h]País[/h]\n\t\t[h]Estado[/h]\n\t\t[h]Cidade[/h]\n\t[/r]\n\t[r]\n\t\t[c]Brasil[/c]\n\t\t[c]São Paulo[/c]\n\t\t[c]São Paulo[/c]\n\t[/r]\n\t[r]\n\t\t[c]Estados Unidos[/c]\n\t\t[c]New York[/c]\n\t\t[c]New York City[/c]\n\t[/r]\n\t[r]\n\t\t[c]Reino Unido[/c]\n\t\t[c]London[/c]\n\t\t[c]London[/c]\n\t[/r]\n[/table]`,
    page: 11,
  },
  {
    title: "Endereço",
    description:
      "Para utilizar um endereço: \n\t[addr](b=)(c=)(e=)[/addr]. \nOnde \n\tb = Bairro \n\tc = Cidade \n\te = Estado.",
    example:
      "[addr](b=Pinheiros)(c=São Paulo)(e=São Paulo)[/addr]\n[addr](b=0)(c=New York City)(e=0)[/addr]\n[addr](b=0)(c=London)(e=0)[/addr]",
    page: 12,
  },
  {
    title: "Código",
    description:
      "Para utilizar um trecho de código, use a tag [code], dessa forma: \n\t[code <linguagem>]<Código>[/code].",
    example:
      "[code javascript]const greeting = 'Hello World';\nfunction sayHello() {\n\tconsole.log(greeting);\n};\nsayHello();[/code]",
    page: 13,
  },
  {
    title: "Lista Desordenada",
    description:
      "Para utilizar uma lista use a tag [ul], dessa forma: \n[ul]\n\t[li]Item 1[/li]\n\t[li]Item 2[/li]\n\t[li]Item 3[/li]\n[/ul].",
    example:
      "[ul]\n\t[li]Item 1[/li]\n\t[li]Item 2[/li]\n\t[li]Item 3[/li]\n[/ul]",
    page: 14,
  },
  {
    title: "Lista Ordenada",
    description:
      "Para utilizar uma lista use a tag [ol], dessa forma: \n[ol]\n\t[li]Item 1[/li]\n\t[li]Item 2[/li]\n\t[li]Item 3[/li]\n[/ol].",
    example:
      "[ol]\n\t[li]Item 1[/li]\n\t[li]Item 2[/li]\n\t[li]Item 3[/li]\n[/ol]",
    page: 15,
  },
];

export default hypertextData;
