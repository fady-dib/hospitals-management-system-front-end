const department_dropdown = document.getElementById('department');
const room_dropdown = document.getElementById('room');


window.onload = function () {
    user_id = localStorage.getItem('user_id');
    console.log(user_id)
    console.log(user_id)

    let data = new FormData();
    data.append('user_id',user_id);
    axios.post('http://localhost:8080/hospitals-backend/department.php', data).then(function (res) {
            let departments = res.data.departments;
            let html ="";
            for (i = 0; i < departments.length; i++) {
                html += `<option value="${departments[i].department_id}">${departments[i].department_name}</option>`
                
            }
            department_dropdown.innerHTML = html;
        })
}

const fetchRoom = () => {
    add_btn = document.getElementById('add');
    let data = new FormData();
    data.append('department_id', department_dropdown.value);
    axios.post('http://localhost:8080/hospitals-backend/room.php', data).then(function(res){
        let rooms = res.data.rooms;
        let html = ""
        if(res.data.response == 'No available rooms'){
         alert('No available rooms');
         add_btn.setAttribute('disabled', true);

        }
        else{

            for (i = 0; i < rooms.length; i++) {
                html += `<option value="${rooms[i].room_id}">${rooms[i].room_number}</option>`
                room_dropdown.innerHTML = html;
            }
        }
     }).catch(function(error){
         console.log(error)
     })

}