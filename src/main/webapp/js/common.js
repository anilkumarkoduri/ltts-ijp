

function  getCurrentTime(){
	
	  var inputDate=new Date();
      
   	
      var outputDate=" ";
     
   	var am_pm=inputDate.getHours()>=12 ? "PM" :"AM";	
   	
   	var month=("0" + (inputDate.getMonth()+1)).slice(-2);
   	
   	var date=("0" + (inputDate.getDate())).slice(-2);
  
   	var year=inputDate.getFullYear();
  
   	var hours=("0" + (inputDate.getHours())).slice(-2);
   

   	var minutes=("0" + (inputDate.getMinutes())).slice(-2);
   	var seconds=("0" + (inputDate.getSeconds())).slice(-2);   	
   	var hourformat=hours>12 ? ("0" + (hours-12)) : hours;

   

   	outputDate=month+"/"+date+"/"+year+" "+hourformat+":"+minutes+":"+seconds+" "+am_pm;
   	//alert(outputDate);
   	return outputDate;
}