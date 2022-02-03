  
  //////////////////////////////////////
  //
  //         Calculator
  //
  //////////////////////////////////////
  
  function solvePressureDrop(){
    //Reset error text
    resetErrorText();
  
    //Get Inputs
    var input_length = document.getElementById("input_length").value;
    var input_elevation = document.getElementById("input_elevation").value;
    var input_k = document.getElementById("input_k").value;
    var input_flow = document.getElementById("input_flow").value;
    var input_OD = document.getElementById("input_diameter").value;
    var input_thickness = document.getElementById("input_thickness").value;
    var input_density = document.getElementById("input_density").value;
    var input_viscosity = document.getElementById("input_viscosity").value;
    var input_roughness = document.getElementById("input_roughness").value;

    //Get Units
    var unit_length = document.getElementById("unit_length").value;
    var unit_elevation = document.getElementById("unit_elevation").value;
    var unit_flow = document.getElementById("unit_flow").value;
    var unit_OD = document.getElementById("unit_diameter").value;
    var unit_thickness = document.getElementById("unit_thickness").value;
    var unit_density = document.getElementById("unit_density").value;
    var unit_viscosity = document.getElementById("unit_viscosity").value;
    var unit_roughness = document.getElementById("unit_roughness").value;


    // Troubleshoot Inputs & Units
    // var inputArr = [input_length, input_elevation, input_k];
    // var unitArr = [unit_length, unit_elevation, unit_flow];
    // var inputArrLen = inputArr.length;
    
    // for (i = 0; i < inputArrLen; i++) {
    // alert("Input: " + inputArr[i] +" "+ unitArr[i]);
    // }
    // alert("Validation: " + validated +" "+ errorText);


    //Validate Numbers
    var validated = false;
    var errorText;
  
    if (!validatePositive(input_length)){
      errorText = "Pipe length must be a positive number";
    }else if (isNaN(input_elevation)){
      errorText = "Elevation rise must be a number";
    }else if (!validateNotNegative(input_k)){
      errorText = "ΣK must be a non-negative number";
    }else if (!validatePositive(input_flow)){
      errorText = "Flow rate must be a positive number";
    }else if (!validatePositive(input_OD)){
      errorText = "Diameter must be a positive number";
    }else if (!validateNotNegative(input_thickness)){
      errorText = "Thickness must be a non-negative number";
    }else if (!validatePositive(input_density)){
      errorText = "Density must be a non-negative number";
    }else if (!validatePositive(input_viscosity)){
      errorText = "Viscosity must be a non-negative number";
    }else if (!validatePositive(input_roughness)){
      errorText = "Surface roughness must be a non-negative number";
    }else{
      validated=true;
    }


    if(validated){
      //Convert Units
      var length = convertLength(input_length, unit_length, "ft"); //ft
      var elevation = convertLength(input_elevation, unit_elevation, "ft"); //ft
      var flow = convertFlow(input_flow,unit_flow,"ft3/s"); //ft3/sec
      var OD = convertLength(input_OD, unit_OD, "ft"); //ft
      var thickness = convertLength(input_thickness, unit_thickness, "ft"); //ft
      var density = convertDensity(input_density,unit_density,"lb/ft³"); //lb/ft3
      var viscosity = convertViscosity(input_viscosity,unit_viscosity,"lbm/ft/s");
      var roughness = convertLength(input_roughness, unit_roughness, "ft"); //ft

      //2nd round of validation
      if(2*thickness>=OD){
        validated = false;
        errorText = "Pipe thickness is too large for diameter";
      }

      if(validated){

      //Calculation
      var ID = OD - 2 * thickness; //ft
      var area = calcAreaCircle(ID); //ft2
      var vel = flow/area; //ft/s
      var relative_roughness=roughness/ID; //unitless
      // alert("k: "+ roughness + ", ID: "+ ID +", k/d: "+ relative_roughness);
      var Re = density*vel*ID/viscosity;
      var flowReg, f_factor;
      var output, output2;


      if(Re < 2000){
          flowReg = 'Laminar'
      }else if(Re >= 2000 && Re < 4000){
          flowReg = 'Transition'
      }else if(Re>= 4000){
          flowReg = 'Turbulent'
      }

      //Solve for friction factor
      if(flowReg=='Laminar'){
        f_factor = 64/Re;
      }else{ //Iterate Colbrook equation
          var f_previous = 0.5; //inital guess
          var i;
          for (i = 0; i < 10; i++) { //10 iterations
              f_factor = colebrook(f_previous,Re,relative_roughness);
              f_previous = f_factor;
          }
      }


      //Pressure Drops
      var g = 32.1740; //ft/s2
      var dP_elevation = convertPressure(density*elevation,"psf","psi");
      var dP_length = convertPressure(f_factor*length/ID*(1/2)*density*vel*vel/g,"psf","psi");
      var dP_fittings = convertPressure(input_k*(1/2)*density*vel*vel/g,"psf","psi");
      var dP = dP_elevation + dP_length + dP_fittings;


      //Round Answers
      var ans_dP_elevation = dP_elevation.toFixed(2);
      var ans_dP_length = dP_length.toFixed(2);
      var ans_dP_fittings = dP_fittings.toFixed(2);
      var ans_dP = dP.toFixed(2);

      output = round0(Re);
      output = output.toLocaleString('en-US'); 

      //Display Answer
      document.getElementById("answer-block").style.display = "block";
      document.getElementById("answer-1").innerHTML=flowReg;
      document.getElementById("answer-frictionfact").innerHTML=f_factor.toFixed(5);
      // document.getElementById("answer-2").innerHTML=ans_dP_elevation;
      // document.getElementById("answer-3").innerHTML=ans_dP_length;
      // document.getElementById("answer-4").innerHTML=ans_dP_fittings;
      document.getElementById("answer-5").innerHTML=ans_dP;

      //Scroll to answer
      document.getElementById('answer-block').scrollIntoView({ behavior: 'smooth', block: 'end' });


    }
  }

    if (!validated){
      //Display Error Text
      document.getElementById("error-text-box").style.display = "flex";
      document.getElementById('error-text').innerHTML=errorText;
    }
  
  //End Solve
}
  
  //////////////////////////////////////
  //
  //         Reset Functions
  //
  //////////////////////////////////////
  
  
  function resetValue(elementID, value){
    var x = document.getElementById(elementID).value;
    if(x<=0){
      document.getElementById(elementID).value=value;
    }
  
  }
  
  function resetErrorText(){
    //Hide error codes
    document.getElementById("error-text-box").style.display = "none";
  }
  
  function resetAnswerBlock(){
    //Hide error codes
    document.getElementById("answer-block-1").style.display = "none";
    document.getElementById("answer-block-2").style.display = "none";
    document.getElementById("answer-block-3").style.display = "none";
    document.getElementById("answer-block-4").style.display = "none";
    document.getElementById("answer-block-5").style.display = "none";
  }

  function colebrook(f_last, Re, eD){ //function of previous friction factor, Reynolds number, and relative roughness
    return Math.sqrt(1/(-2*Math.log(2.51/(Re*Math.sqrt(f_last))+eD/3.72)));
    }


function getAnswerPressUnit(){
  current_Answer_Unit_Press = document.getElementById("unit_dP").value;
}

function changeAnswerPressUnits(){
  //Get inputs
  var current_Answer_value = document.getElementById("answer-5").textContent;
  current_Answer_Unit = current_Answer_Unit_Press;
  var new_Answer_Unit = document.getElementById("unit_dP").value;

  //Convert
  var answer_value=convertPressure(current_Answer_value,current_Answer_Unit,new_Answer_Unit);

  //Round and set output
  var output = round2(answer_value);
  document.getElementById('answer-5').innerHTML=output;

  //Reset current unit
  current_Answer_Unit_Press=new_Answer_Unit;
}