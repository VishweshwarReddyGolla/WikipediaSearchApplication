let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function creteAndAdd(eachitem) {
    let {
        title,
        link,
        description
    } = eachitem;
    //1.container 
    let seachContainer = document.createElement("div");
    seachContainer.classList.add("result-item");
    searchResults.appendChild(seachContainer);
    //2.anchorTitle
    let anchorTitle = document.createElement("a");
    anchorTitle.textContent = title;
    anchorTitle.classList.add("result-title");
    anchorTitle.href = link;
    anchorTitle.target = "_blank";
    seachContainer.appendChild(anchorTitle);
    //3.titleBreak
    let tilteBreak = document.createElement("br");
    seachContainer.appendChild(tilteBreak);
    //4.ancorLink
    let linkElement = document.createElement("a");
    linkElement.textContent = link;
    linkElement.classList.add("result-url");
    linkElement.href = link;
    linkElement.target = "_blank";
    seachContainer.appendChild(linkElement);
    //5.linkBreak
    let tilteBreak1 = document.createElement("br");
    seachContainer.appendChild(tilteBreak1);
    //6.description
    let extra = document.createElement("p");
    extra.classList.add("link-description");
    extra.textContent = description;
    seachContainer.appendChild(extra);
}

function display(search_results) {
    for (let eachitem of search_results) {
        spinner.classList.toggle("d-none");
        creteAndAdd(eachitem);
    }
}

function toGetInfo(event) {

    let userInput = searchInput.value;
    if (event.key === "Enter") {
        spinner.classList.toggle("d-none");
        searchResults.textContent = "";
        let url = "https://apis.ccbp.in/wiki-search?search=" + userInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {

                let {
                    search_results
                } = jsonData;
                display(search_results);
            })


    }
}

searchInput.addEventListener("keydown", toGetInfo);