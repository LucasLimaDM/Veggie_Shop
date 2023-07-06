// ! Esse código não foi copiado de nenhuma fonte externa, é uma biblioteca criada por mim -Lucas Lima Dias Messias para o Projeto de Bloco da INFNET 

//? Como fechar um menu ou dropdown ao clicar fora dele

// hamburguer-menu config'  
const menu = document.querySelector('.menu-hamburguer');
const menuBar = document.querySelector('.menu-bar');

menu.onclick = ()=> { menuBar.classList.toggle('open'); }
window.onresize = ()=> { menuBar.classList.remove('open'); }


//radio-button e checkbox

const radioButtons = document.querySelectorAll('.radio-btn');

radioButtons.forEach(radioButton => {
    radioButton.addEventListener('click', event=>{clickRadio(event.target)});

    const label = document.querySelector(`label[for=${radioButton.id}]`);
    
    label.addEventListener('click', event=>{
        const radioButton = document.querySelector(`#${event.target.attributes.for.value}`)
        clickRadio(radioButton)});
});


function clickRadio(radioButton) {
    const sameNameButtons = document.querySelectorAll(`.radio-btn[name=${radioButton.attributes.name.value}]`);
        sameNameButtons.forEach(sameNameButton => sameNameButton.classList.remove('checked'));

        radioButton.classList.toggle('checked');
}

//checkbox

const checkboxes = document.querySelectorAll('.checkbox-btn');
checkboxes.forEach(checkbox => {
        
    const label = document.querySelector(`label[for=${checkbox.id}]`);

    checkbox.addEventListener('click', event=>{ 
        const isMarkAll = checkbox.classList.contains('mark-all');
        console.log(event);
        (isMarkAll ? clickMarkAll : clickMarkOne)(checkbox) 
    });

    label.addEventListener('click', event=>{ 
        const checkbox = document.querySelector(`#${event.target.attributes.for.value}`);
        const isMarkAll = checkbox.classList.contains('mark-all');
        (isMarkAll ? clickMarkAll : clickMarkOne)(checkbox)  });
});

function clickMarkAll(checkbox){
    const checkName = checkbox.attributes.name.value;
    const sameNameCheckOnes = document.querySelectorAll(`.checkbox-btn[name=${checkName}].mark-one`);
    const checkboxIsChecked = checkbox.classList.contains('checked');

    sameNameCheckOnes.forEach(checkOne => {
        checkOne.classList[checkboxIsChecked ? 'remove' : 'add']('checked')
    });

    atualizaMarkAll(checkName);
}

function clickMarkOne(checkbox){
    checkbox.classList.toggle('checked');
    atualizaMarkAll(checkbox.attributes.name.value);
}

function atualizaMarkAll(checkName){
    const checkOnes = [
        ...document.querySelectorAll(`.checkbox-btn[name=${checkName}].mark-one`)
    ]
    .map(check => check.classList.contains('checked'));

    const checkAll = document.querySelectorAll(`.checkbox-btn[name=${checkName}].mark-all`)

    if(checkOnes.every(b=>b===false)){
        checkAll.forEach(checkbox => {
            checkbox.classList.remove('dismark', 'checked', 'half');

            
        });
    } else if(checkOnes.every(b=>b===true)){
        checkAll.forEach(checkbox => {
            checkbox.classList.add('dismark', 'checked');
            checkbox.classList.remove( 'half');
            
        });
    } else if(!checkOnes.every(b=>b===true) && !checkOnes.every(b=>b===false)){
        checkAll.forEach(checkbox => {
            checkbox.classList.add('half', 'checked');
            checkbox.classList.remove( 'dismark');
        });
    }
}

//select 
const selectBtns = document.querySelectorAll('.select-btn');
selectBtns.forEach(selectBtn => {
    const selectBtnName = selectBtn.attributes.name.value;

    const selectOptions = document.querySelectorAll(`.select-btn[name=${selectBtnName}] span`);

    const arrowSelect = document.querySelector(`.select-btn[name=${selectBtnName}] i`);

    arrowSelect.addEventListener('click', event => {
        console.log(event.target.parentNode.parentNode.classList.toggle('open'));
    });
    
    selectOptions.forEach(option => {
            option.addEventListener('click', event =>{

                if(event.target.parentNode.classList.contains('selected')){

                    event.target.parentNode.parentNode.classList.toggle('open');

                } else {
                    const selectOption = event.target.parentNode;

                    selectOption.append(selectOption.previousElementSibling.children[1]);

                    selectOption.previousElementSibling.append(option);

                    selectOption.parentNode.classList.remove('open');
                }
            });       
    })
});



console.log('O código em \'myLibConponents\' não foi copiado de nenhuma fonte externa, é uma biblioteca criada por mim -Lucas Lima Dias Messias para o Projeto de Bloco da INFNET ');