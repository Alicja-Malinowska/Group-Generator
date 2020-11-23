const STUDENTS = ["Alicja", "Andrew", "Sally", "Cian", "Deb", "Dess", "Dylan", "Gavin", "Shauna", "Katya"]

function createInput(defaultInput) {
    let nameInput = document.createElement("INPUT");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("class", "names mr-3 mb-3");
    if (defaultInput !== undefined) {
        nameInput.setAttribute("value", defaultInput);
    }
    document.getElementById("nameInputs").appendChild(nameInput);
}

function removeInput() {
    let namesDiv = document.getElementById("nameInputs");
    namesDiv.removeChild(namesDiv.lastChild);
}

function insertDeafultNames(names) {
    names.sort().forEach(createInput);
}


insertDeafultNames(STUDENTS);

function generateGroups() {
    let result = document.getElementById("results")
    let people = document.getElementsByClassName("names");
    let namesArray = [...people].map(person => person.value.trim()).filter(value => value !== "");
    let option = document.getElementById("options").value;
    let quantity = Number(document.getElementById("quantity").value);

    result.innerHTML = "";

    if (!(Number.isInteger(quantity))) {
        alert("The quantity must be an integer")
        return;
    }

    if (!quantity) {
        alert("The quantity field cannot be empty or zero!")
        return;
    }

    if (quantity < 0) {
        alert("The quantity cannot be a negative number!")
        return;
    }

    if (quantity > namesArray.length) {
        alert("The quantity cannot be bigger than the number of people!")
        return;
    }

    if ((option === "groups" && quantity > Math.floor(namesArray.length / 2)) || (option === "people" && quantity === 1)) {
        alert("That would be quite lonely groups, don't you think?");
        return;

    }
    let shuffled = randoSequence(namesArray);

    let rooms = [];
    let groups = quantity;
    let peopeInGroup = Math.floor(shuffled.length / quantity);
    if (option === "people") {
        groups = Math.floor(shuffled.length / quantity)
        peopeInGroup = quantity

    }

    for (i = 0; i < groups; i++) {
        rooms.push(shuffled.slice(i * peopeInGroup, i * peopeInGroup + peopeInGroup))
    }

    let message = ""
    // if number of people is not evenly divisible by groups or number of people
    if ((option === "groups" && shuffled.length % groups !== 0) || (option === "people" && shuffled.length % peopeInGroup !== 0)) {
        let remainder = shuffled.slice(groups * peopeInGroup)
        let j = 0;
        
        for (i = 0; i < remainder.length; i++) {
            // if user chose people number and if there is only one remaining after dividing evenly, add them to the first group
            // otherwise create a new group out of remaining people 
            if (option === "people") {
                if (remainder.length === 1) {
                    rooms[0].push(remainder[0])
                    message = "We added one lonely person to one of the groups."
                    break;
                }
                rooms.push(remainder)
                message = "There is a group that is a bit smaller than the rest."
                break;
            }
            // if 'group' was chosen add people from the remainder to the created groups, one by one
            if (j >= rooms.length) {
                j = 0;
            }
            rooms[j].push(remainder[i])
            message = "Some groups are a bit bigger so that everyone belongs to a group!"
            j++;

        }
    }

    let messagePar = document.createElement("p");
    messagePar.setAttribute("class", "font-italic mb-5 text-danger");
    messagePar.innerText = message;
    result.appendChild(messagePar);
    rooms.forEach(
        function(room, i) {
            let roomString = ""
            room.forEach(obj => roomString += obj.value + ", ");
            let roomPar = document.createElement("h4");
            roomPar.setAttribute("class", "font-weight-bold mb-4")
            let text = document.createTextNode("Room" + (i+1) + ": " + roomString.slice(0,-2));
            roomPar.appendChild(text);
            result.appendChild(roomPar);

        }
    )

}