const calculateGroomPrice = () => { //function
    var errors = []

    //name
    let name = document.getElementById("name").value
    if(name != ""){
        document.getElementById("bid").style.backgroundColor = "white";
    }
    else {
      errors.push("Name")
      document.getElementById("name").style.backgroundColor = "red"; //css manipulation
      document.getElementById("name_section").append("You forgot to enter Name. ");
    }

    //starting bid
    let price = parseFloat(document.getElementById("bid").value)
    if(!isNaN(price)){
        document.getElementById("bid").style.backgroundColor = "white";
    }
    else {
        errors.push("Starting bid")
        document.getElementById("bid").style.backgroundColor = "red"; //css manipulation
        document.getElementById("bid_section").append("You forgot to enter Starting bid. ");
    }

    //education
    var education = document.getElementById("education").value;  //conditional
    if(education != "blank" ){
        price *= parseFloat(education);
        document.getElementById("education").style.backgroundColor = "white";
    }
    else {
        errors.push("Education")
        document.getElementById("education").style.backgroundColor = "red"; //css manipulation
        document.getElementById("dropdown").append("You forgot to choose Education. "); //html manipulation
    }

    //get family netWorth
    var familyNetWorth = document.getElementById("networth").value;
    if(familyNetWorth != "blank" ){ //conditional
        price *= parseFloat(familyNetWorth);
        document.getElementById("networth").style.backgroundColor = "white";
    }
    else {
        errors.push("Networth")
        document.getElementById("networth").style.backgroundColor = "red";  //css manipulation
        document.getElementById("dropdown2").append("You forgot to choose Networth. ") //html manipulation
    }

    //get skills
    var skills = Array.from(document.querySelectorAll("#skills input:checked")); // array
    price = skills_function(skills, price)

    //get age
    var agecoefficient = 0;
    var ages = document.getElementsByName('age');
    ages.forEach( age => {
        if (age.checked){
            agecoefficient = parseFloat(age.value);
        }
    })
    if(agecoefficient == 0){
        errors.push("Age")
        document.getElementById("age_error").innerHTML = '<b class="err">You forgot to choose Age</b>' //html manipulation
    }

    //get gosssip
    var gossips = document.querySelectorAll("#gossip input:checked"); //array
    price = gossips_function(gossips, price)

    var love_letter = document.getElementById("love_letter").value

    var profile = {
      name: name,
      price: price,
      love_letter: love_letter,
    }

    if(errors.length < 1){
      document.getElementById("sum").innerHTML = `
        <div class="profile">
          <br>
          <h2>Result:<h2>
          <p>Groom's Name: <span>${profile.name}</span></p>
          <p>Groom's Price: <span>$${profile.price}</span></p>
          <hr>
          <p class="letter">${profile.love_letter}</p>
          <div id="love_letter"></div>
        </div>
      `
    }
}

const skills_function = (html_collection, price) => {
    let list = Array.from(html_collection)
    let result = list.reduce((price, item) => {
        return price + Number(item.value)
    }, price)
    return result;
}

const gossips_function = (html_collection, price) => {
    for (let i=0; i < html_collection.length; i++) {
        if(html_collection[i].value != '200'){ //conditional with logical operator NOT
            price *= parseFloat(html_collection[i].value) ;
        }
        else{
            price -= parseFloat(html_collection[i].value) ;
        }
    }
    return price;
}

window.onload = () => {
  document.getElementById("submit").addEventListener('click', {
    handleEvent: function (event) {
      calculateGroomPrice();
    }
  });
}
