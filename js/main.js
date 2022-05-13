//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector('button').addEventListener('click', getDrink)
const liqours = Array.from(document.querySelectorAll('.liqour'))
liqours.forEach(x => x.addEventListener('click', queryDrink))

function getDrink(click) {
let drink = document.querySelector('input').value.split(' ').join('_') || click

console.log(drink)


fetch("https://thecocktaildb.com/api/json/v1/1/search.php?s=" + drink)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        /*document.querySelector('h2').innerText = data.drinks[0].strDrink
        document.querySelector('img').src = data.drinks[0].strDrinkThumb
        document.querySelector('h3').innerText = data.drinks[0].strInstructions*/

        document.querySelectorAll(".caro").forEach(carousel => {
            if (document.querySelector('.caro-item')) {
                 Array.from(document.querySelectorAll('.caro-item')).forEach(element => element.remove())
            }
            if (document.querySelector('.caro-button')) {
                Array.from(document.querySelectorAll('.caro-button')).forEach(element => element.remove())
            }
    
            let drinks = data.drinks.map((drink) => {
                let ingredients = []
                let counter = 0
                for(const key in drink) {
                    if (key.includes('strIngredient') && drink[key] !== null) {
                        ingredients.push(drink[key])
                    }
                    if (key.includes('strMeasure') && drink[key] !== null) {
                        let amount = `${drink[key]}`
                        amount += ` ${ingredients[counter]}`
                        ingredients[counter] = amount
                        counter++
                    }
                }
                ingredients.join(',  ')
               return `<div class="caro-item">
                <img class="drinksPics" src="${drink.strDrinkThumb}">
                <h1 class="card__title">${drink.strDrink}</h1>
                <h3 class="card__by">Ingredients: ${ingredients}</h3>
                <h3 class="card__by">Instructions: ${drink.strInstructions}</h3>
                </div>`
            })
            carousel.insertAdjacentHTML("beforeend", drinks.join(''))
            let items = document.querySelectorAll('.caro-item')
            let buttonsHTML = Array.from(items, () => {
                return `<span class="caro-button"></span>`
            })
        
            carousel.insertAdjacentHTML("beforeend", `
            <div class="caro-nav">
                ${buttonsHTML.join('')}
            </div>`)

            let buttons = carousel.querySelectorAll('.caro-button')
            buttons.forEach((button, i) =>  {
                button.addEventListener('click', () => {
                    items.forEach(item => item.classList.remove('caro-item-selected'))
                    buttons.forEach(button => button.classList.remove('caro-button-selected'))
        
                    items[i].classList.add('caro-item-selected')
                    buttons[i].classList.add('caro-button-selected')
                })
            })
        
            items[0].classList.add('caro-item-selected')
            buttons[0].classList.add('caro-button-selected')

            items.forEach((item, i) => setTimeout(() => {
                item.classList.add('caro-item-selected')
                items[i-1].classList.remove('caro-item-selected')
                buttons[i].classList.add('caro-button-selected')
                buttons[i-1].classList.remove('caro-button-selected')
            }, i * 3000))
        })
    })
    .catch(err => console.log(`error ${err}`))

}

function queryDrink(click) {
    getDrink(click.target.innerText)
}