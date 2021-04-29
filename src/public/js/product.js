

let elCustomFile = document.querySelector('#customFile');

elCustomFile.addEventListener('change', async(evt)=> {
    if(evt.target.files.length){
        let formdata = new FormData()
        formdata.append('photo', evt.target.files[0])
        let response = await fetch('./product/photo', {
            method: "POST",
            body: formdata
        })
        response = await response.json()
        if(response.ok){
            window.location.reload()
        }
    }
})