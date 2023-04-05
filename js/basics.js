const $words = document.querySelectorAll('.word');

const $game = document.querySelector('.game');

var palavra = 'teste';
var palavraArr = palavra.split('')

//comportamento padrão
$words.forEach(function(i){
    i.classList.add('transition');
})

//add letras
var validos = /[a-zA-Z]/;
var palavraTerminada = ['1', '2', '3', '4', '5']

$words.forEach(function(i, index){
    var letra = i.value;
    i.addEventListener('input', function(){
        if(!i.value.match(validos)){
            i.value = null;
        }
        if(i.value.length == 1){
            $words[index + 1].focus();
        };
        i.classList.add('capitalize');

        palavraTerminada[index] = i.value;
    })
    i.addEventListener('keydown', function(event) {
        const key = event.key;        
        if (key == "Backspace" || key == "Delete") {
            if(i.value.length !=1){
                $words[index - 1].focus();
            }
        }

        if(key == 'Enter'){
            for(var z = 0; z<palavraArr.length; z++){
                $words[z].disabled = true;
                $words[z+5].disabled = false;
                $words[5].focus();

                if(palavraArr[z] == palavraTerminada[z].toLowerCase()){
                    $words[z].classList.add('correct');
                }else{
                    $words[z].classList.add('incorrect');
                }
            }
            
        }
    })
})

//checa Input Terminado

//add desativados
const disabled = document.querySelectorAll('.disabled');

disabled.forEach(function(input){
    input.disabled = true;
})

//O código ainda está mal estruturado, com possíveis repetições e em seu estado inicial. Releve diversos problemas, pois todos serão corrigidos!