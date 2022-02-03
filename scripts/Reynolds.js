  
  //////////////////////////////////////
  //
  //         Calculator
  //
  //////////////////////////////////////
  
  function solveReynolds(){
  
    //Reset error text
    resetErrorText();
  
    //Get Inputs
    var input_flow = document.getElementById("input_flow").value;
    var input_OD = document.getElementById("input_diameter").value;
    var input_thickness = document.getElementById("input_thickness").value;
    var input_density = document.getElementById("input_density").value;
    var input_viscosity = document.getElementById("input_viscosity").value;
  
    //Get Units
    var unit_flow = document.getElementById("unit_flow").value;
    var unit_OD = document.getElementById("unit_diameter").value;
    var unit_thickness = document.getElementById("unit_thickness").value;
    var unit_density = document.getElementById("unit_density").value;
    var unit_viscosity = document.getElementById("unit_viscosity").value;

    //Validate Numbers
    var validated = false;
    var errorText;
  
    if (!validatePositive(input_flow)){
      errorText = "Flow rate must be a positive number";
    }else if (!validatePositive(input_OD)){
      errorText = "Diameter must be a positive number";
    }else if (!validateNotNegative(input_thickness)){
      errorText = "Thickness must be a non-negative number";
    }else if (!validatePositive(input_density)){
      errorText = "Density must be a non-negative number";
    }else if (!validatePositive(input_viscosity)){
      errorText = "Viscosity must be a non-negative number";
    }else{
      validated=true;
    }


    //Troubleshoot Inputs & Units
      // var inputArr = [input_flow, input_OD, input_thickness,input_density,input_viscosity];
      // var unitArr = [unit_flow, unit_OD, unit_thickness,unit_density,unit_viscosity];
      // var inputArrLen = inputArr.length;
      
      // for (i = 0; i < inputArrLen; i++) {
      // alert("Input: " + inputArr[i] +" "+ unitArr[i]);
      // }
      // alert("Validation: " + validated +" "+ errorText);
  
    if(validated){
      //Convert Units
      var flow = convertFlow(input_flow,unit_flow,"ft3/s"); //ft3/sec
      var OD = convertLength(input_OD, unit_OD, "ft"); //ft
      var thickness = convertLength(input_thickness, unit_thickness, "ft"); //ft
      var density = convertDensity(input_density,unit_density,"lb/ft³"); //lb/ft3
      var viscosity = convertViscosity(input_viscosity,unit_viscosity,"lbm/ft/s");

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
      var Re = density*vel*ID/viscosity;
      var flowReg;
      var output;

      if(Re < 2000){
          flowReg = 'Laminar'
      }else if(Re >= 2000 && Re < 4000){
          flowReg = 'Transition'
      }else if(Re>= 4000){
          flowReg = 'Turbulent'
      }

      output = round0(Re);
      output = output.toLocaleString('en-US'); 


      //Display Answer
      document.getElementById("answer-block").style.display = "block";
      document.getElementById("answer-Re").innerHTML=output;
      document.getElementById("answer-regime").innerHTML=flowReg;

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
    document.getElementById("answer-block").style.display = "none";
    document.getElementById("answer-block-vel").style.display = "none";
    document.getElementById("answer-block-flow").style.display = "none";
    document.getElementById("answer-block-dia").style.display = "none";
  }