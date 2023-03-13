const register = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;

    let data = new FormData();
    data.append('email', email);
    data.append('password', password)
    data.append('name', name)
    data.append('dob', dob)

    axios.post('http://localhost:8080/hospitals-backend/signup.php', data).then(function(res){
        if (res.data.response == "Already registered"){
            alert('Already registred')
        }
        if(res.data.response == "Success"){
            alert('Registered successfully')
            location.replace('./index.html')
        }
    }).catch(function(error){
        console.log(error)
})
}