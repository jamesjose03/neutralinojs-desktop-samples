//THIS EXAMPLE ONLY WORKS ON WINDOWS PLATFORM 
let myapp = {
    loadProcesses : () => {
	Neutralino.os.runCommand('tasklist /FI "STATUS eq RUNNING"', 
		(data) => {
			document.getElementById('name').innerText=data.stdout; //this formats the data into html ,omitting any aditional whitespaces between the process data retrieved
			var result=document.getElementById('name').innerText.split(/\n/);//split process rows
			
			var out='<table class="minimalistBlack"><thead><tr><th>Process Name</th><th>Process ID</th><th>Memory Usage</th></thead>'; //display header of table
			
			for(var i=3;i<result.length-1;i++) { //ommit the table header produced by CMD
				out+="<tr>";
				var col=result[i].split(" ");
				out +="<td>"+col[0]+"</td>"+"<td>"+col[1]+"</td>"+"<td>"+col[4]+" KB</td>"; 
				out +="</tr>"; 
			};

			out+="</table>";

			console.log(data.stdout); //display process table in console
			
			document.getElementById('name').innerHTML=out; //display table to user
			
		},
		() => {
			console.error('error');
		}
	);
	}
};

Neutralino.init({
    load: () => {
        myapp.loadProcesses();
		setInterval(() => {myapp.loadProcesses();},2000); //refresh every 2 seconds
    },
    pingSuccessCallback : () => {
        console.log("ping success");
    },
    pingFailCallback : () => {
        console.log("ping fail");
    }
});