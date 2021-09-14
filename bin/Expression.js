module.exports = class Expression {
  constructor(expression) {
    this.operands = []; //numeros
    this.operators = [];

    this.expression = "";
    for (let i = 0; i < expression.length; i++) {
      if (expression[i] != " ") {
        this.expression += expression[i];
      }
    }
    this.expression += ")";
  }

  solve() {
    this.position = 0;

    while (this.position < this.expression.length) {
      const tkn = this.expression[this.position];
      if (tkn == ")") {
        const result = this.efetuarOperacao(
          this.operators.pop,
          this.operands.pop,
          this.operands.pop
        );
        this.operands.push(result);
        this.operators.pop();
      } else if (tkn == "+") {
        this.operators.push(tkn);
      } else {
        //numeros
        //TODO: verificar se o numero é maior que o intervalo de 1 caracter

        this.operands.push(parseInt(tkn));
      }
      this.position++;
    }
  }

  efetuarOperacao(operacao, a, b) {
    let result;

    if (operacao == "+") {
      result = a + b;
    } else if (operacao == "-") {
      result = a - b;
    } else if (operacao == "*") {
      result = a * b;
    } else if (operacao == "/") {
      result = a / b;
    }

    return result;
  }

  toString() {
    return "Operands: " + this.operands + "\n" + "Operators: " + this.operators;
  }
};
