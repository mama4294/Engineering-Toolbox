
//////////////////////////////////////
//
//         Unit Conversions
//
//////////////////////////////////////


//Temp

function celsius_to_fahrenheit( temperature ) {
    var fahrenheit = (temperature * 1.8) + 32;
    return fahrenheit;
  }
  
  //Length
  
  function inch_to_feet( input ) {
    var feet = input/12;
    return feet;
  }

  function inch_to_cm (input){
    var cm= input*2.54;
    return cm;
  }

  function feet_to_inch( input ) {
    var feet = input*12;
    return feet;
  }
  
  function cm_to_feet( input ) {
    var feet = input/30.48;
    return feet;
  }

  function mile_to_feet( input ) {
    var feet = input*5280;
    return feet;
  }

  function cm_to_inch (input){
    var inch = input/2.54;
    return inch;
  }

  function mm_to_feet (input){
    var ft = input/304.8;
    return ft;
  }
  
  function m_to_feet( input ) {
    var feet = input*3.28084;
    return feet;
  }

  function km_to_feet( input ) {
    var feet = input*3280.84;
    return feet;
  }

  function um_to_feet( input ) {
    var feet = input/304800;
    return feet;
  }

  function uin_to_feet( input ) {
    var feet = input/(12*1000000);
    return feet;
  }

  function feet_to_m( input ) {
    var m = input*3.28084;
    return m;
  }
  
  
  //Volume
  
  function l_to_ft3( input ) {
    var ft3 = input/28.3168;
    return ft3;
  }
  
  function gal_to_ft3( input ) {
    var ft3 = input/7.48052;
    return ft3;
  }

  function ft3_to_l (input){
    var l = input*28.3168;
    return l;
  }

  function l_to_gal (input){
    var gal = input/3.78541;
    return gal;
  }

  function gal_to_l (input){
    var l = input*3.78541;
    return l;
  }

  //Pressure Calcs

  function psf_to_psi (input){
    var p = input/144;
    return p;
  }

  function bar_to_psi (input){
    var p = input*14.5038;
    return p;
  }

  function psi_to_bar (input){
    var p = input/14.5038;
    return p;
  }

  function kpa_to_psi (input){
    var p = input/6.89476;
    return p;
  }

  function psi_to_kpa (input){
    var p = input*6.89476;
    return p;
  }

  function inH2O_to_psi (input){
    var p = input/27.7076;
    return p;
  }

  function psi_to_inH2O (input){
    var p = input*27.7076;
    return p;
  }

  function bar_to_kPa (input){
    var p = input*100;
    return p;
  }

  function kPa_to_bar (input){
    var p = input/100;
    return p;
  }

  function kPa_to_inH2O (input){
    var p = input*4.01865;
    return p;
  }

  function inH2O_to_kPa (input){
    var p = input/4.01865;
    return p;
  }

  function bar_to_inH2O (input){
    var p = input*401.865;
    return p;
  }

  function inH2O_to_bar (input){
    var p = input*401.865;
    return p;
  }

  
  //Overall Conversions

  function convert(input, from_unit, to_unit){
    arrLength = ["ft","in","cm","m","ft/s","m/s"];
    arrFlow = ["lpm","gpm","ft3/min","ft3/s","m³/s"];
    arrVolume = ["l","gal","ft³","m³"];
    arrDensity = ["kg/m³","lb/ft³","kg/L","g/cm³"];
    arrViscosity = ["cP","lbm/ft/s","Pas"];
    arrPressure = ["psi","psf","bar","inH₂O","kPa"];
    arrTemp = ["°C","°F"];
    arrArea = ["ft²","m²"];
    arrMisc = ["kJ/(kg°C)","BTU/(lb°F)","W/(m²°C)","Btu/(hr*ft²°F)","rpm","RPM"];


    //Convert
    if(arrLength.includes(to_unit)) return convertLength(input,from_unit, to_unit);
    if(arrFlow.includes(to_unit)) return convertFlow(input,from_unit, to_unit);
    if(arrVolume.includes(to_unit)) return convertVolume(input,from_unit, to_unit);
    if(arrDensity.includes(to_unit)) return convertDensity(input,from_unit, to_unit);
    if(arrViscosity.includes(to_unit)) return convertViscosity(input,from_unit, to_unit);
    if(arrPressure.includes(to_unit)) return convertPressure(input,from_unit, to_unit);
    if(arrTemp.includes(to_unit)) return convertTemp(input,from_unit, to_unit);
    if(arrArea.includes(to_unit)) return convertArea(input,from_unit, to_unit);
    if(arrMisc.includes(to_unit)) return convertMisc(input,from_unit, to_unit);
    

    alert("Missing conversion factor for converting "+ from_unit+ " to "+ to_unit);

  }

  function convertArea (input,from_unit, to_unit){
    var output;
    if(from_unit == to_unit){
      output = input;
    }else if(from_unit == "ft²" && to_unit == "m²"){
      output = input/10.7639;
    }else if(from_unit == "m²" && to_unit == "ft²"){
      output = input*10.7639;
    }else{
      alert("Miscellaneous conversion error converting "+from_unit+" to "+to_unit);
      output=NAN;
    }
    return output;
  }

  function convertMisc (input,from_unit, to_unit){
    var output;
    if(from_unit == to_unit){
      output = input;
    }else if(from_unit == "kJ/(kg°C)" && to_unit == "BTU/(lb°F)"){
      output = input*0.238845896627;
    }else if(from_unit == "BTU/(lb°F)" && to_unit == "kJ/(kg°C)"){
      output = input/0.238845896627;
    }else{
      alert("Miscellaneous conversion error converting "+from_unit+" to "+to_unit);
      output=NAN;
    }
    return output;
  }
  

  
  function length_to_feet (input,unit){
    var ft;
    if(unit == "ft"){
      ft=input;
    }else if(unit == "in"){
      ft=inch_to_feet(input);
    }else if(unit == "cm"){
      ft=cm_to_feet(input);
    }else if(unit == "ft/s"){
      ft=input;
    }else if(unit == "m/s"){
      ft=m_to_feet(input);
    }else{
      alert("conversion error");
      ft=NAN;
    }
    return ft;
  }
  
  function flow_to_ft3perS (input,unit){
    var flow;
    if(unit == "lpm"){
      flow=l_to_ft3(input)/60;
    }else if(unit == "gpm"){
      flow=gal_to_ft3(input)/60;
    }else{
      alert("conversion error");
      flow=NAN;
    }
    return flow;
  }


  function convertFlow (input,from_unit, to_unit){
    var flow;
    if(from_unit == to_unit){
      flow = input;
    }else if(from_unit == "lpm" && to_unit == "gpm"){
      flow = l_to_gal(input);
    }else if(from_unit == "lpm" && to_unit == "ft3/min"){
      flow = l_to_ft3(input);
    }else if(from_unit == "lpm" && to_unit == "ft3/s"){
      flow = l_to_ft3(input)/60;
    }else if(from_unit == "gpm" && to_unit == "lpm"){
      flow = gal_to_l(input);
    }else if(from_unit == "gpm" && to_unit == "ft3/min"){
      flow = gal_to_ft3(input);
    }else if(from_unit == "gpm" && to_unit == "ft3/s"){
      flow = gal_to_ft3(input)/60;
    }else if(from_unit == "lpm" && to_unit == "m³/s"){
      flow = input/60000;
    }else if(from_unit == "m³/s" && to_unit == "lpm"){
      flow = input*60000;
    }else if(from_unit == "gpm" && to_unit == "m³/s"){
      flow = input/15850.323141;
    }else if(from_unit == "m³/s" && to_unit == "gpm"){
      flow = input*15850.323141;
    }else{
      alert("conversion error");
      flow=NAN;
    }
    return flow;
  }

  function convertVolume (input,from_unit, to_unit){
    var output;
    if(from_unit == to_unit){
      output = input;
    }else if(from_unit == "l" && to_unit == "gal"){
      output = l_to_gal(input);
    }else if(from_unit == "l" && to_unit == "ft³"){
      output = l_to_ft3(input);
    }else if(from_unit == "gal" && to_unit == "l"){
      output = gal_to_l(input);
    }else if(from_unit == "gal" && to_unit == "ft³"){
      output = gal_to_ft3(input);
    }else if(from_unit == "ft³" && to_unit == "gal"){
      output = input* 7.48052;
    }else if(from_unit == "ft³" && to_unit == "l"){
      output = input* 28.316848545862;
    }else if(from_unit == "ft³" && to_unit == "m³"){
      output = input* 0.0283168;
    }else if(from_unit == "l" && to_unit == "m³"){
      output = input/1000;
    }else if(from_unit == "m³" && to_unit == "l"){
      output = input*1000;
    }else if(from_unit == "gal" && to_unit == "m³"){
      output = input/264.172;
    }else if(from_unit == "m³" && to_unit == "gal"){
      output = input*264.172;
    }else{
      alert("Volume conversion error");
      output=NAN;
    }
    return output;
  }


  function convertTemp (input,from_unit, to_unit){
    var output;
    if(from_unit == to_unit){
      output = input;
    }else if(from_unit == "°C" && to_unit == "°F"){
      output = input*1.8+32;
    }else if(from_unit == "°F" && to_unit == "°C"){
      output = (input-32)/1.8;
    }else{
      alert("Temperature conversion error");
      output=NAN;
    }
    return output;
  }

  function convertLength (input,from_unit, to_unit){
    var length;
    if(from_unit == to_unit){
      length = input;
    }else if(from_unit == "in" && to_unit == "cm"){
      length = inch_to_cm(input);
    }else if(from_unit == "in" && to_unit == "m"){
      length = input/39.3701;
    }else if(from_unit == "cm" && to_unit == "in"){
      length = cm_to_inch(input);
    }else if(from_unit == "cm" && to_unit == "m"){
      length = input/100;
    }else if(from_unit == "in" && to_unit == "ft"){
      length = inch_to_feet(input);
    }else if(from_unit == "cm" && to_unit == "ft"){
      length = cm_to_feet(input);
    }else if(from_unit == "mm" && to_unit == "ft"){
      length = mm_to_feet(input);
    }else if((from_unit == "m" && to_unit == "ft") || (from_unit == "m/s" && to_unit == "ft/s")){
      length = m_to_feet(input);
    }else if((from_unit == "ft" && to_unit == "m") || (from_unit == "ft/s" && to_unit == "m/s") ){
      length = feet_to_m(input);
    }else if(from_unit == "miles" && to_unit == "ft"){
      length = mile_to_feet(input);
    }else if(from_unit == "μm" && to_unit == "ft"){
      length = um_to_feet(input);
    }else if(from_unit == "μin" && to_unit == "ft"){
      length = uin_to_feet(input);
    }else{
      alert("Length conversion error");
      length=NAN;
    }
    return length;
  }


  function convertDensity (input,from_unit, to_unit){
    var density;
    if(from_unit == to_unit){
      density = input;
    }else if(from_unit == "kg/m³" && to_unit == "lb/ft³"){
      density = input*0.062428;
    }else if(from_unit == "lb/ft³" && to_unit == "kg/m³"){
      density = input/0.062428;
    }else if((from_unit == "kg/L" || from_unit == "g/cm³")  && to_unit == "lb/ft³"){
      density = input*62.428;
    }else if(from_unit == "lb/ft³" && (to_unit == "kg/L" || to_unit == "g/cm³")){
      density = input/62.428;
    }else if(from_unit == "kg/m³" && to_unit == "kg/L"){
      density = input*1000;
    }else if(from_unit == "kg/L" && to_unit == "kg/m³"){
      density = input/1000;
    }else{
      alert("Density conversion error");
      density=NAN;
    }
    return density;
  }

  function convertViscosity (input,from_unit, to_unit){
    var viscosity;
    if(from_unit == to_unit){
      viscosity = input;
    }else if(from_unit == "cP" && to_unit == "lbm/ft/s"){
      viscosity = input/1488.1639;
    }else if(from_unit == "lbm/ft/s" && to_unit == "cP"){
      viscosity = input*1488.1639;
    }else if(from_unit == "Pas" && to_unit == "lbm/ft/s"){
      viscosity = input/1.4881639;
    }else if(from_unit == "lbm/ft/s" && to_unit == "Pas"){
      viscosity = input*1.4881639;
    }else if(from_unit == "cP" && to_unit == "Pas"){
      viscosity = input/1000;
    }else if(from_unit == "Pas" && to_unit == "cP"){
      viscosity = input*1000;
    }else{
      alert("Viscosity conversion error");
      viscosity=NAN;
    }
    return viscosity;
  }

  function convertPressure (input,from_unit, to_unit){
    var pressure;
    if(from_unit == to_unit){
      pressure = input;
    }else if(from_unit == "psf" && to_unit == "psi"){
      pressure = psf_to_psi(input);
    }else if(from_unit == "bar" && to_unit == "psi"){
      pressure = bar_to_psi(input);
    }else if(from_unit == "kPa" && to_unit == "psi"){
      pressure = kpa_to_psi(input);
    }else if(from_unit == "inH₂O" && to_unit == "psi"){
      pressure = inH2O_to_psi(input);
    }else if(from_unit == "psi" && to_unit == "bar"){
      pressure = psi_to_bar(input);
    }else if(from_unit == "psi" && to_unit == "kPa"){
      pressure = psi_to_kpa(input);
    }else if(from_unit == "psi" && to_unit == "inH₂O"){
      pressure = psi_to_inH2O(input);
    }else if(from_unit == "bar" && to_unit == "inH₂O"){
      pressure = bar_to_inH2O(input);
    }else if(from_unit == "bar" && to_unit == "kPa"){
      pressure = bar_to_kPa(input);
    }else if(from_unit == "kPa" && to_unit == "bar"){
      pressure = kPa_to_bar(input);
    }else if(from_unit == "kPa" && to_unit == "inH₂O"){
      pressure = kPa_to_inH2O(input);
    }else if(from_unit == "inH₂O" && to_unit == "bar"){
      pressure = inH2O_to_bar(input);
    }else if(from_unit == "inH₂O" && to_unit == "kPa"){
      pressure = inH2O_to_kPa(input);
    }else{
      alert("Pressure conversion error");
      pressure=NAN;
    }
    return pressure;
  }

  
  //////////////////////////////////////
  //
  //         Engineering Conversions
  //
  //////////////////////////////////////
  
  function calcAreaCircle (diameter){
    return Math.PI*Math.pow(diameter/2,2);
  }


//////////////////////////////////////
//
//         Validation Functions
//
//////////////////////////////////////

function validatePositive(input){
  if(isNaN(input)){
    return false;
  }else if (input<=0){
    return false;
  }else{
    return true;
  }
}

function validateNotNegative(input){
  if(isNaN(input)){
    return false;
  }else if (input<0){
    return false;
  }else{
    return true;
  }
}

//////////////////////////////////////
//
//   Number Formatting Functions
//
//////////////////////////////////////

function round2(num){
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function round0(num){
  return Math.round(num);
}
