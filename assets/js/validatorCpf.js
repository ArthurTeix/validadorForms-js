class ValidaCPF {
    constructor(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
        writable: false,
        enumerable: true,
        configurable: false,
        value: cpfEnviado.replace(/\D+/g, '')
    });
    }

  éSequência() { // para impedir repetições (Ex: 111.111.111-11)
    return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

  geraNovoCpf() { // cria novo cpf para comparar com o instanciado e checar
    const cpfSemDigitos = this.cpfLimpo.slice(0, -2); // será usado para gerar os dígitos do fim
    const digito1 = ValidaCPF.geraDigito(cpfSemDigitos);
    const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1);
    this.novoCPF = cpfSemDigitos + digito1 + digito2; // cpf criado para comparar
    }

  static geraDigito(cpfSemDigitos) { // faz o cálculo dos dois últimos dígitos do cpf
    let total = 0;
    let reverso = cpfSemDigitos.length + 1;

    for(let stringNumerica of cpfSemDigitos) {
      total += reverso * Number(stringNumerica);
        reverso--;
    }

    const digito = 11 - (total % 11);
    return digito <= 9 ? String(digito) : '0';
    }

  valida() { // checa todas as validações para o CPF passado
    if(!this.cpfLimpo) return false; 
    if(typeof this.cpfLimpo !== 'string') return false;
    if(this.cpfLimpo.length !== 11) return false;
    if(this.éSequência()) return false;
    this.geraNovoCpf();

    return this.novoCPF === this.cpfLimpo;
    }
}
