//startup commands

window.onload = function() {
  startTab();
  update();
  startIntervals();
}

//define variables

const resources = {
  coal: 0,
  stone: 0,
  ironOre: 0,
  ironIng: 0,
  copperOre: 0,
  copperIng: 0,
  ironGear: 0,
  copperWire: 0,
  ironActive: false,
  copperActive: false
};

const requirements = {
  coal: 1,
  ironOre: 2,
  ironGear: 5,
  copperOre: 2,
  copperWire: 5
};

const smelter = {
  iron: { time: 5, active: false},
  copper: { time: 5, active: false}
};

const buildCosts = {
  generator: { g: 5, w: 5, s: 20 },
  miner: { g: 5, w: 5, s: 20 },
  furnace: { g: 5, w: 5, s: 20 }
};

const power = {
  generator: 0,
  activeGenerator: 0,
  generatorPower: 10,
  total: 0,
  frozen: false
};

const miners = {
  total: 0,
  active: 0,
  coal: 0,
  stone: 0,
  iron: 0,
  copper: 0,
  power: 3
};

const furnaces = {
  total: 0,
  iron: 0,
  copper: 0
};

function update() {
  // Power calculations
  power.total = power.activeGenerator * power.generatorPower;
  miners.active = miners.coal + miners.stone + miners.iron + miners.copper;
  const usedPower = miners.active * miners.power;
  const remainingPower = power.total - usedPower;

  // Update DOM values
  updateResourceText();
  updateRequirementText();
  updateMachineText();
  updatePowerText(remainingPower);
}

function updateResourceText() {
  for (const [key, value] of Object.entries(resources)) {
    const element = document.getElementById(`${key}Text`);
    if (element) element.innerHTML = value;
  }
}

function updateRequirementText() {
  for (const [key, value] of Object.entries(requirements)) {
    const element = document.getElementById(`${key}ReqText`);
    if (element) element.innerHTML = value;
  }
}

function updateMachineText() {
  const map = {
    generatorText: power.generator,
    generatorText2: power.generator,
    activeGeneratorText: power.activeGenerator,
    activeGeneratorText2: power.activeGenerator,
    minerText: miners.total,
    coalMinerText: miners.coal,
    stoneMinerText: miners.stone,
    ironMinerText: miners.iron,
    copperMinerText: miners.copper,
    furnaceText: furnaces.total,
    ironFurnaceText: furnaces.iron,
    copperFurnaceText: furnaces.copper
  };

  for (const [id, value] of Object.entries(map)) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = value;
  }
}

function updatePowerText(remainingPower) {
  document.getElementById('totalPowerText').innerHTML = power.total;
  document.getElementById('remainingPowerText').innerHTML = remainingPower;
}


function startIntervals() {
  setInterval(AutoMining, 1000);
  setInterval(powerProd, 1000);
  setInterval(AutoSmelting, 1000);
}


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

function mine(resourceKey) {
  if (resources.hasOwnProperty(resourceKey)) {
    resources[resourceKey]++;
    update();
  }
}

function assignMiner(type, direction = 'add') {
  if (direction === 'add' && miners.total >= 1) {
    miners.total--;
    miners[type]++;
  } else if (direction === 'sub' && miners[type] >= 1) {
    miners.total++;
    miners[type]--;
  }
  update();
}

function assignFurnace(type, direction = 'add') {
  if (direction === 'add' && furnaces.total >= 1) {
    furnaces.total--;
    furnaces[type]++;
  } else if (direction === 'sub' && furnaces[type] >= 1) {
    furnaces.total++;
    furnaces[type]--;
  }
  update();
}

function smeltWithProgress(type, elementId, activeFlag, callback) {
  if (!resources[`${type}Active`] && resources[`${type}Ore`] >= requirements[`${type}Ore`] && resources.coal >= requirements.coal) {
    resources[`${type}Active`] = true;
    resources[`${type}Ore`] -= requirements[`${type}Ore`];
    resources.coal -= requirements.coal;
    update();

    let width = 0;
    const bar = document.getElementById(elementId);
    const id = setInterval(() => {
      if (width >= 100) {
        clearInterval(id);
        resources[`${type}Ing`] += 1;
        resources[`${type}Active`] = false;
        update();
      } else {
        width++;
        bar.style.width = width + "%";
        bar.innerHTML = width + "%";
      }
    }, 10);
  }
}

function craft(item, costs, outputKey) {
  const canCraft = Object.entries(costs).every(([key, value]) => resources[key] >= value);
  if (canCraft) {
    for (const [key, value] of Object.entries(costs)) {
      resources[key] -= value;
    }
    resources[outputKey]++;
    update();
  }
}

// var coal = 0;
// var coalReq = 1;
// var stone = 0;
// var ironOre = 0;
// var ironIng = 0;
// var ironOreReq = 2;
// var ironGear = 0;
// var ironGearReq = 5;
// var copperOre = 0;
// var copperIng = 0;
// var copperOreReq = 2;
// var copperWire = 0;
// var copperWireReq = 5;
// var ironTime = 5;
// var ironActive = false;
// var copperTime = 5;
// var copperActive = false;
// var gengReq = 5;
// var genwReq = 5;
// var gensReq = 20;
// var minergReq = 5;
// var minerwReq = 5;
// var minersReq = 20;
// var furnacegReq = 5;
// var furnacewReq = 5;
// var furnacesReq = 20;
// var generator = 0;
// var activeGenerator = 0;
// var generatorPower = 10;
// var totalPower = 0;
// var frozeGenerator = false;
// var miner = 0;
// var minerPower = 3;
// var minerActive = 0;
// var coalMiner = 0;
// var stoneMiner = 0;
// var ironMiner = 0;
// var copperMiner = 0;
// var furnace = 0;
// var ironFurnace = 0;
// var copperFurnace = 0;

//update commands. Might split.

// function update() {
//   totalPower = activeGenerator * generatorPower;
//   minerActive = coalMiner + stoneMiner + ironMiner + copperMiner;
//   usedPower = minerActive * minerPower;
//   remainingPower = totalPower - usedPower;
//   document.getElementById('coalText').innerHTML = coal;
//   document.getElementById('stoneText').innerHTML = stone;
//   document.getElementById('ironOreText').innerHTML = ironOre;
//   document.getElementById('ironIngotText').innerHTML = ironIng;
//   document.getElementById('copperOreText').innerHTML = copperOre;
//   document.getElementById('copperIngotText').innerHTML = copperIng;
//   document.getElementById('ironGearText').innerHTML = ironGear;
//   document.getElementById('copperWireText').innerHTML = copperWire;
//   document.getElementById('generatorText').innerHTML = generator;
//   document.getElementById('generatorText2').innerHTML = generator;
//   document.getElementById('activeGeneratorText').innerHTML = activeGenerator;
//   document.getElementById('activeGeneratorText2').innerHTML = activeGenerator;
//   document.getElementById('remainingPowerText').innerHTML = remainingPower;
//   document.getElementById('totalPowerText').innerHTML = totalPower;
//   document.getElementById('minerText').innerHTML = miner;
//   document.getElementById('ironOreReqText').innerHTML = ironOreReq;
//   document.getElementById('copperOreReqText').innerHTML = copperOreReq;
//   document.getElementById('icoalReqText').innerHTML = coalReq;
//   document.getElementById('ccoalReqText').innerHTML = coalReq;
//   document.getElementById('ironGearReqText').innerHTML = ironGearReq;
//   document.getElementById('copperWireReqText').innerHTML = copperWireReq;
//   document.getElementById('gengReqText').innerHTML = gengReq;
//   document.getElementById('genwReqText').innerHTML = genwReq;
//   document.getElementById('gensReqText').innerHTML = gensReq;
//   document.getElementById('minergReqText').innerHTML = minergReq;
//   document.getElementById('minerwReqText').innerHTML = minerwReq;
//   document.getElementById('minersReqText').innerHTML = minersReq;
//   document.getElementById('furnacegReqText').innerHTML = furnacegReq;
//   document.getElementById('furnacewReqText').innerHTML = furnacewReq;
//   document.getElementById('furnacesReqText').innerHTML = furnacesReq;
//   document.getElementById('coalMinerText').innerHTML = coalMiner;
//   document.getElementById('stoneMinerText').innerHTML = stoneMiner;
//   document.getElementById('ironMinerText').innerHTML = ironMiner;
//   document.getElementById('copperMinerText').innerHTML = copperMiner;
//   document.getElementById('furnaceText').innerHTML = furnace;
//   document.getElementById('ironFurnaceText').innerHTML = ironFurnace;
//   document.getElementById('copperFurnaceText').innerHTML = copperFurnace;
// }

// var t = setInterval(AutoMining, 1000);
// var t = setInterval(powerProd, 1000);
// var t = setInterval(AutoSmelting, 1000);

// function MineStone() {
//   stone = stone + 1
//   update()
// }

// function MineCoal() {
//   coal = coal + 1
//   update()
// }

// function MineIron() {
//   ironOre = ironOre + 1
//   update()
// }

// function MineCopper() {
//   copperOre = copperOre + 1
//   update()
// }

// function AddCoalMiner() {
//   if (miner >= 1) {
//     miner--;
//     coalMiner++;
//     update();
//   }
// }

// function SubCoalMiner() {
//   if (coalMiner >= 1) {
//     miner++;
//     coalMiner--;
//     update();
//   }
// }

// function AddStoneMiner() {
//   if (miner >= 1) {
//     miner--;
//     stoneMiner++;
//     update();
//   }
// }

// function SubStoneMiner() {
//   if (stoneMiner >= 1) {
//     miner++;
//     stoneMiner--;
//     update();
//   }
// }

// function AddIronMiner() {
//   if (miner >= 1) {
//     miner--;
//     ironMiner++;
//     update();
//   }
// }

// function SubIronMiner() {
//   if (ironMiner >= 1) {
//     miner++;
//     ironMiner--;
//     update();
//   }
// }

// function AddCopperMiner() {
//   if (miner >= 1) {
//     miner--;
//     copperMiner++;
//     update();
//   }
// }

// function SubCopperMiner() {
//   if (copperMiner >= 1) {
//     miner++;
//     copperMiner--;
//     update();
//   }
// }

// function AddIronFurnace() {
//   if (furnace >= 1) {
//     furnace--;
//     ironFurnace++;
//     update();
//   }
// }

// function SubIronFurnace() {
//   if (ironFurnace >= 1) {
//     furnace++;
//     ironFurnace--;
//     update();
//   }
// }

// function AddCopperFurnace() {
//   if (furnace >= 1) {
//     furnace--;
//     copperFurnace++;
//     update();
//   }
// }

// function SubCopperFurnace() {
//   if (copperFurnace >= 1) {
//     furnace++;
//     copperFurnace--;
//     update();
//   }
// }

// function AddGen() {
//   if (generator >= 1 && activeGenerator <= generator && coal >= 1) {
//     activeGenerator++;
//     update();
//   }
// }

// function SubGen() {
//   if (activeGenerator >= 1) {
//     activeGenerator--;
//     update();
//   }
// }

// function powerProd() {
//   if (coal < activeGenerator) {
//     activeGenerator = 0;
//   }
//   else if (remainingPower < 0) {
//     frozeGenerator = true; //add a notice with frozen power prod
//     document.getElementById("remainingPowerText").style.color = 'red';
//   }
//   else {
//     frozeGenerator = false;
//     document.getElementById("remainingPowerText").style.color = 'black';
//     totalPower = activeGenerator * generatorPower;
//     coal -= activeGenerator;
//     update();
//   }
// }

// function AutoMining() {
//   if (remainingPower >= 0) {
//     coal += coalMiner * 1;
//     stone += stoneMiner * 1;
//     ironOre += ironMiner * 1;
//     copperOre += copperMiner * 1;
//     update();
//   }
// }

// function AutoSmelting() {
//   if (ironOre >= ironOreReq && coal > coalReq && ironFurnace >=1) {
//     ironOre -= ironOreReq * ironFurnace;
//     coal -= coalReq * ironFurnace;
//     ironIng++;
//   }


// if (copperOre >= copperOreReq && coal > coalReq && copperFurnace >=1) {
//   copperOre -= copperOreReq * copperFurnace;
//   coal -= coalReq * copperFurnace;
//   copperIng++;
// }
  
// }

// function SmeltIron() {
//   if (ironOre >= ironOreReq && coal >= coalReq && ironActive == false) {
//     ironActive = true;
//     ironOre = ironOre - ironOreReq;
//     coal = coal - coalReq;
//     update();
//     var i = 0;
//     if (i == 0) { /* progress bar*/
//       i = 1;
//       var elem = document.getElementById("ironProg");
//       var width = 0;
//       var id = setInterval(frame, 10);
//       function frame() {
//         if (width >= 100) {
//           clearInterval(id);
//           i = 0; /* end progress bar*/

//           ironIng = ironIng + 1;
//           ironActive = false;
//           update()
//         } else {
//           width++;
//           elem.style.width = width + "%";
//           elem.innerHTML = width + "%";
//         }
//       }
//     }
//   }
// }

// function MakeGear() {
//   if (ironIng >= ironGearReq) {
//     ironGear = ironGear + 1;
//     ironIng = ironIng - ironGearReq;
//     update();
//   }
// }



// function SmeltCopper() {
//   if (copperOre >= copperOreReq && coal >= coalReq && copperActive == false) {
//     var i = 0;
//     copperActive = true;
//     coal = coal - coalReq;
//     copperOre = copperOre - copperOreReq;
//     update();
//     if (i == 0) { /* progress bar*/
//       i = 1;
//       var elem = document.getElementById("copperProg");
//       var width = 0;
//       var id = setInterval(frame, 10);
//       function frame() {
//         if (width >= 100) {
//           clearInterval(id);
//           i = 0; /* end progress bar*/

//           copperIng = copperIng + 1;
//           copperActive = false;
//           update()
//         } else {
//           width++;
//           elem.style.width = width + "%";
//           elem.innerHTML = width + "%";
//         }
//       }
//     }
//   }
// }

// function MakeWire() {
//   if (copperIng >= copperWireReq) {
//     copperIng = copperIng - copperWireReq;
//     copperWire++;
//     update()
//   }
// }

// //testing stuff below

// function MakeGenerator() {
//   if (copperWire >= genwReq && ironGear >= gengReq && stone >= gensReq) {
//     copperWire = copperWire - genwReq;
//     ironGear = ironGear - gengReq;
//     stone = stone - gensReq;
//     generator = generator + 1;
//     update();
//   }
// }


// function MakeMiner() {
//   if (copperWire >= minerwReq && ironGear >= minergReq && stone >= minersReq) {
//     copperWire = copperWire - minerwReq;
//     ironGear = ironGear - minergReq;
//     stone = stone - minersReq;
//     miner = miner + 1;
//     update();
//   }
// }

// function MakeFurnace() {
//   if (copperWire >= furnacewReq && ironGear >= furnacegReq && stone >= furnacesReq) {
//     copperWire = copperWire - furnacewReq;
//     ironGear = ironGear - furnacegReq;
//     stone = stone - furnacesReq;
//     furnace = furnace + 1;
//     update();
//   }
// }


// //testing stuff
