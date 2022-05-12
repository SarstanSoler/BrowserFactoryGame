//startup commands

window.onload = function() {
  startTab();
  update();
}

//define variables

var coal = 0;
var coalReq = 1;
var stone = 0;
var ironOre = 0;
var ironIng = 0;
var ironOreReq = 2;
var ironGear = 0;
var ironGearReq = 5;
var copperOre = 0;
var copperIng = 0;
var copperOreReq = 2;
var copperWire = 0;
var copperWireReq = 5;
var ironTime = 5;
var ironActive = false;
var copperTime = 5;
var copperActive = false;
var gengReq = 5;
var genwReq = 5;
var gensReq = 20;
var minergReq = 5;
var minerwReq = 5;
var minersReq = 20;
var furnacegReq = 5;
var furnacewReq = 5;
var furnacesReq = 20;
var generator = 0;
var activeGenerator = 0;
var generatorPower = 10;
var totalPower = 0;
var frozeGenerator = false;
var miner = 0;
var minerPower = 3;
var minerActive = 0;
var coalMiner = 0;
var stoneMiner = 0;
var ironMiner = 0;
var copperMiner = 0;
var furnace = 0;
var ironFurnace = 0;
var copperFurnace = 0;

//update commands. Might split.


function update() {
  totalPower = activeGenerator * generatorPower;
  minerActive = coalMiner + stoneMiner + ironMiner + copperMiner;
  usedPower = minerActive * minerPower;
  remainingPower = totalPower - usedPower;
  document.getElementById('coalText').innerHTML = coal;
  document.getElementById('stoneText').innerHTML = stone;
  document.getElementById('ironOreText').innerHTML = ironOre;
  document.getElementById('ironIngotText').innerHTML = ironIng;
  document.getElementById('copperOreText').innerHTML = copperOre;
  document.getElementById('copperIngotText').innerHTML = copperIng;
  document.getElementById('ironGearText').innerHTML = ironGear;
  document.getElementById('copperWireText').innerHTML = copperWire;
  document.getElementById('generatorText').innerHTML = generator;
  document.getElementById('generatorText2').innerHTML = generator;
  document.getElementById('activeGeneratorText').innerHTML = activeGenerator;
  document.getElementById('activeGeneratorText2').innerHTML = activeGenerator;
  document.getElementById('remainingPowerText').innerHTML = remainingPower;
  document.getElementById('totalPowerText').innerHTML = totalPower;
  document.getElementById('minerText').innerHTML = miner;
  document.getElementById('ironOreReqText').innerHTML = ironOreReq;
  document.getElementById('copperOreReqText').innerHTML = copperOreReq;
  document.getElementById('icoalReqText').innerHTML = coalReq;
  document.getElementById('ccoalReqText').innerHTML = coalReq;
  document.getElementById('ironGearReqText').innerHTML = ironGearReq;
  document.getElementById('copperWireReqText').innerHTML = copperWireReq;
  document.getElementById('gengReqText').innerHTML = gengReq;
  document.getElementById('genwReqText').innerHTML = genwReq;
  document.getElementById('gensReqText').innerHTML = gensReq;
  document.getElementById('minergReqText').innerHTML = minergReq;
  document.getElementById('minerwReqText').innerHTML = minerwReq;
  document.getElementById('minersReqText').innerHTML = minersReq;
  document.getElementById('furnacegReqText').innerHTML = furnacegReq;
  document.getElementById('furnacewReqText').innerHTML = furnacewReq;
  document.getElementById('furnacesReqText').innerHTML = furnacesReq;
  document.getElementById('coalMinerText').innerHTML = coalMiner;
  document.getElementById('stoneMinerText').innerHTML = stoneMiner;
  document.getElementById('ironMinerText').innerHTML = ironMiner;
  document.getElementById('copperMinerText').innerHTML = copperMiner;
  document.getElementById('furnaceText').innerHTML = furnace;
  document.getElementById('ironFurnaceText').innerHTML = ironFurnace;
  document.getElementById('copperFurnaceText').innerHTML = copperFurnace;
}

var t = setInterval(AutoMining, 1000);
var t = setInterval(powerProd, 1000);
var t = setInterval(AutoSmelting, 1000);

//tabs

function openTab(evt, actionTabs) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(actionTabs).style.display = "block";
  evt.currentTarget.className += " active";
}

function startTab() {
  document.getElementById("defaultOpen").click();
}
//testing progress bar

function MineStone() {
  stone = stone + 1
  update()
}

function MineCoal() {
  coal = coal + 1
  update()
}

function MineIron() {
  ironOre = ironOre + 1
  update()
}

function MineCopper() {
  copperOre = copperOre + 1
  update()
}

function AddCoalMiner() {
  if (miner >= 1) {
    miner--;
    coalMiner++;
    update();
  }
}

function SubCoalMiner() {
  if (coalMiner >= 1) {
    miner++;
    coalMiner--;
    update();
  }
}

function AddStoneMiner() {
  if (miner >= 1) {
    miner--;
    stoneMiner++;
    update();
  }
}

function SubStoneMiner() {
  if (stoneMiner >= 1) {
    miner++;
    stoneMiner--;
    update();
  }
}

function AddIronMiner() {
  if (miner >= 1) {
    miner--;
    ironMiner++;
    update();
  }
}

function SubIronMiner() {
  if (ironMiner >= 1) {
    miner++;
    ironMiner--;
    update();
  }
}

function AddCopperMiner() {
  if (miner >= 1) {
    miner--;
    copperMiner++;
    update();
  }
}

function SubCopperMiner() {
  if (copperMiner >= 1) {
    miner++;
    copperMiner--;
    update();
  }
}

function AddIronFurnace() {
  if (furnace >= 1) {
    furnace--;
    ironFurnace++;
    update();
  }
}

function SubIronFurnace() {
  if (ironFurnace >= 1) {
    furnace++;
    ironFurnace--;
    update();
  }
}

function AddCopperFurnace() {
  if (furnace >= 1) {
    furnace--;
    copperFurnace++;
    update();
  }
}

function SubCopperFurnace() {
  if (copperFurnace >= 1) {
    furnace++;
    copperFurnace--;
    update();
  }
}


function AddGen() {
  if (generator >= 1 && activeGenerator <= generator && coal >= 1) {
    activeGenerator++;
    update();
  }
}

function SubGen() {
  if (activeGenerator >= 1) {
    activeGenerator--;
    update();
  }
}

function powerProd() {
  if (coal < activeGenerator) {
    activeGenerator = 0;
  }
  else if (remainingPower < 0) {
    frozeGenerator = true; //add a notice with frozen power prod
    document.getElementById("remainingPowerText").style.color = 'red';
  }
  else {
    frozeGenerator = false;
    document.getElementById("remainingPowerText").style.color = 'black';
    totalPower = activeGenerator * generatorPower;
    coal -= activeGenerator;
    update();
  }
}

function AutoMining() {
  if (remainingPower >= 0) {
    coal += coalMiner * 1;
    stone += stoneMiner * 1;
    ironOre += ironMiner * 1;
    copperOre += copperMiner * 1;
    update();
  }
}

function AutoSmelting() {
  if (ironOre >= ironOreReq && coal > coalReq && ironFurnace >=1) {
    ironOre -= ironOreReq * ironFurnace;
    coal -= coalReq * ironFurnace;
    ironIng++;
  }


if (copperOre >= copperOreReq && coal > coalReq && copperFurnace >=1) {
  copperOre -= copperOreReq * copperFurnace;
  coal -= coalReq * copperFurnace;
  copperIng++;
}
  
}

function SmeltIron() {
  if (ironOre >= ironOreReq && coal >= coalReq && ironActive == false) {
    ironActive = true;
    ironOre = ironOre - ironOreReq;
    coal = coal - coalReq;
    update();
    var i = 0;
    if (i == 0) { /* progress bar*/
      i = 1;
      var elem = document.getElementById("ironProg");
      var width = 0;
      var id = setInterval(frame, 10);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0; /* end progress bar*/

          ironIng = ironIng + 1;
          ironActive = false;
          update()
        } else {
          width++;
          elem.style.width = width + "%";
          elem.innerHTML = width + "%";
        }
      }
    }
  }
}

function MakeGear() {
  if (ironIng >= ironGearReq) {
    ironGear = ironGear + 1;
    ironIng = ironIng - ironGearReq;
    update();
  }
}



function SmeltCopper() {
  if (copperOre >= copperOreReq && coal >= coalReq && copperActive == false) {
    var i = 0;
    copperActive = true;
    coal = coal - coalReq;
    copperOre = copperOre - copperOreReq;
    update();
    if (i == 0) { /* progress bar*/
      i = 1;
      var elem = document.getElementById("copperProg");
      var width = 0;
      var id = setInterval(frame, 10);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0; /* end progress bar*/

          copperIng = copperIng + 1;
          copperActive = false;
          update()
        } else {
          width++;
          elem.style.width = width + "%";
          elem.innerHTML = width + "%";
        }
      }
    }
  }
}

function MakeWire() {
  if (copperIng >= copperWireReq) {
    copperIng = copperIng - copperWireReq;
    copperWire++;
    update()
  }
}

//testing stuff below

function MakeGenerator() {
  if (copperWire >= genwReq && ironGear >= gengReq && stone >= gensReq) {
    copperWire = copperWire - genwReq;
    ironGear = ironGear - gengReq;
    stone = stone - gensReq;
    generator = generator + 1;
    update();
  }
}


function MakeMiner() {
  if (copperWire >= minerwReq && ironGear >= minergReq && stone >= minersReq) {
    copperWire = copperWire - minerwReq;
    ironGear = ironGear - minergReq;
    stone = stone - minersReq;
    miner = miner + 1;
    update();
  }
}

function MakeFurnace() {
  if (copperWire >= furnacewReq && ironGear >= furnacegReq && stone >= furnacesReq) {
    copperWire = copperWire - furnacewReq;
    ironGear = ironGear - furnacegReq;
    stone = stone - furnacesReq;
    furnace = furnace + 1;
    update();
  }
}


//testing stuff
