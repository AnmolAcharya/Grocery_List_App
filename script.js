import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://groceryapp-da114-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");
const householdListInDB = ref(database, "shoppingList2");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");

const inputFieldEl2 = document.getElementById("input-field2");
const addButtonEl2 = document.getElementById("add-button2");

const shoppingListEl = document.getElementById("shopping-list");
const shoppingListEl2 = document.getElementById("shopping-list2");

const pContainerNameEl = document.getElementById("p_container_name");
const pContainer2NameEl = document.getElementById("p_container2_name");

function displaySection(pContainerEl, sectionName) {
    pContainerEl.innerHTML = `<p>${sectionName}</p>`;
}

displaySection(pContainerNameEl, "Groceries Section");
displaySection(pContainer2NameEl, "Household Section");

// Groceries section
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;
    
    if (inputValue.trim() !== "") {
        push(shoppingListInDB, inputValue);
        clearInputFieldEl(inputFieldEl);
    }
});

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());
    
        clearShoppingListEl(shoppingListEl);
        
        itemsArray.forEach(item => {
            appendItemToShoppingListEl(item, shoppingListEl, "shoppingList");
        });
    } else {
        shoppingListEl.innerHTML = "No Items____Enter the Items ";
    }
});

function clearShoppingListEl(listEl) {
    listEl.innerHTML = "";
}

function clearInputFieldEl(inputFieldEl) {
    inputFieldEl.value = "";
}

function appendItemToShoppingListEl(item, listEl, dbRefName) {
    let itemID = item[0];
    let itemValue = item[1];
    
    let newEl = document.createElement("li");
    
    newEl.textContent = itemValue;
    
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `${dbRefName}/${itemID}`);
        
        remove(exactLocationOfItemInDB);
    });
    
    listEl.append(newEl);
}

// Household section
addButtonEl2.addEventListener("click", function() {
    let inputValue = inputFieldEl2.value;
    
    if (inputValue.trim() !== "") {
        push(householdListInDB, inputValue);
        clearInputFieldEl(inputFieldEl2);
    }
});

onValue(householdListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());
    
        clearShoppingListEl(shoppingListEl2);
        
        itemsArray.forEach(item => {
            appendItemToShoppingListEl(item, shoppingListEl2, "shoppingList2");
        });
    } else {
        shoppingListEl2.innerHTML = "No Items____Enter the Items ";
    }
});















// //////////////////////////////////////
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// const appSettings = {
//     databaseURL: "https://groceryapp-da114-default-rtdb.firebaseio.com/"
//     // databaseURL: "https://realtime-database-df319-default-rtdb.europe-west1.firebasedatabase.app/"
// }

// const app = initializeApp(appSettings)
// const database = getDatabase(app)
// const shoppingListInDB = ref(database, "shoppingList")
// const householdListInDB = ref(database, "shoppingList2")

// const inputFieldEl = document.getElementById("input-field")
// const addButtonEl = document.getElementById("add-button")

// const inputFieldEl2 = document.getElementById("input-field2")
// const addButtonEl2 = document.getElementById("add-button2")

// const shoppingListEl = document.getElementById("shopping-list")
// const shoppingListEl2 = document.getElementById("shopping-list2")
// const pContainerNameEl = document.getElementById("p_container_name")
// const pContainer2NameEl = document.getElementById("p_container2_name")


// // function displaySection(){

// //     let infoContainer = "Groceries Section"
// //     pContainerNameEl.innerHTML = `<p>${infoContainer}</p>`

// // }
// // displaySection()

// // function display2Section(){

// //     let infoContainer2 = "HouseHold Section"
// //     pContainer2NameEl.innerHTML = `<p>${infoContainer2}</p>`

// // }
// // display2Section() << this code here can be refactored into the on below:

// function displaySection(pContainerEl, sectionName) {
//     pContainerEl.innerHTML = `<p>${sectionName}</p>`;
// }

// displaySection(pContainerNameEl, "Groceries Section");
// displaySection(pContainer2NameEl, "Household Section");


// addButtonEl.addEventListener("click", function() {
//     let inputValue = inputFieldEl.value
    
//     push(shoppingListInDB, inputValue)
  
//     clearInputFieldEl()
// })

// onValue(shoppingListInDB, function(snapshot) {
//     if (snapshot.exists()) {
//         let itemsArray = Object.entries(snapshot.val())
    
//         clearShoppingListEl()
        
//         for (let i = 0; i < itemsArray.length; i++) {
//             let currentItem = itemsArray[i]
//             let currentItemID = currentItem[0]
//             let currentItemValue = currentItem[1]
            
//             appendItemToShoppingListEl(currentItem)
//             appendItemToShoppingListEl(currentItem)
//         }    
//     } else {
//         shoppingListEl.innerHTML = "No items here... yet"
//     }
// })

// function clearShoppingListEl() {
//     shoppingListEl.innerHTML = ""
// }

// function clearInputFieldEl() {
//     inputFieldEl.value = ""
// }

// function appendItemToShoppingListEl(item) {
//     let itemID = item[0]
//     let itemValue = item[1]
    
//     let newEl = document.createElement("li")
    
//     newEl.textContent = itemValue
    
//     newEl.addEventListener("click", function() {
//         let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
//         remove(exactLocationOfItemInDB)
//     })
    
//     shoppingListEl.append(newEl)
// }

// //the below one is completely for the household section-> brute force method:


// addButtonEl2.addEventListener("click", function() {
//     let inputValue = inputFieldEl2.value
    
//     push(householdListInDB, inputValue)

//     clearInputFieldEl()
// })

// onValue(householdListInDB, function(snapshot) {
//     if (snapshot.exists()) {
//         let itemsArray = Object.entries(snapshot.val())
    
//         clearShoppingListEl()
        
//         for (let i = 0; i < itemsArray.length; i++) {
//             let currentItem = itemsArray[i]
//             let currentItemID = currentItem[0]
//             let currentItemValue = currentItem[1]
            
//             appendItemToShoppingListEl2(currentItem)
//         }    
//     } else {
//         shoppingListEl.innerHTML = "No items here... yet"
//     }
// })

// function clearShoppingListEl() {
//     shoppingListEl.innerHTML = ""
// }

// function clearInputFieldEl() {
//     inputFieldEl.value = ""
// }

// function appendItemToShoppingListEl2(item) {
//     let itemID = item[0]
//     let itemValue = item[1]
    
//     let newEl = document.createElement("li")
    
//     newEl.textContent = itemValue
    
//     newEl.addEventListener("click", function() {
//         let exactLocationOfItemInDB = ref(database, `shoppingList2/${itemID}`)
        
//         remove(exactLocationOfItemInDB)
//     })
    
//     shoppingListEl.append(newEl)
// }