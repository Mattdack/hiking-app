async function getData(){
    const myUrl = new URL(window.location.href);
    const search =myUrl.search;
    // Await expressions make promise-returning functions behave as though they're 
    // synchronous by suspending execution until the returned promise 
    // is fulfilled or rejected. The resolved value of the promise is treated as the return
    //  value of the await expression. Use of async and await enables the use of ordinary try / catch blocks around asynchronous code.
    var response =await fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${search}&api_key=rezSm4lpwSFY7eCcu9JiJaOp8bxxfzOsYTzKa742`)
    // then we need to convert data into jason format
    var parksData = await response.json();
    console.log(myUrl)
    console.log(search)
    console.log(parksData.data);
    const html =parksData.data.map(park =>{
        return `<h2><a href="${park.url}">${park.fullName}</a></h2>
        <h4>${park.description}</h4><br>`
    }).join('');
    document.querySelector("#search_result").insertAdjacentElement("afterbegin",html);
    console.log(html);
    return parksData.data;
} 
console.log(getData())