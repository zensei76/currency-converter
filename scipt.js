const select1 = document.getElementById("currency1")
const select2 = document.getElementById("currency2")
const input = document.getElementById("input")
const output = document.getElementById("output")
const submit = document.getElementById("submit")
const date = document.getElementById("date")
const inputLable = document.getElementById("input-lable")
const outputLable = document.getElementById("output-lable")

input.value = "1"
output.value ="0"


// For getting real time currency and curency code on 
let getCountries = fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json")
getCountries
    .then((data)=>data.json())
    .then((countries)=>{
        for (const key in countries) {
            let s1 = createOptions(key,countries[key])
            select1.append(s1)
            let s2 = createOptions(key,countries[key])
            select2.append(s2)

        }
        console.log("Currency Codes loaded sucesfully")
    }).then(main)
    

//To create option element that need to be appended in select
function createOptions(code,country){
    //console.log(`${code}: ${country}`)
    let element = document.createElement("option")
    element.setAttribute("value",code)
    element.innerHTML =`${country}`
    
   return element;
}




function main(){
    //Event Listner to get realtime changes in  select
    submit.addEventListener("click",calculate)

    function calculate(Event){
        Event.preventDefault()
        let fromCountry = select1.value
        inputLable.innerHTML = fromCountry.toUpperCase();

        let toCountry = select2.value
        outputLable.innerHTML = toCountry.toUpperCase();


        let inputValue = input.value
        let dateValue = date.value
        if(dateValue){
            toCalculate(fromCountry,toCountry,inputValue,dateValue)
        }else {
            toCalculate(fromCountry,toCountry,inputValue,"latest")

        }

        
    }

    function toCalculate(from,to,input,date){

        console.log(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies/${from}/${to}.json`)
        let result = fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies/${from}/${to}.json`)
        .then((data)=>data.json())
        .then((res)=>{
            
            let converter = parseFloat(res[to])
            input = parseFloat(input)
            let finalResult = input*converter;
    
            output.value = `${finalResult}`;
    
    
    
    
        }).catch(console.error("Server Error"))
    
    
    
    }
    
}


