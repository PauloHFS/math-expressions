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
    let position = 0;

    while (position < this.expression.length) {
      const tkn = this.expression[position];

      switch (tkn) {
        case ")":
          const result = this.efetuarOperacao(
            this.operators.pop(),
            this.operands.pop(),
            this.operands.pop()
          );
          this.operands.push(result);
          this.operators.pop();
          break;
        case "(":
        case "+":
        case "-":
        case "*":
        case "/":
        case "^":
          this.operators.push(tkn);
          break;
        case " ":
          break;
        default:
          //TODO: verificar se o numero é maior que o intervalo de 1 caracter
          this.operands.push(parseInt(tkn));
          break;
      }
      position++;
    }

    return this.operands.pop();
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
    return this.expression;
  }
};
