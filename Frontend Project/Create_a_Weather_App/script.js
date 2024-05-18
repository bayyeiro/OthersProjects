// http://api.weatherapi.com/v1/current.json?key=5634e9a9b8e14c4d82a161700241805&q=Dakar&aqi=no

const temp = document.querySelector(".temp") 
const locat = document.querySelector(".time_location p") 
const date = document.querySelector(".time_location span") 
const weather = document.querySelector(".condition p") 
const iconic = document.querySelector(".condition span") 
const search = document.querySelector(".search_area") 
const form = document.querySelector("form") 



let target
const fetchData = async () => {
    let url = `http://api.weatherapi.com/v1/current.json?key=5634e9a9b8e14c4d82a161700241805&q=${target}&aqi=no`

    const res = await fetch(url)
    
    const data = await res.json()
    
    
    let location = data.location.name

    let time = data.location.localtime
    
    let temperature = data.current.temp_c
    
    let condition = data.current.condition.text

    let icon = data.current.condition.icon.substr(2)

    update(temperature, location, time, condition, icon)
    
}

const update = (temperature, location, time, condition, icon) => {
    if (target.toUpperCase() == location.toUpperCase()) {
        
        temp.innerText = temperature
        locat.innerText = location
        date.innerText = time
        weather.innerText = condition
        iconic.style.backgroundImage = `url(${icon})`

    }
}


const locSearch = (e) => {
    e.preventDefault()
    
    target = search.value
    
    fetchData(target)
}
form.addEventListener('submit', locSearch)

