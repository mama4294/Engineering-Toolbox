
//////////////////////////////////////
//
//         Solve Selection
//
//////////////////////////////////////

//Handle changing of input selection radio buttons
function toggleInputFlow(){
    document.getElementById("input-block-vel").style.display = "flex";
    document.getElementById("input-block-flow").style.display = "none";
    document.getElementById("input-block-diameter").style.display = "flex";
    resetValue("input_flow",60);
    resetErrorText();
    resetAnswerBlock();
  }
  
  function toggleInputVel(){
    document.getElementById("input-block-vel").style.display = "none";
    document.getElementById("input-block-flow").style.display = "flex";
    document.getElementById("input-block-diameter").style.display = "flex";
    resetValue("input_vel",5);
    resetErrorText();
    resetAnswerBlock();
  }
  
  function toggleInputDia(){
    document.getElementById("input-block-vel").style.display = "flex";
    document.getElementById("input-block-flow").style.display = "flex";
    document.getElementById("input-block-diameter").style.display = "none";
    resetValue("input_diameter",0.065);
    resetErrorText();
    resetAnswerBlock();
  }
  
  
  //////////////////////////////////////
  //
  //         Calculator
  //
  //////////////////////////////////////
  
  function solvePipeFlow(){
  
    //Reset error text
    resetErrorText()
  
    //Get solve selection
    var input_solve_sel;
    var radios = document.getElementsByName('input_sel');
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        if(i==0){
          input_solve_sel = "velocity"
        }else if(i==1){
          input_solve_sel = "flow"
        }else if(i==2){
          input_solve_sel = "diameter"
        }
        break;// only one radio can be logically checked, don't check the rest
      }
    }
  
    //Get Inputs
    var input_vel = document.getElementById("input_vel").value;
    var input_flow = document.getElementById("input_flow").value;
    var input_OD = document.getElementById("input_diameter").value;
    var input_thickness = document.getElementById("input_thickness").value;
  
    //Get Units
    var unit_vel = document.getElementById("unit_vel").value;
    var unit_flow = document.getElementById("unit_flow").value;
    var unit_OD = document.getElementById("unit_diameter").value;
    var unit_thickness = document.getElementById("unit_thickness").value;
  
    //Validate Numbers
    var validated = false;
    var errorText;
  
    if(!validatePositive(input_vel)){
      errorText = "Velocity must be a positive number";
    }else if (!validatePositive(input_flow)){
      errorText = "Flow rate must be a positive number";
    }else if (!validatePositive(input_OD)){
      errorText = "Diameter must be a positive number";
    }else if (!validateNotNegative(input_thickness)){
      errorText = "Thickness must be a non-negative number";
    }else{
      validated=true;
    }
  
    if(validated){
      //Convert Units
      var vel = length_to_feet(input_vel, unit_vel); //ft/s
      var flow = flow_to_ft3perS(input_flow,unit_flow); //ft3/sec
      var OD = length_to_feet(input_OD,unit_OD);           //ft
      var thickness = length_to_feet(input_thickness, unit_thickness); //ft
      var ID;
      var area;
      var output;
   
  
      if(input_solve_sel=="velocity"){
        //Calculate 
        ID = OD - 2 * thickness; //ft
        area = calcAreaCircle(ID); //ft2
        vel = flow/area; //ft/s
  
        //2nd round of validation
        if(2*thickness>=OD){
          validated = false;
          errorText = "Pipe thickness is too large for diameter";
        }
  
        //Convert and Round Answer units
        var Answer_Unit = document.getElementById("unit_answer_vel").value;
        output = convertLength(vel,"ft/s",Answer_Unit);
        output = round2(output);
  
        //Display Velocity Answer
        if(validated){
          document.getElementById("answer-block").style.display = "block";
          document.getElementById("answer-block-vel").style.display = "flex";
          document.getElementById("answer-vel").innerHTML=output;
  
          //Scroll to answer
          document.getElementById('answer-block').scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
  
      }else if(input_solve_sel== "flow"){
  
        //2nd round of validation
        if(2*thickness>=OD){
          validated = false;
          errorText = "Pipe thickness is too large for diameter";
        }
  
        //Calculate 
        ID = OD - 2 * thickness; //ft
        area = calcAreaCircle(ID); //ft2
        flow = vel*area; //ft3/s
        flow = ft3_to_l(flow)*60; //lpm
  
        //Convert and Round Answer units
        var Answer_Unit = document.getElementById("unit_answer_flow").value;
        output = convertFlow(flow,"lpm",Answer_Unit);
        output = round2(output);
  
        //Display Velocity Answer
        if(validated){
          document.getElementById("answer-block").style.display = "block";
          document.getElementById("answer-block-flow").style.display = "flex";
          document.getElementById("answer-flow").innerHTML=output;
  
          //Scroll to answer
          document.getElementById('answer-block').scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
  
      }else if(input_solve_sel== "diameter"){
  
    
  
        //Calculate 
        area = flow/vel; //ft2
        ID = Math.sqrt(area/Math.PI)*2; //ft
        OD = ID + 2 * thickness; //ft
        OD = feet_to_inch(OD); //inch
  
  
        //Convert and Round Answer units
        var Answer_Unit = document.getElementById("unit_answer_dia").value;
        output = convertLength(OD,"in",Answer_Unit);
        output = round2(output);
  
        //Display Velocity Answer
        if(validated){
          document.getElementById("answer-block").style.display = "block";
          document.getElementById("answer-block-dia").style.display = "flex";
          document.getElementById("answer-dia").innerHTML=output;
  
          //Scroll to answer
          document.getElementById('answer-block').scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
  
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
  
  
  //////////////////////////////////////
  //
  //         Answer Units
  //
  //////////////////////////////////////
  
  var current_answer_Unit_Vel;
  var current_answer_Unit_Flow;
  var current_answer_Unit_OD;
  
  function getAnswerVelUnit(){
    current_Answer_Unit_Vel = document.getElementById("unit_answer_vel").value;
  }
  
  function getAnswerFlowUnit(){
    current_Answer_Unit_Flow = document.getElementById("unit_answer_flow").value;
  }
  
  function getAnswerDiaUnit(){
    current_Answer_Unit_OD = document.getElementById("unit_answer_dia").value;
  }
  
  function changeAnswerVelUnits(){
    //Get inputs
    var current_Answer_value = document.getElementById("answer-vel").textContent;
    current_Answer_Unit = current_Answer_Unit_Vel;
    var new_Answer_Unit = document.getElementById("unit_answer_vel").value;
  
    //Convert
    var answer_value=convertLength(current_Answer_value,current_Answer_Unit,new_Answer_Unit);
  
    //Round and set output
    var output = round2(answer_value);
    document.getElementById('answer-vel').innerHTML=output;
  
    //Reset current unit
    current_Answer_Unit_Vel=new_Answer_Unit;
  }
  
  function changeAnswerFlowUnits(){
    //Get inputs
    var current_Answer_value = document.getElementById("answer-flow").textContent;
    current_Answer_Unit = current_Answer_Unit_Flow;
    var new_Answer_Unit = document.getElementById("unit_answer_flow").value;
  
    //Convert
    var answer_value=convertFlow(current_Answer_value,current_Answer_Unit,new_Answer_Unit);
  
    //Round and set output
    var output = round2(answer_value);
    document.getElementById('answer-flow').innerHTML=output;
  
    //Reset current unit
    current_Answer_Unit_Flow=new_Answer_Unit;
  }
  
  function changeAnswerDiaUnits(){
    //Get inputs
    var current_Answer_value = document.getElementById("answer-dia").textContent;
    current_Answer_Unit = current_Answer_Unit_OD;
    var new_Answer_Unit = document.getElementById("unit_answer_dia").value;
  
    //Convert
    var answer_value=convertLength(current_Answer_value,current_Answer_Unit,new_Answer_Unit);
  
    //Round and set output
    var output = round2(answer_value);
    document.getElementById('answer-dia').innerHTML=output;
  
    //Reset current unit
    current_Answer_Unit_OD=new_Answer_Unit;
  }