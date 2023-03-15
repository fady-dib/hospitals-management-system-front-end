const department_dropdown = document.getElementById('department');
const room_dropdown = document.getElementById('room');
const bed_dropdown = document.getElementById('bed');
const add_btn = document.getElementById('add-room');
const medication_dropdown = document.getElementById('medication-list');
const price_input =document.getElementById('price');

let price =[];

window.onload = function () {
    user_id = localStorage.getItem('user_id');
    console.log(user_id)

    let data = new FormData();
    data.append('user_id',user_id);
    axios.post('http://localhost:8080/hospitals-backend/patient.php', data).then(function (res) {
            let departments = res.data.departments;
            let medications = res.data.medications;
            let department_html ="";
            let medication_html ="";
            console.log(res.data)
            if(res.data.status ==100){
                
            }
            for (i = 0; i < departments.length; i++) {
                department_html += `<option value="${departments[i].department_id}">${departments[i].department_name}</option>`
            }
            department_dropdown.insertAdjacentHTML('beforeend',department_html);

            for (i = 0; i < medications.length; i++) {
                medication_html += `<option value="${medications[i].medication_id}">${medications[i].medication_name}</option>`;
                price.push({
                    id :`${medications[i].medication_id}`,
                    price :`${medications[i].medication_cost}`
                })
            }
            

            medication_dropdown.insertAdjacentHTML('beforeend', medication_html);

            
        })
}
console.log(price)
const fetchRoom = () => {
    let data = new FormData();
    data.append('department_id', department_dropdown.value);
    axios.post('http://localhost:8080/hospitals-backend/room.php', data).then(function(res){
        const rooms = res.data.rooms;
        const beds = res.data.beds;
        let html = "";
        if(res.data.response == 'No available rooms'){
         alert('No available rooms');
         add_btn.setAttribute('disabled', true);
            html=`<option value="0">No rooms available</option>`;
            room_dropdown.innerHTML = html;

        }
        else{

            for (i = 0; i < rooms.length; i++) {
                html += `<option value="${rooms[i].room_id}">${rooms[i].room_number}</option>`
                room_dropdown.innerHTML = html;
            }
            for (i=0; i<beds.length; i++) {
                html += `<option value="${beds[i].bed_id}">${beds[i].bed_number}</option>`

            }
        }
     }).catch(function(error){
         console.log(error)
     })


}

const fetchPrice = (event)=>{
   const id =(event.target.value);
   if(id == 0){
    price_input.value = ""
    return;
   }
   const search_id = price.find(obj => obj.id == id ); // search the objects inside the array to find specific id and return the object found
   selected_price = search_id.price
   price_input.value = selected_price

}