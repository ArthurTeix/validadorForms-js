class ValidateForms {
    constructor(){
        this.form = document.querySelector('.form-main')
        this.eventos()
    }

    eventos(){
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e) // vai capturar o evento de envio e usar na função
        })
    }

    handleSubmit(e){
        e.preventDefault() // trava envio, para primeiro validar todos os campos
        const inputValids = this.isValid()
    }

    isValid(){

    }
}

const validate = new ValidateForms()