
$(document).ready(function () {	
	var url = contextPath + "/login/getmodules/"+roleId;
	var tablist="";	
	
	$.ajax({
			url : url,
			async:false,
			success : function(result) {
				if(result=="")
					{
					tablist='<li style="float: right;"><div><input class="form-control" type="text" id="searchJobs" placeholder="Search Jobs" style=" width: 100%;"><span id="searchclear" class="glyphicon glyphicon-remove-circle" onclick="clearSearch();"></span></div>	</li>' ;		
					
					}
				else
					{
						for(var i = 0; i< result.length; i++)
						{											
							switch(result[i].module) 
							{
							    case "Applied Jobs":				
							    	tablist+='<li><a data-toggle="tab" href="#Appliedjob"  onClick="loadAppliedJobs();">Applied Jobs</a> </li>' ;	
							        break;
							    case "Relevant Jobs":				
							    	tablist+='<li><a data-toggle="tab" href="#relevantjobsTab"  onClick="loadrelevantjobs(),listUserSkillsBasedOnUser();">Relevant Jobs</a> </li>' ;							    	
							        break;
							    case "Applicants":
							    	tablist+='<li class="active"><a data-toggle="tab" href="#Applicant"  id="applicantTab" onClick="loadAppliedJobsByCandidates();">Applicants</a> </li>' ;
							    	loadAppliedJobsByCandidates();
							    	$('#home').removeClass('in active');							    	
							  		$('#Applicant').addClass('in active');
							        break;
							    case "View Jobs":
							    	tablist+='<li class="active" id="activeJobliIjp"><a data-toggle="tab" href="#home" id="viewId" onClick="loadActiveJobs();">View Jobs</a></li>' ;	
							    	loadActiveJobs();
							    	$('#home').addClass('in active');
							  		$('#Applicant').removeClass('in active');
							    	break;		
							    	
							}							
						}
						tablist+='<li style="float: right;"><div><input class="form-control" type="text" id="searchJobs" placeholder="Search Jobs" style=" width: 100%;"><span id="searchclear" class="glyphicon glyphicon-remove-circle"  style="display:none;"></span></div>	</li>' ;		

					}					
			},
			error : function(result) {
				tablist='<li style="float: right;"><div><input class="form-control" type="text" id="searchJobs" placeholder="Search Jobs" style=" width: 100%;"><span id="searchclear" class="glyphicon glyphicon-remove-circle" onclick="clearSearch();"></span></div>	</li>' ;		

			}
	});
	 
	 $("#mainTabForIjp").html(tablist); 	

	 document.getElementById('getname').innerHTML=name;
	 document.getElementById('welcomeName').innerHTML=name;
	 document.getElementById('getPsNo').innerHTML=psNO;
	 document.getElementById('getEmail').innerHTML=email;
	 document.getElementById('getCurrentBu').innerHTML=currentBu;
	 document.getElementById('getCurrentLocation').innerHTML=baselocation;
	 document.getElementById('getIsPsNumber').innerHTML=isPsNo;
	 
	 document.getElementById('modalGetName').innerHTML=name;
	 document.getElementById('modalPsNo').innerHTML=psNO;
	 document.getElementById('modalEmail').innerHTML=email;
	 document.getElementById('modalBu').innerHTML=currentBu;
	 document.getElementById('modalLocation').innerHTML=baselocation;
	 document.getElementById('modalIsPsNum').innerHTML=isPsNo;
	 
	 document.getElementById('getrole').innerHTML=role;
	 $('#modalEmail').attr('title', email);

	 if(role=="Employee"){
		 $('#searchJobs').removeAttr('onkeyup','serchApplicants(event);');
		 $('#searchJobs').removeAttr('onkeyup','serchAppliedJob(event);');
		 $('#searchJobs').removeAttr('onkeyup','serchrelevantjobs(event);');	
		 $('#searchJobs').attr('onkeyup','serchViewJobs(event);');
	 }
	 else if(role=="Resource Manager")
		 {
			 $('#searchJobs').removeAttr('onkeyup','serchViewJobs(event);');	 
			 $('#searchJobs').removeAttr('onkeyup','serchAppliedJob(event);');
			 $('#searchJobs').removeAttr('onkeyup','serchrelevantjobs(event);');
			 $('#searchJobs').attr('onkeyup','serchApplicants(event);');
		 }
	 else if(role=="Admin")
	 {
		 $('#searchJobs').removeAttr('onkeyup','serchViewJobs(event);');	 
		 $('#searchJobs').removeAttr('onkeyup','serchrelevantjobs(event);');
		 $('#searchJobs').removeAttr('onkeyup','serchAppliedJob(event);');
		 $('#searchJobs').attr('onkeyup','serchApplicants(event);');
	 }
	 document.getElementById('modalGetNameForAppliedJobs').innerHTML=name;
	 document.getElementById('modalPsNoForAppliedJobs').innerHTML=psNO;
	 document.getElementById('modalEmailForAppliedJobs').innerHTML=email;
	 document.getElementById('modalBuForAppliedJobs').innerHTML=currentBu;
	 document.getElementById('modalLocationForAppliedJobs').innerHTML=baselocation;
	 document.getElementById('modalIsPsNumForAppliedJobs').innerHTML=isPsNo;
	 
	 $('#modalEmailForAppliedJobs').attr('title', email);
	 
	$("#EmailTableForRM").tableHeadFixer();
	$("#applicantTableId").tableHeadFixer();
	$("#relevantjobsTableId").tableHeadFixer();
	 $("#applicantTableId2").tableHeadFixer();
	 $("#appliedjobsTableId").tableHeadFixer();
	 $("#viewjobsTableId").tableHeadFixer();

});
function clearSearchForLoadActiveJobs(){
	$("#searchJobs").val('');
	 var tableData="";
	$("#getIjps").html(tableData);
	loadActiveJobs();
	$('#searchclear').css('display','none');
}

function clearSearchForAppliedJobsByCandidates(){
	$("#searchJobs").val('');	
	 var tableData="";
	$("#getApplicantApplied").html(tableData);
	loadAppliedJobsByCandidates();
	$('#searchclear').css('display','none');
}

function clearSearchForrelevantjobs(){
	$("#searchJobs").val('');	
	 var tableData="";
	$("#getrelevantjobsIjps").html(tableData);
	loadrelevantjobs()	
	$('#searchclear').css('display','none');
}
function clearSearchForAppliedJobs(){
	$("#searchJobs").val('');	
	 var tableData="";
	$("#getApplicantIjps").html(tableData);
	loadAppliedJobs()
	$('#searchclear').css('display','none');
}

function loadActiveJobs()
{
	
	 $('#searchJobs').removeAttr('onkeyup','serchApplicants(event);');
	 $('#searchJobs').removeAttr('onkeyup','serchAppliedJob(event);');
	 $('#searchJobs').removeAttr('onkeyup','serchrelevantjobs(event);');
	 $('#searchJobs').attr('onkeyup','serchViewJobs(event);');
	 $("#searchJobs").val('');
	 var url = contextPath + "/Ijp/ActiveJobs";
	var data={		 				 
				"startrow":"0",
				"endrow":"100",				
				"serach":"",
				"psNo":user
				}
   

	 data=JSON.stringify(data); 
		$.ajax({url : url,
			 type: "POST",
			   data: data,
			   contentType: "application/json; charset=utf-8",
			   dataType   : "json",
			   	success: function(result)
			   	{   			   		
            	 if(result.length==1)
            		 {
            		 var tableData ="";
            		 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td><td></td></tr>";	           	 	 
           	 	   	$("#getIjps").html(tableData);
		           	 	  accountcount=0; 
		           	 	 var optionData="";
		           	   	var count=Math.ceil(accountcount/100);   
		           	    for(j=1;j<=count;j++){
		           			 optionData = optionData + "<li><a href='#' onclick='loadActiveJobspagination("+(j-1)+"00,"+j+"00);'>"+j+"</a></li>";
		           			 }
           	    		$("#viewjobs").html(optionData);           	 	 
            		 }
            	 else
            		 {
            	  var count=Math.ceil(result[0].count/100);   
          	   	//$('#accountPagination').removeData("twbsPagination");
          	   	$('#viewjobs').twbsPagination('destroy'); 
          		   $('#viewjobs').twbsPagination({
          		         totalPages: count,
          		         visiblePages: 10,
          		         next: 'Next',
          		         prev: 'Prev',
          		         onPageClick: function (event, page) {
          		        var limit=(page-1)*100;	 
          		      loadActiveJobspagination(limit,100);
          		            
          		         }
          		     });   					       
	    	  
	    	
            		 }  
       
       },
error: function(result)
{   
	 var tableData ="";
	 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td><td></td></tr>";		 
	 $("#getIjps").html(tableData);
   	 accountcount=0; 
   	var optionData="";
   	 var count=Math.ceil(accountcount/100);   
   	 for(j=1;j<=count;j++){
   		 optionData = optionData + "<li><a href='#' onclick='loadActiveJobspagination("+(j-1)+"00,"+j+"00);'>"+j+"</a></li>";
   	 }
   	$("#viewjobs").html(optionData);      
}

});
     
   
}
function loadActiveJobspagination(start,end)
{	
	 var search=$("#searchJobs").val();
	 var url = contextPath + "/Ijp/ActiveJobs";
	var data={		 				 
				"startrow":start,
				"endrow":end,				
				"serach":search,
				"psNo":user			
				}
	 data=JSON.stringify(data); 		
		$.ajax({url : url,
			 type: "POST",
			   data: data,
			   contentType: "application/json; charset=utf-8",
			   dataType   : "json",
			   	success: function(result)
			   	{   
            	  var tableData ="";
            	  if(result.length==1)
            		  {
            		  	var tableData ="";
            		  	 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td><td></td></tr>";		 
            			 $("#getIjps").html(tableData);            		   	     
            		  }
            	  else
            		  {
	          
	           for(var i = 1; i< result.length; i++) {
						 
	        	   
	        	   		if (result[i].resourcePlanId != null) {
							result[i].resourcePlanId = result[i].resourcePlanId;

						} else {
							result[i].resourcePlanId = " ";

						}
	        	   		if (result[i].deliveryUnit != null) {
							result[i].deliveryUnit = result[i].deliveryUnit;

						} else {
							result[i].deliveryUnit = " ";

						}
						if (result[i].jobTitle != null) {
							result[i].jobTitle = result[i].jobTitle;

						} else {
							result[i].jobTitle = " ";

						} 
						if (result[i].expectedFulfilmentDate != null) {
							result[i].expectedFulfilmentDate = result[i].expectedFulfilmentDate;

						} else {
							result[i].expectedFulfilmentDate = " ";

						} 
						if (result[i].primaryEngineeringGroup != null) {
							result[i].primaryEngineeringGroup = result[i].primaryEngineeringGroup;

						} else {
							result[i].primaryEngineeringGroup = " ";

						} 
						if (result[i].appliedStatus != null) {
							result[i].appliedStatus = result[i].appliedStatus;

						} else {
							result[i].appliedStatus = " ";

						} 
						var status = "\"" + result[i].appliedStatus + "\"";
						var applied="\"Active\"";
						var id = "\"" + result[i].resourcePlanId + "\"";
	        	 var year=result[i].expectedFulfilmentDate.slice(6,10);	    		
	        	 tableData = tableData + "  <tr id='myJobs_"+i+"'>" +
	        	   "<td style='text-align:center;'>"+result[i].resourcePlanId +"</td>" +
	        	   "<td ><a onClick='fetchJobData("+id+","+applied+","+status+")' data-toggle='modal' href='#myModal' data-backdrop='static'>"+result[i].jobName+ "</a></td>" +
	        	   "<td style='text-align:center;'>"+result[i].deliveryUnit+"</td>" +
	        	   "<td style='text-align:center;'>" + result[i].city+", "+result[i].country+ "</td>" +
	        	   "<td style='text-align:center;'>" + result[i].expLevel + "</td>" +
	        	   "<td style='text-align:center;'>" + result[i].expectedFulfilmentDate + "</td>" +
	        	   "<td style='text-align:center;'>" + result[i].appliedStatus + "</td>" +
					"</tr>";
	    					
	        	 
	           }	         
	    	  
	    	   $("#getIjps").html(tableData);
	    	      
            		  }
       },
error: function(result)
{   
	var tableData ="";
	 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td><td></td></tr>";	 	 
	 $("#getIjps").html(tableData);     
}

});
 
		
   
}

	function serchViewJobs(event)
	{
		var a = $('#searchJobs').val();
		var len=a.length;				
		if (a == "" && len==0){	
			$('#searchclear').css('display','none');
			loadAccountTable();
		}else{				
			$("#searchclear").css("display", "block");
			$('#searchclear').removeAttr('onclick','clearSearchForAppliedJobsByCandidates();');
			$('#searchclear').removeAttr('onclick','clearSearchForrelevantjobs();');
			$('#searchclear').removeAttr('onclick','clearSearchForAppliedJobs();');
			$('#searchclear').attr('onclick','clearSearchForLoadActiveJobs();');			
		}
		event.preventDefault();
		
	    if (event.keyCode === 13) {
	    	 var search=$("#searchJobs").val();   
	    	 var url = contextPath + "/Ijp/ActiveJobs";
	    	var data={		 				 
					"startrow":"0",
					"endrow":"100",				
					"serach":search,
					"psNo":user			
					}
	   
		 data=JSON.stringify(data); 		
			$.ajax({url : url,
				 type: "POST",
				   data: data,
				   contentType: "application/json; charset=utf-8",
				   dataType   : "json",
				   	success: function(result)
				   	{   
	            	 if(result.length==1)
	            		 {
	            		 var tableData ="";
	            		 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td><td></td></tr>";			 
	           	 	 
	           	 	   	$("#getIjps").html(tableData);
			           	 	  accountcount=0; 
			           	 	 var optionData="";
			           	   	var count=Math.ceil(accountcount/100);   
			           	    for(j=1;j<=count;j++){
			           			 optionData = optionData + "<li><a href='#' onclick='loadActiveJobspagination("+(j-1)+"00,"+j+"00);'>"+j+"</a></li>";
			           			 }
	           	    		$("#viewjobs").html(optionData);           	 	 
	            		 }
	            	 else
	            		 {	            	
	            	  var count=Math.ceil(result[0].count/100);   
	          	   	//$('#accountPagination').removeData("twbsPagination");
	          	   	$('#viewjobs').twbsPagination('destroy'); 
	          		   $('#viewjobs').twbsPagination({
	          		         totalPages: count,
	          		         visiblePages: 10,
	          		         next: 'Next',
	          		         prev: 'Prev',
	          		         onPageClick: function (event, page) {
	          		        var limit=(page-1)*100;	 
	          		      loadActiveJobspagination(limit,100);
	          		            
	          		         }
	          		     });   					       
		    	  
		    	
	            		 }  
	       
	       },
	error: function(result)
	{   
		 var tableData ="";
		 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td><td></td></tr>";	
		 $("#getIjps").html(tableData);
	   	 accountcount=0; 
	   	var optionData="";
	   	 var count=Math.ceil(accountcount/100);   
	   	 for(j=1;j<=count;j++){
	   		 optionData = optionData + "<li><a href='#' onclick='loadActiveJobspagination("+(j-1)+"00,"+j+"00);'>"+j+"</a></li>";
	   	 }
	   	$("#viewjobs").html(optionData);      
	}

	});
	    }
	}

function fetchJobData(id,Name,status)
{
	fetchNoOfPositions(id);
	
	 var url = contextPath + "Ijp/fetchJobDetails/"+id;
   

     // alert(url);              
     $.ajax({url:url,
            type:"GET",
              dataType: 'json',

              success: function(result)
	    		{
            	  var tableData ="";
	          
	           for(var i = 0; i< result.length; i++) {
						 
	        	   
	        	   		if (result[i].resourcePlanId != null) {
							result[i].resourcePlanId = result[i].resourcePlanId;

						} else {
							result[i].resourcePlanId = " ";

						}
	        	   		
						if (result[i].jobTitle != null) {
							result[i].jobTitle = result[i].jobTitle;

						} else {
							result[i].jobTitle = " ";

						} 
						if (result[i].expectedFulfilmentDate != null) {
							result[i].expectedFulfilmentDate = result[i].expectedFulfilmentDate;

						} else {
							result[i].expectedFulfilmentDate = " ";

						} 
						if (result[i].primaryEngineeringGroup != null) {
							result[i].primaryEngineeringGroup = result[i].primaryEngineeringGroup;

						} else {
							result[i].primaryEngineeringGroup = " ";

						} 
						if (result[i].primarySkills != null) {
							result[i].primarySkills = result[i].primarySkills;
							
						} else {
							result[i].primarySkills = " ";

						}
						if (result[i].secondarySkills != null) {
							result[i].secondarySkills = result[i].secondarySkills;

						} else {
							result[i].secondarySkills = " ";

						} 
						if (result[i].expLevel != null) {
							result[i].expLevel = result[i].expLevel;

						} else {
							result[i].expLevel = " ";

						} 
						if (result[i].city != null) {
							result[i].city = result[i].city;

						} else {
							result[i].city = " ";

						} 
						if (result[i].country != null) {
							result[i].country = result[i].country;

						} else {
							result[i].country = " ";

						} 
						if (result[i].expectedProjectDuration != null) {
							result[i].expectedProjectDuration = result[i].expectedProjectDuration;

						} else {
							result[i].expectedProjectDuration = " ";

						}
						if (result[i].expectedFulfilmentDate != null) {
							result[i].expectedFulfilmentDate = result[i].expectedFulfilmentDate;

						} else {
							result[i].expectedFulfilmentDate = " ";

						}
						var id = "\"" + result[i].resourcePlanId + "\"";
			        	var year=result[i].expectedFulfilmentDate.slice(6,10);
			        	//alert(year);
						 document.getElementById('activeJobTitle').innerHTML = result[i].jobTitle; 
						 document.getElementById('ActiveJobSDesc').innerHTML = result[i].jobDescription; 
						 document.getElementById('ActiveJobsSkills').innerHTML ="<p>Primary Skills : "+result[i].primarySkills+
						 
						 "</p><p>Secondary Skills : "+result[i].secondarySkills+"</p>"; 
						 document.getElementById('ActiveJobsDomain').innerHTML = result[i].primaryEngineeringGroup; 
						 document.getElementById('ActiveJobsQualification').innerHTML = result[i].qualification; 
						/* document.getElementById('ActiveJobsExperince').innerHTML = result[i].expLevel; */
						 document.getElementById('ActiveJobsLocation').innerHTML = result[i].city+" ("+result[i].country+")"; 
						 document.getElementById('ActiveJobsDuration').innerHTML =result[i].expectedProjectDuration+" Months" ;
						/* document.getElementById('ActiveJobsExpectedFullDate').innerHTML =result[i].expectedFulfilmentDate; */
						 document.getElementById('jobID').value = result[i].resourcePlanId; 
						 document.getElementById('psNo').value = user; 
						 document.getElementById('fetchJobName').innerHTML = " IJP_"+year+"-"+result[i].resourcePlanId+"_"+result[i].primaryEngineeringGroup+ "||" + result[i].jobTitle; 
							if(result[i].status=='On Boarded'||result[i].status=='Identified'||result[i].status=='Cancelled'){
								$("#ButtonIdToApply").attr('disabled', 'disabled');
							}
							
							if(Name=="Applied"){
								$("#ButtonIdToApply").css('display', 'none');
							}
							if(Name=="Active"){
								$("#ButtonIdToApply").css('display', 'inline-block');
							}
							//alert(status);
							var psNO=$("#getPsNo").text();
							var count=getResumeCount(psNO);
							if(count=="" ||count==null)
								{
								$("#UpdateResumeWarn").css('display', 'block');
								$("#DownloadResume").css('display', 'none');
								$("#ContactDetailCond").css('display', 'none');
								 $("#ButtonIdToApply").attr('disabled', 'disabled');
								 $("#UpdateResumeSkillMatrix").css('display', 'block'); 
								 
								}
							else
								{
								$("#UpdateResumeWarn").css('display', 'none');
								$("#DownloadResume").css('display', 'block');
								$("#ContactDetailCond").css('display', 'block');
								 $("#ButtonIdToApply").removeAttr('disabled', 'disabled');
								 $("#UpdateResumeSkillMatrix").css('display', 'none');
								 downloadResume(psNO);
								 $("#downloadResumeByUser").attr('href', contextPath+""+count); 
								 $("#downloadResumeByUser").attr('download', count); 
								}
							if(status==null || status=="" || status==" ")
								{		
								
									$("#mobileNoDiv").css('display', 'block');
									$("#statusFormadalDisplay").css('display', 'none');
									//alert("if");
								}
							else 
								{
									$("#mobileNoDiv").css('display', 'none');
									$("#statusFormadalDisplay").css('display', 'block');
									//alert("else");
								}
							document.getElementById('statusFormadal').innerHTML =status; 

							document.getElementById('activeJobTitleForAppliedJobs').innerHTML = result[i].jobTitle; 
							 document.getElementById('ActiveJobSDescForAppliedJobs').innerHTML = result[i].jobDescription; 
							 document.getElementById('ActiveJobsSkillsForAppliedJobs').innerHTML = "<p>Primary Skills : "+result[i].primarySkills+
							 
							 "</p><p>Secondary Skills : "+result[i].secondarySkills+"</p>"; 
							 document.getElementById('ActiveJobsDomainForAppliedJobs').innerHTML = result[i].primaryEngineeringGroup; 
							 document.getElementById('ActiveJobsQualificationForAppliedJobs').innerHTML = result[i].qualification; 
							/* document.getElementById('ActiveJobsExperince').innerHTML = result[i].expLevel; */
							 document.getElementById('ActiveJobsLocationForAppliedJobs').innerHTML = result[i].city+" ("+result[i].country+")"; 
							 document.getElementById('ActiveJobsDurationForAppliedJobs').innerHTML =result[i].expectedProjectDuration+" Months" ;
							/* document.getElementById('ActiveJobsExpectedFullDate').innerHTML =result[i].expectedFulfilmentDate; */
							 document.getElementById('fetchJobNameForAppliedJobs').innerHTML = " IJP_"+year+"-"+result[i].resourcePlanId+"_"+result[i].primaryEngineeringGroup+ "||" + result[i].jobTitle; 
	           }
	           
       },
error: function(result)
{   
	//alert("error");
}

});
     
   
}
function fetchNoOfPositions(id){
	
	 var url = contextPath + "Ijp/fetchRequisitionCount/"+id;
	 $.ajax({url:url,
         type:"GET",
           dataType: 'json',

           success: function(result)
	    		{
         	  var tableData ="";
	          
	           for(var i = 0; i< result.length; i++) {
						 
	        	   
	        	   		if (result[i].requisitionCount != null) {
							result[i].requisitionCount = result[i].requisitionCount;

						} else {
							result[i].requisitionCount = " ";

						}
				
					
						 /*document.getElementById('initialReq').innerHTML = result[i].requisitionCount;*/ 
				/*		 document.getElementById('revisedReq').innerHTML = result[i].requisitionCount; */
						
						 
	           }
	           
    },
error: function(result)
{   
	//alert("error");
}

});
	
}


function clearFields(){
	
	document.getElementById('mobile').value="";
	document.getElementById('UploadResume').value="";
}


function insertResume()
{	
		var jobId=$("#jobID").val();
		var psNo=$("#psNo").val();
		var mobile=$("#mobile").val();
		
	var attachdata={
			"resourceplanId":jobId,
			"psNo":user,
				"applicantContactPhone":mobile,
				"createdBy":user
				
		}
	
	attachdata=JSON.stringify(attachdata); 
	//alert(attachdata);
	console.log(attachdata);
	if(mobile.length==10)
	{
	if(mobile!=""){
		$.ajax({
			url:contextPath+"Ijp/ApplyForjob",
		
			type:"POST",
			 data: attachdata,
			  //async:false,
			   contentType: "application/json; charset=utf-8",
			   dataType   : "text",
		
			 success: function(attachdata)
			{ 
				 
				 //clearFields();
				 
				 
				var message="Job Applied Successfully";
				   	document.getElementById('getSuccessMessage').innerHTML =message;
				   	$("#myModelAlert").modal('show'); 
				   	
				 	$("#myModal").modal('hide'); 
				 	 clearFields();
				 	getEmailForApplying();	
				 	//loadActiveJobs();		
				 	if($('#activeJobliIjp').hasClass('active'))
				 		{
				 			loadActiveJobs();
				 		}
				 	else
				 		{
				 			loadrelevantjobs();
				 		}
			   },														
				    error :function(){
				       	//alert("error");
				       	console.log("error");
				       	
				       }
	});
		
		
	}
	
	}
	else
		{
			var message="Mobile number must be of 10 digits";
		   	document.getElementById('getSuccessMessage').innerHTML =message;
		   	$("#myModelAlert").modal('show'); 
		}
}

/*function insertResume(filePath)
{
	var title=$("#UploadResume").val().replace(/C:\\fakepath\\/i, '');
	var jobId=$("#jobID").val();
	var psNo=$("#psNo").val();
	var mobile=$("#mobile").val();
	var title1=title.replace(/ /g,"~");
	
var attachdata={
		"resourceplanId":jobId,
		"psNo":user,
			"resumeReference":filePath,
			"fileName":title1,
			"applicantContactPhone":mobile,
			"createdBy":user
			
	}

attachdata=JSON.stringify(attachdata); 
//alert(attachdata);
console.log(attachdata);
if(title!="" && mobile!=""){
	$.ajax({
		url:contextPath+"Ijp/ApplyForjob",
	
		type:"POST",
		 data: attachdata,
		  //async:false,
		   contentType: "application/json; charset=utf-8",
		   dataType   : "text",
	
		 success: function(attachdata)
		{ 
			 
			 //clearFields();
			 
			 
			var message="Job Applied Successfully";
			   	document.getElementById('getSuccessMessage').innerHTML =message;
			   	$("#myModelAlert").modal('show'); 
			   	
			 	$("#myModal").modal('hide'); 
			 	 clearFields();
			 	getEmailForApplying();	
			 	//loadActiveJobs();		
			 	if($('#activeJobliIjp').hasClass('active'))
			 		{
			 			loadActiveJobs();
			 		}
			 	else
			 		{
			 			loadrelevantjobs();
			 		}
		   },														
			    error :function(){
			       	//alert("error");
			       	console.log("error");
			       	
			       }
});
	
	
}

	}*/
var datareturned="";
/*function getResumePath()
{

		
	var title = $("#UploadResume").val().replace(/C:\\fakepath\\/i, '');

	var url1 = contextPath + "Ijp/insertResume";

	if (title != "") {
		$.ajax({
			url : url1,
	
		type:"POST",
		  data: new FormData(document.getElementById("UploadResumeForm")),
          enctype: 'multipart/form-data',
          processData: false,
          contentType: false,
          dataType   : "text",
			          success : function(filePath) {

				insertResume(filePath);
			},														

				    			    error : function() {

				console.log("error");

			}
	           		 
	    });
	}
	    	}*/


function loadAppliedJobs()
{
	
	$('#searchJobs').removeAttr('onkeyup','serchViewJobs(event);');
	 $('#searchJobs').removeAttr('onkeyup','serchApplicants(event);');
	 $('#searchJobs').removeAttr('onkeyup','serchrelevantjobs(event);');
	 $('#searchJobs').attr('onkeyup','serchAppliedJob(event);');		 
	$("#viewId").removeClass("active");
	
	 $("#searchJobs").val('');
	 var url = contextPath + "/Ijp/AppliedJobs";
	var data={	"psNumber":user,	 				 
				"startrow":"0",
				"endrow":"100",				
				"serach":""			
				}
   

	 data=JSON.stringify(data);	
		$.ajax({url : url,
			 type: "POST",
			   data: data,
			   contentType: "application/json; charset=utf-8",
			   dataType   : "json",
			   	success: function(result)
			   	{   
            	 if(result.length==1)
            		 {
            		 var tableData ="";
            		 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td><td></td></tr>";		 
           	 	 
           	 	   	$("#getApplicantIjps").html(tableData);
		           	 	  accountcount=0; 
		           	 	 var optionData="";
		           	   	var count=Math.ceil(accountcount/100);   
		           	    for(j=1;j<=count;j++){
		           			 optionData = optionData + "<li><a href='#' onclick='loadAppliedJobspagination("+(j-1)+"00,"+j+"00);'>"+j+"</a></li>";
		           			 }
           	    		$("#appliedJobs").html(optionData);           	 	 
            		 }
            	 else
            		 {
            	  var count=Math.ceil(result[0].count/100);   
          	   	//$('#accountPagination').removeData("twbsPagination");
          	   	$('#appliedJobs').twbsPagination('destroy'); 
          		   $('#appliedJobs').twbsPagination({
          		         totalPages: count,
          		         visiblePages: 10,
          		         next: 'Next',
          		         prev: 'Prev',
          		         onPageClick: function (event, page) {
          		        var limit=(page-1)*100;	 
          		      loadAppliedJobspagination(limit,100);
          		            
          		         }
          		     });   					       
	    	  
	    	
            		 }  
       
       },
error: function(result)
{
	 var tableData ="";
	 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td><td></td></tr>";			 
	 
	   	$("#getApplicantIjps").html(tableData);
   	 	  accountcount=0; 
   	 	 var optionData="";
   	   	var count=Math.ceil(accountcount/100);   
   	    for(j=1;j<=count;j++){
   			 optionData = optionData + "<li><a href='#' onclick='loadAppliedJobspagination("+(j-1)+"00,"+j+"00);'>"+j+"</a></li>";
   			 }
   		$("#appliedJobs").html(optionData);           	 	 
	 }

});
     
   
}
function serchAppliedJob(event)
{
	var a = $('#searchJobs').val();
	var len=a.length;				
	if (a == "" && len==0){	
		$('#searchclear').css('display','none');
		loadAccountTable();
	}else{				
		$("#searchclear").css("display", "block");	
		$('#searchclear').removeAttr('onclick','clearSearchForLoadActiveJobs();');
		$('#searchclear').removeAttr('onclick','clearSearchForAppliedJobsByCandidates();');
		$('#searchclear').removeAttr('onclick','clearSearchForrelevantjobs();');
		$('#searchclear').attr('onclick','clearSearchForAppliedJobs();');		
	}
	event.preventDefault();
	
    if (event.keyCode === 13) {
    	 var search=$("#searchJobs").val();   
    	 var url = contextPath + "/Ijp/AppliedJobs";
    		var data={	
    					"psNumber":user,
    					"startrow":"0",
    					"endrow":"100",				
    					"serach":search		
    					}
    	   
    		 data=JSON.stringify(data);     		
    			$.ajax({url : url,
    				 type: "POST",
    				   data: data,
    				   contentType: "application/json; charset=utf-8",
    				   dataType   : "json",
    				   	success: function(result)
    				   	{   
    	            	 if(result.length==1)
    	            		 {
    	            		 var tableData ="";
    	            		 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td><td></td></tr>";		 
    	           	 	 
    	           	 	   	$("#getApplicantIjps").html(tableData);
    			           	 	  accountcount=0; 
    			           	 	 var optionData="";
    			           	   	var count=Math.ceil(accountcount/100);   
    			           	    for(j=1;j<=count;j++){
    			           			 optionData = optionData + "<li><a href='#' onclick='loadAppliedJobspagination("+(j-1)+"00,"+j+"00);'>"+j+"</a></li>";
    			           			 }
    	           	    		$("#appliedJobs").html(optionData);           	 	 
    	            		 }
    	            	 else
    	            		 {
    	            	  var count=Math.ceil(result[0].count/100);   
    	          	   	//$('#accountPagination').removeData("twbsPagination");
    	          	   	$('#appliedJobs').twbsPagination('destroy'); 
    	          		   $('#appliedJobs').twbsPagination({
    	          		         totalPages: count,
    	          		         visiblePages: 10,
    	          		         next: 'Next',
    	          		         prev: 'Prev',
    	          		         onPageClick: function (event, page) {
    	          		        var limit=(page-1)*100;	 
    	          		      loadAppliedJobspagination(limit,100);
    	          		            
    	          		         }
    	          		     });   					       
    		    	  
    		    	
    	            		 }  
    	       
    	       },
    	error: function(result)
    	{
    		 var tableData ="";
    		 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td><td></td></tr>";	 
    		 
    		   	$("#getApplicantIjps").html(tableData);
    	   	 	  accountcount=0; 
    	   	 	 var optionData="";
    	   	   	var count=Math.ceil(accountcount/100);   
    	   	    for(j=1;j<=count;j++){
    	   			 optionData = optionData + "<li><a href='#' onclick='loadAppliedJobspagination("+(j-1)+"00,"+j+"00);'>"+j+"</a></li>";
    	   			 }
    	   		$("#appliedJobs").html(optionData);           	 	 
    		 }

    	});
    }
}
function loadAppliedJobspagination(start,end)
{
	 var search=$("#searchJobs").val();
	 var url = contextPath + "/Ijp/AppliedJobs";
	var data={	"psNumber":user,	 	 				 
				"startrow":start,
				"endrow":end,				
				"serach":search			
				}
	 data=JSON.stringify(data); 		
		$.ajax({url : url,
			 type: "POST",
			   data: data,
			   contentType: "application/json; charset=utf-8",
			   dataType   : "json",
			   	success: function(result)
			   	{   
            	  var tableData ="";
            	  if(result.length==1)
            		  {
            		  	var tableData ="";
            		  	 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td><td></td></tr>";			 	 
            			 $("#getApplicantIjps").html(tableData);            		   	     
            		  }
            	  else
            		  {	 
	          
	           for(var i = 1; i< result.length; i++) {
						 
	        	   
	        	   		if (result[i].resourcePlanId != null) {
							result[i].resourcePlanId = result[i].resourcePlanId;

						} else {
							result[i].resourcePlanId = " ";

						}
	        	   		if (result[i].deliveryUnit != null) 
	        	   		{				
	        	   			result[i].deliveryUnit = result[i].deliveryUnit;
	        	   			
	        	   		} else {
	        	   			result[i].deliveryUnit = " ";
	        	   		}
						if (result[i].jobTitle != null) {
							result[i].jobTitle = result[i].jobTitle;

						} else {
							result[i].jobTitle = " ";

						} 
						if (result[i].expectedFulfilmentDate != null) {
							result[i].expectedFulfilmentDate = result[i].expectedFulfilmentDate;

						} else {
							result[i].expectedFulfilmentDate = " ";

						} 
						if (result[i].primaryEngineeringGroup != null) {
							result[i].primaryEngineeringGroup = result[i].primaryEngineeringGroup;

						} else {
							result[i].primaryEngineeringGroup = " ";

						} 
						if (result[i].appliedStatus != null) {
							result[i].appliedStatus = result[i].appliedStatus;

						} else {
							result[i].appliedStatus = " ";

						} 
						
						var status = "\"" + result[i].appliedStatus + "\"";
						var applied="\"Applied\"";
						var id = "\"" + result[i].resourcePlanId + "\"";
	        	 var year=result[i].expectedFulfilmentDate.slice(6,10);
	        	 
	        	 tableData = tableData + "  <tr id='appliedJobs_"+i+"'>" +
	        	   "<td style='text-align:center;'>"+result[i].resourcePlanId +"</td>" +
	        	   "<td ><a onClick='fetchJobData("+id+","+applied+","+status+")' data-toggle='modal' href='#myModalForAppliedJobs' data-backdrop='static'>"+result[i].jobName+ "</a></td>" +
	        	   "<td style='text-align:center;'>"+result[i].deliveryUnit+"</td>" +
	        	   "<td style='text-align:center;'>" + result[i].city+", "+result[i].country+ "</td>" +
	        	   "<td style='text-align:center;'>" + result[i].expLevel + "</td>" +
	        	   "<td style='text-align:center;'>" + result[i].expectedFulfilmentDate + "</td>" +
	        	   "<td style='text-align:center;'>" + result[i].appliedStatus + "</td>" +
	        	 	"</tr>";
	           }
	         
	    	  
	    	   $("#getApplicantIjps").html(tableData);
	    	      
   		  }
       },
error: function(result)
{   

  	var tableData ="";
  	 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td><td></td></tr>";			 	 
	 $("#getApplicantIjps").html(tableData);            		   	     
  
}

});
     
   
}

	function loadrelevantjobs()
	{
		
		$('#searchJobs').removeAttr('onkeyup','serchViewJobs(event);');
		$('#searchJobs').removeAttr('onkeyup','serchAppliedJob(event);');
		 $('#searchJobs').removeAttr('onkeyup','serchApplicants(event);');
		 $('#searchJobs').attr('onkeyup','serchrelevantjobs(event);');		 
		$("#viewId").removeClass("active");
		
		 $("#searchJobs").val('');
		 var url = contextPath + "/Ijp/RelevantJobs";		
		var data={		 				 
				"startrow":"0",
				"endrow":"100",				
				"serach":"",
				"psNo":user
				}
	
		 data=JSON.stringify(data);	
			$.ajax({url : url,
				 type: "POST",
				   data: data,
				   contentType: "application/json; charset=utf-8",
				   dataType   : "json",
				   	success: function(result)
				   	{   
	            	 if(result.length==1)
	            		 {
	            		 var tableData ="";
	            		 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td><td></td></tr>";				 
	           	 	 
	           	 	   	$("#getrelevantjobsIjps").html(tableData);
			           	 	  accountcount=0; 
			           	 	 var optionData="";
			           	   	var count=Math.ceil(accountcount/100);   
			           	    for(j=1;j<=count;j++){
			           			 optionData = optionData + "<li><a href='#' onclick='loadrelevantjobspagination("+(j-1)+"00,"+j+"00);'>"+j+"</a></li>";
			           			 }
	           	    		$("#relevantjobs").html(optionData);           	 	 
	            		 }
	            	 else
	            		 {
	            	  var count=Math.ceil(result[0].count/100);   
	          	   	//$('#accountPagination').removeData("twbsPagination");
	          	   	$('#relevantjobs').twbsPagination('destroy'); 
	          		   $('#relevantjobs').twbsPagination({
	          		         totalPages: count,
	          		         visiblePages: 10,
	          		         next: 'Next',
	          		         prev: 'Prev',
	          		         onPageClick: function (event, page) {
	          		        var limit=(page-1)*100;	 
	          		      loadrelevantjobspagination(limit,100);
	          		            
	          		         }
	          		     });   					       
		    	  
		    	
	            		 }  
	       
	       },
	error: function(result)
	{
		 var tableData ="";
		 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td><td></td></tr>";	 
	 	 
	 	   	$("#getrelevantjobsIjps").html(tableData);
       	 	  accountcount=0; 
       	 	 var optionData="";
       	   	var count=Math.ceil(accountcount/100);   
       	    for(j=1;j<=count;j++){
       			 optionData = optionData + "<li><a href='#' onclick='loadrelevantjobspagination("+(j-1)+"00,"+j+"00);'>"+j+"</a></li>";
       			 }
	    		$("#relevantjobs").html(optionData);           	 	 
		 }
	
	});
	     
	   
	}

	function serchrelevantjobs(event)
	{
		var a = $('#searchJobs').val();
		var len=a.length;				
		if (a == "" && len==0){	
			$('#searchclear').css('display','none');
			loadAccountTable();
		}else{				
			$("#searchclear").css("display", "block");	
			$('#searchclear').removeAttr('onclick','clearSearchForLoadActiveJobs();');
			$('#searchclear').removeAttr('onclick','clearSearchForAppliedJobsByCandidates();');
			$('#searchclear').removeAttr('onclick','clearSearchForAppliedJobs();');
			$('#searchclear').attr('onclick','clearSearchForrelevantjobs();');			
		}
		event.preventDefault();
		
	    if (event.keyCode === 13) {
	    	 var search=$("#searchJobs").val();   
	    	 var url = contextPath + "/Ijp/RelevantJobs";	    		
	    		var data={		 				 
	    				"startrow":"0",
	    				"endrow":"100",				
	    				"serach":search,
	    				"psNo":user
	    				}
	    	   
	    		 data=JSON.stringify(data);     		
	    			$.ajax({url : url,
	    				 type: "POST",
	    				   data: data,
	    				   contentType: "application/json; charset=utf-8",
	    				   dataType   : "json",
	    				   	success: function(result)
	    				   	{   
	    	            	 if(result.length==1)
	    	            		 {
	    	            		 var tableData ="";
	    	            		 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td><td></td></tr>";	 
	    	            	 	 
	    	            	 	   	$("#getrelevantjobsIjps").html(tableData);
	    	                   	 	  accountcount=0; 
	    	                   	 	 var optionData="";
	    	                   	   	var count=Math.ceil(accountcount/100);   
	    	                   	    for(j=1;j<=count;j++){
	    	                   			 optionData = optionData + "<li><a href='#' onclick='loadrelevantjobspagination("+(j-1)+"00,"+j+"00);'>"+j+"</a></li>";
	    	                   			 }
	    	            	    		$("#relevantjobs").html(optionData);           	 	 
	    	            		 }
	    	            	 else
	    	            		 {
	    		            	  var count=Math.ceil(result[0].count/100);   
	    			          	   	//$('#accountPagination').removeData("twbsPagination");
	    			          	   	$('#relevantjobs').twbsPagination('destroy'); 
	    			          		   $('#relevantjobs').twbsPagination({
	    			          		         totalPages: count,
	    			          		         visiblePages: 10,
	    			          		         next: 'Next',
	    			          		         prev: 'Prev',
	    			          		         onPageClick: function (event, page) {
	    			          		        var limit=(page-1)*100;	 
	    			          		      loadrelevantjobspagination(limit,100);
	    			          		            
	    			          		         }
	    			          		     });   					       
	    				    	  
	    				    	
	    			           }  
	    	       
	    	       },
	    	error: function(result)
	    	{
	       		 var tableData ="";
	       		 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td><td></td></tr>";			 
	    	 	 
	    	 	   	$("#getrelevantjobsIjps").html(tableData);
	           	 	  accountcount=0; 
	           	 	 var optionData="";
	           	   	var count=Math.ceil(accountcount/100);   
	           	    for(j=1;j<=count;j++){
	           			 optionData = optionData + "<li><a href='#' onclick='loadrelevantjobspagination("+(j-1)+"00,"+j+"00);'>"+j+"</a></li>";
	           			 }
	    	    		$("#relevantjobs").html(optionData);           	 	 
    		 }

	    	});
	    }
	}
	
	function loadrelevantjobspagination(start,end)
	{	
		 var search=$("#searchJobs").val();
		 var url = contextPath + "/Ijp/RelevantJobs";	 
		var data={		 				 
					"startrow":start,
					"endrow":end,				
					"serach":search,
					"psNo":user			
					}
		 data=JSON.stringify(data); 		
			$.ajax({url : url,
				 type: "POST",
				   data: data,
				   contentType: "application/json; charset=utf-8",
				   dataType   : "json",
				   	success: function(result)
				   	{   
	            	  var tableData ="";
	            	  if(result.length==1)
	            		  {
	            		  	var tableData ="";
	            		  	 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td><td></td></tr>";		 	 
	            			 $("#getrelevantjobsIjps").html(tableData);            		   	     
	            		  }
	            	  else
	            		  {
		          
		           for(var i = 1; i< result.length; i++) {
							 
		        	   
		        	   		if (result[i].resourcePlanId != null) {
								result[i].resourcePlanId = result[i].resourcePlanId;

							} else {
								result[i].resourcePlanId = " ";

							}
		        	   		if (result[i].deliveryUnit != null) 
		        	   		{				
		        	   			result[i].deliveryUnit = result[i].deliveryUnit;
		        	   			
		        	   		} else {
		        	   			result[i].deliveryUnit = " ";
		        	   		}
							if (result[i].jobTitle != null) {
								result[i].jobTitle = result[i].jobTitle;

							} else {
								result[i].jobTitle = " ";

							} 
							if (result[i].expectedFulfilmentDate != null) {
								result[i].expectedFulfilmentDate = result[i].expectedFulfilmentDate;

							} else {
								result[i].expectedFulfilmentDate = " ";

							} 
							if (result[i].primaryEngineeringGroup != null) {
								result[i].primaryEngineeringGroup = result[i].primaryEngineeringGroup;

							} else {
								result[i].primaryEngineeringGroup = " ";

							} 
							if (result[i].appliedStatus != null) {
								result[i].appliedStatus = result[i].appliedStatus;

							} else {
								result[i].appliedStatus = " ";

							} 
							var status = "\"" + result[i].appliedStatus + "\"";
							var applied="\"Active\"";
							var id = "\"" + result[i].resourcePlanId + "\"";
		        	 var year=result[i].expectedFulfilmentDate.slice(6,10);	    		
		        	 tableData = tableData + "  <tr id='myJobs_"+i+"'>" +
		        	   "<td style='text-align:center;'>"+result[i].resourcePlanId +"</td>" +
		        	   "<td ><a onClick='fetchJobData("+id+","+applied+","+status+")' data-toggle='modal' href='#myModal' data-backdrop='static'>"+result[i].jobName+ "</a></td>" +
		        	   "<td style='text-align:center;'>"+result[i].deliveryUnit+"</td>" +
		        	   "<td style='text-align:center;'>" + result[i].city+", "+result[i].country+ "</td>" +
		        	   "<td style='text-align:center;'>" + result[i].expLevel + "</td>" +
		        	   "<td style='text-align:center;'>" + result[i].expectedFulfilmentDate + "</td>" +
		        	   "<td style='text-align:center;'>" + result[i].appliedStatus + "</td>" +
						"</tr>";
		    					
		        	 
		           }	         
		    	  
		    	   $("#getrelevantjobsIjps").html(tableData);
		    	      
	            		  }
	       },
	error: function(result)
	{   
		var tableData ="";
		 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td><td></td></tr>";			 	 
		 $("#getrelevantjobsIjps").html(tableData);     
	}

	});
	 
			
	   
}
function loadAppliedJobsByCandidates()
{
	$("#viewId").removeClass("active");	
	 $('#searchJobs').removeAttr('onkeyup','serchViewJobs(event);');	 
	 $('#searchJobs').removeAttr('onkeyup','serchAppliedJob(event);');
	 $('#searchJobs').attr('onkeyup','serchApplicants(event);');	
	 $("#searchJobs").val('');
	 var url = contextPath + "/Ijp/ActiveJobs";
	var data={		 				 
				"startrow":"0",
				"endrow":"100",				
				"serach":"",
				"psNo":user			
				}
   

	 data=JSON.stringify(data); 
		$.ajax({url : url,
			 type: "POST",
			   data: data,
			   contentType: "application/json; charset=utf-8",
			   dataType   : "json",
			   	success: function(result)
			   	{   
            	 if(result.length==1)
            		 {
            		 var tableData ="";
            		 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td></tr>";			 
           	 	 
           	 	   	$("#getApplicantApplied").html(tableData);
		           	 	  accountcount=0; 
		           	 	 var optionData="";
		           	   	var count=Math.ceil(accountcount/100);   
		           	    for(j=1;j<=count;j++){
		           			 optionData = optionData + "<li><a href='#' onclick='loadAppliedJobsByCandidatespagination("+(j-1)+"00,"+j+"00);'>"+j+"</a></li>";
		           			 }
           	    		$("#Applicantjobs").html(optionData);           	 	 
            		 }
            	 else
            		 {
            	  var count=Math.ceil(result[0].count/100);   
          	   	//$('#accountPagination').removeData("twbsPagination");
          	   	$('#Applicantjobs').twbsPagination('destroy'); 
          		   $('#Applicantjobs').twbsPagination({
          		         totalPages: count,
          		         visiblePages: 10,
          		         next: 'Next',
          		         prev: 'Prev',
          		         onPageClick: function (event, page) {
          		        var limit=(page-1)*100;	 
          		      loadAppliedJobsByCandidatespagination(limit,100);
          		            
          		         }
          		     });   					       
	    	  
	    	
            		 }  
       
       },
error: function(result)
{   
	 var tableData ="";
	 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td></tr>";	 	 
	 $("#getApplicantApplied").html(tableData);
   	 accountcount=0; 
   	var optionData="";
   	 var count=Math.ceil(accountcount/100);   
   	 for(j=1;j<=count;j++){
   		 optionData = optionData + "<li><a href='#' onclick='loadAppliedJobsByCandidatespagination("+(j-1)+"00,"+j+"00);'>"+j+"</a></li>";
   	 }
   	$("#Applicantjobs").html(optionData);      
}

});
     
   
}

function loadAppliedJobsByCandidatespagination(start,end)
{
	var search=$("#searchJobs").val();
	var url = contextPath + "/Ijp/ActiveJobs";
	var data={		 				 
				"startrow":start,
				"endrow":end,				
				"serach":search,
				"psNo":user			
				}
	 data=JSON.stringify(data); 		
		$.ajax({url : url,
			 type: "POST",
			   data: data,
			   contentType: "application/json; charset=utf-8",
			   dataType   : "json",
			   	success: function(result)
			   	{   
            	  var tableData ="";
            	  if(result.length==1)
            		  {
            		  	var tableData ="";
            		  	tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td></tr>";		 	 
            			 $("#getApplicantApplied").html(tableData);            		   	     
            		  }
            	  else
            		  {
	          
            		  	for(var i = 1; i< result.length; i++) {
						 
	        	   
	        	   		if (result[i].resourcePlanId != null) {
							result[i].resourcePlanId = result[i].resourcePlanId;

						} else {
							result[i].resourcePlanId = " ";

						}
	        	   		if (result[i].deliveryUnit != null) 
	        	   		{				
	        	   			result[i].deliveryUnit = result[i].deliveryUnit;
	        	   			
	        	   		} else {
	        	   			result[i].deliveryUnit = " ";
	        	   		}
						if (result[i].jobTitle != null) {
							result[i].jobTitle = result[i].jobTitle;

						} else {
							result[i].jobTitle = " ";

						} 
						if (result[i].expectedFulfilmentDate != null) {
							result[i].expectedFulfilmentDate = result[i].expectedFulfilmentDate;

						} else {
							result[i].expectedFulfilmentDate = " ";

						} 
						if (result[i].primaryEngineeringGroup != null) {
							result[i].primaryEngineeringGroup = result[i].primaryEngineeringGroup;

						} else {
							result[i].primaryEngineeringGroup = " ";

						} 
						var id = "\"" + result[i].resourcePlanId + "\"";
	        	 var year=result[i].expectedFulfilmentDate.slice(6,10);
	        	 var jobName="\"" + result[i].jobName + "\"";
	        	 
	        	 tableData = tableData + "  <tr id='appliedJobsByCandidates_"+i+"'>" +
	        	   "<td style='text-align:center;'>"+result[i].resourcePlanId +"</td>" +
	        	   "<td ><a onClick='fetchApplicantsData("+id+","+jobName+")' data-toggle='modal' href='#myModalApplicant' data-backdrop='static'>"+result[i].jobName+ "</a></td>" +
	        	   "<td style='text-align:center;'>"+result[i].deliveryUnit+"</td>" +
	        	   "<td style='text-align:center;'>" + result[i].city+", "+result[i].country+ "</td>" +
	        	   "<td style='text-align:center;'>" + result[i].expLevel + "</td>" +
	        	   "<td style='text-align:center;'>" + result[i].expectedFulfilmentDate + "</td>" +
	        	 	"</tr>";
	        	 
	           }
	         
	           
	    	   $("#getApplicantApplied").html(tableData);
	    	      
            		  }
       },
error: function(result)
{   
	var tableData ="";
	tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td></tr>";		 	 
	 $("#getApplicantApplied").html(tableData);    
}

});   
   
}

function serchApplicants(event)
{
	var a = $('#searchJobs').val();
	var len=a.length;				
	if (a == "" && len==0){	
		$('#searchclear').css('display','none');
		loadAccountTable();
	}else{				
		$("#searchclear").css("display", "block");	
		$('#searchclear').removeAttr('onclick','clearSearchForLoadActiveJobs();');
		$('#searchclear').removeAttr('onclick','clearSearchForrelevantjobs();');
		$('#searchclear').removeAttr('onclick','clearSearchForAppliedJobs();');
		$('#searchclear').attr('onclick','clearSearchForAppliedJobsByCandidates();');

		
	}
	event.preventDefault();
	
    if (event.keyCode === 13) {
    	 var search=$("#searchJobs").val();   
    	 var url = contextPath + "/Ijp/ActiveJobs";
    	var data={		 				 
				"startrow":"0",
				"endrow":"100",				
				"serach":search,
				"psNo":user			
				}
   
	 data=JSON.stringify(data); 		
		$.ajax({url : url,
			 type: "POST",
			   data: data,
			   contentType: "application/json; charset=utf-8",
			   dataType   : "json",
			   	success: function(result)
			   	{   
            	 if(result.length==1)
            		 {
            		 var tableData ="";
            		 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td></tr>";			 
           	 	 
           	 	   	$("#getApplicantApplied").html(tableData);
		           	 	  accountcount=0; 
		           	 	 var optionData="";
		           	   	var count=Math.ceil(accountcount/100);   
		           	    for(j=1;j<=count;j++){
		           			 optionData = optionData + "<li><a href='#' onclick='loadAppliedJobsByCandidatespagination("+(j-1)+"00,"+j+"00);'>"+j+"</a></li>";
		           			 }
           	    		$("#Applicantjobs").html(optionData);           	 	 
            		 }
            	 else
            		 {
            	  var count=Math.ceil(result[0].count/100);   
          	   	//$('#accountPagination').removeData("twbsPagination");
          	   	$('#Applicantjobs').twbsPagination('destroy'); 
          		   $('#Applicantjobs').twbsPagination({
          		         totalPages: count,
          		         visiblePages: 10,
          		         next: 'Next',
          		         prev: 'Prev',
          		         onPageClick: function (event, page) {
          		        var limit=(page-1)*100;	 
          		      loadAppliedJobsByCandidatespagination(limit,100);
          		            
          		         }
          		     });   					       
	    	  
	    	
            		 }  
       
       },
error: function(result)
{   
	 var tableData ="";
	 var tableData ="";
	 tableData="<tr><td></td><td></td><td><center>No Records Found</center></td><td></td><td></td><td></td></tr>";	
	 
	   	$("#getApplicantApplied").html(tableData);
   	 	  accountcount=0; 
   	 	 var optionData="";
   	   	var count=Math.ceil(accountcount/100);   
   	    for(j=1;j<=count;j++){
   			 optionData = optionData + "<li><a href='#' onclick='loadAppliedJobsByCandidatespagination("+(j-1)+"00,"+j+"00);'>"+j+"</a></li>";
   			 }
   		$("#Applicantjobs").html(optionData);       
}

});
    }
}

function fetchApplicantsData(id,jobName){
	

	 var url = contextPath + "/Ijp/listJobApplicants/"+id;
    
  

   //  alert(url);              
    $.ajax({url:url,
           type:"GET",
             dataType: 'json',

             success: function(result)
	    		{
           if(role=="Resource Manager")
        	{ 	
        	   $('#applicantsForAdmin').css('display','none');
        	   $('#applicantsForRM').css('display','block');
        	   $('#SaveAplicantForRM').css('display','inline-block');
        	   $('#RejectAplicantForAdmin').css('display','none');
           	  var tableData ="";
	          if(result==""){
	        	  tableData = tableData + "  <tr>"+
	        	  
	        	   "<td></td>"+
	        	   "<td>No applicants for this job</td>" +
	        	   "<td></td>" +
	        	   "<td></td>" +
	        	   "<td></td>" +
	        	   "<td></td>" +
	        	   "<td></td>" +
	        		"</tr>";
	          }
	          else{
	        	 
	           for(var i = 0; i< result.length; i++) {
	        		var fileName=getResumeCount(result[i].psNo);
	        		   var psno="\""+result[i].psNo+"\""; 
	        	   tableData = tableData + "  <tr>"+
	        	  
	        	   "<td id='psnumberRM"+i+"'>"+ result[i].psNo+"</td>"+
	        	   "<td id='nameEmployeeRM"+i+"'>" + result[i].eName + "</td>" +
	        	   "<td id='mobileForEmoployee"+i+"'>" + result[i].phoneNumber+ "</td>" +
	        	   "<td id='fileNameForResume"+i+"'><a href="+contextPath+""+fileName+" download="+fileName+" onclick='downloadResume("+psno+")'> "+ fileName + "</a></td>"; 
	        	   if(result[i].status=="Shortlisted")
	        		   {
	        		   tableData = tableData + "<td><input type='radio' name='RMCheck"+i+"' id='shortlistedRM"+i+"' checked></td>" +
			        	   "<td><input type='radio' name='RMCheck"+i+"' id='RejectRM"+i+"'></td>"+
			        	   "<td><input type='radio' name='RMCheck"+i+"' id='selectedRM"+i+"'></td>" ;
	        		   }
	        	   else if(result[i].status=="Selected")
        		   {
	        		   tableData = tableData + "<td><input type='radio' name='RMCheck"+i+"' id='shortlistedRM"+i+"'></td>" +
		        	   "<td><input type='radio' name='RMCheck"+i+"' id='RejectRM"+i+"'></td>" +
		        	   "<td><input type='radio' name='RMCheck"+i+"' id='selectedRM"+i+"' checked></td>" ;
        		   }
	        	   else if(result[i].status=="Rejected")
        		   {
	        		   tableData = tableData +  "<td><input type='radio' name='RMCheck"+i+"' id='shortlistedRM"+i+"'></td>" +
		        	   "<td><input type='radio' name='RMCheck"+i+"' id='RejectRM"+i+"' checked></td>" +
		        	   "<td><input type='radio' name='RMCheck"+i+"' id='selectedRM"+i+"'></td>" ;
        		   }
	        	   else
        		   {
	        		   tableData = tableData +"<td><input type='radio' name='RMCheck"+i+"' id='shortlistedRM"+i+"'></td>" +
		        	   "<td><input type='radio' name='RMCheck"+i+"' id='RejectRM"+i+"'></td>" +
		        	   "<td><input type='radio' name='RMCheck"+i+"' id='selectedRM"+i+"'></td>" ;
        		   }
	        	   tableData = tableData + "<td id='applicantIdForRM"+i+"' style='display:none;'>" + result[i].applicantId+ "</td>" +
	        	   "<td id='jobNameRM"+i+"' style='display:none;'>" + jobName+ "</td>" +
	        	   "<td id='oldStatus"+i+"' style='display:none;'>" + result[i].status+ "</td>" +
	    			"</tr>";					
	    		
	           }
	          }
	           
	    	   $("#applicantsList").html(tableData);
        	}
           else if(role=="Admin")
        	{        
        	   $('#applicantsForAdmin').css('display','block');
        	   $('#applicantsForRM').css('display','none');
        	   $('#SaveAplicantForRM').css('display','none');
        	   $('#RejectAplicantForAdmin').css('display','inline-block');
        	   var tableData ="";
 	          if(result==""){
 	        	  tableData = tableData + "  <tr>"+
 	        	  
 	        	   "<td></td>"+
 	        	   "<td>No applicants for this job</td>" +
 	        	   "<td></td>" +
 	        	   "<td></td>" +
 	        	   "<td></td>" + 	        	   
 	        		"</tr>";
 	          }
 	          else{
 	        	 
 	           for(var i = 0; i< result.length; i++) {
 	        	  var psno="\""+result[i].psNo+"\""; 
 	        	  var fileName=getResumeCount(result[i].psNo);
 	        	   tableData = tableData + "  <tr>"+
 	        	  
 	        	   "<td>"+ result[i].psNo+"</td>"+
 	        	   "<td>" + result[i].eName + "</td>" +
 	        	   "<td>" + result[i].phoneNumber+ "</td>" +
 	        	   "<td id='fileNameForResume"+i+"'><a href="+contextPath+""+fileName+" download="+fileName+" onclick='downloadResume("+psno+")'> "+ fileName + "</a></td>" +
 	        	   "<td><input type='checkbox' id='rejectBoxForAdmin"+i+"'></td>" + 
 	        	   "<td id='applicantIdForAdmin"+i+"' style='display:none;'>" + result[i].applicantId+ "</td>" +
 	    			"</tr>";
 						
 	    		
 	           }
 	          }
 	           
 	    	   $("#applicantsListForAdmin").html(tableData);
         	
        	}
	    	    
      },
error: function(result)
{   
	 var tableData ="";
	 tableData = tableData + "  <tr>"+
	  
	   "<td></td>"+
	   "<td>No applicants for this job</td>" +
	   "<td></td>" +
	   "<td></td>" +
	   "<td></td>" +
	   "<td></td>" +
		"</tr>";
	  $("#applicantsList").html(tableData);
}

});
	
	
}


var emailArr=[];
function getEmailForApplying(){
	var toEmail=$("#modalEmail").text();
	var name=$("#modalGetName").text();
	var job=$("#fetchJobName").text();

	var user = document.getElementById("modalIsPsNum").innerHTML;	
	var url1 = contextPath.concat("login/getEmail/");
	
	url1=url1.concat(user);
	//alert(url1);
	var isEmail;
	$.ajax({
		url : url1,
		async:false,
		success : function(result) {
			isEmail=result[0].email;
		}});
		
	
	  var url= contextPath+"email/trigger";
	  //alert(url);
	  var data={		 				 
				"toEmail":toEmail,
				"name":name,				
				"ijpName":job,
				"ccEmail":isEmail
				}
	  data=JSON.stringify(data); 
	 
	  $.ajax({url:url,
		  //async:false,
		  type: "POST",
		   data: data,
		   contentType: "application/json; charset=utf-8",
		   dataType   : "json",       
      success: function(result)
      {
	console.log("Email sent");
	}		
} );					
			  	
}

	function rejectJobForAdmin()
	{
		var count=0;
		var table=document.getElementById("applicantsListForAdmin");
	 	for(i=0;i<table.rows.length;i++)
	 		{
	 			var reject =document.getElementById('rejectBoxForAdmin'+i);	 			
	 			if(reject.checked == true){
	 				count++;
	 			}	 		
	 		}
	 	if(count>0)
	 		{
	 		for(var j=0;j<table.rows.length;j++)
	 		  {
	 			var reject =document.getElementById('rejectBoxForAdmin'+j);
	 			if(reject.checked == true)
	 			{	 				
			 		var appliedId=$("#applicantIdForAdmin"+j).text();
			 		var data={
				 			"updatedBy":user,
				 			"applicantId":appliedId,
				 			"status":'Denied'
				 		}
			
			 		data=JSON.stringify(data); 				 	
				 		$.ajax({
				 			url:contextPath+"Ijp/rejectJobForAdmin",
				 		
				 			type:"POST",
				 			 data: data,		 			 
				 			   contentType: "application/json; charset=utf-8",
				 			   dataType   : "text",		 		
				 			 success: function()
				 			{  
				 				var message="Job Denied Successfully";
				 				   	document.getElementById('getSuccessMessage').innerHTML =message;
				 				   	$("#myModelAlert").modal('show'); 
				 				   	
				 				 	$("#myModalApplicant").modal('hide');  				 
				 																			
				 			   },														
				 				    error :function(){
				 				       	//alert("error");
				 				       	console.log("error");
				 				       	
				 				       }
				 	});
	 			}
	 		  }
		 	}
	 	else
	 		{
		 		var message="Please select any record to be rejected";
			   	document.getElementById('getSuccessMessage').innerHTML =message;
			   	$("#myModelAlert").modal('show'); 			   	
			 	
	 		}
	 			    	
	}
	
	
	
	function saveShortListRM()
	{
		var count=0;
		var table=document.getElementById("applicantsList");
	 	for(i=0;i<table.rows.length;i++)
	 		{
	 			if(document.getElementById('shortlistedRM'+i).checked && ($("#oldStatus"+i).text()!="Shortlisted")){
	 				count++;
	 			}	 		
	 		}
	 	if(count>0)
	 		{
				$("#psNoForRMEmail").val('');
				$("#emailForShortlist").modal('show');  
	 		}
	 	else
	 		{	 		
		 		for(var j=0;j<table.rows.length;j++)
				  {
					
					if((document.getElementById('RejectRM'+j).checked) && ($("#oldStatus"+j).text()!="Rejected"))
					{	 				
				 		var appliedId=$("#applicantIdForRM"+j).text();
				 		var data={
					 			"updatedBy":user,
					 			"applicantId":appliedId,
					 			"status":'Rejected'
					 		}
				
				 		data=JSON.stringify(data);
					 		$.ajax({
					 			url:contextPath+"Ijp/rejectJobForAdmin",
					 		
					 			type:"POST",
					 			 data: data,		 			 
					 			   contentType: "application/json; charset=utf-8",
					 			   dataType   : "text",		 		
					 			 success: function()
					 			{  
					 				var message="Submitted Successfully";
					 				   	document.getElementById('getSuccessMessage').innerHTML =message;
					 				   	$("#myModelAlert").modal('show'); 
					 				   	
					 				 	$("#myModalApplicant").modal('hide');  				 
					 																			
					 			   },														
					 				    error :function(){
					 				       	//alert("error");
					 				       	console.log("error");
					 				       	
					 				       }
					 	});
					}
					else if((document.getElementById('selectedRM'+j).checked) && ($("#oldStatus"+j).text()!="Selected"))
					{	 				
				 		var appliedId=$("#applicantIdForRM"+j).text();
				 		var psNUmber =$('#psnumberRM'+j).text();
		 				var name =$("#nameEmployeeRM"+j).text(); 
		 				var jobName =$("#jobNameRM"+j).text(); 
				 		var data={
					 			"updatedBy":user,
					 			"applicantId":appliedId,
					 			"status":'Selected'
					 		}
				
				 		data=JSON.stringify(data); 	
					 		$.ajax({
					 			url:contextPath+"Ijp/rejectJobForAdmin",
					 		
					 			type:"POST",
					 			 data: data,		 			 
					 			   contentType: "application/json; charset=utf-8",
					 			   dataType   : "text",		 		
					 			 success: function()
					 			{  
					 				var message="Submitted Successfully";
					 				   	document.getElementById('getSuccessMessage').innerHTML =message;
					 				   	$("#myModelAlert").modal('show'); 
					 				   	
					 				 	$("#myModalApplicant").modal('hide');  				 
					 				 	sendMailForSelectedCandi(psNUmber,name,jobName);														
					 			   },														
					 				    error :function(){
					 				       	//alert("error");
					 				       	console.log("error");
					 				       	
					 				       }
					 	});
					}
				  }
	 		}
		
	}
	 
	function SendMailForRM()
	{		
		var name=$("#nameForPM").val();
		var email=$("#emailForPM").text();
		
		if(name!="" && email!="")
		{
		var totalShort=0;
		$("#emailForShortlist").modal('hide');  
		var table=document.getElementById("applicantsList");
		for(var j=0;j<table.rows.length;j++)
		  {
			
			if((document.getElementById('shortlistedRM'+j).checked)  && ($("#oldStatus"+j).text()!="Shortlisted"))
			{	 
				totalShort++;
		 		var appliedId=$("#applicantIdForRM"+j).text();
		 		var data={
			 			"updatedBy":user,
			 			"applicantId":appliedId,
			 			"status":'ShortListed'
			 		}
		
		 		data=JSON.stringify(data); 			 	
			 		$.ajax({
			 			url:contextPath+"Ijp/rejectJobForAdmin",
			 			async:false,
			 			type:"POST",
			 			 data: data,		 			 
			 			   contentType: "application/json; charset=utf-8",
			 			   dataType   : "text",		 		
			 			 success: function()
			 			{  			 				 
			 				var psNUmber =$('#psnumberRM'+j).text();
			 				var name =$("#nameEmployeeRM"+j).text(); 
			 				var jobName =$("#jobNameRM"+j).text(); 				
			 				
			 				
			 				var url1 = contextPath.concat("login/getEmail/");			 				
			 				url1=url1.concat(psNUmber);			 				
				 				var isEmail;
				 				$.ajax({
				 					url : url1,
				 					async:false,
				 					success : function(result) {
				 						isEmail=result[0].email;
				 					}});			 					
			 				
			 				  var url= contextPath+"email/triggerShortlistEmployee";
			 				  //alert(url);
			 				  var data={		 				 
			 							"toEmail":isEmail,
			 							"name":name,				
			 							"ijpName":jobName
			 							}
			 				  data=JSON.stringify(data); 
			 				 
			 				  $.ajax({url:url,
			 					  //async:false,
			 				type: "POST",
			 				data: data,
			 				contentType: "application/json; charset=utf-8",
			 				dataType   : "json",       
			 			      success: function(result)
			 			      {			 			    	 
			 			    	  console.log("Email sent");
			 			      },														
			 				    error :function(result){
			 				       	//alert("error");
			 				       	console.log("error");
			 				       	
			 				       }	
			 				 });	
			 				var message="Submitted Successfully";
			 				   	document.getElementById('getSuccessMessage').innerHTML =message;
			 				   	$("#myModelAlert").modal('show'); 
			 				   	
			 				 	$("#myModalApplicant").modal('hide');  
			 				 		$("#emailForShortlist").modal('hide'); 				 
			 				 											
			 			   },														
			 				    error :function(){
			 				       	//alert("error");
			 				       	console.log("error");
			 				       	
			 				       }
			 	});
			}
			else if((document.getElementById('RejectRM'+j).checked) && ($("#oldStatus"+j).text()!="Rejected"))
			{	 				
		 		var appliedId=$("#applicantIdForRM"+j).text();
		 		var data={
			 			"updatedBy":user,
			 			"applicantId":appliedId,
			 			"status":'Rejected'
			 		}
		
		 		data=JSON.stringify(data); 			 		
			 		$.ajax({
			 			url:contextPath+"Ijp/rejectJobForAdmin",
			 		
			 			type:"POST",
			 			 data: data,		 			 
			 			   contentType: "application/json; charset=utf-8",
			 			   dataType   : "text",		 		
			 			 success: function()
			 			{  
			 				var message="Submitted Successfully";
			 				   	document.getElementById('getSuccessMessage').innerHTML =message;
			 				   	$("#myModelAlert").modal('show'); 
			 				   	
			 				 	$("#myModalApplicant").modal('hide');  				 
			 					$("#emailForShortlist").modal('hide');  
			 					
			 					
			 			   },														
			 				    error :function(){
			 				       	//alert("error");
			 				       	console.log("error");
			 				       	
			 				       }
			 	});
			}
			else if((document.getElementById('selectedRM'+j).checked) && ($("#oldStatus"+j).text()!="Selected"))
			{	 				
		 		var appliedId=$("#applicantIdForRM"+j).text();
		 		var psNUmber =$('#psnumberRM'+j).text();
 				var name =$("#nameEmployeeRM"+j).text(); 
 				var jobName =$("#jobNameRM"+j).text(); 
		 		var data={
			 			"updatedBy":user,
			 			"applicantId":appliedId,
			 			"status":'Selected'
			 		}
		
		 		data=JSON.stringify(data); 	
			 		$.ajax({
			 			url:contextPath+"Ijp/rejectJobForAdmin",
			 		
			 			type:"POST",
			 			 data: data,		 			 
			 			   contentType: "application/json; charset=utf-8",
			 			   dataType   : "text",		 		
			 			 success: function()
			 			{  
			 				var message="Submitted Successfully";
			 				   	document.getElementById('getSuccessMessage').innerHTML =message;
			 				   	$("#myModelAlert").modal('show'); 
			 				   	
			 				 	$("#myModalApplicant").modal('hide');  				 
			 				 	sendMailForSelectedCandi(psNUmber,name,jobName);														
			 			   },														
			 				    error :function(){
			 				       	//alert("error");
			 				       	console.log("error");
			 				       	
			 				       }
			 	});
			}
		  }
			if(totalShort>0)
				{
					var empName=[];
					var empPSNo=[];
					var empPhone=[];
					
					for(var abc=0;abc<table.rows.length;abc++)
					  {
						if(document.getElementById('shortlistedRM'+abc).checked)
						{							
							empName.push($('#nameEmployeeRM'+abc).text());
							empPSNo.push($('#psnumberRM'+abc).text());
							empPhone.push($('#mobileForEmoployee'+abc).text());
							var empPsNoForResume=$('#psnumberRM'+abc).text();
							var jobName=$('#jobNameRM'+(abc)).text();

							fetchResumeZip(empPsNoForResume,jobName);
						}
					  }

       	    	  var url = contextPath + "zip/zipFolder";	
       	    	var jobName=$('#jobNameRM'+(abc-1)).text();
				var jobNum=jobName;
				jobNum=jobNum.split("_");
	            	  var data={					        		
			        		"ijpName":"IJP_"+jobNum[1]
	            	  }
	       
	        	data=JSON.stringify(data);	          
				$.ajax({url : url,
				 type: "POST",
				   data: data,
				  async:false,
				   contentType: "application/json; charset=utf-8",
				   dataType   : "json",
	         	    success: function(result)
	         		   	{	         	            	
	         	            	 
	         		    	},
	         		    	 error :function(){
	                  		        	 	 
	                 		  }
	         	     });  	
       	            	        		    	
					var isEmail=$('#emailForPM').text();
					var name=$('#NameForPMselected').text();
					
					var ccmail=$('#getEmail').text();
					var url= contextPath+"email/triggerShortlistPM";
	 				  //alert(url);
	 				  var data={		 				 
	 							"toEmail":isEmail,
	 							"name":name,				
	 							"ijpName":jobName,
	 							"ccEmail":ccmail,
	 							"empName":empName,
	 							"empPsno":empPSNo,
	 							"empPhoneno":empPhone,
	 							"count":totalShort,
	 							"jobNum":"IJP_"+jobNum[1]
	 							}
	 				  data=JSON.stringify(data); 	 				
	 				  $.ajax({url:url,
	 					  //async:false,
	 				type: "POST",
	 				data: data,
	 				contentType: "application/json; charset=utf-8",
	 				dataType   : "json",       
	 			      success: function(result)
	 			      {			 			    	 
	 			    	  console.log("Email sent");
	 			    	 clearZip("IJP_"+jobNum[1]);
	 			    	 refreshEmail();
	 			    	 
	 			      },
	 			     error :function(){
	 				       	//alert("error");
	 				       	console.log("error");
	 				       clearZip("IJP_"+jobNum[1]);
	 				       refreshEmail()
	 				       }
	 				 });	
					
				}
		}
		else
			{
				var message="Please provide the name and select email";
			   	document.getElementById('getSuccessMessage').innerHTML =message;
			   	$("#myModelAlert").modal('show'); 
			}
	}
	
	function listEmailForPm(event)
	{
		event.preventDefault();		
	    if (event.keyCode === 13) {
		var name =$('#nameForPM').val();
		 var url = contextPath + "Ijp/fetchEmailFromName/"+name;		           
	     $.ajax({url:url,
	            type:"GET",
	              dataType: 'json',
	              success: function(result)
		    		{
	            	  if(result=="")
	            		  {
	            		  	var tableData ="";
	             		 	tableData="<tr><td><center>No Records Found</center></td></tr>";		 
	            	 	 
	            	 	   	$("#MailListForPM").html(tableData);
	            	 	   $('#DivForEmailList').css('height','170px');
	            		  }
	            	  else
	            	  {
	            		  $('#DivForEmailList').css('height','300px');
		            	  var tableData ="";		          
		            	  for(var i = 0; i< result.length; i++) {
		            		  if (result[i].email != null) {
									result[i].email = result[i].email;

								} else {
									result[i].email = " ";

								} 
		            		  if( result[i].email!=" ")
		            		{
								var email = "\"" + result[i].email + "\"";
								var name = "\"" + result[i].eName + "\"";
										
			        	 tableData = tableData + "  <tr id='listEmailPM"+i+"' onclick='getemailPm("+email+","+name+","+i+");' >" +
			        	   "<td>"+result[i].email+" </td>" +
			        	   "</tr>"
		            		}
			           	}
		            		$("#MailListForPM").html(tableData);
	            	  }
		    	},
		    	 error :function(){
		    		 var tableData ="";
          		 	tableData="<tr><td><center>No Records Found</center></td></tr>";		 
         	 	 
         	 	   	$("#MailListForPM").html(tableData);
         	 	  $('#DivForEmailList').css('height','170px');
				       	
				       }
		    		
	     });
	   }
		
	}
	
	
	function getemailPm(email,name,i)
	{
		 document.getElementById('emailForPM').innerHTML=email;
		 document.getElementById('NameForPMselected').innerHTML=name;
		 $('#EmailTableForRM tr').removeClass('highlighted');
		 $('#listEmailPM'+i).addClass('highlighted');
		 
	}
	
	function refreshEmail()
	{
		$('#nameForPM').val('');
			$('#emailForPM').text('');
			 $('#DivForEmailList').css('height','170px');
			var tableData ="";
		 	tableData="<tr><td><center>No Records Found</center></td></tr>"; 	 
 	   	$("#MailListForPM").html(tableData);
	}
	
	
	function listUserSkillsBasedOnUser()
	{	
		var psNumber =$('#getPsNo').text();
		 var url = contextPath + "Ijp/listSkillsOfUsers/"+psNumber;	
		 //alert(url);
	     $.ajax({url:url,
	            type:"GET",
	              dataType: 'json',
	              success: function(result)
		    		{
	            	  if(result=="")
	            		  {
	            		  	var tableData ="";
	            	 	   	$("#skillsForLogedInUser").html(tableData);	            	 	 
	            		  }
	            	  else
	            	  {
	            		  if (result[0].skillName != null) {
								result[0].skillName = result[0].skillName;

							} else {
								result[0].skillName = " ";
							} 
		            	  var tableData =result[0].skillName;		          
		            	  for(var i = 1; i< result.length; i++) {
		            		  
		            		  if (result[i].skillName != null) 
		            		  {
								result[i].skillName = result[i].skillName;

		            		  } 
		            		  else 
		            		  {
									result[i].skillName = " ";
		            		  } 		            		 
										
			        	 tableData = tableData + ", "+result[i].skillName;
		            		
			           	}
		            		$("#skillsForLogedInUser").html(tableData);
	            	  }
		    	},
		    	 error :function(){
         		  	var tableData ="";
        	 	   	$("#skillsForLogedInUser").html(tableData);	            	 	 
        		  }
		    		
	     });
	 
	}
	
	
	
	function getResumeCount(psNo)
	{		
		var count="";
		 var url = contextPath + "resume/resumeCheck/"+psNo;	
		 //alert(url);
	     $.ajax({url:url,
	            type:"GET",
	              dataType: 'html',
	              async:false,
	              success: function(result)
		    		{
	            	  count=result ;         		 
		    	},
		    	 error :function(){
        		  }
		    		
	     });
	     
	 return count;
	
	}
	
	function downloadResume(psNo)
	{		
	            	  var url = contextPath + "resume/userResume/"+psNo;	
	        
	         	     $.ajax({url:url,
	         	            type:"GET",
	         	              dataType: 'html',
	         	              async:false,
	         	              success: function(result)
	         		    		{
	         	            	
	         	            	 
	         		    	},
	         		    	 error :function(){
	                  		      //alert("error to download");        	 	 
	                 		  }
	         	     });          		 
	     
	}
	
	function clearResume(fileName){
		
		var url = contextPath + "resume/clearResume";
		
        var data={
        		"filePath":fileName
        }
       
        data=JSON.stringify(data);
		$.ajax({url : url,
			 type: "POST",
			   data: data,
			  // async:false,
			   contentType: "application/json; charset=utf-8",
			   dataType   : "json",
			   	success: function(result){
		    	},
		    	 error :function(result){
    	 	 
        		  }
	     });          	
		
		
	}
	
	
	function deleteResume()
	{
		var fileName = $("#downloadResumeByUser").attr('download');		
		clearResume(fileName);
	}
	
	
	function deleteResumeRM()
	{
		   var table=document.getElementById("applicantsList");
	  		for(var i=0;i<table.rows.length;i++)
	  			{
		  			var fileName=$("#fileNameForResume"+i).text();
		  			 while(fileName.includes(" "))
		  		    {
		  				fileName = fileName.replace(" ", "");			
		  		    }
		  			
		  			clearResume(fileName);
	  			}
	}
	
	
	
	
	
	function fetchResumeZip(psNo,jobName)
	{		
	            	  var url = contextPath + "resume/fetchResumeZip";	
	            	  jobName=jobName.split("_");
	        var data={
	        		"psNum":psNo,
	        		"ijpName":"IJP_"+jobName[1]
	        		}
	       
	        	data=JSON.stringify(data);
	        	//alert(data);
				$.ajax({url : url,
				 type: "POST",
				   data: data,
				  async:false,
				   contentType: "application/json; charset=utf-8",
				   dataType   : "json",
	         	    success: function(result)
		          	{
	         	    	
		          	},
	         		    	 error :function(){
	                  		     	 	 
	                 		  }
	         	     });          		 
	     
	}
	
function clearZip(fileName){
		
		var url = contextPath + "resume/clearZip";
		
        var data={
        		"filePath":fileName
        }
       
        data=JSON.stringify(data);
        
		$.ajax({url : url,
			 type: "POST",
			   data: data,
			  // async:false,
			   contentType: "application/json; charset=utf-8",
			   dataType   : "json",
			   	success: function(result){
		    	},
		    	 error :function(result){
    	 	 
        		  }
	     });          	
		
		
	}
	

	function sendMailForSelectedCandi(psNUmber,name,jobName)
	{		
		RMEmail=$("#getEmail").text();
		var url1 = contextPath.concat("login/getEmail/");			 				
			url1=url1.concat(psNUmber);			 				
				var isEmail;
				$.ajax({
					url : url1,
					async:false,
					success : function(result) {
						isEmail=result[0].email;
					}});			 					
			
			  var url= contextPath+"email/triggerSelectedEmployee";
			  //alert(url);
			  var data={		 				 
						"toEmail":isEmail,
						"name":name,				
						"ijpName":jobName,
						"ccEmail":RMEmail
						}
			  data=JSON.stringify(data);			 
			  $.ajax({url:url,
				  //async:false,
			type: "POST",
			data: data,
			contentType: "application/json; charset=utf-8",
			dataType   : "json",       
		      success: function(result)
		      {			 			    	 
		    	  console.log("Email sent");
		      },														
			    error :function(result){
			       	//alert("error");
			       	console.log("error");
			       	
			       }	
			 });	
		
	}