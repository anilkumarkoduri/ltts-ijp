
function clearFieldInvolvedParties()
{
	
	document.forms['InvolvedPartyreset'].reset();
	x=false;
		console.log(x);
		


}

function hideFilterAndPieForAppointment()
{
	$("#act1_pie").collapse('hide');	

		$("#filter1").collapse('hide');	
		 $("#dropdownid").val('');
	 	 $("#appointment_contact").val('');
	 	 $("#appointment_account").val('');
	 	 $("#appointment_priority").val('');
	 	 $("#appointment_category").val('');
	 	 $("#appointment_startdate").val('');
}

function ListAccountInvolved()
{
	
	var url= contextPath+"involvedparty/listInvolvedPartiesAccounts";
	
	
	$.ajax({url:url,
		type:"GET",
		
	
		success: function(result)
		{
        var tableData ="";
       //alert(result);
       for(var i = 0; i< result.length; i++) {
		  
    	   if(result[i].businessPartnerId!=null )
           {
           result[i].businessPartnerId=result[i].businessPartnerId;
           
           }
    else {
           result[i].businessPartnerId=" ";
           
           } 
    	   if(result[i].name!=null )
           {
           result[i].name=result[i].name;
           
           }
    else {
           result[i].name=" ";
           
           } 
    	   if(result[i].city!=null )
           {
           result[i].city=result[i].city;
           
           }
    else {
           result[i].city=" ";
           
           } 
    	   tableData = tableData + "  <tr> " +
	    	   
	    	    "<td>" + result[i].businessPartnerId + "</td>"+ 
	    	    "<td id='HashtreeAccount"+i+"' accountid='"+result[i].accountId+"' name="+result[i].name+" onclick=popupnewapp3("+i+")>" + result[i].name + "</td>"+ 
	    	    "<td>" + result[i].city + "</td>"+ 
	    	   
    	    	  

				"</tr>";
																		
																		
		   
       		 
    	   
       }
	  
   
	   $("#involvedAccount").html(tableData);

 
	}});
}

var datareturned="";
function insertInvolvedParties()
	{


var partyDesc=$("#getRoleInvolved").val();

var  name= $("#getNameInvolved").val();

var accountId=$("#getAccountIdInvolved").val();


var appointmentid=$("#getappointmentidvalue").val();


var data={"appointmentId":appointmentid,
		"partyId":accountId,
		"description":partyDesc,
		"createdBy":user
	
	
		}

data=JSON.stringify(data); 

console.log(data);
var url= contextPath+"/involvedparty/insertInvolvedParty/"+appointmentid+","+accountId+","+partyDesc+","+user;

$.ajax({
   
   url:url,
   type: "POST",
 
   contentType: "application/json; charset=utf-8",
   dataType   : "text",
   success    : function(){
	
   	alert("New involved party added successfully");
   	loadInvolvedParties(appointmentid);
   	clearFieldInvolvedParties();
 
   },


   error :function(){
   	alert("error");
   	console.log("error");
   	
   }
});
	
console.log(data); 
} 



var appointmentSaveAndOpenValue="";
function appointmentSaveOpen()
{
	appointmentSaveAndOpenValue="Yes";
    //alert("save and open"+appointmentSaveAndOpenValue);
  // ();
    
}   

/*function loadDataInAppointmentsModal(appointmentId)
{
	$.ajax({url:contextPath+contextPath+"appointment/displayOnSubjectMouseHover/"+appointmentId,
		type:"GET",
		
	
		success: function(result)
		{
        var tableData ="";
       //alert(result);
       for(var i = 0; i< result.length; i++) 
       {
    	   document.getElementById("getstatus").innerHTML=result[i].status;
    	   document.getElementById("getsubject").value=result[i].subject;
    	   document.getElementById("getAccount").value=result[i].account;
    	   document.getElementById("getContact").value=result[i].primaryContact;
    	   document.getElementById("getlocation").value=result[i].location;
    	   document.getElementById("getalldayevent").value=result[i].isAllDayEvent;
    	   document.getElementById("getstartdate").value=result[i].startTime;
    	   document.getElementById("getenddate").value=result[i].endTime;
    	   document.getElementById("getcategory").value=result[i].leadCategory;
    	   document.getElementById("getpriority").value=result[i].priority;
    	   document.getElementById("getnotes").value=result[i].notes;
    	   document.getElementById("getowner").value=result[i].organizer;
    	   
    	   
       }
       		 
    	   
       }
	});
	  
	

}*/
//ByArpit
/*function ExporttoExcelactivity() {

       var tab_text = "<table border='2px'><tr><td colspan='3'><center><b>" + document.getElementById('captionactivity').innerText + "</b></center></td></tr> <tr>"; //change the color here
       var textRange; var j = 0;
       tab = document.getElementById('myTableactivity'); // id of table
     	var outputDate=getCurrentTime(); 	
       	tab_text = tab_text +"<td>"+ "Last Updated On : </td><td>"+outputDate+ "</td></tr>";   
        tab_text = tab_text + "<tr bgcolor='#87AFC6'>"+tab.rows[0].innerHTML + "</tr>";    
       	
          for (j = 1 ; j < tab.rows.length ; j++) {
              tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
              tab_text=tab_text+"</tr>";
          }     
       tab_text = tab_text + "</table>";
       tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
       tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
       tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params
       var ua = window.navigator.userAgent;
       var msie = ua.indexOf("MSIE ");
       if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
       {
           txtArea1.document.open("txt/html", "replace");
           txtArea1.document.write(tab_text);
           txtArea1.document.close();
           txtArea1.focus();
           sa = txtArea1.document.execCommand("SaveAs", true, ".xls");
       }
       else            
       {
   		var uri = 'data:application/vnd.ms-excel,'
   				+ encodeURIComponent(tab_text);

   		var downloadLink = document.createElement("a");
   		downloadLink.href = uri;
   		downloadLink.download = "Appointments.xls";

   		document.body.appendChild(downloadLink);
   		downloadLink.click();
   		document.body.removeChild(downloadLink);
   	}
       return (sa);
   }
*/


var countatten=0;
var uniquevalue=0;
var j=0;
//Button click will insert text box
					function attenRow(){
                
                           count++;
                             var table=document.getElementById("attenfollowtable");
                             var row=table.insertRow(table.rows.length); 
                             row.id="followtable"+l;
                             var cell1=row.insertCell(0); 
                             var cell2=row.insertCell(1);
                             var cell3=row.insertCell(2);
                                 var attendeediv = document.createElement("div");
                                 var optImg = document.createElement("span");
                                 optImg.setAttribute("class", "glyphicon glyphicon-share-alt");
                                 optImg.setAttribute("style", "padding: 5px; color: #193d5b");
                                 //optImg.setAttribute("style", "color: #193d5b");
                                 optImg.setAttribute("data-toggle", "modal");   
                                 optImg.setAttribute("data-target", "#box_modal4"); 
                                
                                 
                                // id='delete_row' class="pull-right btn btn-default"
                                 var nameText=document.createElement("input");
                                 var idText=document.createElement("input");
                                 var source=document.createElement("input");
                                 var source2=document.createElement("img");
                                 
                               //  Images/recycle_bin.jpg
                                 source.setAttribute("style", "display:none");
                                 source2.setAttribute("src", "Images/1.png");
                                 source2.setAttribute("width","20px");
                               /*   source2.setAttribute("id", "delete_row");
                                 source2.setAttribute("class","pull-right btn btn-default");  */
                                 nameText.id = "attendeefollow"+l;
                                 nameText.setAttribute("class", "form-control col-sm-10");
                                 nameText.setAttribute("style", "width: 78%; height:22px;");
                                 optImg.setAttribute("onclick", "loadAttendeefollows("+l+")"); 
                                 source2.setAttribute("onclick", "deletefollowAttendee()");
                                 source.id="sourcename"+l;
                                 idText.setAttribute("style", "display:none");
                                 idText.id="attendeeFollowId"+l;
                                 attendeediv.appendChild(nameText);
                                 attendeediv.appendChild(idText);
                                 attendeediv.appendChild(optImg);
                                 attendeediv.appendChild(source);
                                // 
                                 //document.getElementById("placehere").appendChild(elem2);
                                 
                                 cell1.appendChild(attendeediv);
                                 cell3.appendChild(source2);
                           		//alert(l);
                      			l++;
                      		   j++;j=0;
                 }
				function deletefollowAttendee()
				{
					$('#attenfollowtable').on('click', 'img[src="Images/1.png"]', function () {
   						//alert("In");
   					    $(this).closest('tr').remove();
   					});
					
				}
				
				 function loadAttendeefollows(l)
		    	 {
		    		 			    			
		    			
		    			$.ajax({url:contextPath+"appointment/listAttendees",
		    				type:"GET",
		    				
		    			
		    				success: function(result)
		    				{
		    		        var tableData ="";
		    		       
		    		       for(var i = 0; i< result.length; i++) {
		    				   
		    				   
		    		    	   tableData = tableData + "  <tr> " +
		    		    	   
		    			    	   "<td id='Attendee"+i+"' sourceId="+ result[i].sourceId+" source="+ result[i].source+"  name='"+result[i].name+"' onclick=attendeefollowPopUp("+i+","+l+")>" + result[i].businessPartnerId + "</td>" +
		    			    	   "<td id='Attendee"+i+"' sourceId="+ result[i].sourceId+" source="+ result[i].source+" name='"+result[i].name+"' onclick=attendeefollowPopUp("+i+","+l+")>" + result[i].name + "</td>" +
		    			    	   							    			    	  							    			    	  
		    					"</tr>";
		    																				
		    				
		    		       }
		    			  
		    			   
		    		       $("#attendeemodal").html(tableData);
		    		       l=0;
		    		    
		    				}
		    		        
		    		    });
		    		
		    	 }
				 
				 function attendeefollowPopUp(value,index)
		    		{
		    			
		    				var attendeeid=$("#Attendee"+value).attr("sourceId");
		    				//alert(attendeeid);
		    					var attendeename=$("#Attendee"+value).attr("name");
		    					var source=$("#Attendee"+value).attr("source");
		    					var textboxid="#attendeefollow"+index;
		    					console.log(attendeename,textboxid);
		    					$("#attendeefollow"+index).val(attendeename);
		    					$("#attendeeFollowId"+index).val(attendeeid);
		    					$("#sourcename"+index).val(source);
		    					
		    					
		    					//document.getElementById("attendee"+j).value =attendeename;
							
							$('#box_modal4').modal('hide');
				    		
							
		    		}
				 function removeRowsInfollowAttendees()
		    	 {
		    		// hide('app_12');
		    		// alert("removing");
		    		 $("#attenfollowtable").empty();
		    	 }
			
				 function dynamicCategoriesInNewAppointment() {
						
					 var optionData ="";
					 var htmlData="<option style=display:none></option>";
					 var url= contextPath+"category/listAllCategories";
				    	$.ajax({url:url,
				    		type:"GET",
				    		
				    	
				    		success: function(result)
				    		{
				           
				    			
				           for(var i = 0; i< result.length; i++) {
				        	   
				        	   optionData= optionData + "<option value='"+result[i].id+"'>"+result[i].category+"</option>";
				        
				        	   htmlData= htmlData + "<option value='"+result[i].category+"'>"+result[i].category+"</option>";
				        	   
				           }
				          
				           $("#getcategoryinfo").html(optionData);
				           $("#account_activity_category").html(optionData);
				           $("#contact_activity_category").html(optionData);
				           $("#leads_activity_category").html(optionData);
				           $("#appointment_category").html(htmlData);
				      
				            
				        }});
				}
				 function DynamicPrioritiesInNewAppointment() {
						
					    
				    	var url= contextPath+"category/listPriorities";
				    	var optionData="";
				    	 var htmldata="<option style=display:none></option>";
				    	$.ajax({url:url,                                  
				    		type:"GET",
				    		
				    	
				    		success: function(result)
				    		{
				            
				    			
				           for(var i = 0; i< result.length; i++) {
				        	  
				        	   optionData= optionData + "<option value="+result[i].priorityId+">"+result[i].priority+"</option>";
				        	   htmldata= htmldata + "<option value="+result[i].priority+">"+result[i].priority+"</option>";
				           }
				    	  
				    	   
				           $("#getpriorityinfo").html(optionData);
				           $("#account_activity_priority").html(optionData);
				           $("#contact_activity_priority").html(optionData);
				           $("#leads_activity_priority").html(optionData);
				          $("#appointment_priority").html(htmldata);
				       
				        }});
				    	
				}
				 
				function cancelModalPopUp()
				{
					//var classname=document.getElementById("getsubject").disabled;
					//alert(statusofmodalpopup);
					//console.log(classname);
					if(statusofmodalpopup=="editable")
						{
					 var ans = confirm("Are you sure you want to Save this?");
	  					if(ans == true )
	  						{
	  						editAppointment();
	  						cancelTextbox();
	  						//document.getElementById("closeappointmentmodal").setAttribute("data-dismiss","modal");
	  						}
	  					else cancelTextbox();
						}
				}
				function insertInvolvedPartiesInAppointment(datareturned)
				{
					var url= contextPath+"/involvedparty/insertInvolvedParties/"+datareturned;
					//alert(url);
					$.ajax({
					   
					   url:url,
					   type: "POST",
					 
					   contentType: "application/json; charset=utf-8",
					   dataType   : "text",
					   success    : function(){
						
					   	//alert("New involved party added successfully");
					   	loadInvolvedParties(datareturned);
					   	clearFieldInvolvedParties();
					 
					   },


					   error :function(){
					   	alert("error");
					   	console.log("error");
					   	
					   }
					});
						
					//console.log(data); 
					} 
				function clearingNewAppointment()
				{
					var frm=document.getElementsByName('newappointmentform')[0];
					frm.reset();
					
					
				}
				function cancelRelated()
				{
					
					var frm=document.getElementsByName('relateditemform')[0];
					frm.reset();
				}
				function checkYesInAppointment()
				{
					appointmentSaveAndOpenValue="No";
					defaultDate();
				}
				function insertFollowattendee(datareturned)
				{
				 
				var arr=new Array();
				var sourcearr=new Array();
				  var table=document.getElementById("attenfollowtable");
                var rowlength=table.rows.length; 
                console.log(rowlength);
						 var j=0;
						var data='{"appointmentid":"'+datareturned+'","attendeeid":"';
						 for(var i=0;i<=count;i++)
						 {
					 		if($("#attendeeFollowId"+i).val()!= undefined )
					 			{
					 			console.log("correct");
					 			arr[i]=$("#attendeeFollowId"+i).val();
					 			}
					 		
					 			console.log(arr);
					 		 
						 }
						 for(var i=0;i<=count;i++)
						 {
					 		if($("#sourcename"+i).val()!= undefined )
					 			{
					 			console.log("correct");
					 			sourcearr[i]=$("#sourcename"+i).val();
					 			}
					 		
					 			console.log(sourcearr);
					 		 
						 }
						 for(var i=0;i<=arr.length;i++)
							 {
							 if(arr[i]!=undefined)
								 {
							 if(i==arr.length-1)
				 			 {
					 			 data=data.concat(arr[i]+'","');
								// count=i;
								// i=0;
				 			 }
				 		  else
				 			  {data=data.concat(arr[i]+',');}
							 }
							 }
							 data=data.concat('source":"');
							 for(var i=0;i<=arr.length;i++)
							 {
								 if(arr[i]!=undefined)
									 {
							 if(i==arr.length-1)
				 			 {
					 			 data=data.concat(sourcearr[i]+'","');
								// count=i;
								// i=0;
				 			 }
				 		  else
				 			  {data=data.concat(sourcearr[i]+',');}
							 }
							 }
							 data=data.concat('createdby":"'+user+'"}');
							 //alert(data);
							 console.log(data);
					 	
						
 				$.ajax({
				        url : contextPath+"appointment/insertAppointmentAttendee",
				        type: "POST",
				        data: data,
				       //async:false,
				        contentType: "application/json; charset=utf-8",
				        dataType   : "text",
				        success    : function(data){
				        	alert("Attendee Added Successfully");
				        	/* l=0;   //for Dynamic text box in New Appoointment
				           	j=0;
				        	count=0; */
				           
				           	
				           
				        	removeRowsInfollowAttendees();
				        	clearFollowupFields();
				        },
				        error :function(){
				        	//alert("error");
				        	console.log("error");
				        	defaultDate();
				        }
				    });
 				rowlength=0;
						j=0;
						l=0;
 				console.log(data); 
 			
				} 
				
				
				$(document).ready(function () {
					categoryinFollowup();
					priorityinfollowup();

					});
				
				function clearFollowupFields(){
					
					document.getElementById("getloc").value=""
						document.getElementById("getno").value=""
					
				}
				
				 function categoryinFollowup() {
						
					 var optionData ="";
				
					 var url= contextPath+"category/listAllCategories";
				    	$.ajax({url:url,
				    		type:"GET",
				    		
				    	
				    		success: function(result)
				    		{
				           
				    			optionData=optionData+"<option style='display:none;'></option>";
				           for(var i = 0; i< result.length; i++) {
				        	   
				        	   optionData= optionData + "<option value='"+result[i].id+"'>"+result[i].category+"</option>";
				        
				        	  
				        	   
				           }
				          
				       
				           $("#getcat").html(optionData);
				            
				        }});
				}
				 function priorityinfollowup() {
						
					    
				    	var url= contextPath+"category/listPriorities";
				    	var optionData="";
				    
				    	$.ajax({url:url,
				    		type:"GET",
				    		
				    	
				    		success: function(result)
				    		{
				            
				    			optionData=optionData+"<option style='display:none;'></option>";
				           for(var i = 0; i< result.length; i++) {
				        	  
				        	   optionData= optionData + "<option value="+result[i].priorityId+">"+result[i].priority+"</option>";
				        	
				           }
				    	  
				    	   
				          
				          $("#getpri").html(optionData);
				        }});
				    	
				}
				 
				 
				
				 var Invol_popover1;
	  				$().ready(function(){	
	  						 
	  					Invol_popover1 = function(event,type,actId)
	  						  
	  						  {
	  							  var htmlData ="";
	  						 		//alert(type);
	  						 		 $("#actModalInvol_popover").hide();
	  						 		var tPosX = event.pageX - 450;
									 var tPosY = event.pageY - 550;
									 //alert( tPosY);
	  						 		 if(Number(tPosX)<Number(-100))
									 {
								 
								 		tPosX=tPosX	-150;
								 		//alert( tPosX);
									 }
	  						 		if(Number(tPosY)<Number(180))
	  								 {
	  							 
	  									 tPosY=tPosY +250;
	  							 		//alert( tPosY);
	  								 }
							  $('#actModalInvol_popover').css({top: tPosY, left: tPosX});
	  						 		    var timeoutId;
	  						 		  // alert(type);
	  						 		  if(type=="Account"){
	  						 	 	
	  						 			var url= contextPath+"appointment/displayOnAccountMouseHover/"+actId;
	  					 				 // alert(url);
	  					 				 	    	$.ajax({
	  					 				 	    		url:url,						 	    	
	  					 				 	    		type:"GET",
	  					 				 	    		  dataType: 'json',

	  					 				 	    		  success: function(result)
	  					 				 	    		{   
	  					 				 	    	//	alert(result.name);
	  					 				 	    		
	  					 				 	    			
	  					 				 	    			
	  					 				 	    			 if(result=="")
	  					 				 	    				 {
	  					 				 	    			 var htmlData =  " <h4 style='font-size: 16px;'>Customer</h4><div class='row' style='border-bottom: 1px solid #5061b5; margin-bottom:5px;'></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Status :</p></div><div class='col-sm-7'><p>"
	  	  					 				 	        	   +"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Prospect :</p></div><div class='col-sm-7'><p>"
	  	  					 				 	        	   +"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Role :</p></div><div class='col-sm-7'><p>"
	  	  					 				 	        	   +"</p></div></div><div class='row' ><div class='col-sm-5' style='text-align:right;'><p>Owner :</p></div><div class='col-sm-7'><p><a href='#'>"
	  	  					 				 	        	   +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Parent account :</p></div><div class='col-sm-7'><p><a href='#'>"
	  	  					 				 	        	   +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Main Contact :</p></div><div class='col-sm-7'><p><a href='#'>"
	  	  					 				 	        	   +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Web Site :</p></div><div class='col-sm-7'><p><a href='#'>"
	  	  					 				 	        	   +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>ABC Classification :</p></div><div class='col-sm-7'>"
	  	  					 				 	        	   +"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Contact Permission :</p></div><div class='col-sm-7'></div></div>";
	  					 							 	        	   $("#modalInvolpopover1").html(htmlData);
	  					 				 	    				 
	  					 				 	    				 }
	  					 				 	    			 else
	  					 				 	    				 {
	  					 				 	    				 
	  					 				 	    				 var name;
	  					 						 	    			var status;
	  					 						 	    			var prospect;
	  					 						 	    			var role;
	  					 						 	    			var owner;
	  					 						 	    			var parent;
	  					 						 	    			var mainContact;
	  					 						 	    			 var website;
	  					 						 	    			 var abcClassification;
	  					 				 	    			 if(result[0].name==null)
	  					 				 	    				 {
	  					 				 	    				 	name="";
	  					 				 	    				 }
	  					 				 	    			 else
	  					 				 	    				 {
	  					 				 	    				 	name=result[0].name;
	  					 				 	    				 }
	  					 				 	    			if(result[0].status==null)
	  					 			 	    				 {
	  					 			 	    				 	status="";
	  					 			 	    				 }
	  					 			 	    			 else
	  					 			 	    				 {
	  					 			 	    				 	status=result[0].status;
	  					 			 	    				 }
	  					 				 	    			if(result[0].prospect==null)
	  					 			 	    				 {
	  					 			 	    				 	prospect="";
	  					 			 	    				 }
	  					 			 	    			 else
	  					 			 	    				 {
	  					 			 	    				 	prospect=result[0].prospect;
	  					 			 	    				 }
	  					 				 	    			if(result[0].role==null)
	  					 			 	    				 {
	  					 			 	    				 	role="";
	  					 			 	    				 }
	  					 			 	    			 else
	  					 			 	    				 {
	  					 			 	    				 	role=result[0].role;
	  					 			 	    				 }
	  					 				 	    			if(result[0].owner==null)
	  					 			 	    				 {
	  					 			 	    				 	owner="";
	  					 			 	    				 }
	  					 			 	    			 else
	  					 			 	    				 {
	  					 			 	    				 	owner=result[0].owner;
	  					 			 	    				 }
	  					 				 	    			if(result[0].parent==null)
	  					 			 	    				 {
	  					 			 	    				 	parent="";
	  					 			 	    				 }
	  					 			 	    			 else
	  					 			 	    				 {
	  					 			 	    				 	parent=result[0].parent;
	  					 			 	    				 }
	  					 				 	    			if(result[0].mainContact==null)
	  					 			 	    				 {
	  					 			 	    				 	mainContact="";
	  					 			 	    				 }
	  					 			 	    			 else
	  					 			 	    				 {
	  					 			 	    				 	mainContact=result[0].mainContact;
	  					 			 	    				 }
	  					 				 	    			if(result[0].website==null)
	  					 			 	    				 {
	  					 			 	    				 	website="";
	  					 			 	    				 }
	  					 			 	    			 else
	  					 			 	    				 {
	  					 			 	    				 	website=result[0].website;
	  					 			 	    				 }
	  					 				 	    			if(result[0].abcClassification==null)
	  					 			 	    				 {
	  					 			 	    				 	abcClassification="";
	  					 			 	    				 }
	  					 			 	    			 else
	  					 			 	    				 {
	  					 			 	    				 	abcClassification=result[0].abcClassification;
	  					 			 	    				 } 
	  					 				 	        	    var htmlData =  " <h4 style='font-size: 16px;'>Customer</h4><div class='row' style='border-bottom: 1px solid #5061b5; margin-bottom:5px;'></div><b>"+name+"</b><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Status :</p></div><div class='col-sm-7'><p>"
	  					 				 	        	   +status+"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Prospect :</p></div><div class='col-sm-7'><p>"
	  					 				 	        	   +prospect+"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Role :</p></div><div class='col-sm-7'><p>"
	  					 				 	        	   +role+"</p></div></div><div class='row' ><div class='col-sm-5' style='text-align:right;'><p>Owner :</p></div><div class='col-sm-7'><p><a href='#'>"
	  					 				 	        	   +owner+"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Parent account :</p></div><div class='col-sm-7'><p><a href='#'>"
	  					 				 	        	   +parent+"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Main Contact :</p></div><div class='col-sm-7'><p><a href='#'>"
	  					 				 	        	   +mainContact+"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Web Site :</p></div><div class='col-sm-7'><p><a href='#'>"
	  					 				 	        	   +website+"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>ABC Classification :</p></div><div class='col-sm-7'>"
	  					 				 	        	   +abcClassification+"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Contact Permission :</p></div><div class='col-sm-7'></div></div>";
	  					 				 	        	   $("#modalInvolpopover1").html(htmlData);
	  					 				 	    				 }
	  					 				 	    		 },		 
	  					 				 	        	   
	  					 				 	           
	  					 				 	           error: function(result)
	  					 				 	   		{   
	  					 				 	        	   
	  					 				 	        	 var htmlData =  " <h4 style='font-size: 16px;'>Customer</h4><div class='row' style='border-bottom: 1px solid #5061b5; margin-bottom:5px;'></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Status :</p></div><div class='col-sm-7'><p>"
	  					 				 	        	   +"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Prospect :</p></div><div class='col-sm-7'><p>"
	  					 				 	        	   +"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Role :</p></div><div class='col-sm-7'><p>"
	  					 				 	        	   +"</p></div></div><div class='row' ><div class='col-sm-5' style='text-align:right;'><p>Owner :</p></div><div class='col-sm-7'><p><a href='#'>"
	  					 				 	        	   +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Parent account :</p></div><div class='col-sm-7'><p><a href='#'>"
	  					 				 	        	   +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Main Contact :</p></div><div class='col-sm-7'><p><a href='#'>"
	  					 				 	        	   +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Web Site :</p></div><div class='col-sm-7'><p><a href='#'>"
	  					 				 	        	   +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>ABC Classification :</p></div><div class='col-sm-7'>"
	  					 				 	        	   +"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Contact Permission :</p></div><div class='col-sm-7'></div></div>";
	  					 				 	        	   $("#modalInvolpopover1").html(htmlData);
	  					 				 	   		}
	  					 				 	    	  
	  					 				 	            
	  					 				 	        });
	  						 		  }
	  						 		  else if(type=="Attendee" || type=="Contact" || type=="Activity Contact")
	  						 			  {
	  						 			  		
	  						 			 var url= contextPath+"contact/displayContactMouseHover/"+actId;
	  						 		   // alert(url);

	  						 		    	$.ajax({url:url,
	  						 		    		type:"GET",
	  						 		    		  dataType: 'json',
	  						 		    			 async: false ,
	  						 					 	    		  success: function(result)
	  						 					 	    		{   
	  						 					 	    		//alert(result);
	  						 					 	    			 
	  						 					 	    			 
	  						 					 	    			 if(result=="")
	  						 					 	    				 {
	  						 					 	    			 htmlData =  " <h4 style='font-size: 16px;'>Contact</h4><div class='row' style='border-bottom: 1px solid #5061b5; margin-bottom:5px;'></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Status :</p></div><div class='col-sm-7'><p>"
	 	  						 					 	        	    +"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Account :</p></div><div class='col-sm-7'><p><a href='#'>"
	 	  						 					 	        	    +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Job Title :</p></div><div class='col-sm-7'><p>"
	 	  						 					 	        	    +"</p></div></div><div class='row' ><div class='col-sm-5' style='text-align:right;'><p>Function :</p></div><div class='col-sm-7'><p>"
	 	  						 					 	        	    +"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Department :</p></div><div class='col-sm-7'><p>"
	 	  						 					 	        	    +"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>PhoneNumber :</p></div><div class='col-sm-7'><p><a href='#'>"
	 	  						 					 	        	    +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Mobile :</p></div><div class='col-sm-7'><p><a href='#'>"
	 	  						 					 	        	    +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Email :</p></div><div class='col-sm-7'><p><a href='#'>"
	 	  						 					 	        	    +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Contact Permission :</p></div><div class='col-sm-7'></div></div>";
	  						 							 	        	   $("#modalInvolpopover1").html(htmlData);
	  						 					 	    				 }
	  						 					 	    			 else{
	  						 					 	    				
	  						 					 	    				var contact;
	  						 						 	    			  var status;
	  						 						 	    			  var name;
	  						 						 	    			  var jobTitle;
	  						 						 	    			  var func;
	  						 						 	    			  var department;
	  						 						 	    			var phone;
	  						 						 	    			var mobileNumber;				 	    			 
	  						 						 	    			  var email;
	  						 					 	    			  if(result[0].name==null)
	  						 					 	    				  {
	  						 					 	    				  	contact="";
	  						 					 	    				  }
	  						 					 	    			  else
	  						 					 	    				  {
	  						 					 	    				  	contact=result[0].name;
	  						 					 	    				  }
	  						 					 	    			if(result[0].status==null)
	  						 				 	    				  {
	  						 				 	    				  	status="";
	  						 				 	    				  }
	  						 				 	    			  else
	  						 				 	    				  {
	  						 				 	    				  	status=result[0].status;
	  						 				 	    				  }
	  						 					 	    			if(result[0].account==null)
	  						 				 	    				  {
	  						 				 	    				  	name="";
	  						 				 	    				  }
	  						 				 	    			  else
	  						 				 	    				  {
	  						 				 	    				  	name=result[0].account;
	  						 				 	    				  }
	  						 					 	    			if(result[0].jobTitle==null)
	  						 				 	    				  {
	  						 				 	    				  	jobTitle="";
	  						 				 	    				  }
	  						 				 	    			  else
	  						 				 	    				  {
	  						 				 	    				  	jobTitle=result[0].jobTitle;
	  						 				 	    				  }
	  						 					 	    			if(result[0].function==null)
	  						 				 	    				  {
	  						 				 	    				  	func="";
	  						 				 	    				  }
	  						 				 	    			  else
	  						 				 	    				  {
	  						 				 	    				  	func=result[0].function;
	  						 				 	    				  }
	  						 					 	    			if(result[0].department==null)
	  						 				 	    				  {
	  						 				 	    				  	department="";
	  						 				 	    				  }
	  						 				 	    			  else
	  						 				 	    				  {
	  						 				 	    				  	department=result[0].department;
	  						 				 	    				  }
	  						 					 	    			
	  						 						    			if(result[0].email==null)
	  						 				 	    				  {
	  						 				 	    				  	email="";
	  						 				 	    				  }
	  						 				 	    			  else
	  						 				 	    				  {
	  						 				 	    				  	email=result[0].email;
	  						 				 	    				  }
	  						 						    			 if(result[0].phone==null)
	  						 					    				 {
	  						 						    				 phone="";
	  						 					    				}
	  						 						    			 else
	  						 						    				 {
	  						 						    				 phone=result[0].phone;
	  						 						    				 }
	  						 					    			 if(result[0].mobile==null)
	  						 					    				 {
	  						 					    				 mobileNumber="";
	  						 					    				 }
	  						 					    			 else
	  						 					    				 {
	  						 					    				 mobileNumber=result[0].mobile;
	  						 					    				 }
	  						 					 	    	//alert(phonenumber);
	  						 					 	        	    htmlData =  " <h4 style='font-size: 16px;'>Contact</h4><div class='row' style='border-bottom: 1px solid #5061b5; margin-bottom:5px;'></div><b>"+contact+"</b><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Status :</p></div><div class='col-sm-7'><p>"
	  						 					 	        	    +status+"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Account :</p></div><div class='col-sm-7'><p><a href='#'>"
	  						 					 	        	    +name+"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Job Title :</p></div><div class='col-sm-7'><p>"
	  						 					 	        	  +jobTitle+"</p></div></div><div class='row' ><div class='col-sm-5' style='text-align:right;'><p>Function :</p></div><div class='col-sm-7'><p>"
	  						 					 	        	+func+"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Department :</p></div><div class='col-sm-7'><p>"
	  						 					 	        	+department+"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>PhoneNumber :</p></div><div class='col-sm-7'><p><a href='#'>"
	  						 					 	        	+phone+"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Mobile :</p></div><div class='col-sm-7'><p><a href='#'>"
	  						 					 	        	+mobileNumber+"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Email :</p></div><div class='col-sm-7'><p><a href='#'>"
	  						 					 	        	+email+"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Contact Permission :</p></div><div class='col-sm-7'></div></div>";
	  						 					 	        	   $("#modalInvolpopover1").html(htmlData);
	  						 					 	    			 }
	  						 					 	    		 },		 
	  						 					 	        	   
	  						 					 	           
	  						 					 	           error: function(result)
	  						 					 	   		{   
	  						 					 	        	   
	  						 					 	        	 htmlData =  " <h4 style='font-size: 16px;'>Contact</h4><div class='row' style='border-bottom: 1px solid #5061b5; margin-bottom:5px;'></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Status :</p></div><div class='col-sm-7'><p>"
	  						 					 	        	    +"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Account :</p></div><div class='col-sm-7'><p><a href='#'>"
	  						 					 	        	    +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Job Title :</p></div><div class='col-sm-7'><p>"
	  						 					 	        	    +"</p></div></div><div class='row' ><div class='col-sm-5' style='text-align:right;'><p>Function :</p></div><div class='col-sm-7'><p>"
	  						 					 	        	    +"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Department :</p></div><div class='col-sm-7'><p>"
	  						 					 	        	    +"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>PhoneNumber :</p></div><div class='col-sm-7'><p><a href='#'>"
	  						 					 	        	    +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Mobile :</p></div><div class='col-sm-7'><p><a href='#'>"
	  						 					 	        	    +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Email :</p></div><div class='col-sm-7'><p><a href='#'>"
	  						 					 	        	    +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Contact Permission :</p></div><div class='col-sm-7'></div></div>";
	  						 					 	        	   $("#modalInvolpopover1").html(htmlData);
	  						 					 	   		}
	  						 					 	    	  
	  						 					 	            
	  						 					 	        });
	  						 			  }
	  						 		  else if(type=="Employee Responsible" || type=="Organizer")
	  						 			  {
	  						 			
	  						 			var url= contextPath+"employee/displayOnEmployeeMouseHover/"+actId;
	  						 			//alert(url);
	  						 		   // alert(url);
	  						 		    	$.ajax({url:url,
	  						 		    		type:"GET",
	  						 		    		  dataType: 'json',
	  						 					
	  						 		    		  success: function(result)
	  						 		    		{   
	  						 		    			  if(result=="")
	  						 		    				  {
	  						 		    				 htmlData =  " <h4 style='font-size: 16px;'>EMPLYOEE</h4><div class='row' style='border-bottom: 1px solid #5061b5; margin-bottom:5px;'></div><div class='row'><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Job :</p></div><div class='col-sm-7'><p>"
	  		  						 		        	   +"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Department :</p></div><div class='col-sm-7'><p>"
	  		  						 		        	   +"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>E-Mail :</p></div><div class='col-sm-7'><p style='width: 143px; text-overflow: ellipsis; overflow:hidden; white-space:nowrap;'><a href='#'>"
	  		  						 		        	   +"</a></p></div></div><div class='row' ><div class='col-sm-5' style='text-align:right;'><p>Phone :</p></div><div class='col-sm-7'><p><a href='#'>"
	  		  						 		        	   +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Mobile :</p></div><div class='col-sm-7'><p><a href='#'>"
	  		  						 		        	   +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Address :</p></div><div class='col-sm-7'><p>"
	  		  						 		        	   +"</p></div></div></div>";
	  						 			 	        	 			
	  						 			 	        	   $("#modalInvolpopover1").html(htmlData);
	  						 		    				  }
	  						 		    			  else
	  						 		    				  {
	  						 		    			var name;
	  						 		    			var job;	  
	  						 		    			var department;
	  						 		    			var email;
	  						 		    			var phone;
	  						 		    			var mobile;
	  						 		    			var address;
	  						 		    			
	  						 		    			if(result[0].name==null)
	  						 		    				{
	  						 		    					name="";
	  						 		    				}
	  						 		    			else
	  						 		    				{
	  						 		    					name=result[0].name;
	  						 		    				}
	  						 		    			if(result[0].job==null)
	  						 	  				{
	  						 		    				job="";
	  						 	  				}
	  						 	  			else
	  						 	  				{
	  						 	  					job=result[0].job;
	  						 	  				}
	  						 	  		
	  						 		    			if(result[0].department==null)
	  						 	  				{
	  						 		    				department="";
	  						 	  				}
	  						 	  			else
	  						 	  				{
	  						 	  					department=result[0].department;
	  						 	  				}
	  						 	  		
	  						 		    			if(result[0].email==null)
	  						 	  				{
	  						 		    				email="";
	  						 	  				}
	  						 	  			else
	  						 	  				{
	  						 	  					email=result[0].email;
	  						 	  				}
	  						 	  		
	  						 		    			if(result[0].mobile==null)
	  						 	  				{
	  						 		    				mobile="";
	  						 	  				}
	  						 	  			else
	  						 	  				{
	  						 	  					mobile=result[0].mobile;
	  						 	  				}
	  						 	  		
	  						 		    			if(result[0].phone==null)
	  						 	  				{
	  						 		    				phone="";
	  						 	  				}
	  						 	  			else
	  						 	  				{
	  						 	  					phone=result[0].phone;
	  						 	  				}
	  						 	  		
	  						 		    			if(result[0].address==null)
	  						 	  				{
	  						 		    				address="";
	  						 	  				}
	  						 	  			else
	  						 	  				{
	  						 	  					address=result[0].address;
	  						 	  				}
	  						 	  		
	  						 		    		
	  						 		    			 
	  						 		        	   htmlData =  " <h4 style='font-size: 16px;'>EMPLYOEE</h4><div class='row' style='border-bottom: 1px solid #5061b5; margin-bottom:5px;'></div><b> "+name+"</b><div class='row'><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Job :</p></div><div class='col-sm-7'><p>"
	  						 		        	   +job+"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Department :</p></div><div class='col-sm-7'><p>"
	  						 		        	   +department+"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>E-Mail :</p></div><div class='col-sm-7'><p style='width: 143px; text-overflow: ellipsis; overflow:hidden; white-space:nowrap;'><a href='#'>"
	  						 		        	  	+email+"</a></p></div></div><div class='row' ><div class='col-sm-5' style='text-align:right;'><p>Phone :</p></div><div class='col-sm-7'><p><a href='#'>"
	  						 		        	  	+phone+"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Mobile :</p></div><div class='col-sm-7'><p><a href='#'>"
	  						 		        	  	+mobile+"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Address :</p></div><div class='col-sm-7'><p>"
	  						 		        	  	+address+"</p></div></div></div>";
	  						 		        	 			
	  						 		        	   $("#modalInvolpopover1").html(htmlData);
	  						 		        	  
	  						 		    				  }
	  						 		        	 
	  						 		    		 },		 
	  						 		        	   
	  						 		           
	  						 		           
	  						 		          error: function(result)
	  						 		 	   		{   
	  						 		 	        	   
	  						 		        	 htmlData =  " <h4 style='font-size: 16px;'>EMPLYOEE</h4><div class='row' style='border-bottom: 1px solid #5061b5; margin-bottom:5px;'></div><div class='row'><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Job :</p></div><div class='col-sm-7'><p>"
	  						 		        	   +"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Department :</p></div><div class='col-sm-7'><p>"
	  						 		        	   +"</p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>E-Mail :</p></div><div class='col-sm-7'><p style='width: 143px; text-overflow: ellipsis; overflow:hidden; white-space:nowrap;'><a href='#'>"
	  						 		        	   +"</a></p></div></div><div class='row' ><div class='col-sm-5' style='text-align:right;'><p>Phone :</p></div><div class='col-sm-7'><p><a href='#'>"
	  						 		        	   +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Mobile :</p></div><div class='col-sm-7'><p><a href='#'>"
	  						 		        	   +"</a></p></div></div><div class='row'><div class='col-sm-5' style='text-align:right;'><p>Address :</p></div><div class='col-sm-7'><p>"
	  						 		        	   +"</p></div></div></div>";
	  						 		 	        	 			
	  						 		 	        	   $("#modalInvolpopover1").html(htmlData);
	  						 		 	   		}
	  						 		 	    	  
	  						 		 	            
	  						 		 	        }); 
	  						 			  }
	  						 		timeoutId = window.setTimeout(function() {
	 					                timeoutId = null;
	 					               
	 					                $("#actModalInvol_popover").show();

	 						    	}, 1500);
	  						 		    $(".Invol_popover1").hover(function() {
	  						 		        if (!timeoutId) {
	  						 		            timeoutId = window.setTimeout(function() {
	  						 		                timeoutId = null;
	  						 		            // alert(htmlData);
	  						 		                $("#actModalInvol_popover").show();
	  						 	    	}, 1500);
	  						 			        }
	  						 			    },
	  						 			    function () {
	  						 			        if (timeoutId) {
	  						 			            window.clearTimeout(timeoutId);
	  						 			            timeoutId = null;
	  						 			        }
	  						 			        
	  						 			    });
	  						 		 
	  						 		},
	  						
	  						 	
	  						 		 $("#actModalInvol_popover").mouseleave(function(){
	  							 	        $("#actModalInvol_popover").css("display", "none");
	  							 	    }); 
	  						 		});
	  								
		        function insertRelatedForFollowup(datafollow){
		        	
			    	var followUpAppointmentId=datafollow;
			    	
			    	var data={
			    			 "appointmentid":followUpAppointmentId,
			    			"activityitemtypeid":'f6a44de1-6178-11e7-8328-484d7ec12da6',
			    			"activityrelateditemid":appointmentId,
			    			"createdby":user
			    		}
			    	
			    	
			    	data=JSON.stringify(data); 
			    	//alert(data);
			    	console.log(data);
			    	//alert(contextPath+"appointmentactivityrelatedItem/insertAppointmentRelatedItem");
			    	
			    	$.ajax({url:contextPath+"appointmentactivityrelatedItem/insertAppointmentRelatedItem",
			    		type:"POST",
			    		data:data,
			    		  contentType: "application/json; charset=utf-8",
					        dataType   : "text",
			    		
			    	
			    		success: function(result)
			    		{
			           		//alert("Sucess"+result);
			           		datareturnedinrelated=result;
			           		loadAddedRelatedItems();
			           		
			        	   
			           },
			    		error:function()
			    		{
			    			console.log("Error");
			    		}
			    	  
			    	   
			    	  
			    });
			    	
		        	
		        	
		        }



		        function AttendeeFecthData()
	  	  {
		  		  
		  		  
		  		var url= contextPath+"involvedparty/listInvolvedParties/"+appointmentId;
		  		//alert(url);
		  		  	$.ajax({url:url,
		  		  		type:"GET",
		  		  		
		  		  	
		  		  		success: function(result)
		  		  		{
		  		  		var j=0;
		  		  			for(var i = 0; i< result.length; i++) {
		  		  				//alert("hi");

		  		  				
		  		  				//alert("daat"+result[i].productName);
		  		  				if(result[i].partyDescription=='Attendee')
		  		  					{
		  		  				attenRow();
		  		  			var aa=document.getElementById("sourcename"+j).value='Account';
		  		  			var bb=	document.getElementById("attendeefollow"+j).value=result[i].name;
		  		  			var cc=	document.getElementById("attendeeFollowId"+j).value=result[i].partyId;	  		  				
		  		  				j++;
		  		  				//alert(aa);
		  		  				//alert(bb);
		  		  				//alert(cc);
		  		  					}
		  		  			}
		  		  			
		  		  		}
		  		  	});
		  		  	
		  		  		
		  	  }
		        var accountIdInAppointment="";
		        function relatedItemsdropdownvalue()
		        {
		        	var url= contextPath+"appointmentactivityrelatedItem/appointmentActivityRelatedItemType";
			  		var htmlData="";
			  		  	$.ajax({url:url,
			  		  		type:"GET",
			  		  		
			  		  	
			  		  		success: function(result)
			  		  		{
			  		  		var j=0;
			  		  	accountIdInAppointment=result[0].appointmentTypeId;
			  		  			for(var i = 0; i< result.length; i++) {
			  		  			 htmlData=htmlData+ "<option value="+result[i].appointmentTypeId+">"+result[i].appointmentType+"</option>";
			  		  				
			  		  					}
			  		  		
			  		  			}
			  		  			
			  		  
			  		
			  		  	});
			  		 
		        }
		        
