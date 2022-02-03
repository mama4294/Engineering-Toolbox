  
  //////////////////////////////////////
  //
  //         Calculator
  //
  //////////////////////////////////////
  var myChart, ctx;
  var validated = false;
  var ans_temp,ans_lmdt,ans_area, ans_flow;
  var Area,lmtd,b_flow_ans;
  var hotFluid;
  
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

function toggleInputTemp(){
  resetInputBlocks();
  document.getElementById("input-block-hxr-area").style.display = "none";
  document.getElementById("input-block-b-temp-out").style.display = "none";

  resetErrorText();
  resetAnswerBlock();
}

function toggleInputFlow(){
  resetInputBlocks();
  document.getElementById("input-block-hxr-area").style.display = "none";
  document.getElementById("input-block-b-flow").style.display = "none";

  resetErrorText();
  resetAnswerBlock();
}

function toggleInputBothTemps(){
  resetInputBlocks();
  document.getElementById("input-block-a-temp-out").style.display = "none";
  document.getElementById("input-block-b-temp-out").style.display = "none";

  resetErrorText();
  resetAnswerBlock();
}





  function solveHXR(){
    //Reset error text
    resetErrorText();

    //Get solve selection
        //Get solve selection
        var input_solve_sel;
        var radios = document.getElementsByName('input_sel');
        for (var i = 0, length = radios.length; i < length; i++) {
          if (radios[i].checked) {
            if(i==0){
              input_solve_sel = "temp"
            }else if(i==1){
              input_solve_sel = "flow"
            }else if(i==2){
              input_solve_sel = "NTU"
            }
            break;// only one radio can be logically checked, don't check the rest
          }
        }
  
    //Try gathering Inputs
    try{   

    //Input a fluid parameters  
    var a_temp_in = new EngValue("Fluid A temp in", document.getElementById("input_a_temp_in").value, document.getElementById("unit_a_temp_in").value);
    a_temp_in.validateNumber("number");
    a_temp_in.convert("°C");

    var a_temp_out = new EngValue("Fluid A temp out", document.getElementById("input_a_temp_out").value, document.getElementById("unit_a_temp_out").value);
    a_temp_out.validateNumber("number");
    a_temp_out.convert("°C");

    var a_flow = new EngValue("Fluid A flow rate", document.getElementById("input_a_flow").value, document.getElementById("unit_a_flow").value);
    a_flow.validateNumber(">0");
    a_flow.convert("m³/s");

    var a_density = new EngValue("Fluid A density", document.getElementById("input_a_density").value, document.getElementById("unit_a_density").value);
    a_density.validateNumber(">0");
    a_density.convert("kg/m³");

    var a_cp = new EngValue("Fluid A heat capacity", document.getElementById("input_a_cp").value, document.getElementById("unit_a_cp").value);
    a_cp.validateNumber(">0");
    a_cp.convert("kJ/(kg°C)");


    //Input b fluid parameters  
    var b_temp_in = new EngValue("Fluid B temp in", document.getElementById("input_b_temp_in").value, document.getElementById("unit_b_temp_in").value);
    b_temp_in.validateNumber("number");
    b_temp_in.convert("°C");

    var b_temp_out = new EngValue("Fluid B temp out", document.getElementById("input_b_temp_out").value, document.getElementById("unit_b_temp_out").value);
    b_temp_out.validateNumber("number");
    b_temp_out.convert("°C");

    var b_flow = new EngValue("Fluid B flow rate", document.getElementById("input_b_flow").value, document.getElementById("unit_b_flow").value);
    b_flow.validateNumber(">0");
    b_flow.convert("m³/s");

    var b_density = new EngValue("Fluid B density", document.getElementById("input_b_density").value, document.getElementById("unit_b_density").value);
    b_density.validateNumber(">0");
    b_density.convert("kg/m³");

    var b_cp = new EngValue("Fluid B heat capacity", document.getElementById("input_b_cp").value, document.getElementById("unit_b_cp").value);
    b_cp.validateNumber(">0");
    b_cp.convert("kJ/(kg°C)");


    //Input HXR parameters
    var hxr_area = new EngValue("Heat exchanger size", document.getElementById("input_hxr_area").value, document.getElementById("unit_hxr_area").value);
    hxr_area.validateNumber(">0");
    hxr_area.convert("m²");
    console.log(hxr_area.value);

    var hxr_u = new EngValue("Heat transfer coefficent", document.getElementById("input_hxr_u").value, document.getElementById("unit_hxr_u").value);
    hxr_u.validateNumber(">0");
    hxr_u.convert("W/(m²°C)");

    // var inputArr = [a_temp_in, a_temp_out, a_flow,a_density,a_cp,b_temp_in, b_temp_out, b_flow,b_density,b_cp,hxr_area,hxr_u];
    // alert(inputArr.length);
    // for (i = 0; i < inputArr.length; i++) {
    //   console.log(inputArr[i]);
    // };
   

    

    //Calculation

    if(input_solve_sel=="temp"){
      var Q = a_flow.value *a_density.value* a_cp.value * (a_temp_out.value - a_temp_in.value);

      if(Q>=0){
        hotFluid="B";
      }else if (Q<0){
        hotFluid="A";
      }

      if(Q>0 & b_temp_in.value < a_temp_out.value) throw new Error("Fluid B is too cold to heat Fluid A"); //Heating fluid A but B is too cold
      if(Q<0 & b_temp_in.value > a_temp_out.value) throw new Error("Fluid B is too hot to cool Fluid A"); //Heating fluid A but B is too cold

      
      var temp_out = -Q/(b_flow.value*Number(b_density.value)*Number(b_cp.value))+b_temp_in.value;
      ans_temp = new EngValue("Fluid B temp out", temp_out,"°C");
      ans_temp.convert("°C");

      //Calc LMTD

      if(hotFluid=="A"){
        var input_hot_in=a_temp_in.value;
        var input_hot_out=a_temp_out.value;
        var input_cold_in=b_temp_in.value;
        var input_cold_out=ans_temp.value;
      }else if(hotFluid=="B"){
        var input_hot_in=b_temp_in.value;
        var input_hot_out=ans_temp.value;
        var input_cold_in=a_temp_in.value;
        var input_cold_out=a_temp_out.value;
      }

         lmdt = calcLMTD(input_hot_in,input_hot_out,input_cold_in,input_cold_out);
         Area = Math.abs(Q*1000)/(hxr_u.value*lmdt);

        document.getElementById("answer-block").style.display = "block";
        document.getElementById("answer-block-temp-b").style.display = "flex";
        document.getElementById('answer-tempB').innerHTML=round2(temp_out);
        document.getElementById("answer-block-hxr-area").style.display = "flex";
        document.getElementById('answer-area').innerHTML=round2(Area);
        document.getElementById("answer-block-lmtd").style.display = "flex";
        document.getElementById('answer-lmtd').innerHTML=round2(lmdt);

        displayGraph(input_hot_in,input_hot_out,input_cold_in,input_cold_out,Q);

    

    }else if(input_solve_sel=="flow"){
      var Q = a_flow.value *a_density.value* a_cp.value * (a_temp_out.value - a_temp_in.value);
 

      if(Q>=0){
        hotFluid="B";
      }else if (Q<0){
        hotFluid="A";
      }

      if(Q>0 & b_temp_in.value < a_temp_out.value) throw new Error("Fluid B is too cold to heat Fluid A"); //Heating fluid A but B is too cold
      if(Q<0 & b_temp_in.value > a_temp_out.value) throw new Error("Fluid B is too hot to cool Fluid A"); //Heating fluid A but B is too cold

      if(hotFluid=="A"){
        var input_hot_in=a_temp_in.value;
        var input_hot_out=a_temp_out.value;
        var input_cold_in=b_temp_in.value;
        var input_cold_out=b_temp_out.value;
      }else if(hotFluid=="B"){
        var input_hot_in=b_temp_in.value;
        var input_hot_out=b_temp_out.value;
        var input_cold_in=a_temp_in.value;
        var input_cold_out=a_temp_out.value;
      }

      //Calcs
       lmdt = calcLMTD(input_hot_in,input_hot_out,input_cold_in,input_cold_out);
       Area = Math.abs(Q*1000)/(hxr_u.value*lmdt);

 
      b_flow_ans = -Q/(b_density.value*b_cp.value*(b_temp_out.value-b_temp_in.value));
      b_flow_ans=(convert(b_flow_ans,"m³/s","lpm"));

      document.getElementById("answer-block").style.display = "block";
      document.getElementById("answer-block-flow-b").style.display = "flex";
      document.getElementById('answer-flowB').innerHTML=round2(b_flow_ans);
      document.getElementById("answer-block-hxr-area").style.display = "flex";
      document.getElementById('answer-area').innerHTML=round2(Area);
      document.getElementById("answer-block-lmtd").style.display = "flex";
      document.getElementById('answer-lmtd').innerHTML=round2(lmdt);

      displayGraph(input_hot_in,input_hot_out,input_cold_in,input_cold_out,Q);

    }else if(input_solve_sel=="NTU"){ //NTU Method

      var C_a = (a_flow.value*Number(a_density.value)*Number(a_cp.value)); //m³/s * kg/m³ * kJ/(kg°C) = kW/°C
      var C_b = (b_flow.value*Number(b_density.value)*Number(b_cp.value));
      var C_max = Math.max(C_a,C_b);
      var C_min = Math.min(C_a,C_b);
      var C = C_min/C_max;
      var NTU = hxr_u.value*Number(hxr_area.value)/(C_min*1000); //W/(m²°C) * m² /  kW/°C * W/kW = unitless
      var e;
      if(C<1){
        e = (1-Math.exp(-NTU*(1-C)))/(1-C*Math.exp(-NTU*(1-C)));
      }else{
        e = NTU/(1+NTU);
      }



      var Q = e * C_min * (b_temp_in.value - a_temp_in.value); // unitless * kW/°C * (°C) = kW

      if(Q>=0){
        hotFluid="B";
        var a_temp_out = -Q/(a_flow.value*a_density.value*a_cp.value)+a_temp_in.value; //kW/(m3/s * kg/m3 * kJ/(kg°C)) = °C
        var b_temp_out = Q/(b_flow.value*b_density.value*b_cp.value)+b_temp_in.value;
      }else if (Q<0){
        hotFluid="A";
        var a_temp_out = Q/(a_flow.value*a_density.value*a_cp.value)+a_temp_in.value;
        var b_temp_out = -Q/(b_flow.value*b_density.value*b_cp.value)+b_temp_in.value;
      }

      if(hotFluid=="A"){
        var input_hot_in=a_temp_in.value;
        var input_hot_out=a_temp_out;
        var input_cold_in=b_temp_in.value;
        var input_cold_out=b_temp_out;
      }else if(hotFluid=="B"){
        var input_hot_in=b_temp_in.value;
        var input_hot_out=b_temp_out;
        var input_cold_in=a_temp_in.value;
        var input_cold_out=a_temp_out;
      }

      lmdt = calcLMTD(input_hot_in,input_hot_out,input_cold_in,input_cold_out);
      ans_tempA = new EngValue("Fluid A temp out", a_temp_out,"°C");
      ans_tempA.convert("°C");
      ans_temp = new EngValue("Fluid B temp out", b_temp_out,"°C");
      ans_temp.convert("°C");

      document.getElementById("answer-block").style.display = "block";
      document.getElementById("answer-block-temp-a").style.display = "flex";
      document.getElementById('answer-tempA').innerHTML=round2(a_temp_out);
      document.getElementById("answer-block-temp-b").style.display = "flex";
      document.getElementById('answer-tempB').innerHTML=round2(b_temp_out);
      document.getElementById("answer-block-lmtd").style.display = "flex";
      document.getElementById('answer-lmtd').innerHTML=round2(lmdt);

      //NTU = UA / C_min
      displayGraph(input_hot_in,input_hot_out,input_cold_in,input_cold_out,Q);


    }

    //Set answer values
    ans_lmdt = new EngValue("Log mean tempertaure difference", lmdt,"°C");
    ans_lmdt.convert("°C");
    ans_area = new EngValue("Heat exchanger area", Area,"m²");
    ans_area.convert("m²");
    ans_flow = new EngValue("Heat exchanger area", b_flow_ans,"lpm");
    ans_flow.convert("lpm");
     //Scroll to answer
     document.getElementById('answer-block').scrollIntoView({ behavior: 'smooth', block: 'end' });
  


 
  }catch(err){ //Display error text if validation fails.
    document.getElementById("error-text-box").style.display = "flex";
    document.getElementById('error-text').innerHTML=err.message;
  }

  
  //End Solve
}
  
  //////////////////////////////////////
  //
  //         Reset Functions
  //
  //////////////////////////////////////
  
  
  function displayGraph(hot_in,hot_out,cold_in,cold_out,duty){
        myChart = document.getElementById("myChart").getContext('2d');
        var hotIn = {x: 0, y: hot_in};
        var hotOut = {x: Math.abs(duty), y: hot_out};
        var coldOut = {x: 0, y: cold_out};
        var coldIn = {x: Math.abs(duty), y: cold_in};

        const data = {
        labels: [
          'Inlet',
          'Outlet',
          'Inlet',
          'Outlet'
        ],
          datasets: [{
            label: 'Hot Side',
            data: [
            hotIn, 
            hotOut,],
            backgroundColor: ['#ff6384'],
            showLine: true,
            pointRadius: 5
          },
          {
          label: 'Cold Side',
          data: [
            coldOut,
            coldIn],
            backgroundColor: ['#3080d0'],
            showLine: true,
            pointRadius: 5
        }],
        };

        ctx = new Chart(document.getElementById("myChart"), {
          type: 'scatter',
          labels: [
            'Inlet',
            'Outlet'
          ],
          data: data,
          options: {
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Heat Duty'
                }
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Temperature',
                }
              }
            },
            plugins: {
                legend: {
                    display: true,
                },
                tooltips: {
                  mode: 'point',
                  callbacks: {
                    title: function(tooltipItems, data) {
                      // var index = tooltipItems[0].index;
                      // var datasetIndex = tooltipItems[0].datasetIndex;
                      // var dataset = data.datasets[datasetIndex];
                      // var datasetItem = dataset.data[index];
                      // var person = response.data[datasetItem.id];
                      // return person.Name + " - " + person.Nationality;
                      return "Hot In"
                    },
                    label: function(tooltipItems, data) {
                      // var output = "";
                      // var index = tooltipItems.index;
                      // var datasetIndex = tooltipItems.datasetIndex;
                      // var dataset = data.datasets[datasetIndex];
                      // var datasetItem = dataset.data[index];
                      // var person = response.data[datasetItem.id];
                      
                      // output += "Temp: " + person.Time + "\n | \n";
                      // output += "Heat Duty: " + person.Place + "\n | \n";

                      return "Temp: ";
                    }
                  }
              }
            }
        }
        });
  }

  function calcLMTD(input_hot_in,input_hot_out,input_cold_in,input_cold_out){
    var dT_a = input_hot_in-input_cold_out;
    var dT_b = input_hot_out-input_cold_in;
    return lmdt = (dT_a-dT_b)/Math.log(dT_a/dT_b);
  }




  function resetInputBlocks(){
    //Show all blocks
    document.getElementById("input-block-hxr-area").style.display = "flex";   
    document.getElementById("input-block-a-temp-out").style.display = "flex";
    document.getElementById("input-block-b-temp-out").style.display = "flex";
    document.getElementById("input-block-b-flow").style.display = "flex";

  }

  
  function resetErrorText(){
    //Hide error codes
    document.getElementById("error-text-box").style.display = "none";
  }
  
  function resetAnswerBlock(){
    //Hide answers
    document.getElementById("answer-block").style.display = "none";
    document.getElementById("answer-block-temp-a").style.display = "none";
    document.getElementById("answer-block-temp-b").style.display = "none";
    document.getElementById("answer-block-flow-b").style.display = "none";
    document.getElementById("answer-block-hxr-area").style.display = "none";
    document.getElementById("answer-block-lmtd").style.display = "none";
    if(ctx != null){
      ctx.destroy();
    };

  }


    //////////////////////////////////////
  //
  //         Unit Changes
  //
  //////////////////////////////////////

  function changeAnswerTempAUnits(){
    // //Convert
    ans_tempA.convert(document.getElementById("unit-tempA").value);
    document.getElementById('answer-tempA').innerHTML=round2(ans_tempA.value);
  }

  function changeAnswerTempUnits(){
    // //Convert
    ans_temp.convert(document.getElementById("unit-tempB").value);
    document.getElementById('answer-tempB').innerHTML=round2(ans_temp.value);
  }


  function changeAnswerLMTDUnits(){
    // //Convert
    ans_lmdt.convert(document.getElementById("unit-lmtd").value);
    document.getElementById('answer-lmtd').innerHTML=round2(ans_lmdt.value);
  }

  function changeAnswerAreaUnits(){
    // //Convert
    ans_area.convert(document.getElementById("unit_ans_area").value);
    document.getElementById('answer-area').innerHTML=round2(ans_area.value);
  }

  function changeAnswerFlowUnits(){
    // //Convert
    ans_flow.convert(document.getElementById("ans_b_flow").value);
    document.getElementById('answer-flowB').innerHTML=round2(ans_flow.value);
  }