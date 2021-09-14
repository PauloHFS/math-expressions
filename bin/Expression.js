module.exports = class Expression {
  constructor(expression) {
    this.expression = "";
    for (let i = 0; i < expression.length; i++) {
      if (expression[i] != " ") {
        this.expression += expression[i];
      }
    }
  }

  /*
    Retorna a solucão da expressão.
    Todo: verificar casos de erros e expressões mal formatadas
  */
  solve(verbose = false) {
    let numeros = [];
    let operadores = [];

    let position = 0;

    let tkn = "";
    while (position < this.expression.length) {
      tkn = this.expression[position];
      if (this.isOperador(tkn)) {
        //!tkn é um operador
        if (operadores == []) {
          //!não há operadores na pilha
          operadores.push(tkn);
        } else {
          //!há operadores na pilha

          while (
            //!há operações e tkn tem menos preferencia que há ultima na pilha
            operadores.length != 0 &&
            this.precedenceOf(tkn) <
              this.precedenceOf(operadores[operadores.length - 1])
          ) {
            let result = this.efetuarOperacao(
              numeros.pop(),
              operadores.pop(),
              numeros.pop(),
              verbose
            );

            numeros.push(result);
          }

          operadores.push(tkn);
        }
      } else if (tkn == "(") {
        // !inicia uma nova expressão com maior prioridade
        operadores.push(tkn);
      } else if (tkn == ")") {
        // !resolve a expressão interna
        while (operadores[operadores.length - 1] != "(") {
          let result = this.efetuarOperacao(
            numeros.pop(),
            operadores.pop(),
            numeros.pop(),
            verbose
          );

          if (result == undefined) {
            console.log("Expressão mal formatada!");
            break;
          } else {
            numeros.push(result);
          }
        }
        operadores.pop();
      } else {
        //!tkn é um numero
        let num = tkn;
        while (position + 1 <= this.expression.length) {
          tkn = this.expression[position + 1];
          if (!isNaN(tkn)) {
            num += tkn;
            position++;
          } else {
            break;
          }
        }

        numeros.push(parseInt(num));
      }
      position++;
    }

    while (operadores.length != 0) {
      let result = this.efetuarOperacao(
        numeros.pop(),
        operadores.pop(),
        numeros.pop(),
        verbose
      );
      numeros.push(result);
    }

    return numeros.pop();
  }

  efetuarOperacao(a, operacao, b, verbose) {
    let result;
    let ver = "";
    if (operacao == "+") {
      result = a + b;
      ver = `${a}+${b}=${result}`;
    } else if (operacao == "-") {
      result = b - a;
      ver = `${b}-${a}=${result}`;
    } else if (operacao == "*") {
      result = a * b;
      ver = `${a}x${b}=${result}`;
    } else if (operacao == "/") {
      if (a == 0) {
        result = undefined;
        ver = `${a}/${b} não pode ser feito!`;
      } else {
        result = b / a;
        ver = `${b}/${a}=${result}`;
      }
    } else if (operacao == "^") {
      result = b ** a;
      ver = `${b}^${a}=${result}`;
    } else if (operacao == "(" || operacao == ")") {
      if (a == undefined) {
        result = b;
      } else if (b == undefined) {
        result = a;
      }
      console.log("( ou ) na stack de operadores, corrija!");
    }

    if (verbose) {
      console.log(ver);
    }

    return result;
  }

  isOperador(caracter) {
    return (
      caracter == "+" ||
      caracter == "-" ||
      caracter == "*" ||
      caracter == "/" ||
      caracter == "^"
    );
  }

  precedenceOf(operador) {
    let precedence = 0;
    if (operador == "^") {
      precedence = 5;
    } else if (operador == "*") {
      precedence = 4;
    } else if (operador == "/") {
      precedence = 3;
    } else if (operador == "+") {
      precedence = 2;
    } else if (operador == "-") {
      precedence = 1;
    }
    return precedence;
  }

  toString() {
    return this.expression;
  }
};
