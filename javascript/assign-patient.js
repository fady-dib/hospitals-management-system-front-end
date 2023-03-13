window.onload = function(){
   const hospital_dropdown = document.getElementById('hospital');
   const patient_dropdown = document.getElementById('patient');
    axios.post('http://localhost:8080/hospitals-backend/get-patients.php').then(function(res){
        if (res.data.response == "All patients are assigned"){
            alert('All patients are assigned')
        }
        else if(res.data.response == "No hospital available"){
            html =`<div> 
            <select>
                    <option>No hospital available</option>
                </select> --></div>`
                hospital_dropdown.innerHTML = html;
        }
        else{
            let patients = res.data.patients;
            let hospitals = res.data.hospitals;
            let patient_html ="";
            let hospital_html = "";
            for (i=0; i<patients.length;i++){
                patient_html += `<option value="${patients[i].patient_id}">${patients[i].patient_name}</option>"`
                patient_dropdown.innerHTML = patient_html;
            }
            for (i=0; i<hospitals.length;i++){
                hospital_html += `<option value="${hospitals[i].hospital_id}">${hospitals[i].hospital_name}</option>"`
                hospital_dropdown.innerHTML = hospital_html;
            }
        }
    })
}