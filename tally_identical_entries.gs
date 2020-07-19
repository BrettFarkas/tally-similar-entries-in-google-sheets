function identify5violations() {
//var sheet = SpreadsheetApp.getActiveSheet();
  var rawdata = SpreadsheetApp.openByUrl(
    'https://docs.google.com/spreadsheets/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
 
  var target = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet2');
 
  
  var targetdata = target.getDataRange().getValues();
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //Initial Setup
  var firstcell = targetdata[0][0];
  if (!firstcell){
     target.appendRow(["Last Name", "First Name", "Violation", "# of Violations", 'Writeup #']);
   target.getRange(1,1,1,5).setBackgroundColor('lightgreen');
    
  }
  
  
  
 /////////////////////////////////////////////////////////////////////////////////////////////////////
  //UPDATE OLD DATA IN TARGET
   //
  var data = rawdata.getDataRange().getValues();
   for (i in data) { //rows
    var lastname = data[i][1];
    var firstname = data[i][2];
    var violationtype = data[i][3];
  
     
       var numberofviolations = 0;
   for (j in data) { //check through rows
    var duplicatelastname = data[j][1];
    var duplicatefirstname = data[j][2];
    var duplicateviolationtype = data[j][3];
     
     if (duplicatelastname == lastname && duplicatefirstname == firstname && duplicateviolationtype == violationtype){
       numberofviolations += 1;
     }
     //check for backwards name
     if (duplicatelastname == firstname && duplicatefirstname == lastname && duplicateviolationtype == violationtype){
       numberofviolations += 1;
     }
   }
     
     
     var rowcheck = 0;
     for (z in targetdata){
        var targetlastname = targetdata[z][0];
       var targetfirstname = targetdata[z][1];
       var targetviolationtype = targetdata[z][2];
     
       if ((targetlastname == lastname && targetfirstname == firstname && targetviolationtype == violationtype) || (targetlastname == firstname && targetfirstname == lastname && targetviolationtype == violationtype)){
         alreadyin = 1;
         
         //UPDATE NUMBER OF VIOLATIONS
         //var onecellrange = target.getRange([i],4);
         if (targetlastname){
          target.getRange(rowcheck+1,4,1,1).setValue(numberofviolations);
         }
         //  targetdata[z][4].setValue(numberofviolations);
//         target.getRange([z],4).setValue(numberofviolations);
  //        target.appendRow([targetlastname]);
         
       }
       rowcheck += 1;
     }
   }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  

 
 /////////////////////////////////////////////////////////////////////////////////////////////////// 
  // Read data and shift down those already written up
  /*
 for (i in targetdata){
  var namemarker = targetdata[i][4];
  if (namemarker == "Writeup #" && parseInt(i)!=0){
   var searchlength = parseInt(i);
  }
 }
  
  for (var i = searchlength; i>=0; i--) {
  //for (var i = targetdata.length - 1; i>=0; i--) {
    var writtenupalready = targetdata[i][4];
    var violationsnumber = targetdata[i][3];
  //var onecellrange = target.getRange([i],4); 
  //var onecelldata = onecellrange.getValue();
    if (writtenupalready){
      if((writtenupalready + 1) * 5 > violationsnumber){
        var movelastname = targetdata[i][0];
        var movefirstname = targetdata[i][1];
        var moveviolationtype = targetdata[i][2];
        var movenumberofviolations = targetdata[i][3];
      
         //for (var i = searchlength-1; i>0; i--) {
     //       if (targetdata[i][0] == movelastname && targetdata[i][1] == movefirstname && targetdata[i][2] == moveviolationtype){  
        // target.deleteRow([parseInt(i)+1]);
       //     }
         //}
         target.appendRow([movelastname, movefirstname, moveviolationtype,movenumberofviolations,writtenupalready]);
        
      }
  }
  }
  */
  /////////////////////////////////////////////////////////////////////////////////////////////////
  
  /////////////////////////////////////////////////////////////////////////////////////////////////
//SCAN RAW DATA AND SORT INTO TARGET
  //create array for storing values
 
 
  
  
var data = rawdata.getDataRange().getValues();
  
  //create array for storing values later
  var arrayofnewdata=[];//create array
  for (var i = 0; i < data.length; i++){
   arrayofnewdata[i] = [] 
  }
  var arraynewdatarow =0;
  
 for (i in data) { //rows
    var lastname = data[i][1];
    var firstname = data[i][2];
    var violationtype = data[i][3];
   
   // lastname.toString().toLowerCase();
   // lastname = JSON.stringify(lastdat);
//   lastname = lastname.toLowerCase();
   
   var numberofviolations = 0;
   for (j in data) { //check through rows
    var duplicatelastname = data[j][1];
    var duplicatefirstname = data[j][2];
    var duplicateviolationtype = data[j][3];
     
     if (duplicatelastname == lastname && duplicatefirstname == firstname && duplicateviolationtype == violationtype){
       numberofviolations += 1;
     }
     //check for backwards name
     if (duplicatelastname == firstname && duplicatefirstname == lastname && duplicateviolationtype == violationtype){
       numberofviolations += 1;
     }
   }
   if (numberofviolations >= 5){ //5 OR MORE VIOLATIONS
     
     //CHECK FOR NAME ALREADY IN TARGETDATA
     var alreadyin = 0;
     var rowcheck = 0;
     for (z in targetdata){
        var targetlastname = targetdata[z][0];
       var targetfirstname = targetdata[z][1];
       var targetviolationtype = targetdata[z][2];
     
       if ((targetlastname == lastname && targetfirstname == firstname && targetviolationtype == violationtype) || (targetlastname == firstname && targetfirstname == lastname && targetviolationtype == violationtype)){
         alreadyin = 1;
         
         //UPDATE NUMBER OF VIOLATIONS
         //var onecellrange = target.getRange([i],4);
        
         // target.getRange(rowcheck+1,4,1,1).setValue(numberofviolations);
       
         //  targetdata[z][4].setValue(numberofviolations);
//         target.getRange([z],4).setValue(numberofviolations);
  //        target.appendRow([targetlastname]);
         
       }
       rowcheck += 1;
     }
   
     if (alreadyin == 0){ //IF NOT ALREADY IN TARGET DATA
       
       //if not in array
       var arraydatarow = 0;
       var alreadyinarray = 0;
      for (i in arrayofnewdata){
      if (arrayofnewdata[0][arraydatarow] == lastname && arrayofnewdata[1][arraydatarow] == firstname && arrayofnewdata[2][arraydatarow] == violationtype){
         alreadyinarray = 1; 
      }
        //check for backwards name in array
       if (arrayofnewdata[0][arraydatarow] == firstname && arrayofnewdata[1][arraydatarow] == lastname && arrayofnewdata[2][arraydatarow] == violationtype){
         alreadyinarray = 1; 
      } 
        arraydatarow += 1
      }
       //put in Array
       // arrayofmovingdata[0][arraydatarow] = movelastname;
       
       if (alreadyinarray == 0){
       arrayofnewdata[0][arraynewdatarow] = lastname;
        arrayofnewdata[1][arraynewdatarow] = firstname;
        arrayofnewdata[2][arraynewdatarow] = violationtype;
        arrayofnewdata[3][arraynewdatarow] = numberofviolations;
         arraynewdatarow += 1;
       }
       
       
     
     }
     }
  
     
   
   
 } //END BIG FOR LOOP 
 
  
  
  
  var newdatarow = 0;
   for (i in arrayofnewdata){
     if(arrayofnewdata[0][newdatarow]){
    //afterwards put entire array into target
       target.appendRow([arrayofnewdata[0][newdatarow], arrayofnewdata[1][newdatarow], arrayofnewdata[2][newdatarow],arrayofnewdata[3][newdatarow]]);
      // target.insertRows(2);
    //    target.getRange('A2').setValue(arrayofnewdata[0][newdatarow]);
      //  target.getRange('B2').setValue(arrayofnewdata[1][newdatarow]);
     //   target.getRange('C2').setValue(arrayofnewdata[2][newdatarow]);
   //     target.getRange('D2').setValue(arrayofnewdata[3][newdatarow]);
        target.getRange(2,1,1,5).setBackgroundColor('red');
     }
       newdatarow += 1;
     
   }
 
  ////////////////////////////////////////////////////////////////////////////////////////////
  //final cleanup, if matching info above as below
/*
  for (i in targetdata){
  var namemarker = targetdata[i][4];
  if (namemarker == "Writeup #" && parseInt(i)!=0){
   var searchlength = parseInt(i);
   
  }
 }
  
  for (var i = targetdata.length-1; i>=searchlength; i--){
  //for (var i = targetdata.length - 1; i>=0; i--) {
        var movelastname = targetdata[i][0];
        var movefirstname = targetdata[i][1];
        var moveviolationtype = targetdata[i][2];
        var movenumberofviolations = targetdata[i][3];
    for (i = searchlength-1; i >0; i--){
      if (targetdata[i][0] == movelastname && targetdata[i][1] == movefirstname && targetdata[i][2] == moveviolationtype){   
         target.deleteRow([parseInt(i)+1]);
      }
    }
       //  target.appendRow([movelastname, movefirstname, moveviolationtype,movenumberofviolations,writtenupalready]);
        
      }
  */
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
     //////////////////////////////////////////////////////////////////////////////////////////////
  /*
  //MOVE 10+ VIOLATIONS UP
  for (i in targetdata){ //GET SEARCHLENGTH
  var namemarker = targetdata[i][4];
  if (namemarker == "Writeup #" && parseInt(i)!=0){
   var searchlength = parseInt(i);
  }
  }
  
  var arrayofmovingdata=[];//create array
  for (var i = 0; i < targetdata.length; i++){
   arrayofmovingdata[i] = [] 
  }
  var arraydatarow = 0;

 for (var i = targetdata.length-1; i>=searchlength; i--){
   var writtenupamount = targetdata[i][4];
   var violationamount = targetdata[i][3];
   if ((writtenupamount + 1) * 5 <= violationamount){
      var movelastname = targetdata[i][0];
        var movefirstname = targetdata[i][1];
        var moveviolationtype = targetdata[i][2];
        var movenumberofviolations = targetdata[i][3];
       var movewrittenupalready = targetdata[i][4];
        
     arrayofmovingdata[0][arraydatarow] = movelastname;
      arrayofmovingdata[1][arraydatarow] = movefirstname;
      arrayofmovingdata[2][arraydatarow] = moveviolationtype;
      arrayofmovingdata[3][arraydatarow] = movenumberofviolations;
      arrayofmovingdata[4][arraydatarow] = movewrittenupalready;
     arraydatarow += 1;
      target.deleteRow([parseInt(i)+1]);
   
     
   }
 }
//   target.appendRow([arrayofmovingdata[i]]);
 arraydatarow = 0;
  for (i in arrayofmovingdata){ //put data up above
    if (arrayofmovingdata[0][arraydatarow] != undefined){
           target.insertRows(2);
      
     
      
      */
    /*
        target.getRange('A2').setValue(movelastname);
        target.getRange('B2').setValue(movefirstname);
        target.getRange('C2').setValue(moveviolationtype);
        target.getRange('D2').setValue(movenumberofviolations);
     target.getRange('E2').setValue(movewrittenupalready);
    */
  /*
     target.getRange('A2').setValue(arrayofmovingdata[0][arraydatarow]);
        target.getRange('B2').setValue(arrayofmovingdata[1][arraydatarow]);
        target.getRange('C2').setValue(arrayofmovingdata[2][arraydatarow]);
        target.getRange('D2').setValue(arrayofmovingdata[3][arraydatarow]);
     target.getRange('E2').setValue(arrayofmovingdata[4][arraydatarow]);
      arraydatarow += 1;
    }
  }
  */
////////////////////////////////////////////////////////////////////////////////////////////////////
  //MAKE RED OR NO COLOR
  
  
  var colorrow = 0;
  for (i in targetdata){
     var writtenupalready = targetdata[i][4];
    var violationsnumber = targetdata[i][3];
  //var onecellrange = target.getRange([i],4); 
  //var onecelldata = onecellrange.getValue();
    if (colorrow!= 0){
      if((writtenupalready + 1) * 5 > violationsnumber){
     target.getRange(colorrow+1,1,1,5).setBackgroundColor('lightblue');
      }else{
        target.getRange(colorrow+1,1,1,5).setBackgroundColor('red');
      }
    }
    colorrow += 1;
  }

////////////////////////////////////////////////////////////////////////////////////////////////////
  
////////////////////////////////////////////////////////////////////////////////////////////////////
  
  
  
}
