// Begin of modification by Shreya M for adding Modal in local summary ///////

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";

    // 
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


//  fetching values //

    

       if(localStorage.getItem("formData")){
            var contents = JSON.parse(window.localStorage.getItem('formData'));
       
            // console.log(contents.citySate);
            // console.log(contents.nPark);
            // console.log(contents.rating);
            // console.log(contents.discription);

            let myTableDiv = document.getElementById("myDynamicTable");
            // let getPrincipalContainer = document.getElementById("search-results");
                let createStorage = document.createElement("div")
                createStorage.className = 'product-card1';
                myTableDiv.append(createStorage)

            // let createCard = document.createElement("div")
            let createName = document.createElement("a")
            createName.className = "card-title1"
            // createName.innerText = "State:"+contents.citySate+ " Visited:"+contents.nPark + " ratings given:"+contents.rating+" Discription:"+contents.discription
            createName.innerText =`City: ${contents.citySate}, Visited:${contents.nPark}
            ratings given:${contents.rating}
             Discription:${contents.discription}`
            createStorage.appendChild(createName)
       
       }


var myForm = document.querySelector("form#myForm");

  myForm.onsubmit = function(){
    const data = {};
    const dataToFetch = this.querySelectorAll("input, textarea, button, select");

    for(let element of dataToFetch){
  
      if( element && element.tagName && element.name )
        data[element.name] = element.value;

    }
    
    let jsonData = JSON.stringify(data);
    
    localStorage.setItem("formData", jsonData);
    // Just to test later will remove the below line.
    // alert("Data stored to localStorage itemName:'formData'");
    
    return false;
  }
//   End of modification by Shreya M for adding Modal in local summary ///////
// /////////////////////////////////////////////////////////////////////////////////////////////////
// var timeDisplay = $('#currentDay');
// var $timeBlockEL=$(`#myForm`);
// var taskArry = [];
// // var $taskblock = $(".taskBlock");
// //  to insert contents for each block element
// function insertTasks(){

//     $timeBlockEL.each(function(){
//         var $thiscurrBlock =$(this);
        
//         const data = {};
//         const dataToFetch = this.querySelectorAll("input, textarea, button, select");
    
//         for(let element of dataToFetch){
      
//           if( element && element.tagName && element.name )
//             data[element.name] = element.value;
    
//         }
//         console.log("Curr block=="+data)
//         taskArry.push(data)
//         console.log(taskArry)
//     })
    
    
//     localStorage.setItem("task", JSON.stringify(taskArry))
//      console.log(taskArry)
    
//     }
//     insertTasks()

//     function renderTasks(){
//         taskArry=localStorage.getItem("task")
//         taskArry=JSON.parse(taskArry)
//         for( var i=0; i< taskArry.length; i++){
//             // var itemHour = taskArry[i].citySate;
//             // var itemText= taskArry[i].nPark;
//             // $("[data-hour=" + itemHour +"]").children("textarea").val(itemText)
//             // // 
//             let myTableDiv = document.getElementById("myDynamicTable");
//             // let getPrincipalContainer = document.getElementById("search-results");
//                 let createStorage = document.createElement("div")
//                 createStorage.className = 'product-card1';
//                 myTableDiv.append(createStorage)
    
//             // let createCard = document.createElement("div")
//             let createName = document.createElement("a")
//             createName.className = "card-title1"
//             // createName.innerText = "State:"+contents.citySate+ " Visited:"+contents.nPark + " ratings given:"+contents.rating+" Discription:"+contents.discription
//             createName.innerText =`City: ${taskArry[i].citySate}, Visited:${taskArry[i].nPark}
//             ratings given:${taskArry[i].rating}
//              Discription:${taskArry[i].discription}`
//             createStorage.appendChild(createName)
//         }
//         console.log(taskArry)

//     // 
//    }


    
//     // saving it in local storage
//     function saveArray(){
//        localStorage.setItem("task", JSON.stringify(taskArry))
//        renderTasks()
//     }
//     //  Main Function
//     $(document).ready(function(){
       
        
//         if(!localStorage.getItem("task")){
//             insertTasks()
//         }
        
       
//         renderTasks()
        
//     myForm.onsubmit("click","button",saveArray)
    
//     })