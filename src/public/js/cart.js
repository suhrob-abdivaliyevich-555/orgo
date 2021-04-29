



let elProductCuantity = document.querySelectorAll('.product-cuantity');
let elBxPlus = document.querySelectorAll('.bx-plus')
let elBxMinus = document.querySelectorAll('.bx-muinus')
let elInputCounter = document.querySelectorAll('.input-counter')
let elPlustBtn = document.querySelector('.plus-btn')
let elSubTotal = document.querySelectorAll('.subtotal-amount')
let elUnitAmout = document.querySelectorAll('.unit-amount')
let subTotalResult = document.querySelector('.subtotal-result')
let totalResult = document.querySelector('.total-result')
let elProductCounter = document.querySelectorAll('.product-counter')
let elBxTrash = document.querySelectorAll('.bx-trash')

// elProductCuantity.forEach(productCuantity=> {
//     console.log(productCuantity)
// })


// elInputCounter.forEach(inputCounter => {
//     inputCounter.addEventListener('click', evt => {
//         if(evt.target.matches('.bx-plus')){
//             let InputValue = inputCounter.lastElementChild.value

//         }
//     })
// })
const data = JSON.parse(localStorage.getItem('proudctCounterId')) || [];

localStorage.setItem('proudctCounterId', JSON.stringify(data))

elProductCounter.forEach(function(productCounter, index) {
    for(let k = 0; k < data.length; k++){
        if(data[k].id == productCounter.textContent){
            elProductCuantity[index].value = data[k].counter
            elSubTotal[index].textContent = Number(data[k].counter) * Number
            (elUnitAmout[index].textContent)
        }
    }
})

elBxTrash.forEach(function(trash, index){
    trash.addEventListener('click', evt => {
        if(evt.target.dataset.remove){
            for(let k = 0; k < data.length; k++){
                if(evt.target.dataset.remove == data[k].id){
                    data.splice(k, 1)
                    console.log(data)
                    localStorage.setItem('proudctCounterId', JSON.stringify(data))
                }
            }
        }
        
    })
})

let sum = 0;

for(let i = 0; i < elSubTotal.length; i++){
    sum = sum + Number(elSubTotal[i].textContent)
}
subTotalResult.textContent = sum
totalResult.textContent = sum

function dataFind(data, dataId){
    for(let i = 0; i < data.length; i++){
        if(data[i].id == dataId){
            return true
        }
    }
    return false
}


for(let i = 0; i < elInputCounter.length; i++){
    elInputCounter[i].addEventListener('click', evt=> {
        if(evt.target.matches('.bx-plus') || evt.target.matches('.plus-btn')){
            let inputValue = elInputCounter[i].lastElementChild.value
            if(inputValue > 0){
                elSubTotal[i].textContent = Number(inputValue) * Number
                (elUnitAmout[i].textContent)
            }
            if(inputValue > 1){
                if(evt.target.dataset.counter){
                    if(dataFind(data, evt.target.dataset.counter)){
                        for(let i = 0; i < data.length; i++){
                            if(data[i].id == evt.target.dataset.counter){
                                data[i].counter = inputValue;
                                localStorage.setItem('proudctCounterId', JSON.stringify(data))
                            }
                        }
                    }else{
                        data.push({
                            id: evt.target.dataset.counter,
                            counter: inputValue
                        })
                        localStorage.setItem('proudctCounterId', JSON.stringify(data))
                    }
                }
                for(let j = 0; j < data.length; j++){
                    if(evt.target.dataset.counter == data[j].id){
                        elSubTotal[i].textContent = Number(data[j].counter) * Number
                        (elUnitAmout[i].textContent)
                    }
                }
                sum = sum + Number
                (elUnitAmout[i].textContent)
                subTotalResult.textContent = sum
                totalResult.textContent = sum
            }
            console.log(data)
            
            
        }
    })
}

for(let i = 0; i < elInputCounter.length; i++){
    elInputCounter[i].addEventListener('click', evt=> {
        if(evt.target.matches('.bx-minus') || evt.target.matches('.minus-btn')){
            let inputValue = elInputCounter[i].lastElementChild.value
            if(inputValue > 0){
                elSubTotal[i].textContent = Number(inputValue) * Number
                (elUnitAmout[i].textContent)
                sum = sum - Number
                (elUnitAmout[i].textContent)
                subTotalResult.textContent = sum
                totalResult.textContent = sum
                
                if(evt.target.dataset.counter){
                    if(dataFind(data, evt.target.dataset.counter)){
                        for(let i = 0; i < data.length; i++){
                            if(data[i].id == evt.target.dataset.counter){
                                data[i].counter = inputValue;
                                localStorage.setItem('proudctCounterId', JSON.stringify(data))
                            }
                        }
                    }else{
                        data.push({
                            id: evt.target.dataset.counter,
                            counter: inputValue
                        })
                        localStorage.setItem('proudctCounterId', JSON.stringify(data))
                    }
                }
                
            }
            if(inputValue <= 0){
                inputValue = '1'
            }
        }
    })
}