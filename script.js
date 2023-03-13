// const hospital_pages = {};

// hospital_pages.base_url = "http://localhost:8080/hospitals-backend/";

// hospital_pages.postAPI = async (api_url, api_data, api_token = null) => {
//     try {
//         return await axios.post(
//             api_url,
//             api_data,
//             {
//                 headers: {
//                     'Authorization': "token " + api_token
//                 }
//             }
//         );
//     }
//     catch(error){
//         console.log('Error from post api')
//     }
// }

  // var atpos = email.indexOf('@');
    // var dotpos = email.lastIndexOf('.');
    // if (atpos < 1 || dotpos - atpos < 2){
    //     alert('Please enter correct E-mail')
    // }
    // if(password.length < 8){
    //     alert('Password should contain 8 characters minimum');
    // }



const submit = () => {
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

    let data = new FormData();
    data.append('email', email);
    data.append('password', password)
    axios.post('http://localhost:8080/hospitals-backend/login.php', data).then(function(res){
        if(res.data.response == 'Loggedin' ){
            if(res.data.usertype == 1){
                location.replace('')
                console.log(res.data.response)
                window.localStorage.setItem('usertype', res.data.usertype_id);
            window.localStorage.setItem('user_id', res.data.user_id);
            }
            else if(res.data.usertype == 2){
                location.replace('patient.html')
                console.log(res.data.response)
                window.localStorage.setItem('usertype', res.data.usertype_id);
            window.localStorage.setItem('user_id', res.data.user_id);
            }
            else{
                location.replace('admin-panel.html');
                console.log(res.data.response)
                window.localStorage.setItem('usertype', res.data.usertype_id);
            window.localStorage.setItem('user_id', res.data.user_id);
            }
            
            console.log(res.data.user_id)
        }
    }).catch(function(error){
        console.log(error)
    })
}

