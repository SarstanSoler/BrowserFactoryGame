//startup commands
window.onload = function() {
  startTab();
  startIntervals();
  update();
}

function startTab() {
  document.getElementById("defaultOpen").click();
}

function startIntervals() {
  setInterval(generatePower, 1000);
  setInterval(autoMining, 1000);
  setInterval(autoSmelting, 1000);
}

//define variables
const resources = {
  coal: 0,
  stone: 0,
  ironOre: 0,
  ironIngot: 0,
  copperOre: 0,
  copperIngot: 0,
  ironGear: 0,
  copperWire: 0,
  ironActive: false,
  copperActive: false
};

const requirements = {
  coal: 1,
  ironOre: 2,
  ironGear: 1, //Requires 1 iron ingot
  copperOre: 2,
  copperWire: 1 //Requires 1 copper ingot
};

const smelter = {
  iron: { time: 5, active: false},
  copper: { time: 5, active: false}
};

const buildCosts = {
  generator: { ironGear: 2, copperWire: 10, stone: 10 },
  miner: { ironGear: 10, copperWire: 2, stone: 10 },
  furnace: { ironGear: 5, copperWire: 5, stone: 20 }
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
  power: 2
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
  const remainingPower = calculateRemainingPower;

  // Update DOM values
  updateResourceText();
  updateRequirementText();
  updateMachineText();
  updatePowerText(remainingPower);
  updateBuildCostText();
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

function updatePowerText() {
  document.getElementById('totalPowerText').innerHTML = power.total;
  document.getElementById('remainingPowerText').innerHTML = calculateRemainingPower();
}

function updateBuildCostText() {
  document.getElementById('gengReqText').innerHTML = buildCosts.generator.ironGear;
  document.getElementById('genwReqText').innerHTML = buildCosts.generator.copperWire;
  document.getElementById('gensReqText').innerHTML = buildCosts.generator.stone;

  document.getElementById('minergReqText').innerHTML = buildCosts.miner.ironGear;
  document.getElementById('minerwReqText').innerHTML = buildCosts.miner.copperWire;
  document.getElementById('minersReqText').innerHTML = buildCosts.miner.stone;
  document.getElementById('icoalReqText').innerHTML = requirements.coal;
  document.getElementById('ccoalReqText').innerHTML = requirements.coal;

  document.getElementById('furnacegReqText').innerHTML = buildCosts.furnace.ironGear;
  document.getElementById('furnacewReqText').innerHTML = buildCosts.furnace.copperWire;
  document.getElementById('furnacesReqText').innerHTML = buildCosts.furnace.stone;
}

function autoMining() {
  const remainingPower = calculateRemainingPower();

  if (remainingPower >= 0) {
    resources.coal += miners.coal;
    resources.stone += miners.stone;
    resources.ironOre += miners.iron;
    resources.copperOre += miners.copper;
    update();
  }
}

function autoSmelting() {
  if (
    resources.ironOre >= requirements.ironOre &&
    resources.coal > requirements.coal &&
    furnaces.iron >= 1
  ) {
    resources.ironOre -= requirements.ironOre * furnaces.iron;
    resources.coal -= requirements.coal * furnaces.iron;
    resources.ironIngot += furnaces.iron;
  }

  if (
    resources.copperOre >= requirements.copperOre &&
    resources.coal > requirements.coal &&
    furnaces.copper >= 1
  ) {
    resources.copperOre -= requirements.copperOre * furnaces.copper;
    resources.coal -= requirements.coal * furnaces.copper;
    resources.copperIngot += furnaces.copper;
  }

}

function calculateRemainingPower() {
  const usedPower = miners.active * miners.power;
  return power.total - usedPower;  
}

function mine(resourceKey) {
  if (resources.hasOwnProperty(resourceKey)) {
    resources[resourceKey]++;
    update();
  }
}



function generatePower() {
  const remainingPower = calculateRemainingPower();
  if (resources.coal < power.activeGenerator) {
    power.activeGenerator = 0;
  }
  else if (remainingPower < 0) {
    power.frozen = true; //add a notice with frozen power prod
    document.getElementById("remainingPowerText").style.color = 'red';
  }
  else {
    power.frozen = false;
    document.getElementById("remainingPowerText").style.color = 'black';
    totalPower = power.activeGenerator * power.generatorPower;
    resources.coal -= power.activeGenerator;
    update();
  }
}

function assignGenerator(direction = 'add') {
  if (direction === 'add' && power.generator > power.activeGenerator && resources.coal >= 1) {
    power.activeGenerator++;
  } else if (direction === 'sub' && power.activeGenerator > 0) {
    power.activeGenerator--;
  }
  update();
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

function smeltWithProgress(type, elementId) {
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
        resources[`${type}Ingot`] += 1;
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

function makeGear() {
  craftRecipe({ ironIngot: requirements.ironGear }, 'ironGear');
}

function makeWire() {
  craftRecipe({ copperIngot: requirements.copperWire }, 'copperWire');
}

function makeGenerator() {
  const canCraft = Object.entries(buildCosts.generator).every(
    ([key, val]) => resources[key] >= val
  );
  if (canCraft) {
    for (const [key, val] of Object.entries(buildCosts.generator)) {
      resources[key] -= val;
    }
    power.generator++;
    update();
  }
}

function makeMiner() {
  const canCraft = Object.entries(buildCosts.miner).every(
    ([key, val]) => resources[key] >= val
  );
  if (canCraft) {
    for (const [key, val] of Object.entries(buildCosts.miner)) {
      resources[key] -= val;
    }
    miners.total++;
    update();
  }
}

function makeFurnace() {
  const canCraft = Object.entries(buildCosts.furnace).every(
    ([key, val]) => resources[key] >= val
  );
  if (canCraft) {
    for (const [key, val] of Object.entries(buildCosts.furnace)) {
      resources[key] -= val;
    }
    furnaces.total++;
    update();
  }
}

function craftRecipe(costs, outputResource) {
  const canAfford = Object.entries(costs).every(
    ([resource, amount]) => resources[resource] >= amount
  );

  if (canAfford) {
    for (const [resource, amount] of Object.entries(costs)) {
      resources[resource] -= amount;
    }
    resources[outputResource]++;
    update();
  }
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
