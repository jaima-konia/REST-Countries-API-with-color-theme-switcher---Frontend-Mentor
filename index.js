const countriesContainer = document.querySelector('.countries-container')
const countryMain = document.getElementById('country-main')
const detailMain = document.getElementById('details-main')
const backButton = document.querySelector('.back-button')
const filterByRegion = document.querySelector('.filter-by-region')
const inputSearch = document.getElementById('input-search')
const themeChanger = document.getElementById('theme-changer')
let countriesData = []

themeChanger.addEventListener('click', ()=>{
    document.body.classList.toggle('dark')
})


fetch('data.json')
.then(response => response.json())
.then((data) => {
    data.forEach((res)=>{
const countryCard = document.createElement('a')
countryCard.classList.add('country-card')

const cardHTML = `
    <img src=${res.flags.svg} alt="flag" />
            <div class="info">
              <h3 class="card-title">${res.name}</h3>
              <p><b>Population: </b>${format(res.population)}</p>
              <p><b>Region: </b>${res.region}</p>
              <p><b>Capital: </b>${res.capital}</p>
            </div>`

countryCard.innerHTML = cardHTML

countriesData = data


countryCard.addEventListener('click', () => {
    showDetails(res)
})






countriesContainer.appendChild(countryCard)

})})




filterByRegion.addEventListener('change',(e)=>{
    
    const filteredCountries = countriesData.filter((res)=>{
        return res.region === e.target.value
    })
    countriesContainer.innerHTML = ""
    
   filteredCountries.forEach((res)=>{
    const countryCard = document.createElement('a')
    countryCard.classList.add('country-card')

const cardHTML = `
    <img src=${res.flags.svg} alt="flag" />
            <div class="info">
              <h3 class="card-title">${res.name}</h3>
              <p><b>Population: </b>${format(res.population)}</p>
              <p><b>Region: </b>${res.region}</p>
              <p><b>Capital: </b>${res.capital}</p>
            </div>`

countryCard.innerHTML = cardHTML



countryCard.addEventListener('click', () => {
    showDetails(res)
})




countriesContainer.appendChild(countryCard)

})})


inputSearch.addEventListener('input',(e)=>{
    
    const filteredCountries = countriesData.filter((res)=>{
        return res.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    countriesContainer.innerHTML = ""
   filteredCountries.forEach((res)=>{
    const countryCard = document.createElement('a')
    countryCard.classList.add('country-card')

    const cardHTML = `
    <img src=${res.flags.svg} alt="flag" />
            <div class="info">
              <h3 class="card-title">${res.name}</h3>
              <p><b>Population: </b>${format(res.population)}</p>
              <p><b>Region: </b>${res.region}</p>
              <p><b>Capital: </b>${res.capital}</p>
            </div>`

countryCard.innerHTML = cardHTML



countryCard.addEventListener('click', () => {
    showDetails(res)
})




countriesContainer.appendChild(countryCard)

})})


function format(number){
    return new Intl.NumberFormat('en-US').format(number)
}

backButton.addEventListener('click', ()=>{
    countryMain.hidden = false
    detailMain.hidden = true
   // history.back()
})

function showDetails(country) {
    detailMain.replaceChildren(backButton)

    
    countryMain.hidden = true
    detailMain.hidden = false
   
    

    const countryDetails = document.createElement('div')
    countryDetails.classList.add('country-details')
    countryDetails.innerHTML = `<img src="${country.flags.svg}" alt="flag" />
        <div class="details-text-container">
          <h2 id="country-name">${country.name}</h2>
          <div class="details-text">
            <div>
              <p><b>Native Name: </b>${country.nativeName}</p>
              <p><b>Population: </b>${format(country.population)}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Sub Region: </b>${country.subregion}</p>
              <p><b>Capital: </b>${country.capital}</p>
            </div>

            <div>
              <p><b>Top Level Domain: </b>${country.topLevelDomain}</p>
              <p><b>Currencies: </b>${country.currencies[0].name}</p>
              <p><b>Languages: </b>${country.languages[0].name}</p>
            </div>

        </div>`
        

        detailMain.appendChild(countryDetails)

        const bordersDiv = document.createElement('div')
        bordersDiv.classList.add('borders')
        if(country.borders)
            {bordersDiv.innerHTML =`<p><b>Border Countries: `}
 
        country.borders?.forEach(border => {
        const btn = document.createElement('button')
        // btn.textContent= border
        btn.classList.add('border-btn')
        
        btn.addEventListener('click', () =>{
            const borderCountry = countriesData.find(res =>{
                return res.alpha3Code === border
            })
            
            showDetails(borderCountry)
        })
         const countryName = countriesData.find(res =>{
               return res.alpha3Code === border
           })
       
         btn.textContent= countryName.name

        bordersDiv.appendChild(btn)
})
const detailsTextContainer = document.querySelector('.details-text-container')
detailsTextContainer.appendChild(bordersDiv)
        



    
}




