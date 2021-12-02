window.onload = function () {
    displayInfo()
    sortToggle()
    searchBtnClickHandler();
}

function ascSort() {
    var cardParent = document.getElementsByClassName('grid')

    for (let i = 0; i < cardParent[0].children.length; i++) {

        for (let j = 0; j < cardParent[0].children.length - i - 1; j++) {

            if (cardParent[0].children[j].getElementsByClassName("card-name")[0].textContent > cardParent[0].children[j + 1].getElementsByClassName("card-name")[0].textContent) {

                cardParent[0].insertBefore(cardParent[0].children[j + 1], cardParent[0].children[j])
            }
        }
    }
}

function descSort() {
    var cardParent = document.getElementsByClassName('grid')

    for (let i = 0; i < cardParent[0].children.length; i++) {

        for (let j = 0; j < cardParent[0].children.length - i - 1; j++) {

            if (cardParent[0].children[j].getElementsByClassName("card-name")[0].textContent < cardParent[0].children[j + 1].getElementsByClassName("card-name")[0].textContent) {

                cardParent[0].insertBefore(cardParent[0].children[j + 1], cardParent[0].children[j])
            }
        }
    }
}

function capitalize(s) {
    return s.toLowerCase().replace(/\b./g, function (a) { return a.toUpperCase(); });
};

function search(event) {
    let input = document.getElementById("myInput")
    let filter = input.value.toUpperCase();

    var cards = document.getElementsByClassName('card')
    numCards = cards.length;

    navItem = document.getElementById('select-card-nav')
    navItem.innerHTML = "Select a card"
    navItem.style.color = "#969696"

    for (var i = 0; i < numCards; ++i) {
        document.getElementById(i).style.paddingBottom = "0px"
        var cards = document.getElementsByClassName('card')

        for (let i = 0; i < cards.length; i++) {
            let a = document.getElementById(i).getElementsByClassName("card-name")[0]
            let textValue = a.textContent

            if (textValue.toUpperCase().indexOf(filter) > -1) {
                document.getElementById(i).style.display = 'block'
            } else {
                document.getElementById(i).style.display = 'none';
            }
        }
    }
}

function searchBtnClickHandler() {
    var searchBtn = document.getElementById('search-image')

    document.onkeyup = capture

    searchBtn.onclick = search
}

function capture(e) {
    var evt = e || window.event;
    if (evt.keyCode == 13) {
        search(evt)
    }
}

function getUnique(arr) {
    let uniqueArr = [];
    for (let i of arr) {
        if (uniqueArr.indexOf(i) === -1) {
            uniqueArr.push(i);
        }
    }
    return uniqueArr
}

function createDropdownList() {
    let nameList = []
    let dropdownElement = document.getElementById('list')
    let cardParent = document.getElementsByClassName('grid')

    for (let i = 0; i < cardParent[0].children.length; i++) {
        let listItemName = cardParent[0].children[i].getElementsByClassName("homeworld")[0].textContent
        nameList.push(listItemName)
    }

    uniqueArr = getUnique(nameList)

    let divTag = document.createElement("div");

    for (let i = 0; i < uniqueArr.length; i++) {
        let tag = document.createElement("p");
        var textnode = document.createTextNode(uniqueArr[i]);
        tag.appendChild(textnode)
        divTag.appendChild(tag)
        divTag.setAttribute("id", "dropdown-list-names");
        dropdownElement.appendChild(divTag)

        tag.onclick = function (e) {

            let homeworldName = uniqueArr[i]
            var cards = document.getElementsByClassName('card')


            for (let j = 0; j < cards.length; j++) {
                document.getElementById(j).style.paddingBottom = "0px"
                var cardHomeworldName = document.getElementById(j).getElementsByClassName("homeworld")[0]

                if (homeworldName == cardHomeworldName.textContent) {
                    document.getElementById(j).style.display = 'block'
                    document.getElementById("select-option").innerHTML = homeworldName
                } else {
                    document.getElementById(j).style.display = 'none';
                }

                if (homeworldName != cardHomeworldName) {
                    document.getElementById(j).style.width = '100%'
                }
            }
            let dropdownList = document.getElementById("dropdown-list-names")
            dropdownList.style.display = "none"
            toggleDropdown(true)
        }
    }
    toggleDropdown(true)
}

function toggleDropdown(state) {
    let dropdownList = document.getElementById("dropdown-list-names")
    let dropdownBtn = document.getElementById("btn")
    let visible = state
    dropdownBtn.onclick = function (event) {

        if (visible) {
            dropdownList.style.display = "block"
        } else if (!visible) {
            dropdownList.style.display = "none"
        }
        visible = !visible
    }
}

function sortToggle() {
    ascBtn = document.getElementById("asc")
    descBtn = document.getElementById("desc")
    ascBtn.onclick = function (event) {
        ascBtn.style.backgroundColor = "#FFFFFF"
        descBtn.style.backgroundColor = "#B8B8B8"
        ascSort()
    }

    descBtn.onclick = function (event) {
        ascBtn.style.backgroundColor = "#B8B8B8"
        descBtn.style.backgroundColor = "#FFFFFF"
        descSort()
    }
}

function click(event) {
    var navItem = document.getElementById('select-card-nav')
    var cardName = document.getElementById(this.id).getElementsByClassName("card-name")[0]
    navItem.innerHTML = cardName.textContent + " Details"
    navItem.style.color = "#3B3B3B"

    var cards = document.getElementsByClassName('card')

    siblings = []

    for (let i = 0; i < cards.length; i++) {
        if (i == this.id) {
            document.getElementById(i).style.display = 'block'
            document.getElementById(i).style.paddingBottom = "134px"
        } else {
            siblings.push(i)
            document.getElementById(i).style.display = 'none';
        }

        if (i != this.id) {
            document.getElementById(i).style.width = '100%'
            document.getElementById(i).style.paddingBottom = "0px"
        }
    }
}

function cardClickHandler() {
    var cards = document.getElementsByClassName('card')
    numCards = cards.length;

    var navItem = document.getElementById('select-card-nav')
    var allCardsNavItem = document.getElementById('all-cards-nav')

    allCardsNavItem.onclick = function (event) {
        for (let i = 0; i < cards.length; i++) {
            document.getElementById(i).style.display = 'block'
            navItem.innerHTML = "Select a card"
            navItem.style.color = "#969696"
            document.getElementById(i).style.width = '100%'
            document.getElementById(i).style.paddingBottom = "0px"
        }
        document.getElementById("select-option").innerHTML = "Homeworld"
    }

    for (var i = 0; i < numCards; ++i) {
        cards[i].id = i;
        cards[i].onclick = click;
        cards[i].setAttribute("id", i);
    }
}

function displayInfo() {
    var starWarsPeopleList = document.querySelector('section');

    fetch('https://swapi.dev/api/people')
        .then(function (response) {
            return response.json();
        })
        .then(async function (json) {

            let peopleNameList = []
            let people = json.results;
            for (p of people) {
                peopleNameList.push(p.name)
                let gender = ""
                if (p.gender == "n/a") {
                    gender = `<img id="card-icon" style="margin-right: 8px" src="assets/Gender-Female.svg"/>`
                } else {
                    gender = `<img id="card-icon" style="margin-right: 8px" src="assets/Gender-` + p.gender.toUpperCase() + `.svg"/>`
                }

                let speciesURL = p.species
                species = await fetch(speciesURL)
                    .then(async (response) => {
                        const specie = await response.json();
                        return specie?.name || 'None';
                    }).catch(err => {
                        console.log("serr", err.toString());
                        return 'None';
                    });

                let homeworldURL = p.homeworld
                homeworld = await fetch(homeworldURL)
                    .then(async (response) => {
                        const home = await response.json();
                        return home?.name || 'None';
                    }).catch(err => {
                        console.log("serr", err.toString());
                        return 'None';
                    });

                const card = ` <div class="card">
    <div class="card-header">
        <img class="card-image" src="assets/Card-light.svg" alt="Card SVG" />
        <h3 class="card-name" id="blah">${p.name}</h3>
    </div>
    <div class="card-content">
        <div class="content-header">
            <div class="card-icon-group-header">
                ${gender}
                <p>19BBY</p>
            </div>
            <p>${species}</p>
        </div>
        <hr id="card-hr">
        <div class="card-content-row">
            <div class="card-icon-group">
                <img src="assets/Homeworld.svg" alt="SVG" />
                <p class="card-text">HOMEWORLD</p>
            </div>
            <p class="homeworld">${homeworld}</p>
        </div>
        <div class="card-content-row">
            <div class="card-icon-group">
                <img src="assets/Vehicle.svg" alt="SVG" />
                <p class="card-text">VEHICLES</p>
            </div>
            <p>${p.vehicles.length}</p>
        </div>
        <div class="card-content-row">
            <div class="card-icon-group">
                <img src="assets/Starship.svg" alt="SVG" />
                <p class="card-text">STARSHIP</p>
            </div>
            <p>${p.starships.length}</p>
        </div>
    </div>
    </div>`
                starWarsPeopleList.innerHTML += card;
            }
            cardClickHandler();
            createDropdownList();
        });
}

