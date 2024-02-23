console.log("this is client side java script")

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

fetch('http://localhost:3000/weather?address=india').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }
        else{
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

const form = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent ='Loading...'
    messageTwo.textContent=''
    fetch('http://localhost:3000/weather?address=' +location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageTwo.textContent=data.error
        }
        else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
    })
})

})