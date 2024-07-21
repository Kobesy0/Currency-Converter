const convertBtn = document.querySelector(".exchange")
const from = document.querySelector(".from select")
const to = document.querySelector(".to select")
const iconChange = document.querySelector(".icon-exchange")
const selectList = document.querySelectorAll(".select-box select");
const reset = document.querySelector(".reset")
const amount = document.querySelector(".amount")
const displayRate = document.querySelector(".exchange-rate")

document.addEventListener("DOMContentLoaded", ()=> {
    const moon = document.querySelector(".moon")
    const sun = document.querySelector(".sun");
    const body = document.body
    const lightState = localStorage.getItem("lightState");

    if(lightState){
        body.classList.add(lightState)
    }
    sun.addEventListener("click", ()=> {
        body.classList.remove("light-off")
        body.classList.add("light-on")
        localStorage.setItem("lightState" , "light-on")
    })
    moon.addEventListener("click", ()=> {
        body.classList.remove("light-on")
        body.classList.add("light-off");
        localStorage.setItem("lightState" , "light-off")
    })
})
document.querySelector(".instagram").addEventListener("click" , ()=>{
    let link = `https://www.instagram.com/mustafakobesy/`
    window.open(link , "_blank")
})

document.querySelector(".whatsApp").addEventListener("click", ()=> {
    let message = "Hello Mostafa"
    let link = `https://wa.me/01152274612?text=${message}!`;
    window.open(link , "_blank")
})

document.querySelector(".linkedin").addEventListener("click" , ()=> {
    let link = `https://www.linkedin.com/in/mostafa-kobesy-586266255/`
    window.open(link , "_blank")
})

document.querySelector(".github").addEventListener("click", () => {
    let link = `https://github.com/Kobesy0`
    window.open(link , "_blank")
})
selectList.forEach((select , i)=>{
    Object.keys(currencyList).forEach(currency=> {
        
        let selected = i == 0 ? currency == "USD" ? "selected" : "" : currency == "EGP" ? "selected" : "" ;

        let optionTag = document.createElement("option");
            optionTag.value = currency
            optionTag.text = currency
            
            if(selected){
                optionTag.selected = "selected"
            }
        select.appendChild(optionTag)
    })
    select.addEventListener("change", e => {
        loadFlag(e.target); // calling loadFlag with passing target element as an argument
    });
})

function loadFlag(element) {
    Object.keys(currencyList).forEach(code => {
        if (code == element.value) { // if currency code of country list is equal to option value
            let imgTag = element.parentElement.querySelector("img"); // selecting img tag of particular drop list
            // passing country code of a selected currency code in a img url
            imgTag.src = `https://flagcdn.com/48x36/${currencyList[code].toLowerCase()}.png`;
        }
    });
}

iconChange.addEventListener("click", ()=> {
    let tempCode = from.value;
    from.value = to.value; 
    to.value = tempCode; 
    loadFlag(from);
    loadFlag(to); 
    exchangeRate()
})

reset.addEventListener("click",(e)=>{
    e.preventDefault();
    amount.value = ""
    displayRate.innerHTML = ""
})
convertBtn.addEventListener("click",e =>{
    e.preventDefault()
    exchangeRate()
})

function exchangeRate(){
    const amountValue = amount.value
    const fromVale = from.value
    const toValue = to.value
    fetch(`https://v6.exchangerate-api.com/v6/edb6c36893921e5fdb745148/latest/${fromVale}`)
    .then(response => response.json())
    .then((data)=> {
        let rate = data.conversion_rates[toValue]
        let result = (rate * amountValue).toFixed(2)
        if(!amountValue){
            document.querySelector(".amount").style.borderColor = 'red';
            document.querySelector(".bank-icon").style.color = 'red';
            document.querySelector(".errorAmount").innerHTML = "Please fill out the Amount"
        }else{
            document.querySelector(".amount").style .borderColor = '';
            document.querySelector(".bank-icon").style.color = '';
            document.querySelector(".errorAmount").innerHTML = ""
            displayRate.innerHTML = `${amountValue} ${fromVale} = <strong> ${result} </strong> ${toValue}`
        }
    }).catch(()=> {displayRate.innerHTML = `Something Went Wrong`})
}


