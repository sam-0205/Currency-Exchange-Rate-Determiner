const URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fc = document.querySelector(".from select");
const tc = document.querySelector(".to select");
const msg = document.querySelector(".msg");


const updateflag = (el) =>{
    let curr = el.value;
    let countrycode = countryList[curr];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img  = el.parentElement.querySelector("img");
    img.src = newsrc;
    // console.log(curr);
};


for(let select of dropdowns){
    for (code in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = code;
        newoption.value = code;
        if(select==="from" && code ==="USD"){
            newoption.selected = "selected";
        }
        else if(select==="to" && code ==="IND"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt)=>{
        updateflag(evt.target);
    });
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;

    if(amtval < 1 || amtval===""){
        amtval = 1;
        amount.value="1";
    }
    const url = `${URL}`;
    // console.log(fc.value , tc.value);
    let response = await fetch(url);
    let data = await response.json();
    let rate = data["eur"][tc.value.toLowerCase()] / data["eur"][fc.value.toLowerCase()];

    
    let finalamount = amtval * rate; 
    // console.log(finalamount);
    msg.innerText = `${finalamount} ${tc.value}`;
    // updateExchangeRate();
  });




