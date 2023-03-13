window.onload = function(){
    const hospital_dropdown = document.getElementById('hospital');
    const employee_dropdown = document.getElementById('employee');
    const add_btn = document.getElementById('add');
     axios.post('http://localhost:8080/hospitals-backend/get-employees.php').then(function(res){
         if (res.data.response == "Unavailable employees"){
            html =`<div> 
            <select>
                    <option>Unavailable employees</option>
                </select> --></div>`
                employee_dropdown.innerHTML = html
             add_btn.setAttribute('disabled',true);
         }
         else if(res.data.response == "No hospital available"){
             html =`<div> 
             <select>
                     <option>No hospital available</option>
                 </select> --></div>`
                 hospital_dropdown.innerHTML = html;
                 add_btn.setAttribute('disabled',true);
         }
         else{
             let employees = res.data.employees;
             let hospitals = res.data.hospitals;
             let employee_html ="";
             let hospital_html = "";
             for (i=0; i<employees.length;i++){
                 employee_html += `<option value="${employees[i].employee_id}">${employees[i].employee_name}</option>"`
                 employee_dropdown.innerHTML = employee_html;
             }
             for (i=0; i<hospitals.length;i++){
                 hospital_html += `<option value="${hospitals[i].hospital_id}">${hospitals[i].hospital_name}</option>"`
                 hospital_dropdown.innerHTML = hospital_html;
             }
         }
     })
 }