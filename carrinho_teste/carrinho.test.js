const { calcularTotal } = require('./carrinho')

describe('Suíte de Testes do Carrinho de Compras', () => {

    test('CT-01: Deve conceder frete grátis para compras de exatamente R$100', () => {
        const itens = [{ preco: 100, quantidade: 1 }];
        expect(calcularTotal(itens, null)).toBe(100);
    });

    test('CT-02: Deve aplicar 10% de desconto com o cupom PROMO10', () => {
        const itens = [{ preco: 50, quantidade: 1 }];
        // Subtotal: 50 | Desconto 10% (5) = 45 | Frete: 15 | Total: 60
        expect(calcularTotal(itens, 'PROMO10')).toBe(60);
    });

    test('CT-03: Deve lançar erro se houver item com quantidade negativa ou zero', () => {
        const itens = [{ preco: 10, quantidade: -2 }];
        expect(() => calcularTotal(itens, null)).toThrow("Carrinho inválido");
    });

    test('CT-04: Deve arredondar o valor final para as duas casa decimais', () => {
        const itens = [{ preco: 33.333, quantidade: 1 }];
        // Subtotal: 33.333 | Frete: 15 | Total: 48.33
        expect(calcularTotal(itens, null)).toBe(48.33);
    });

    test('CT-05: Deve lançar erro para o carrinho vazio', () => {
        expect(() => calcularTotal([], null)).toThrow("Carrinho inválido");
    });

    test('CT-06: Deve cobrar frete de R$15 para compras abaixo de R$100', () => {
        const itens = [{ preco: 80, quantidade: 1 }];
        // Subtotal: 80 | Frete: 15 | Total: 95
        expect(calcularTotal(itens, null)).toBe(95);
    });
})