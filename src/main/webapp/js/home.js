
var contextPath="http://10.20.20.12:8081/ijpServer/";

function applied() {
		
    
    	var url= "appliedJob/{id}";
    	
    	
    	$.ajax({url:url,
    		type:"GET",
    		
    	
    		success: function(result)
    		{
            var tableData ="";
           
           for(var i = 0; i< result.length; i++) {
    		   
    		   
        	   tableData = tableData +"<ul class='list-group col-sm-12 col-md-12 col-lg-12'>"+
				"<li class='list-group-item'><div class='checkbox'>"+
				 	"<label><input type='checkbox' value=''><b>Name:"+result[i].name+
				 	"</b> <b>PS No:"+result[i].psno+"</b><b>Mobile No:"+ result[i].mobileno+ "</b></label>"
					+"</div></li>"
				+"</ul>";													
    		   
           		 
        	   
           }
    	  
    	   
    	   $("#applied").html(tableData);
            
        }});
}



var email;
	function getrole(){
		var user = document.getElementById("usr").value;		
		url = contextPath.concat("login/getEmail/");
		url=url.concat(user);
		$
		.ajax({
			url : url,

			success : function(result) {
				if(result==null || result==''){
					document.getElementById("userNotAvail").style.display = 'block';
					document.getElementById("Incorrectpassword").style.display = 'none';
					setTimeout(
							function() {
								document
										.getElementById("userNotAvail").style.display = 'block';
							}, 1000);	
				}
				else{
				 email=result[0].email;
				 getRoleDetails(user);
				 document.getElementById("Incorrectpassword").style.display = 'none';
				 document.getElementById("userNotAvail").style.display = 'none';
					setTimeout(
							function() {
								document.getElementById("Incorrectpassword").style.display = 'none';
								document.getElementById("userNotAvail").style.display = 'none';
							}, 1000)
				}
			},
			error : function(result) {
				
				document.getElementById("userNotAvail").style.display = 'block';
				document.getElementById("Incorrectpassword").style.display = 'none';
				setTimeout(
						function() {
						
							document.getElementById("userNotAvail").style.display = 'block';
						}, 1000);
			}

		}); 
		
	}
	
	function login() {
		
		var password = document.getElementById("pwd").value;		
		url = contextPath.concat("login/validateLDAP/");
		url = url+email+","+password;
		
		$
				.ajax({
					url : url,

					success : function(result) {
						if (result == true) {
						getDetails();
						}	
						else{
							document.getElementById("Incorrectpassword").style.display = 'block';
							document.getElementById("userNotAvail").style.display = 'none';
							setTimeout(
									function() {
										document
												.getElementById("Incorrectpassword").style.display = 'block';
									}, 1000);	
							
						}
						

					},
					error : function(result) {
						
						document.getElementById("Incorrectpassword").style.display = 'block';
						document.getElementById("userNotAvail").style.display = 'none';
						setTimeout(
								function() {
									document
											.getElementById("Incorrectpassword").style.display = 'block';
								}, 1000);
					}

				}); 

	}
	
	function getRoleDetails(psnumber){			
		url = contextPath.concat("login/getRoles/");
		url = url.concat(psnumber);
		var optionData="";
		//alert(url);
		$
				.ajax({
					url : url,

					success : function(result) {
						if(result=="")
							{
							document.getElementById("Incorrectpassword").style.display = 'none';
							document.getElementById("userNotAvail").style.display = 'block';
							setTimeout(
									function() {
										document
												.getElementById("userNotAvail").style.display = 'block';
									}, 1000);
							optionData="<option style='display:none;'>Role</option>";
							$("#getroleemploye").html(optionData);
							}
						else{
						for (var i = 0; i < result.length; i++) {

							optionData = optionData + "<option  value ='"
									+ result[i].roleId + "'>"
									+ result[i].role + "</option>";

						}

						$("#getroleemploye").html(optionData);
						}
					},
					error : function(result) {
						document.getElementById("Incorrectpassword").style.display = 'none';
						document.getElementById("userNotAvail").style.display = 'block';
						setTimeout(
								function() {
									document
											.getElementById("userNotAvail").style.display = 'block';
								}, 1000);
						optionData="<option style='display:none;'>Role</option>";
						$("#getroleemploye").html(optionData);
					}

				}); 

		
		
	}
	
	
	function getDetails(){
		var roleId=$("#getroleemploye").val();
		var role=$("#getroleemploye option:selected").text();	
		if(roleId!="Role")
		{
			
		document.getElementById("Incorrectpassword").style.display = 'none';
		document.getElementById("userNotAvail").style.display = 'none';
		document.getElementById("selectRole").style.display = 'none';
		var user = document.getElementById("usr").value;
		var password = document.getElementById("pwd").value;		
		url = contextPath.concat("login/loginAuthentication /");		
		url = url+user+","+roleId;
		//alert(url);
		$
				.ajax({
					url : url,

					success : function(result) {
					
						var name=result[0].eName;												
						var psNO=result[0].psNo;
						var email=result[0].email;
						var currentBu=result[0].currentBu;
						var isPsNo=result[0].isPsNo;
						var baselocation=result[0].baseLocation;
							sessionStorage.setItem("name", name);
							sessionStorage.setItem("role", role);
							sessionStorage.setItem("roleId", roleId);
							sessionStorage.setItem("user", user);
							sessionStorage.setItem("psNO", psNO);
							sessionStorage.setItem("email", email);
							sessionStorage.setItem("currentBu", currentBu);
							sessionStorage.setItem("isPsNo", isPsNo);
							sessionStorage.setItem("baselocation", baselocation);
							sessionStorage.setItem("contextPath", contextPath);
							// window.open('Home.html');
							location.href = 'Home.html';							
							return false;
						

							

						
					},
					error : function(result) {
						document.getElementById("selectRole").style.display = 'none';
						document.getElementById("userNotAvail").style.display = 'none';
						document.getElementById("Incorrectpassword").style.display = 'block';
						setTimeout(
								function() {
									document
											.getElementById("Incorrectpassword").style.display = 'block';
								}, 1000);
					}

				}); 		
		}
		else
			{
			document.getElementById("Incorrectpassword").style.display = 'none';
			document.getElementById("userNotAvail").style.display = 'none';
			document.getElementById("selectRole").style.display = 'block';
			}
		
	}







