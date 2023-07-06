// form placeholder config

const contatoInputs = document.querySelectorAll('.text-inputs input, .text-inputs textarea');

contatoInputs.forEach(input => {
    atualizaLabel(input);

    input.addEventListener('blur', event=>{
        event.target.value = event.target.value.trim();
        atualizaLabel(event.target);
    })

    input.addEventListener('focus', event=>{
        const label = document.querySelector(`label[for=${event.target.id}]`);
        label.classList.add('hide');
    });

    input.addEventListener('input', event=>{
        const textoDigitado = event.target.value;
        const inputName = event.target.name;
        const inputValueIsValid = inputValidations[`${inputName}IsValid`](textoDigitado);
        atualizaErroInput(inputValueIsValid, event.target);

    });
});

const telContato = document.querySelector('#tel-contato');
telContato.addEventListener('input', e => {

    e.target.value = e.target.value.split('').filter(c=>c!=='(' && c!==')' && c!=='-' && c!==' ').join('');

});

//submit validation config
const btnSubmit = document.querySelector('#submit-contato');

btnSubmit.addEventListener('click', () => {
    //* possibilidade de resumir esse código a um for ou foreach com vários valores  
    const telContato = document.querySelector('#tel-contato');
    const nomeContato = document.querySelector('#nome-contato');
    const emailContato = document.querySelector('#email-contato');
    const mensagemContato = document.querySelector('#mensagem-contato');
    const radioBtns = document.querySelectorAll('.radio-btn');
    const checkBtns = document.querySelectorAll('.checkbox-btn');
    const selected = document.querySelector('.selected span');

    if(!inputValidations.nomeIsValid(nomeContato.value)){
        atualizaErroInput(false, nomeContato);
    } else if(!inputValidations.emailIsValid(emailContato.value)){
        atualizaErroInput(false, emailContato);
    } else if(!inputValidations.telIsValid(telContato.value)){
        atualizaErroInput(false, telContato);
    } else if(!inputValidations.mensagemIsValid(mensagemContato.value)){
        atualizaErroInput(false, mensagemContato);
    } else if(!inputValidations.activeAreValid(radioBtns)){
        alert('Marque ao menos uma das preferências de carne');
    } else if(!inputValidations.selectIsValid(selected)){
        alert('Selecione ao menos uma carne favorita');
    } else if(!inputValidations.activeAreValid(checkBtns)){
        alert('Marque ao menos uma das preferências de comunicação');
    } else {
        alert('Formulário enviado com sucesso!');
    }
});

function atualizaErroInput(isValid, input){
    const errorMessage = input.parentNode.firstElementChild;
    errorMessage.classList[isValid ? 'add' : 'remove' ]('hide'); 
}

function atualizaLabel(input){
    const textoDigitado = input.value.trim();
    const label = document.querySelector(`label[for=${input.id}]`);
  
    if (textoDigitado !== '') { label.classList.add('hide'); } 
    else { label.classList.remove('hide'); }
}

const inputValidations = {
    nomeIsValid(nome){
        return nome.trim().includes(' ');
    },

    emailIsValid(email){
        return email.includes('@') 
        && email.includes('.') 
        && email.lastIndexOf('.') - email.lastIndexOf('@')  >= 2
        && email.substring(email.lastIndexOf('@') + 1, email.lastIndexOf('.')).trim() !== '';
    },

    telIsValid(tel){
        return tel.trim().length === 11
        && !tel.includes('(')
        && !tel.includes(')')
        && !tel.includes('-')
        && !tel.includes(' ');
    },

    mensagemIsValid(mensagem){
        return mensagem.split('').filter(c=>c!==' ').length >= 5;
    },

    activeAreValid(activeBtn){
        return [...activeBtn].map(n => n.classList.contains('checked')).includes(true)
    },

    selectIsValid(selected){
        return selected.attributes.value.value !== 'selecione';
    },
}


