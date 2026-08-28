# Módulo de Checkout – Carrinho de Compras

![Status](https://img.shields.io/badge/status-corrigido-success)![Node.js](https://img.shields.io/badge/Node.js-ambiente%20de%20execu%C3%A7%C3%A3o-green)![Testes](https://img.shields.io/badge/testes-Jest-purple)

## Sobre o projeto

Este projeto implementa o cálculo do total de um carrinho de compras para um sistema de e-commerce desenvolvido em Node.js. A função principal, `calcularTotal`, calcula o subtotal dos itens, aplica o cupom promocional disponível, determina o valor do frete e devolve o total final com duas casas decimais.

O projeto também contém uma suíte de testes manuais e automatizados criada para identificar e corrigir falhas relacionadas à validação do carrinho, ao desconto promocional, à regra de frete grátis e ao arredondamento de valores monetários.

> **Projeto:** Módulo de Checkout – Carrinho de Compras**Sistema:** E-Commerce Node.js**Versão analisada:** 1.0.0-Bugged**Responsável pelos testes:** Mateus Aristóteles – Equipe de QA**Data do plano de testes:** 27/08/2026

## Objetivo

Validar o cálculo exato do total da compra na função `calcularTotal`, considerando itens, quantidades, cupons, frete, arredondamento e tratamento de entradas inválidas.

A versão inicial do sistema apresentava quatro problemas principais:

| Problema | Comportamento incorreto | Correção aplicada |
| --- | --- | --- |
| Validação de itens | Não rejeitava quantidade menor ou igual a zero nem preço negativo. | O carrinho passou a lançar `Carrinho inválido` para entradas inválidas. |
| Cupom `PROMO10` | Aplicava R$ 10,00 fixos. | Passou a aplicar 10% sobre o subtotal. |
| Frete grátis | Concedia frete grátis somente quando o subtotal era maior que R$ 100,00. | A regra passou a usar `subtotal >= 100`. |
| Arredondamento | Retornava o valor com várias casas decimais. | O total é arredondado para duas casas decimais. |

## Regras de negócio

O cálculo deve seguir as regras abaixo:

| Regra | Descrição |
| --- | --- |
| Subtotal | O subtotal é a soma de `preco * quantidade` para todos os itens do carrinho. |
| Carrinho vazio | Um array vazio é inválido e deve gerar o erro `Carrinho inválido`. |
| Quantidade inválida | Quantidades menores ou iguais a zero são inválidas e devem gerar o erro `Carrinho inválido`. |
| Preço inválido | Preços negativos são inválidos e devem gerar o erro `Carrinho inválido`. |
| Cupom `PROMO10` | Aplica 10% de desconto sobre o subtotal. Cupons diferentes de `PROMO10` não geram desconto nesta versão. |
| Frete grátis | Para subtotal maior ou igual a R$$ 100,00, o frete é R$$ 0,00. |
| Frete pago | Para subtotal inferior a R$$ 100,00, o frete é R$$ 15,00. |
| Arredondamento | O total final deve ser arredondado para exatamente duas casas decimais. |

A fórmula do total é:

```
subtotal = soma(preço × quantidade)
desconto = subtotal × 0,10, quando o cupom for PROMO10
frete = R$ 0,00, quando subtotal >= R$ 100,00; caso contrário, R$ 15,00
total = subtotal - desconto + frete
```

## Pré-requisitos

Para executar o projeto, é necessário ter o **Node.js** e o **npm** instalados no ambiente. O Jest é utilizado como dependência de desenvolvimento para a execução dos testes automatizados.

## Instalação

Clone ou copie os arquivos do projeto para uma pasta local e execute os comandos abaixo no diretório raiz:

```bash
npm init -y
npm install --save-dev jest
```

Em seguida, configure o script de testes no arquivo `package.json`:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

## Estrutura esperada

A organização mínima dos arquivos é a seguinte:

```
.
├── carrinho.js
├── carrinho.test.js
├── index.js
├── package.json
└── README.md
```

| Arquivo | Responsabilidade |
| --- | --- |
| `carrinho.js` | Contém a função `calcularTotal`. |
| `index.js` | Executa os testes manuais de caixa-preta. |
| `carrinho.test.js` | Contém os testes automatizados escritos com Jest. |
| `package.json` | Armazena as configurações e os scripts do projeto. |
| `README.md` | Documenta o funcionamento, as regras e os testes. |

## Implementação corrigida

A implementação abaixo contempla as regras de validação, desconto, frete e arredondamento definidas no plano de testes:

```javascript
function calcularTotal(itens, cupom) {
  if (
    !Array.isArray(itens) ||
    itens.length === 0 ||
    itens.some((item) => item.quantidade <= 0 || item.preco < 0)
  ) {
    throw new Error("Carrinho inválido");
  }

  const subtotal = itens.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  const desconto = cupom === "PROMO10" ? subtotal * 0.1 : 0;
  const frete = subtotal >= 100 ? 0 : 15;
  const total = subtotal - desconto + frete;

  // Number mantém o retorno numérico esperado pelos testes automatizados.
  return Number(total.toFixed(2));
}

module.exports = { calcularTotal };
```

## Execução dos testes manuais

O arquivo `index.js` pode ser executado diretamente com Node.js:

```bash
node index.js
```

Esse comando executa os seis cenários definidos na matriz de testes e informa, para cada caso, o valor esperado, o valor obtido e o status do teste.

## Execução dos testes automatizados

Para executar a suíte completa com Jest, utilize:

```bash
npm test
```

Também é possível executar o Jest diretamente:

```bash
npx jest
```

A suíte automatizada está no arquivo `carrinho.test.js` e cobre os cenários de frete grátis, desconto promocional, validação de quantidade, arredondamento, carrinho vazio e frete pago.

## Matriz de testes

| ID | Cenário | Entrada principal | Resultado esperado | Resultado inicial | Status inicial | Status após correção |
| --- | --- | --- | --- | --- | --- | --- |
| CT-01 | Frete grátis no limite | Item de R$ 100,00, quantidade 1, sem cupom | R$ 100,00 | R$ 115,00 | Falhou | Passou |
| CT-02 | Aplicação do cupom de 10% | Item de R$ 50,00, quantidade 1, cupom `PROMO10` | R$ 60,00 | R$ 55,00 | Falhou | Passou |
| CT-03 | Quantidade negativa | Item de R$ 10,00, quantidade -2 | Erro `Carrinho inválido` | R$ -5,00 | Passou, mas de forma incompleta | Passou |
| CT-04 | Arredondamento de centavos | Item de R$ 33,333, quantidade 1, sem cupom | R$ 48,33 | R$ 48,33333333333336 | Falhou | Passou |
| CT-05 | Carrinho vazio | `[]`, sem cupom | Erro `Carrinho inválido` | Erro `Carrinho inválido` | Passou | Passou |
| CT-06 | Frete pago abaixo do limite | Item de R$ 80,00, quantidade 1, sem cupom | R$ 95,00 | R$ 95,00 | Passou | Passou |

> No cenário **CT-03**, o teste inicial podia aparentar aprovação porque o código lançava erro apenas quando o subtotal ficava negativo. Entretanto, a validação não estava implementada conforme a regra de negócio: o item com quantidade negativa deveria ser rejeitado explicitamente.

## Exemplos de cálculo

| Itens | Cupom | Subtotal | Desconto | Frete | Total |
| --- | --- | --- | --- | --- | --- |
| 1 × R$ 100,00 | — | R$ 100,00 | R$ 0,00 | R$ 0,00 | **R$ 100,00** |
| 1 × R$ 50,00 | `PROMO10` | R$ 50,00 | R$ 5,00 | R$ 15,00 | **R$ 60,00** |
| 1 × R$ 80,00 | — | R$ 80,00 | R$ 0,00 | R$ 15,00 | **R$ 95,00** |
| 1 × R$ 33,333 | — | R$ 33,333 | R$ 0,00 | R$ 15,00 | **R$ 48,33** |

## Processo de testes

O processo começou com a criação do ambiente Node.js e do arquivo contendo a implementação inicial com os bugs conhecidos. Em seguida, foram criados os testes manuais em `index.js` e executados com `node index.js`. Os resultados foram registrados na matriz do GOT — Guia de Ordem de Testes.

Depois, foi criada a suíte automatizada em `carrinho.test.js`, utilizando Jest. Os resultados automatizados foram comparados com os testes manuais para confirmar que os mesmos comportamentos incorretos estavam sendo identificados.

Por fim, os quatro defeitos foram corrigidos em `carrinho.js` e os testes manuais e automatizados foram executados novamente. A versão corrigida deve aprovar os seis cenários da matriz.

## Critérios de aceite

A implementação é considerada aprovada quando:

1. Retorna R$ 100,00 para um carrinho com subtotal exatamente igual a R$ 100,00.

1. Aplica 10% de desconto quando o cupom é `PROMO10`.

1. Rejeita carrinhos vazios, quantidades menores ou iguais a zero e preços negativos com o erro `Carrinho inválido`.

1. Arredonda o total final para duas casas decimais.

1. Cobra R$ 15,00 de frete para subtotais inferiores a R$ 100,00.

1. Concede frete grátis para subtotais maiores ou iguais a R$ 100,00.

1. Aprova todos os testes automatizados executados com `npm test`.

## Observações

A documentação original registra o comando `npm int -y`; neste README, ele foi corrigido para `npm init -y`, que é o comando utilizado para inicializar um projeto Node.js com um arquivo `package.json` padrão.

Da mesma forma, o script de teste foi normalizado para:

```json
"test": "jest"
```

A implementação retorna um número após aplicar `toFixed(2)`, pois `toFixed` produz uma string. Essa conversão mantém o valor numérico esperado pelas asserções `toBe` da suíte automatizada.

## Licença

Nenhuma licença foi especificada no documento-base. Defina uma licença antes de publicar ou distribuir este projeto.
