$('document').ready(function(){

    $('#login-form').on('submit',function(event){

        event.preventDefault();

        var form = $(this);

        var email = $('#login-email').val().trim();

        var password = $('#login-password').val().trim() ;

        console.log(email,password);

        if(email!=="" && password!==""){
            $.ajax({
                
                url:"/login",
                method:"POST",
                data:{email:email, password:password},
                success:function(response){

                        $('span').text("");
                        if(response.status==401){
                        $('<span/>').text(response.message).css("color","red").appendTo($('#login-form'));
                        }
                        
                        else{
                            
                            console.log(response.message);

                        }
                    //$('#SuccessMsg').html(msg);
                    },
                error: function(error){
                    console.log(error);
                }
                    
                    
                


        })
    }

})

/*$.getScript( "js/mainMap.js" )
  .done(function( script, textStatus ) {
    console.log( textStatus );
  })
  .fail(function( jqxhr, settings, exception ) {
    console.log("Attempt failed");
});*/

})



