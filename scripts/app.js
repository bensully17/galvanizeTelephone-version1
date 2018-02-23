fetch ('https://quiet-bayou-99554.herokuapp.com/api/v1/contacts')
    .then (response => {
        return response.json()
    })
    .then (result => {
        
        let characterList = document.querySelector('#characters')
        for (let i = 0; i < result.data.length; i++) {
            let newLi = document.createElement('li')
            characterList.appendChild(newLi)
        } 
        let newLis = document.querySelectorAll('#characters > li')
        newLis.forEach(x => {
            let newImg = document.createElement('img')
            let newSpan = document.createElement('span')
            let newParagraph = document.createElement('p')
            let newLink = document.createElement('a')
            x.appendChild(newImg)
            x.appendChild(newSpan)
            x.appendChild(newParagraph)
            x.appendChild(newLink)    
        })
        let newImages = document.querySelectorAll('#characters > li > img')
        let newSpans = document.querySelectorAll('#characters > li > span')
        let newMessage = document.querySelectorAll('#characters > li > p')
        let newLinks = document.querySelectorAll('#characters > li > a')
        for (let i = 0; i < newImages.length; i++) {
            let name = result.data[i].name
            newImages[i].setAttribute('src', result.data[i].imageURL)
            newSpans[i].textContent = result.data[i].name + ' - ' + result.data[i].phone
            newMessage[i].textContent = result.data[i].message
            newLinks[i].textContent = 'Leave ' + name + ' a message'
            newLinks[i].setAttribute('href', 'contact.html?character=' + name)
        } 
         
    })    
   

