
$.ajax({

    url: "/sessionTest",
    method: "GET",
    success: function (response) {
        
        if (response.status==false) {
            $("#dashlogout").hide();
        }
        else{
            $("#dashlogout").show();
        }
       
        //$('#SuccessMsg').html(msg);
    },
    error: function (error) {
        console.log(error);
    }

})