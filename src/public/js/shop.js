

const elProductCart = document.querySelectorAll('.product-cart')

const data = JSON.parse(localStorage.getItem('dataId')) || [];

elProductCart.forEach(productCart => {
    productCart.addEventListener('click', async function(evt){
        let dataId = await evt.target.dataset.id
        for(let i = 0; i < data.length; i++){
            if(data[i] == dataId){
                localStorage.setItem('dataId', JSON.stringify(data))
                let response = await fetch('/cart', {
                    method: "GET",
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'Application/json'
                    }
                })
                response = await response.json()
                return 0
            }
        }
        data.push(dataId)
        localStorage.setItem('dataId', JSON.stringify(data))
        let response = await fetch('/shop-1', {
            method: "GET",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'Application/json'
            }
        })
        response = await response.json()
        console.log(response)
    })
})


