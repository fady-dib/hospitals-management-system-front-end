const department_dropdown = document.getElementById('department');
const room_dropdown = document.getElementById('room');
const bed_dropdown = document.getElementById('bed');

window.onload = function () {
    user_id = localStorage.getItem('user_id');
    console.log(user_id)

    let data = new FormData();
    data.append('user_id',user_id);
    axios.post('http://localhost:8080/hospitals-backend/department.php', data).then(function (res) {
            let departments = res.data.departments;
            let html ="";
            for (i = 0; i < departments.length; i++) {
                html += `<option value="${departments[i].department_id}">${departments[i].department_name}</option>`
            }
            department_dropdown.insertAdjacentHTML('beforeend',html);
        })
}

const fetchRoom = () => {
    add_btn = document.getElementById('add');
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