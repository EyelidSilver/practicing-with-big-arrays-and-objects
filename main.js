////////////////////////////////////////////////////////////////////////
// Subopdracht: landenlijst - 1 punt
////////////////////////////////////////////////////////////////////////


const regions = randomPersonData.map(person => person.region)
const uniqueSortedRegions = [...new Set(regions)].sort();




const addDataToDOM = (data) => {
    data.forEach(function (item) {
        const li = document.createElement("li");
        const text = document.createTextNode(item);
        li.appendChild(text);
        document.getElementById("dataHolder").appendChild(li);
        li.setAttribute('style', 'display: block;');
    })
}

const deleteAllFromDOM = () => {
    const dataHolder = document.getElementById("dataHolder");
    while (dataHolder.firstChild) {
        dataHolder.removeChild(dataHolder.lastChild);
    }
}


const TheListOfRegionsButton = document.querySelector("#regions")
TheListOfRegionsButton.addEventListener("click", function () {
    deleteAllFromDOM();
    addDataToDOM(uniqueSortedRegions);
});



////////////////////////////////////////////////////////////////////////
// Subopdracht: meeste mensen - 3 punten
////////////////////////////////////////////////////////////////////////

const countPeopleInRegions = regions.reduce((json, val) => ({
    ...json,
    [val]: (json[val] | 0) + 1
}), {});


const sortPeopleInRegions = [];
for (const people in countPeopleInRegions) {
    sortPeopleInRegions.push([people, countPeopleInRegions[people]]);
}

const sorted = sortPeopleInRegions.sort(function (a, b) {
    return b[1] - a[1];
})


const sortedListOfPeopleInRegions = [].concat(...sorted);


const getSortedListOfPeopleInRegions = Array.from({
    length: sortedListOfPeopleInRegions.length / 2
}, (_, i) => ([
    [sortedListOfPeopleInRegions[2 * i]], sortedListOfPeopleInRegions[2 * i + 1]
]).join(': '));



const WhereAreTheMostPeopleAreButton = document.getElementById("whereAreTheMostPeopleFrom")
WhereAreTheMostPeopleAreButton.addEventListener("click", function () {
    deleteAllFromDOM();
    addDataToDOM(getSortedListOfPeopleInRegions);
});



////////////////////////////////////////////////////////////////////////
// Subopdracht: steenbokvrouwen - 3 punten
////////////////////////////////////////////////////////////////////////



const filterWomenCapricorns = () => {

    const femalesOlderThan30 = randomPersonData.filter(person => person.gender === "female").filter(person => person.age > "30");

    const bornOn22AndMore = femalesOlderThan30.filter(person => person.birthday.dmy.substring(0, 2) >= "22");
    const bornOn19AndLess = femalesOlderThan30.filter(person => person.birthday.dmy.substring(0, 2) <= "19");
    const bornInDecember = femalesOlderThan30.filter(person => person.birthday.dmy.substring(3, 5) === "12");
    const bornInJanuary = femalesOlderThan30.filter(person => person.birthday.dmy.substring(3, 5) === "01");

    if ((bornOn22AndMore && bornInDecember) || (bornOn19AndLess && bornInJanuary)) {

        const capricorns = (bornOn22AndMore && bornInDecember).concat((bornOn19AndLess && bornInJanuary))
        return capricorns;
    } else {
        console.log("nope, went wrong")
    }
}



const sortedByName = filterWomenCapricorns().slice(0);
sortedByName.sort(function (a, b) {
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
});




const addPersonsToDom = () => {

    const photo = filterWomenCapricorns().map(person => person.photo);

    for (let i = 0; i < sortedByName.length; i++) {

        const li = document.createElement("li");
        const text = document.createTextNode(sortedByName[i].name + " " + sortedByName[i].surname);
        const img = document.createElement("img");
        img.src = photo[i];
        li.appendChild(img);
        li.appendChild(text);
        document.getElementById("dataHolder").appendChild(li);
        li.setAttribute('style', 'display: block;');
    }
}



const capricornWomenButton = document.getElementById("capricornWomen")
capricornWomenButton.addEventListener("click", function () {
    deleteAllFromDOM();
    addPersonsToDom();
});