  
  //////////////////////////////////////
  //
  //         Calculator
  //
  //////////////////////////////////////
  var myChart, ctx;
  var validated = false;
  var volume;
  
  function EngValue(parameter,inputValue,inputUnit){
    this.parameter = parameter;
    this.inputValue = inputValue;
    this.inputUnit = inputUnit;
    var value;
    var unit;

    //Defined Variables
    Object.defineProperty(this,'value',{
      get: function() {return Number(value)}
    });
    Object.defineProperty(this,'unit',{
      get: function() {return unit}
    });

    //Funcitons
    this.validateNumber = function(validationType){
      if(validationType="number"){
        if(isNaN(this.inputValue)) throw new Error(this.parameter + " must be a number");
      }
      else if(validationType=">=0"){
        if(this.inputValue < 0)throw new Error(this.parameter + " must be positive");
      }
      else if(validationType=">0"){
        if(this.inputValue <= 0)throw new Error(this.parameter + " must be greater than zero");
      }
    }

    this.convert = function(to_unit){
      value = convert(this.inputValue,this.inputUnit,to_unit)
      unit = to_unit;
    }

    this.log = function(){
      console.log(this);
    }

}

function solveCylinder(){
  resetErrorText();

        //Get solve selection
        var input_solve_sel;
        var radios = document.getElementsByName('input_sel');
        for (var i = 0, length = radios.length; i < length; i++) {
          if (radios[i].checked) {
            if(i==0){
              input_solve_sel = "tip speed"
            }else if(i==1){
              input_solve_sel = "rpm"
            }
            break;// only one radio can be logically checked, don't check the rest
          }
        }


      //Try gathering Inputs
      try{   

        //Input a fluid parameters  
        var diameter = new EngValue("Diameter", document.getElementById("input_diameter").value, document.getElementById("unit_diameter").value);
        diameter.validateNumber(">0");
        diameter.convert("m");
    
        var rpm = new EngValue("RPM", document.getElementById("input_rpm").value, document.getElementById("unit_rpm").value);
        rpm.validateNumber(">0");
        rpm.convert("rpm");

        var tipspeed = new EngValue("Tip Speed", document.getElementById("input_tipspeed").value, document.getElementById("unit_tipspeed").value);
        tipspeed.validateNumber(">0");
        tipspeed.convert("m/s");


        //Calculation

        if(input_solve_sel=="tip speed"){
          //TS=PI*D*RPM
          ans_tipSpeed = new EngValue("Tip Speed", Math.PI*diameter.value*rpm.value/60,"m/s");
          ans_tipSpeed.convert("m/s");
          document.getElementById("answer-block").style.display = "block";
          document.getElementById("answer-block-tipspeed").style.display = "flex";
          document.getElementById('answer-tipspeed').innerHTML=round2(ans_tipSpeed.value);
        }else if(input_solve_sel=="rpm"){
          //RPM = TS / PI * D
          ans_rpm = new EngValue("RPM", tipspeed.value*60 / (Math.PI * diameter.value),"rpm");
          ans_rpm.convert("rpm");
          document.getElementById("answer-block").style.display = "block";
          document.getElementById("answer-block-rpm").style.display = "flex";
          document.getElementById('answer-rpm').innerHTML=round2(ans_rpm.value);
        }else alert("Invalid input selection")

         //Scroll to answer
         document.getElementById('answer-block').scrollIntoView({ behavior: 'smooth', block: 'end' });

      }catch(err){ //Display error text if validation fails.
        document.getElementById("error-text-box").style.display = "flex";
        document.getElementById('error-text').innerHTML=err.message;
      }
}



function toggleInput1(){
  resetInputBlocks();
  document.getElementById("input-tipspeed").style.display = "none";
  resetErrorText();
  resetAnswerBlock();
}

function toggleInput2(){
  resetInputBlocks();
  document.getElementById("input-rpm").style.display = "none";
  resetErrorText();
  resetAnswerBlock();
}

  
  
  //End Solve
  
  //////////////////////////////////////
  //
  //         Reset Functions
  //
  //////////////////////////////////////
  


  function resetInputBlocks(){
    //Show all blocks
    document.getElementById("input-diameter").style.display = "flex";   
    document.getElementById("input-tipspeed").style.display = "flex";
    document.getElementById("input-rpm").style.display = "flex";

  }

  
  function resetErrorText(){
    //Hide error codes
    document.getElementById("error-text-box").style.display = "none";
  }
  
  function resetAnswerBlock(){
    //Hide answers
    document.getElementById("answer-block").style.display = "none";
    document.getElementById("answer-block-tipspeed").style.display = "none";
    document.getElementById("answer-block-rpm").style.display = "none";

  }


    //////////////////////////////////////
  //
  //         Unit Changes
  //
  //////////////////////////////////////

  function changeAnswerUnits(){
    // //Convert
    ans_tipSpeed.convert(document.getElementById("unit-answer-tipspeed").value);
    document.getElementById('answer-tipspeed').innerHTML=round2(ans_tipSpeed.value);
  }
