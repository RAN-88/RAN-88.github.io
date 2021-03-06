// на входе 2 массива из json (полный массив и массив промо)

let globalCardCollection = []; //вся коллекция карт - глобально
let globalPromoCardCollection = []; //вся коллекция скидок - глобально
let globalCurrentArray = [];//текущий массив для рисования - глобально
let globalSearchArray = [];//текущий массив для текстового поиска - глобально
let globalAdvancedSearchArray = []; //текущий шаблонный массив для advanced search
// let globalAdvancedSearchMask = [];
let globalAdvancedSearchCMC = [];//0
let globalAdvancedSearchColor = [];//1
let globalAdvancedSearchCondition = [];//2
let globalAdvancedSearchSet = [];//3
let globalAdvancedSearchType = [];//4
let globalAdvancedSearchRarity= [];//5

function makeGlobalArrays(arrays) {
	globalCardCollection = arrays[0].slice();
	globalCurrentArray = arrays[0].slice();
	globalPromoCardCollection = arrays[1].slice();
	for (let i = 0; i < arrays[0].length; i++) {
		let searchObject = [];
		searchObject.push(arrays[0].slice()[i][0]); //название
		searchObject.push(arrays[0].slice()[i][12]); //ID
		searchObject.push(0);//счетчик совпадений
		globalSearchArray.push(searchObject);
		globalSearchArray[i][0] = globalSearchArray[i][0].toLowerCase().replace(/[\,\/\+\-\:\;\\\|\_\*\$\!\&\(\)\?\=\>\<\"\`\%\']/g, "");
	}
}
