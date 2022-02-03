  
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
              input_solve_sel = "cylinder"
            }else if(i==1){
              input_solve_sel = "hemisphere"
            }else if(i==2){
              input_solve_sel = "cone"
            }else if(i==3){
              input_solve_sel = "cube"
            }
            break;// only one radio can be logically checked, don't check the rest
          }
        }


      //Try gathering Inputs
      try{   

        //Input a fluid parameters  
        var diameter = new EngValue("Diameter", document.getElementById("input_diameter").value, document.getElementById("unit_diameter").value);
        diameter.validateNumber(">0");
        diameter.convert("ft");
    
        var height = new EngValue("Height", document.getElementById("input_height").value, document.getElementById("unit_height").value);
        height.validateNumber(">0");
        height.convert("ft");

        var width = new EngValue("Width", document.getElementById("input_width").value, document.getElementById("unit_width").value);
        width.validateNumber(">0");
        width.convert("ft");

        var depth = new EngValue("Depth", document.getElementById("input_depth").value, document.getElementById("unit_depth").value);
        depth.validateNumber(">0");
        depth.convert("ft");

        //Calculation
        var radius = diameter.value/2;
        var answer_volume;

        if(input_solve_sel=="cylinder"){
          //V=PIr2h
          answer_volume= Math.PI*radius*radius*height.value;
        }else if(input_solve_sel=="hemisphere"){
          //V=4/3*pi*r^3
          answer_volume= 4/3*Math.PI*radius*radius*radius/2;
        }else if(input_solve_sel=="cone"){
          //V=pi*r^2*h/3
          answer_volume=Math.PI*radius*radius*height.value/3;
        }else if(input_solve_sel=="cube"){
          //V=pi*r^2*h/3
          answer_volume=height.value*width.value*depth.value;
        }else alert("Invalid input selection")

      //display answer
        volume = new EngValue("Volume", answer_volume,"ft³");
        volume.convert("l");
        document.getElementById("answer-block").style.display = "block";
        document.getElementById("answer-block-volume").style.display = "flex";
        document.getElementById('answer-volume').innerHTML=round2(volume.value);

         //Scroll to answer
         document.getElementById('answer-block').scrollIntoView({ behavior: 'smooth', block: 'end' });

      }catch(err){ //Display error text if validation fails.
        document.getElementById("error-text-box").style.display = "flex";
        document.getElementById('error-text').innerHTML=err.message;
      }
}



function toggleInputCylinder(){
  resetInputBlocks();
  document.getElementById("input-width").style.display = "none";
  document.getElementById("input-depth").style.display = "none";
  resetErrorText();
  resetAnswerBlock();
}

function toggleInputHemi(){
  resetInputBlocks();
  document.getElementById("input-height").style.display = "none";
  document.getElementById("input-width").style.display = "none";
  document.getElementById("input-depth").style.display = "none";
  resetErrorText();
  resetAnswerBlock();
}

function toggleInputCube(){
  resetInputBlocks();
  document.getElementById("input-diameter").style.display = "none";
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
    document.getElementById("input-height").style.display = "flex";
    document.getElementById("input-width").style.display = "flex";
    document.getElementById("input-depth").style.display = "flex";

  }

  
  function resetErrorText(){
    //Hide error codes
    document.getElementById("error-text-box").style.display = "none";
  }
  
  function resetAnswerBlock(){
    //Hide answers
    document.getElementById("answer-block").style.display = "none";

  }


    //////////////////////////////////////
  //
  //         Unit Changes
  //
  //////////////////////////////////////

  function changeAnswerVolumeUnits(){
    // //Convert
    volume.convert(document.getElementById("unit-volume").value);
    document.getElementById('answer-volume').innerHTML=round2(volume.value);
  }
