$(document).ready(function () {
    //desktop: 1350px
    //mobi:1000px
    var w = window.innerWidth;
    
    // login firebase
    var firebaseConfig = {
        apiKey: "AIzaSyDoKf2XHogYOzFCkZGRDyi0Ath8Uuk0CDk",
        authDomain: "quickstart-1560498993739.firebaseapp.com",
        databaseURL: "https://quickstart-1560498993739.firebaseio.com",
        projectId: "quickstart-1560498993739",
        storageBucket: "quickstart-1560498993739.appspot.com",
        messagingSenderId: "36642984237",
        appId: "1:36642984237:web:7f9bd1b246414a180003a4"
      };
    
      firebase.initializeApp(firebaseConfig);
    $("#sldl1").click(function (e) { 
        e.preventDefault();
        var email = $("#email").val();
        var pass = $("#pass").val();

        if (email!="",pass!="") {
            firebase.auth().signInWithEmailAndPassword(email, pass)
        .then((user) => {
            //console.log("thành công");
            $(".alert-success").removeClass("hide");

            var myVar=setTimeout(function() {
                $(".alert-success").addClass('hide');
            }, 3000);

           

            

            if (w <=1000) {
                
                 setTimeout("location.href = 'HTML/Mobi/home.html';", 2000);

                
            } else {
                setTimeout("location.href = 'HTML/Desktop/home.html';", 2000);
                
            }

            
            
        })
        .catch((error) => {
            
            //console.log("thất bại");
            $(".alert-danger").removeClass("hide");

            setTimeout(function() {
                $(".alert-danger").addClass('hide');
            }, 3000)
            
        });

            
        } else {
            $(".alert-warning").removeClass("hide");

            setTimeout(function() {
                $(".alert-warning").addClass('hide');
            }, 3000)
            
            
        }
        
    
        
    });
    

});