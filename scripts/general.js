  
  //////////////////////////////////////
  //
  //         Inerpolation Calculator
  //
  //////////////////////////////////////
  var myChart, ctx;

  function toggleInputX(){
    document.getElementById("block-x").style.display = "flex";
    document.getElementById("block-y").style.display = "none";
    document.getElementById("answer-row").style.alignItems = "flex-start";
    document.getElementById("answer-row").style.flexDirection = "row";

    // resetValue("input_flow",60);
    // resetErrorText();
    resetAnswerBlock();
  }

  function toggleInputY(){
    document.getElementById("block-x").style.display = "none";
    document.getElementById("block-y").style.display = "flex";
    document.getElementById("answer-row").style.alignItems = "flex-end";
    document.getElementById("answer-row").style.flexDirection = "row-reverse";
  
    // resetValue("input_flow",60);
    // resetErrorText();
    resetAnswerBlock();
  }


  function solveLinearInterp(){
    //Reset error text
    resetErrorText();

    //Get solve selection
    var input_solve_sel;
    var radios = document.getElementsByName('input_sel');
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        if(i==0){
          input_solve_sel = "y"
        }else if(i==1){
          input_solve_sel = "x"
        }
        break;// only one radio can be logically checked, don't check the rest
      }
    }
  
    //Get Inputs
    var input_x1 = document.getElementById("input_x1").value;
    var input_y1 = document.getElementById("input_y1").value;
    var input_x2 = document.getElementById("input_x2").value;
    var input_y2 = document.getElementById("input_y2").value;
    var input_x = document.getElementById("input_x").value;
    var input_y = document.getElementById("input_y").value;

    //Validate Numbers
    var validated = false;
    var errorText;
  
    if(isNaN(input_x1)){
      errorText = "X1 must be a number";
    }else if(isNaN(input_y1)){
      errorText = "Y1 must be a number";
    }else if(isNaN(input_x2)){
      errorText = "X2 must be a number";
    }else if(isNaN(input_y2)){
      errorText = "Y2 must be a number";
    }else if(isNaN(input_x)){
      errorText = "Target X must be a number";
    }else if(isNaN(input_y)){
      errorText = "Target Y must be a number";
    }else{
      validated=true;
    }

  
    if(validated){
     //Calculation

     if(input_solve_sel=="y"){
      var answer_y = Number((input_x-input_x1)*(input_y2-input_y1)/(input_x2-input_x1))+Number(input_y1);
      var output = answer_y;
      var point3 = {x: input_x, y: answer_y, label:"Interpolated Point"};
 
       //Display Answer
       document.getElementById("answer-block-y").style.display = "block";
       document.getElementById("answer_y").innerHTML=output;
        showGraph();

     }else if(input_solve_sel=="x"){
      var answer_x = Number((input_x2-input_x1)*(input_y-input_y1)/(input_y2-input_y1))+Number(input_x1);
      var output = answer_x;
      var point3 = {x: answer_x, y: input_y, label:"Interpolated Point" };
 
       //Display Answer
       document.getElementById("answer-block-x").style.display = "block";
       document.getElementById("answer_x").innerHTML=output;
       showGraph();
     }

     //Display Chart
    myChart = document.getElementById("myChart").getContext('2d');
     var point1 = {x: input_x1, y: input_y1, label:"Point 1"};
     var point2 = {x: input_x2, y: input_y2, label:"Point 2"};

     const data = {
       datasets: [{
         label: 'Interpolated Points',
         data: [
          point1, 
          point2,
          point3],
          backgroundColor: ['gray','gray','#4272d7'],
          showLine: true,
          pointRadius: 5
       }],
     };
     
    ctx = new Chart(document.getElementById("myChart"), {
        type: 'scatter',
        data: data,
        options: {
          plugins: {
              legend: {
                  display: false,
              },
              tooltips: {
                mode: 'point'
            }
          }
      }
      });
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
    //Hide answers
    document.getElementById("answer-block-y").style.display = "none";
    document.getElementById("answer-block-x").style.display = "none";
    document.getElementById("graph").style.display = "none";
    if(ctx != null){
      ctx.destroy();
    };
  }

  function showGraph(){
    document.getElementById("graph").style.display = "flex";
  }




  //////////////////////////////////////
  //
  //         4-20mA Calculator
  //
  //////////////////////////////////////
  

  function toggleInputCurrent(){
    document.getElementById("input-block-percent").style.display = "flex";
    document.getElementById("input-block-current").style.display = "none";
    document.getElementById("input-block-PV").style.display = "none";
    document.getElementById("transmitter-container").style.display = "flex";
    resetAnswerBlock420();
  }

  function toggleInputPercent(){

    document.getElementById("input-block-percent").style.display = "none";
    document.getElementById("input-block-current").style.display = "flex";
    document.getElementById("input-block-PV").style.display = "none";
    document.getElementById("transmitter-container").style.display = "flex";
    resetAnswerBlock420();
  }

  function toggleInputPV(){

    document.getElementById("input-block-percent").style.display = "none";
    document.getElementById("input-block-current").style.display = "none";
    document.getElementById("input-block-PV").style.display = "flex";
    // Check Transmitter Box
    document.getElementById("input_transmitter").checked = true;
    showTransmitter();
    resetAnswerBlock420();
    document.getElementById("transmitter-container").style.display = "none";
  }

  function showTransmitter(){
    document.getElementById("input-block-LRL").style.display = "flex";
    document.getElementById("input-block-URL").style.display = "flex";
    resetAnswerBlock420();
  }


  function hideTransmitter(){
    document.getElementById("input-block-LRL").style.display = "none";
    document.getElementById("input-block-URL").style.display = "none";
    resetAnswerBlock420();
  }




  function solveMA(){
    //Reset error text
    resetErrorText();

    //Get solve selection
    var input_solve_sel;
    var radios = document.getElementsByName('input_sel');
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        if(i==0){
          input_solve_sel = "current"
        }else if(i==1){
          input_solve_sel = "percent"
        }else if(i==2){
          input_solve_sel = "PV"
        }
        break;// only one radio can be logically checked, don't check the rest
      }
    }

    //Get transmitter info
    var transActive;
    var radios = document.getElementsByName('input_trans');
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        if(i==0){
          // Standard. No action
          transActive = false;
        }else if(i==1){
          // Transmitter Active. 
          transActive = true;
          var input_trans_LRL = document.getElementById("input_transmitter_LRL").value;
          var input_trans_URL = document.getElementById("input_transmitter_URL").value;
          var unit_trans_LRL = document.getElementById("unit_transmitter_LRL").value;
          var unit_trans_URL = document.getElementById("unit_transmitter_URL").value;
        }
        break;// only one radio can be logically checked, don't check the rest
      }
    }

  
    //Get Inputs
    var input_percent = document.getElementById("input_percent").value;
    var input_current = document.getElementById("input_current").value;
    var input_PV = document.getElementById("input_PV").value;
    var Unit_PV = document.getElementById("unit_transmitter_PV").value;

    //Validate Numbers
    var validated = false;
    var errorText;
  
  if(!validatePositive(input_current)){
    errorText = "Input current must be a positive number";
  }else if(!validatePositive(input_percent) || input_percent > 100){
    errorText = "Input percent must be a number between 0 and 100";
  }else if(isNaN(input_PV) && input_solve_sel == "PV") {
    errorText = "Process value must be a number";
  }else if(transActive && isNaN(input_trans_LRL)) {
    errorText = "Lower transmitter range must be a number";
  }else if(transActive && isNaN(input_trans_URL)) {
    errorText = "Upper transmitter range must be a number";
  }else if(transActive && (input_trans_LRL >= input_trans_URL)) {
    errorText = "Upper transmitter range must be greater than lower range";
  }else{
    validated=true;
  }
  
    if(validated){
     //Calculation

     if(input_solve_sel=="current"){
      var percent = input_percent;
      var answer = linearInt(0,4,100,20,input_percent);
      var output = round2(answer);

       //Display Answer
       document.getElementById("answer-block").style.display = "block";
       document.getElementById("answer-block-current").style.display = "flex";
       document.getElementById("answer-current").innerHTML=output;


     }else if(input_solve_sel=="percent"){
      var answer = linearInt(4,0,20,100,input_current);
      var percent = answer;
      var output = round2(answer);
 
       //Display Answer
       document.getElementById("answer-block").style.display = "block";
       document.getElementById("answer-block-percent").style.display = "flex";
       document.getElementById("answer-percent").innerHTML=output;


     }else if(input_solve_sel=="PV"){
      var input_percent = 100*input_PV/(input_trans_URL - input_trans_LRL);
      var current = linearInt(0,4,100,20,input_percent);

      var percent = round2(input_percent);
      current = round2(current);
 
       //Display Answer
       document.getElementById("answer-block").style.display = "block";
       document.getElementById("answer-block-percent").style.display = "flex";
       document.getElementById("answer-percent").innerHTML=percent;
       document.getElementById("answer-block-current").style.display = "flex";
       document.getElementById("answer-current").innerHTML=current;
     }

  }

    if(transActive && input_solve_sel != "PV"){
      // Calc transmitter
      var PV = Number(input_trans_URL - input_trans_LRL)*Number(percent/100) + Number(input_trans_LRL);
      document.getElementById("answer-block-PV").style.display = "flex";
      document.getElementById("answer-PV").innerHTML=PV;
      document.getElementById("unit-PV").innerHTML=unit_trans_LRL;
    }

    if (!validated){
      //Display Error Text
      document.getElementById("error-text-box").style.display = "flex";
      document.getElementById('error-text').innerHTML=errorText;
    }

    //Scroll to answer
    document.getElementById('answer-block').scrollIntoView({ behavior: 'smooth', block: 'end' });

  
  //End Solve
}

function resetAnswerBlock420(){
  //Hide answers
  document.getElementById("answer-block").style.display = "none";
  document.getElementById("answer-block-current").style.display = "none";
  document.getElementById("answer-block-percent").style.display = "none";
  document.getElementById("answer-block-PV").style.display = "none";

}

function linearInt(x1, y1, x2, y2, x){
  return ((x-x1)*(y2-y1)/(x2-x1))+(y1);
}
var unit_transmitter = "°C";
function setTransmitterUnitLRL(){
  unit_transmitter = document.getElementById("unit_transmitter_LRL").value;
  document.getElementById("unit_transmitter_URL").value = unit_transmitter;
  document.getElementById("unit_transmitter_PV").value = unit_transmitter;
}

function setTransmitterUnitURL(){
  unit_transmitter = document.getElementById("unit_transmitter_URL").value;
  document.getElementById("unit_transmitter_LRL").value = unit_transmitter;
  document.getElementById("unit_transmitter_PV").value = unit_transmitter;
}

function setTransmitterUnitPV(){
  unit_transmitter = document.getElementById("unit_transmitter_PV").value;
  document.getElementById("unit_transmitter_LRL").value = unit_transmitter;
  document.getElementById("unit_transmitter_URL").value = unit_transmitter;
}
