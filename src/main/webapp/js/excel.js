
function ExporttoExcel(fileName,tableId,caption) {


       var tab_text = "<table border='2px'><tr><td colspan='3'><center><b>" + document.getElementById(caption).innerText + "</b></center></td></tr> <tr>"; //change the color here
       var textRange; var j = 0;
       tab = document.getElementById(tableId); // id of table
     	var outputDate=getCurrentTime(); 	
       	tab_text = tab_text +"<td>"+ "Last Updated On : </td><td>"+outputDate+ "</td></tr>";
       
       	if(fileName=='Appointments'){
       	var row=tab.rows[0];
     	var numberOfCell = check.cells;
     	rows = row.deleteCell(-1);
        tab_text = tab_text + "<tr bgcolor='#87AFC6'>"+tab.rows[0].innerHTML + "</tr>";    
       
       	}
       	
       	else{
       	tab_text = tab_text + "<tr bgcolor='#87AFC6'>"+tab.rows[0].innerHTML + "</tr>";  
       	}
       
       	var upto= tab.rows.length;
         
        if(fileName=='Opportunities')
 	   {
        	
        for (j = 1 ; j < tab.rows.length ; j++) {
        	
        	 var row = tab.rows[j];
       
             var numberOfCells = row.cells;
             for (var i = 1 ; i <=5 ; i++) {
            rows = row.deleteCell(-1);
             }
         
            
       
        	tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
              tab_text=tab_text+"</tr>";
          }    
 	   }
        
        else if(fileName=='Appointments'){
        	
        	for (j = 1 ; j < tab.rows.length ; j++) {
            	
           	 var row = tab.rows[j];
          
                var numberOfCells = row.cells;
               
               rows = row.deleteCell(-1);
             
           	tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
                 tab_text=tab_text+"</tr>";
             }    
        	
        }
        else if(fileName=='Account'){
        	
        	 for (j = 1 ; j < tab.rows.length ; j++) {
             	
            	 var row = tab.rows[j];
           
                 var numberOfCells = row.cells;
                 for (var i = 1 ; i <=11 ; i++) {
                rows = row.deleteCell(-1);
                 }
             
                
           
            	tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
                  tab_text=tab_text+"</tr>";
              }    
            
        	
        }
        else if(fileName=='Service Agent'){
        	
       	 for (j = 1 ; j < tab.rows.length ; j++) {
            	
           	 var row = tab.rows[j];
          
                var numberOfCells = row.cells;
                for (var i = 1 ; i <=6 ; i++) {
               rows = row.deleteCell(-1);
                }
            
               
          
           	tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
                 tab_text=tab_text+"</tr>";
             }    
           
       	
       }
        else
        {
	        for (j = 1 ; j < tab.rows.length ; j++)
	        {
	        	
	        	tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
	             tab_text=tab_text+"</tr>";
	         } 
        }
       
       
        
        
        tab_text = tab_text + "</table>";
       tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
     
       if(fileName=='Products')
    	   {
       tab_text = tab_text.replace(/<img[^>]*>/gi, "Product_Image"); // remove if u want images in your table
    	   }
       else{
    	   tab_text = tab_text.replace(/<img[^>]*>/gi, "");
       }
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
   		downloadLink.download = fileName;

   		document.body.appendChild(downloadLink);
   		downloadLink.click();
   		document.body.removeChild(downloadLink);
   	}
       
   }


