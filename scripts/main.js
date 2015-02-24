//Main Script for HW //

//Currency Variables//
var souls = 0;
var gold = 0;
var faith = 0;
var iron = 0;

//Statistic Variables//
var goldpersec = 0;
var faithpersec = 0;
var soulspersec = 0;
var ironpersec = 0;
var totalTimePlayed = 0;
var tTPinHHMMSS = 0;

//Unit Variables//
var tavernpeasants = 0;			//Tavern generated peasants
var tavernminers = 0;			//Tavern generated miners
var weapons = 0;

//Status Variables//
var pGoldClickUpgrade = false;	//Peasant - Gold clicking upgrade 
var mPanningUpgrade = false;	//Miner - Gold Panning upgrade
var tavernUpgrade = false;
var squiresUnlocked = false;	
var knightsUnlocked = false;
var minesOpened = false;
var cathedralOpened = false;
var barracksOpened = false;

//Etc Variables//
var lastPage;

function clickThing(number, type)
{
	switch(type){
		case "gold":
			gold = gold + number;
			document.getElementById("gold").innerHTML = gold;			
			break;
			
		case "goldMouse":
			if(pGoldClickUpgrade == true){
					number = number * 2;
			}
			gold = gold + number;
			document.getElementById("gold").innerHTML = gold;
			break;
			
		case "iron":
			iron = iron + number;
			document.getElementById("iron").innerHTML = iron;
			break;
			
		case "faith":
			faith = faith + number;
			faith = faith.toFixedDown(2);
			document.getElementById("faith").innerHTML = faith;		
			break;
		
		case "peasant":
			Peasant.number = Peasant.number + number;
			document.getElementById("peasants").innerHTML = Peasant.number;		
			break;

		case "miner":
			Miner.number = Miner.number + number;
			document.getElementById("miners").innerHTML = Miner.number + tavernminers;		
			break;			
		
		case "soul":
			souls = souls + number;
			document.getElementById("souls").innerHTML = souls;		
			break;
		
		default:
	}
}

function debugCurrency(){
	gold = gold + 100000;
	faith = faith + 1000;
	souls = souls + 200;
	iron = iron + 5000;
};

//UPGRADES
function upgradeClickGoldMultiplier(){
	if(gold >= 1500){
		gold = gold - 1500;
		pGoldClickUpgrade = true;	
		document.getElementById('gold').innerHTML = gold;
		document.getElementById("clickGoldUpgrade").disabled = true;
	}
};

function minerUpgradePanning(){
	if(gold >= 3500 && iron >= 1000){
		gold = gold - 3500;
		iron = iron - 1000;
		mPanningUpgrade = true;	
		document.getElementById('gold').innerHTML = gold;
		document.getElementById('iron').innerHTML = iron;
		document.getElementById("btnminerUpgrade1").disabled = true;
	}	
};
			
function UnlockSquire(){
	if(gold >= 4000 && BattlePower >= 120){
		gold = gold - 400;
		document.getElementById('gold').innerHTML = gold;
		squiresUnlocked = true;
		document.getElementById("btnPageUpgrade1").disabled = true;
		document.getElementById('SquireTab').style.display = "block";
	}
}

function UnlockKnight(){
	if(gold >= 8000 && BattlePower >= 500){
		gold = gold - 8000;
		document.getElementById('gold').innerHTML = gold;
		knightsUnlocked = true;
		document.getElementById("btnSquireUpgrade1").disabled = true;
		document.getElementById('KnightTab').style.display = "block";
	}
}

function buyWeapon(){
    var WeaponCost = Math.floor(1000 * Math.pow(1.1,weapons));     //works out the cost of this weapon
    if(faith >= WeaponCost){                                   //checks that the player can afford the weapon
        weapons = weapons + 1;                                   //increases number of weapons
    	faith = faith - WeaponCost;                          //removes the souls spent
        document.getElementById('weapons').innerHTML = weapons;  //updates the number of weapons for the user
        document.getElementById('souls').innerHTML = souls;  //updates the number of souls for the user
    };
    var nextWeapCost = Math.floor(1000 * Math.pow(1.1,weapons));       //works out the cost of the next weapon
    document.getElementById('WeaponCost').innerHTML = nextWeapCost;  //updates the weapon cost for the user
};

function recalculateCosts(){
	Peasant.costAdj = tavernpeasants;
	Peasant.recalcCost();
	Miner.costAdj = tavernminers;
	Miner.recalcCost();
	Priest.recalcCost();
	Page.recalcCost();
	Squire.recalcCost();
	Knight.recalcCost();
	Paladin.recalcCost();
};

function UpdateButtons() {
	
	//Unit Buttons //
	//Enable/disables buy peasant button depending on if there is enough currency	
	Peasant.canBuy();
	
	//Enable/disables buy miner button depending on if there is enough currency
	Miner.canBuy();
	
	//Enable/disables buy priest button depending on if there is enough currency
	Priest.canBuy();

	//Enable/disables buy page button depending on if there is enough currency
	Page.canBuy();	

	//Enable/disables buy squire button depending on if there is enough currency
	Squire.canBuy();	
	
	//Enable/disables buy squire button depending on if there is enough currency
	Knight.canBuy();	
	
	//Enable/disables buy paladin button depending on if there is enough currency
	Paladin.canBuy();

	// End of Unit Buttons//
	
	//Structure Buttons
	//Enable/disables buy tavern button depending on if there is enough currency
	if(gold < document.getElementById('TavernCost').innerHTML){	
		document.getElementById("btnbuyTavern").disabled = true;
	}
	else{
		document.getElementById("btnbuyTavern").disabled = false;
	}
	
	//Enable/disables tavern upgrade
	if(tavernUpgrade == true || gold < 10000 || iron < 5000){
		document.getElementById("btnUpgradeTavern").disabled = true;
	}
	else{
		document.getElementById("btnUpgradeTavern").disabled = false;
	}
	
	//Changes status of the building mines button
	if(minesOpened){
		document.getElementById("btnOpenMines").disabled = true
		document.getElementById("btnOpenMines").innerHTML = "Mines built";
	}
	else if(!minesOpened && gold < 1500){
		document.getElementById("btnOpenMines").disabled = true
	}
	else{
		document.getElementById("btnOpenMines").disabled = false
	}
	
	//Changes status of the building barracks button
	if(barracksOpened){
		document.getElementById("btnOpenBarracks").disabled = true
		document.getElementById("btnOpenBarracks").innerHTML = "Barracks built";
	}
	else if(!cathedralOpened && (gold < 10000 || iron < 250)){
		document.getElementById("btnOpenBarracks").disabled = true
	}
	else{
		document.getElementById("btnOpenBarracks").disabled = false
	}
	
	//Changes status of the building cathedral button
	if(cathedralOpened){
		document.getElementById("btnOpenCathedral").disabled = true
		document.getElementById("btnOpenCathedral").innerHTML = "Cathedral built";
	}
	else if(!cathedralOpened && (gold < 10000 || iron < 500)){
		document.getElementById("btnOpenCathedral").disabled = true
	}
	else{
		document.getElementById("btnOpenCathedral").disabled = false
	}
	//End of Structure Buttons
	
	
	//Upgrade Buttons//
	//Enable/disables buy imbue weapon button depending on if there is enough currency
	if(faith < document.getElementById('WeaponCost').innerHTML){	
		document.getElementById("btnbuyWeapon").disabled = true;
	}
	else{
		document.getElementById("btnbuyWeapon").disabled = false;
	}
	
	//Unlock Squire Button
	if(squiresUnlocked == true || (BattlePower < 120|| gold < 4000)){	
		document.getElementById("btnPageUpgrade1").disabled = true;
	}
	else{
		document.getElementById("btnPageUpgrade1").disabled = false;
	}	
	
	//End of Upgrade Buttons//
	
	
	//Changes status of Battle Buttons
	//Bandit Button
	if(BattlePower < 100 || defeatedBandits == true){
		document.getElementById("btnBatBandits").disabled = true;		
	}		
	else{
		document.getElementById("btnBatBandits").disabled = false;
	}
		//Ogre Button
	if(BattlePower < 500 || defeatedOgre == true){
		document.getElementById("btnBatOgre").disabled = true;		
	}
	else{
		document.getElementById("btnBatOgre").disabled = false;
	}
	
		//Ogre Button
	if(BattlePower < 2000 || defeatedHhounds == true){
		document.getElementById("btnBatHellhound").disabled = true;		
	}
	else{
		document.getElementById("btnBatHellhound").disabled = false;
	}
	//End of Battle Buttons
}

window.setInterval(function(){                                 //Update per second counts
    goldpersec = Peasant.number;
	if(mPanningUpgrade == true)
	{
		goldpersec = goldpersec + miners;
	}
    document.getElementById("goldpersec").innerHTML = goldpersec;
    
    faithpersec = Priest.number*0.1
	faithpersec = faithpersec.toFixedDown(2)
    document.getElementById("faithpersec").innerHTML = faithpersec;
    
    soulspersec = Paladin.number*(weapons+1);
    document.getElementById("soulspersec").innerHTML = soulspersec;
	
	ironpersec = Miner.number;
	document.getElementById("ironpersec").innerHTML = ironpersec;
    
	document.getElementById("peasants").innerHTML = Peasant.number ;	//For testing
	document.getElementById("miners").innerHTML = Miner.number;			//For Testing
},100);


window.setInterval(function(){	

	//Gold generation via peasants etc every second
	var number = Peasant.returnNumber();
	if(mPanningUpgrade == true)
	{
		number = number + Miner.number;
	}
	clickThing(number, "gold");
	
	
	 //Faith Generation via priests etc every second
	clickThing(Priest.returnNumber()*0.1, "faith");          
	faith = faith.toFixedDown(2);
	
	
	//Iron Generation via minors etc every second
	clickThing(Miner.number, "iron")
	
	//Soul generation via paladins etc every second
	clickThing(Paladin.number*(weapons+1),"souls");
	
}, 1000);


window.setInterval(function(){					//Enables/disables buttons 
	UpdateButtons();
}, 10);

window.setInterval(function(){					//Increases totalTimePlayed by 1 second per second 
	totalTimePlayed = totalTimePlayed + 1;
	tTPinHHMMSS = dhms(totalTimePlayed,"d:h:m:s");
	document.getElementById("tTPinHHMMSS").innerHTML = tTPinHHMMSS;
}, 1000);

Number.prototype.toFixedDown = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};

function dhms(s, f) { // seconds, format
  var d=h=m=0;
  switch (true) {
  case (s>86400):
    d=Math.floor(s/86400);
    s-=d*86400;
  case (s>3600):
    h=Math.floor(s/3600);
    s-=h*3600;
  case (s>60):
    m=Math.floor(s/60);
    s-=m*60;
  } 
  if (f != null) {
    var f = f.replace('dd', (d<10)?"0"+d:d);
    f = f.replace('d', d);
    f = f.replace('hh', (h<10)?"0"+h:h);
    f = f.replace('h', h);
    f = f.replace('mm', (m<10)?"0"+m:m);
    f = f.replace('m', m);
    f = f.replace('ss', (s<10)?"0"+s:s);
    f = f.replace('s', s);
  } 
  else {
    f = d + ':' + h + ':' + m + ':' + s;
  }
  return f; // :) omg...
}

