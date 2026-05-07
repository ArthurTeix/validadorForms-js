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

        for (let input of this.form.querySelectorAll('.validate')) {
            if (!input.value) {
                this.createError(input, 'Esse campo não pode estar vazio')
                valid = false
            }
        }
    }

    createError(input, msg) {
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add("error-text")

        input.insertAdjacentElement('afterend', div)
    }
}

const validate = new ValidateForms()