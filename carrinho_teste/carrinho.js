function calcularTotal(itens, cupom) {
  let subtotal = 0;

  for (let i = 0; i < itens.length; i++) {
    // CORREÇÃO BUG 1: Validação estrita de quantidade e preço
    if (itens[i].quantidade <= 0 || itens[i].preco < 0) {
      throw new Error("Carrinho inválido");
    }
    subtotal += itens[i].preco * itens[i].quantidade;
  }

  if (itens.length === 0) {
    throw new Error("Carrinho inválido");
  }

  let desconto = 0;
  if (cupom === "PROMO10") {
    // CORREÇÃO BUG 2: Aplicação do percentual de 10% (subtotal * 0.10)
    desconto = subtotal * 0.10; 
  }

  let frete = 15;
  // CORREÇÃO BUG 3: Alterado operador de '>' para '>='
  if (subtotal >= 100) { 
    frete = 0;
  }

  let total = subtotal - desconto + frete;

  // CORREÇÃO BUG 4: Conversão e arredondamento para 2 casas decimais
  return Number(total.toFixed(2)); 
}

module.exports = { calcularTotal };

