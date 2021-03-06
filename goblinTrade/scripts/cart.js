let cartArray = [];//массив корзины глобально
let cartCounter;//счётчик корзины глобальноs

function moveBar() {
	document.getElementById("menuCart").classList.toggle("menuCartActive");
	document.body.classList.toggle("bodyCartStopScroll");
	returnAdvancedSearch();
}
function returnBar() {
	document.getElementById("menuCart").classList.remove("menuCartActive");
	document.body.classList.remove("bodyCartStopScroll");
}
document.getElementById("headerCartBtn").addEventListener("click", moveBar);

document.body.addEventListener("click", closeCart);
function closeCart(e) {
	if (e.target.id != "headerCartBtn" &&
		e.target.id != "cartBG" &&
		e.target.id != "cartItemsQuantity" &&
		e.target.id != "cartPriceTotal" &&
		e.target.classList[0] != "cartWrapper" &&
		e.target.classList[0] != "icon-cart-right" &&
		e.target.classList[0] != "textSearch" &&
		e.target.classList[0] != "icon-search" &&
		e.target.classList[0] != "menuCart" &&
		e.target.classList[0] != "cartWrapperContent" &&
		e.target.classList[0] != "cartFooter" &&
		e.target.classList[0] != "cartTotal" &&
		e.target.classList[0] != "total" &&
		e.target.classList[0] != "cartPriceTotal" &&
		e.target.classList[0] != "cartMailWrapper" &&
		e.target.classList[0] != "cartEmailLink" &&
		e.target.classList[0] != "cartMail" &&
		e.target.classList[0] != "cartMailTextWrapper" &&
		e.target.classList[0] != "textCartMail" &&
		e.target.classList[0] != "cartOrder" &&
		e.target.classList[0] != "orderText" &&
		e.target.classList[0] != "cartFrame" &&
		e.target.classList[0] != "cartRemoveFrame" &&
		e.target.classList[0] != "icon-cross" &&
		e.target.classList[0] != "cartFrameBG" &&
		e.target.classList[0] != "cartImgFrame" &&
		e.target.classList[0] != "cartImg" &&
		e.target.classList[0] != "cartFrameInfo" &&
		e.target.classList[0] != "cartFrameInfoText" &&
		e.target.classList[0] != "cartFrameInfoTextName" &&
		e.target.classList[0] != "cartFrameInfoTextConditions" &&
		e.target.classList[0] != "cartFrameInfoMain" &&
		e.target.classList[0] != "cartMainPrice" &&
		e.target.classList[0] != "cartMainQuantity" &&
		e.target.classList[0] != "cartMainManagWrapper" &&
		e.target.classList[0] != "cartMainPlus" &&
		e.target.classList[0] != "cartMainFrameQuantity" &&
		e.target.classList[0] != "cartMainMinus" &&
		e.target.classList[0] != "cartMainTotal" &&
		e.target.classList[0] != "fas" &&
		e.target.classList[0] != "cartTotalPrice" &&
		e.target.classList[0] != "toCheck" &&
		document.getElementById("ordedWrapper").contains(e.target) == false
	) {
		returnBar()
	}
}

// LocalStorage
// ----------------------------------------------------------
function loadToStorage() {
	localStorage.clear();
	for (let i = 0; i < cartArray.length; i++) {
		localStorage.setItem(`${i}`, `${cartArray[i].join('...')}`);
	}
}

function readFromStorage() {
	for (let i = 0; i < localStorage.length; i++) {
		strToArr = localStorage.getItem(`${i}`).split('...');
		strToArr[1] = +strToArr[1];
		strToArr[9] = +strToArr[9];
		strToArr[10] = +strToArr[10];
		strToArr[12] = +strToArr[12];
		strToArr[13] = +strToArr[13];
		strToArr[14] = +strToArr[14];
		cartArray[i] = strToArr;
	}
	drawCart();
	totalMoney();
	countHeaderCart();
}

window.onload = function () {
	readFromStorage();
}
// -----------------------------------------------------------

let summPositions = 0;
function countHeaderCart() {
	for (let i = 0; i < cartArray.length; i++) {
		summPositions += cartArray[i][13]
	}
	document.getElementById("headerCartMarketContent").innerHTML = summPositions;
	document.getElementById("cartItemsQuantity").innerHTML = summPositions;
	summPositions = 0;
}

function totalMoney() {
	let money = 0;
	for (let i = 0; i < cartArray.length; i++) {
		money += cartArray[i][13] * cartArray[i][1]
	}
	document.getElementById("cartPriceTotal").innerHTML = money;
	money = 0;
}

// принимает троку в cart и ID из основного массива
function totalFrameMoney(cartRow, ID) {
	cartArray[cartRow][14] = cartArray[cartRow][13] * cartArray[cartRow][1]//изменили сумму по позиции
	document.getElementById(`${ID}summ`).innerHTML = cartArray[cartRow][14];//переписали сумму по позиции из массива
	loadToStorage();
}



// addID - основной ID из массива типа 0 (mainArr) (и это номер строки в exel)
// на выходе исходный массив корзины
function addToCart(addID) {
	addClearID = parseInt(`${addID}`.replace(/\D+/g, ""));
	foundRow = checkArrayCoinside(addID);//получили номер строки в массиве Cart (проверили есть ли такой в cart)
	if (foundRow == "free") {
		currentArrRow = getGlobalCurrentArrayRow(addClearID);//получили номер строки в большом массиве
		cartArray.push(globalCurrentArray[currentArrRow]);//добавили в cart новый элемент
		document.getElementById(`${addID}cart`).innerHTML = `1`; //это корзина в большом массиве
	}
	else {
		cartArray[foundRow][13]++;//увеличиваем кол-во, если такой элемент был в малом массиве. Новый не рисуем.
		document.getElementById(`${addID}cart`).innerHTML = `${cartArray[foundRow][13]}`;
		totalFrameMoney(foundRow, addClearID);
	}
	countHeaderCart();
	totalMoney();
	drawCart();
}

function getGlobalCurrentArrayRow(idToCheck) {
	for (let i = 0; i < globalCurrentArray.length; i++) {
		if (globalCurrentArray[i][12] == idToCheck) {
			return i;
		}
	}
}

// на входе ID из большого массива. На выходе строка в малом. Если нет, то "free"
function checkArrayCoinside(idToCheck) {
	for (let i = 0; i < cartArray.length; i++) {
		if (cartArray[i][12] == idToCheck) {
			return i;
		}
	}
	return "free";
}

function drawCart() {
	cartCounter = 0;//обнуляем счётчик корзины
	drawCartArray(cartArray);
}

let cartString = '';//строка вывода в HTML глобально
let cartWrapper = document.getElementById("cartWrapperContent");//обёртка перечня карт

function drawCartArray(cartArrayToDraw) {
	cartWrapper.innerHTML = '';//очистка содержимого корзины

	for (cartCounter; cartCounter < cartArrayToDraw.length; cartCounter++) {
		if (cartArrayToDraw[cartCounter] == 0) {
			continue;
		}
		cartString += `<div class="cartFrame grid">`
		cartString += `<i class="icon-cross cartRemoveFrame" id="${cartArrayToDraw[cartCounter][12]}x" onclick="removeFromCart(event.target.id)"></i>`
		cartString += `<div class="cartFrameBG"></div>`
		cartString += `<div class="cartImgFrame">`
		cartString += `<div class="cartImg" style="background-image: url(${cartArrayToDraw[cartCounter][11]});"></div>`
		cartString += `</div>`
		cartString += `<div class="cartFrameInfo grid ">`
		cartString += `<div class="cartFrameInfoText grid ">`
		cartString += `<div class="cartFrameInfoTextName">`
		cartString += `<h4 class="toCheck">${cartArrayToDraw[cartCounter][0]}</h4>`
		cartString += `</div>`
		cartString += `<div class="cartFrameInfoTextConditions ">`
		cartString += `<h4 class="toCheck">${cartArrayToDraw[cartCounter][7]}</h4>`
		cartString += `<h4 class="toCheck">${cartArrayToDraw[cartCounter][2]}</h4>`
		cartString += `<h4 class="toCheck">${cartArrayToDraw[cartCounter][4]}</h4>`
		cartString += `<h4 class="toCheck">${cartArrayToDraw[cartCounter][5]}</h4>`
		cartString += `<h4 class="toCheck">${cartArrayToDraw[cartCounter][6]}</h4>`
		cartString += `<h4 class="toCheck">${cartArrayToDraw[cartCounter][3]}</h4>`
		cartString += `</div>`
		cartString += `</div>`
		cartString += `<div class="cartFrameInfoMain grid">`
		cartString += `<div class="cartMainPrice ">`
		cartString += `<h4 class="toCheck">Price: <span id="cartPrice" class="toCheck">${cartArrayToDraw[cartCounter][1]}</span>р</h4>`
		cartString += `</div>`
		cartString += `<div class="cartMainQuantity ">`
		cartString += `<div class="cartMainManagWrapper">`
		cartString += `<i class="fas fa-plus cartMainPlus" id="${cartArrayToDraw[cartCounter][12]}+" onclick="plusToCart(event.target.id)"></i>`
		cartString += `<h4 class="cartMainFrameQuantity" id="${cartArrayToDraw[cartCounter][12]}quantity">${cartArrayToDraw[cartCounter][13]}</h4>`
		cartString += `<i class="fas fa-minus cartMainMinus" id="${cartArrayToDraw[cartCounter][12]}-" onclick="minusToCart(event.target.id)"></i>`
		cartString += `</div>`
		cartString += `</div>`
		cartString += `<div class="cartMainTotal ">`
		cartString += `<h4 class="toCheck">Total: <span id="${cartArrayToDraw[cartCounter][12]}summ" class="cartTotalPrice">${cartArrayToDraw[cartCounter][14]}</span></h4>`
		cartString += `</div>`
		cartString += `</div>`
		cartString += `</div>`
		cartString += `</div>`

		cartWrapper.insertAdjacentHTML('beforeend', cartString);//рисуем 1 фрейм
		cartString = '';//чистим строку
	}
	cartCounter = 0;
	loadToStorage();
};

//на входе ID из большого массива
function plusToCart(plusID) {
	clickedPlusID = parseInt(`${plusID}`.replace(/\D+/g, ""));
	currentArrRowToPlus = getGlobalCurrentArrayRow(clickedPlusID);//получили номер строки в большом массиве
	getCartArrayRow = checkArrayCoinside(clickedPlusID); //получили номер строки в массиве Cart

	if (cartArray[getCartArrayRow][13] >= globalCurrentArray[currentArrRowToPlus][9]) {
	} else {
		cartArray[getCartArrayRow][13]++;
	}
	//меняем большую карзину (там реальный ID из большого массива)
	if (cardsCounter >= currentArrRowToPlus) {
		document.getElementById(`${clickedPlusID}cart`).innerHTML = `${cartArray[getCartArrayRow][13]}`;
	}
	//меняем кол-во в корзине
	document.getElementById(`${clickedPlusID}quantity`).innerHTML = `${cartArray[getCartArrayRow][13]}`;
	totalMoney();
	countHeaderCart();
	totalFrameMoney(getCartArrayRow, clickedPlusID);

}

//на входе ID из большого массива
function minusToCart(minusID) {
	clickedMinusID = parseInt(`${minusID}`.replace(/\D+/g, ""));//получили ID в большом массиве
	getCartArrayRow = checkArrayCoinside(clickedMinusID); //получили номер строки в массиве Cart
	currentArrRowToMinus = getGlobalCurrentArrayRow(clickedMinusID);//получили номер строки в большом массиве


	cartArray[getCartArrayRow][13]--;


	if (cartArray[getCartArrayRow][13] <= 0) {
		removeFromCart(clickedMinusID); //передали чистый реальный ID из большого массива
	}
	else {
		//меняем большую карзину (там реальный ID из большого массива)
		if (cardsCounter >= currentArrRowToMinus) {
			document.getElementById(`${clickedMinusID}cart`).innerHTML = `${cartArray[getCartArrayRow][13]}`;
		}
		//меняем кол-во в корзине
		document.getElementById(`${clickedMinusID}quantity`).innerHTML = `${cartArray[getCartArrayRow][13]}`;
		totalFrameMoney(getCartArrayRow, clickedMinusID);
	}
	totalMoney();
	countHeaderCart();
	loadToStorage();
}

//на входе реальный ID в чистом виде
function removeFromCart(removedID) {
	xID = parseInt(`${removedID}`.replace(/\D+/g, ""));
	removeFromCartArray(xID);
}

//на входе реальный ID в чистом виде
function removeFromCartArray(rowToRemove) {
	getCartRow = checkArrayCoinside(rowToRemove); //получили номер строки в массиве Cart
	currentArrRowToRemove = getGlobalCurrentArrayRow(rowToRemove);//получили номер строки в большом массиве

	cartArray[getCartRow][13] = 1;
	cartArray.splice(getCartRow, 1);
	countHeaderCart();
	totalMoney();
	drawCart();
	if (cardsCounter >= currentArrRowToRemove) {
		document.getElementById(`${rowToRemove}cart`).innerHTML = `0`;
	}
	loadToStorage();
}



document.getElementById("orderText").addEventListener("click", sendOrder);
document.getElementById("textCartMail").addEventListener("input", changeEmailColor);

function changeEmailColor(){
	document.getElementById("textCartMail").style.color = "#32231a";
}

function sendOrder(){

	let clientMailAdress = document.getElementById("textCartMail").value
	let clientMailFlag = checkClientMailCorrect(clientMailAdress);

	// if everything OK - send to server
	if(clientMailFlag && cartArray.length != 0){
		sendOrderToServer(cartArray ,clientMailAdress);
		document.getElementById("textCartMail").style.color = "#32231a";
		showOrdered();
	} 

	// if Email wrong
	if (!clientMailFlag){
		document.getElementById("textCartMail").style.color = "#ff5b38";
	} else if (clientMailFlag) {
		document.getElementById("textCartMail").style.color = "#32231a";
	}

		// if cart = 0
		if (cartArray.length == 0){
			if (cartWrapper.innerHTML == ''){
				let cartAbsent = '';
				cartAbsent += `<h4 class="cartAbsent" id="cartAbsent"> Add something to order </h4>`
				cartWrapper.insertAdjacentHTML('beforeend', cartAbsent);//рисуем 1 фрейм
				cartAbsent = '';
			}
		}
}


function showOrdered(){
	removeAllClicksOnLoad();
	document.getElementById("ordedWrapper").classList.toggle("ordedWrapperActive");
	document.getElementById("orderingLoading").innerHTML = ``;
	document.getElementById("orderingConnettingText").innerHTML = ``;
	document.getElementById("ordedOKbutton").innerHTML = ``;
	let loadingCounter = 0;
	let loadingInterval = setInterval (function(){
		loadingCounter = loadingCounter + Math.floor(Math.random() * Math.floor(20));
		if (loadingCounter <= 100){
			document.getElementById("orderingLoading").innerHTML = `Loading your order: ${loadingCounter}%`;
		} else if(loadingCounter > 100){
			loadingCounter = 0;
			window.clearInterval(loadingInterval);
			document.getElementById("orderingLoading").innerHTML = `Thanks for your ordering!`;
			document.getElementById("orderingConnettingText").innerHTML = `We will connect you soon`;
			document.getElementById("ordedOKbutton").innerHTML = `OK`;
			returnAllClicksOnLoad();
			clearCart();
		}
	},300)
}

function clearCart(){
	cartArray = [];
	cartWrapper.innerHTML = '';
	loadToStorage();
	countHeaderCart();
	// document.querySelectorAll(".cartMarketFrameValue")
	// class="cartMarketFrameValue"
	for (let i =0; i < document.querySelectorAll("h4.cartMarketFrameValue").length; i++){
		document.querySelectorAll("h4.cartMarketFrameValue")[i].innerHTML = 0;
		totalMoney();
	}
}




document.getElementById("ordedOKbutton").addEventListener("click", hideOrdered);

function hideOrdered(){
	document.getElementById("ordedWrapper").classList.remove("ordedWrapperActive");
}

document.body.addEventListener("click", hideOrderedOnMissClick);

function hideOrderedOnMissClick(e) {
if (document.getElementById("ordedWrapper").contains(e.target) == false &&
e.target.id != "orderText"
){
	hideOrdered()
}
}

function removeAllClicksOnLoad(){
	document.getElementById("blockContentOnLoad").classList.add("contentBlockedOnLoad");
	document.body.removeEventListener("click", closeCart);
	document.body.removeEventListener('click', hideOrderedOnMissClick);
	document.body.removeEventListener("click", closeInfoOnMissClick);
	document.body.removeEventListener("click", closeMail);
	document.body.removeEventListener("click", closeSortingMenuOnClick);
	document.body.removeEventListener("click", hideHelp);
}


function returnAllClicksOnLoad(){
		document.body.addEventListener("click", closeCart);
		document.body.addEventListener('click', hideOrderedOnMissClick);
		document.body.addEventListener("click", closeInfoOnMissClick);
		document.body.addEventListener("click", closeMail);
		document.body.addEventListener("click", closeSortingMenuOnClick);
		document.body.addEventListener("click", hideHelp);
		document.getElementById("blockContentOnLoad").classList.remove("contentBlockedOnLoad");
}


// -------------------

function sendOrderToServer(clientOrder, clientMailAdress){
	console.log(clientOrder);
	console.log(clientMailAdress);
}

