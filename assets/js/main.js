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
        const samePasswords = this.samePasswords()

        if (inputValids && samePasswords) {
            alert("Formulário enviado! Totalmente válido.")
            this.form.submit()
        }
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

            if (input.classList.contains('user')) {
                if (!this.validUser(input)) valid = false
            }

            if (input.classList.contains('password')) {
                if (!this.validPassword(input)) valid = false
            }
        }

        return valid
    }

    samePasswords() {
        let valid = true 

        const password = this.form.querySelector('.password')
        const repeatPassword = this.form.querySelector('.repeat-password')

        if (password.value !== repeatPassword.value) {
            this.createError(password, "Campo 'Senha' e 'Repetir Senha' precisam ser iguais.")
            this.createError(repeatPassword, "Campo 'Senha' e 'Repetir Senha' precisam ser iguais.")

            valid = false
        }

        return valid
    }

    validCPF(input) { // reutilizei uma classe já criada anteriormente (validatorCpf.js)
        const cpf = new ValidaCPF(input.value)

        if (!cpf.valida()) {
            this.createError(input, 'CPF inválido')
            return false
        }

        return true
    }

    validUser(input) {
        const user = input.value
        let valid = true

        if (user.length < 3 || user.length > 12){ // usando o length do valor para definir restrição
            this.createError(input, 'Nome de usuário precisa conter entre 3 a 12 caracteres.')
            valid = false
        }

        if (!user.match(/^[a-zA-Z0-9]+$/g)){ // usando expressões regulares para permitir apenas letras e números
            this.createError(input, 'Nome de usuário precisa conter apenas letras e/ou números.')
            valid = false
        }

        return valid
    }

    validPassword(input) {
        const password = input.value

        if (password.length < 6 || password.length > 12) {
            this.createError(input, 'A senha deve conter entre 6 e 12 caracteres.')
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