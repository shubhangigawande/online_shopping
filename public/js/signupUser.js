

var addNewUser = () => {
    var userData = {};
    userData.account_id = $("#signUpId").val();
    userData.password =  $("#signUpPwd").val();
    userData.mailId =  $("#signUpMail").val();

    console.log(userData);

    axios.post("/new/user/signup", userData).then((response) => {
        console.log(response)
        if (response.data.msg == 'Done') {
            $(".successSignup").show();
        } else {
            // handle error communication
        }
    }).catch((error) => {
        console.log("its error");
    })
}