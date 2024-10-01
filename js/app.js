function generalPassword(numberChar, uppercase = false, lowercase = false, number = false, symbols = false ){
    let  alpha = 'abcdefghijklmnopqrstuvwxyz';
    let  arraySymbols = "&~#{([|-_\^@])}=$£*%§!:?".split('');
    let  lower = alpha.split('');
    let  upper = alpha.toUpperCase().split('');
    let  lengthAlpha = alpha.length - 1;
    let finalPassword = "";
    let randomNumber ;
    for( let i = 0; i < numberChar; i++ ){
        if( !uppercase && !lowercase && !number && !symbols ){
            break;
        }
        randomNumber = Math.floor(Math.random()*4)+1;
        if( uppercase && randomNumber == 1 ){
            finalPassword += upper[Math.floor(Math.random()*lengthAlpha)];
        }else if( lowercase && randomNumber == 2 ){
            finalPassword += lower[Math.floor(Math.random()*lengthAlpha)];
        }else if( number && randomNumber == 3 ){
            finalPassword += Math.floor(Math.random()*9);
        }else if( symbols && randomNumber == 4 ){
            finalPassword += arraySymbols[Math.floor(Math.random()*(arraySymbols.length -1))];
        }else{
            i--;
        }
   
  
    }

    return finalPassword ;   
}

// console.log(generatPassword(16,true,true,true,true));

// _____________________DOM___JS__________________________________

let propertyChecks = document.querySelectorAll('.porpertyCheck');
let password ;
let rangeNumber = document.querySelector(".rangeInput");
let upper = false , lower = false, number = false, symbol = false;
let textInput = document.querySelector('.textInput');
let radioType = document.querySelectorAll('.radioType');



function createPass(e){
    if( propertyChecks[0].value == "upper" && propertyChecks[0].checked ){
        upper = true;
    }else{
        upper = false;
    }
    if( propertyChecks[1].value == "lower" && propertyChecks[1].checked ){
        lower = true;
    }else{
        lower = false;
    }
    if( propertyChecks[2].value == "num" && propertyChecks[2].checked){
        number = true;
    }else{
        number = false;
    }
    if( propertyChecks[3].value == "symbol" && propertyChecks[3].checked){
        symbol = true;
    }else{
        symbol = false;
    }
}



propertyChecks.forEach(check=>{
    createPass(check);
    check.addEventListener("change" , (e)=>{
         createPass(check);
        textInput.value = generalPassword(rangeNumber.value,upper,lower,number,symbol);
    });
});

let rangeDefeat = document.querySelector('.rangeDefecalt');

textInput.value = generalPassword(rangeNumber.value,upper,lower,number,symbol);
rangeNumber.addEventListener("input", ()=>{
    textInput.value = generalPassword(rangeNumber.value,upper,lower,number,symbol);
    if( rangeNumber.value <= 6  ){
        rangeDefeat.setAttribute("style", "--data-transform:75deg;--color:red;");
    }else if( rangeNumber.value > 6 && rangeNumber.value <= 10 ){
        rangeDefeat.setAttribute("style", "--data-transform:60deg;--color:gray;");
    }else if( rangeNumber.value > 10 && rangeNumber.value <= 14 ){
        rangeDefeat.setAttribute("style", "--data-transform:40deg;--color:goldenrod;");
    }
    else if( rangeNumber.value > 14 ){
        rangeDefeat.setAttribute("style", "--data-transform:0deg;--color:green;");
    }

})

radioType.forEach(type =>{
    type.addEventListener("change", (e)=>{
        if(e.target.value == "easyRead" || e.target.value == "easySay" ){
            propertyChecks[3].setAttribute("disabled", "disabled");
            propertyChecks[3].removeAttribute("checked");
            if(e.target.value == "easyRead"){
                propertyChecks[2].setAttribute("checked", "checked");
                propertyChecks[2].removeAttribute("disabled");
                 propertyChecks[2].parentNode.classList.remove("noActive");
            }
            propertyChecks[3].parentNode.classList.add("noActive");
            textInput.value = generalPassword(rangeNumber.value,upper,lower,number,false);
        } 
        if(e.target.value == "easySay"){
            propertyChecks[2].setAttribute("disabled", "disabled");
            propertyChecks[2].removeAttribute("checked");
            propertyChecks[2].parentNode.classList.add("noActive");
            textInput.value = generalPassword(rangeNumber.value,upper,lower,false,false);
        }
        if(e.target.value == "AllCharacter"){
            propertyChecks[2].removeAttribute("disabled");
            propertyChecks[3].removeAttribute("disabled");
            propertyChecks[2].setAttribute("checked", "checked");
            propertyChecks[3].setAttribute("checked", "checked");
            propertyChecks[3].parentNode.classList.remove("noActive");
            propertyChecks[2].parentNode.classList.remove("noActive");
            textInput.value = generalPassword(rangeNumber.value,true,true,true,true);
        }
    })
} )

let changePassword = document.querySelector('.changePassword');

changePassword.addEventListener("click", ()=>{
    textInput.value = generalPassword(rangeNumber.value,upper,lower,number,symbol);
})

let copyText = document.querySelector('.copyText');
copyText.addEventListener('click', ()=>{
    navigator.clipboard.writeText(textInput.value);
    copyText.classList.add('Copied');
    copyText.setAttribute("data-icons", "Copied");
    setTimeout(()=>{
    copyText.setAttribute("data-icons", "Copy");
    copyText.classList.remove('Copied');
    }, 1500)
});