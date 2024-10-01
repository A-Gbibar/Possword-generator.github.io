let rangeInput = document.querySelector('.rangeInput');
let numberRange = document.querySelector('.numberRange');
numberRange.innerHTML = rangeInput.value;

function handleInputChange(){
    let val = rangeInput.value;
    let min = rangeInput.min;
    let max = rangeInput.max;

    let percentage = (val - min) * 100 / (max - min);

    rangeInput.style.backgroundSize = percentage +  "% 100%";
    numberRange.innerHTML = val;
}
rangeInput.addEventListener('input', handleInputChange);