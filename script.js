
var stone = 0;
var ironOre = 0;
var ironIng = 0;
var ironOreReq = 10;
var ironGear = 0;
var ironGearReq = 5;
var copperOre = 0;
var copperIng = 0;
var copperOreReq = 10;
var copperWire = 0;
var copperWireReq = 5;

function update(){
  document.getElementById('ironOreText').innerHTML = ironOre;
  document.getElementById('ironIngotText').innerHTML = ironIng;
  document.getElementById('copperOreText').innerHTML = copperOre;
  document.getElementById('copperIngotText').innerHTML = copperIng;
  document.getElementById('ironGearText').innerHTML = ironGear;
  document.getElementById('copperWireText').innerHTML = copperWire;
}

function test(){
  alert("Just a test")
}

function MineIron(){
  ironOre = ironOre +1
  update()
}

function SmeltIron(){
  if (ironOre >= ironOreReq)
  {
    ironOre = ironOre - ironOreReq;
    ironIng = ironIng + 1;
    update()
  }
}

function MakeGear(){
  if (ironIng >= ironGearReq)
  {
    ironGear = ironGear + 1;
    ironIng = ironIng - ironGearReq;
    update();
  }
}

function MineCopper(){
  copperOre = copperOre +1
  update()
}

function SmeltCopper(){
  if (copperOre >= copperOreReq)
  {
    copperOre = copperOre - copperOreReq;
    copperIng = copperIng + 1;
    update()
  }
}

function MakeWire(){
  if (copperIng >= copperWireReq)
  {
    copperIng = copperIng - copperWireReq;
    copperWire++;
    update()
  }
}