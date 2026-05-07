class ValidateForms {
    constructor() {
        this.form = document.querySelector('.form-main')
        this.eventos()
    }

    eventos() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e)
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const inputValids = this.isValid()
    }

    isValid() {
        let valid = true

        for (let errorText of this.form.querySelectorAll('.error-text')) { // Para limpar os campos com erros ao enviar, para não empilhar erros
            errorText.remove()
        }

        for (let input of this.form.querySelectorAll('.validate')) {
            const label = input.previousElementSibling.innerHTML // se refere ao irmão anterior (label antes da div criada, então vai pegar o nome do label)

            if (!input.value) {
                this.createError(input, `O campo "${label}" não pode estar vazio.`)
                valid = false
            }

            if (input.classList.contains('cpf')) {
                if (!this.validCPF(input)) valid = false
            }
        }
    }

    validCPF(input) {
        const cpf = new ValidaCPF(input.value)

        if (!cpf.valida()) {
            this.createError(input, 'CPF inválido')
            return false
        }

        return true
    }

    createError(input, msg) {
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add("error-text")

        input.insertAdjacentElement('afterend', div)
    }
}

const validate = new ValidateForms()