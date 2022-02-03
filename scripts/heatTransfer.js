  
  //////////////////////////////////////
  //
  //         Calculator
  //
  //////////////////////////////////////
  
  function solveLMDT(){
    //Reset error text
    resetErrorText();
  
    //Get Inputs
    var input_hot_in = document.getElementById("input_hot_in").value;
    var input_hot_out = document.getElementById("input_hot_out").value;
    var input_cold_in = document.getElementById("input_cold_in").value;
    var input_cold_out = document.getElementById("input_cold_out").value;

    //Validate Numbers
    var validated = false;
    var errorText;
  
    if(isNaN(input_hot_in)){
      errorText = "Hot temp in must be a number";
    }else if(isNaN(input_hot_out)){
      errorText = "Hot temp out must be a number";
    }else if(isNaN(input_cold_in)){
      errorText = "Cold temp in must be a number";
    }else if(isNaN(input_cold_out)){
      errorText = "Cold temp out must be a number";
    }else{
      validated=true;
    }

  
    if(validated){
     //Calculation

     var dT_a = input_hot_in-input_cold_out;
     var dT_b = input_hot_out-input_cold_in;


     var lmdt = (dT_a-dT_b)/Math.log(dT_a/dT_b);
     var output = round2(lmdt);

      //Display Answer
      document.getElementById("answer-block").style.display = "block";
      document.getElementById("answer").innerHTML=output;

      //Scroll to answer
      // document.getElementById('answer-block').scrollIntoView({ behavior: 'smooth', block: 'end' });

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

  }