var fortuneCookies = [
   "Сегодня произойдет с тобой что-то замечательное",
   "Все будет хорошо",
   "Не бойся того, чего не знаешь",
   "У тебя все получится",
   "Упрощай все, насколько можешь"
];

exports.getFortune = function (){
    var idx = Math.floor(Math.random() * fortuneCookies.length);
    return fortuneCookies[idx];
};
