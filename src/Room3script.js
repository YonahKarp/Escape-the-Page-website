/**
 * Created by ykjt on 1/3/16.
 */
$(document).ready(function() {

    var jsjq = false;

    //map initialization
    function initialize() {
        var mapCanvas = document.getElementById("map");
        var mapOptions = {
            center: new google.maps.LatLng(44.5403, -78.5463),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(mapCanvas, mapOptions);

        var wallabyWay = {lat: -25.363, lng: 131.044};

        var marker = new google.maps.Marker({
            position: wallabyWay,
            map: map
        });

        marker.addListener("click", function() {
            document.getElementById("Piece3").className = "rotate";
            jsjq=true;
        });

        google.maps.event.addListener(map, "click", function() {
            google.maps.event.trigger(map, "resize");
        });

    }
google.maps.event.addDomListener(window, "load", initialize);

$("#map").click(function(){
    if(jsjq){
        $("#mapPanel").addClass("hidden");
        $("#panel3").removeClass("hidden");
    }
});



    //puzzle pieces
    //var found= false ;
    //var found2= false ;
    //var found3 = false;

    //finding hidden pieces
    $(".draggable").hover(function(){
        if(!$(this).hasClass("found")){
            $(this).addClass('highlight found');
        }
    })
        .mousedown(function(){
            $(this).removeClass('highlight');


    });

   /* $("#Piece2").hover(function(){
        if(found2 < 2) {
            $(this).toggleClass("highlight");
            found2++;
        }
    });
    $("#Piece6").hover(function(){
        if(found3 < 2) {
            $(this).toggleClass("highlight");
            found3++;
        }
    });*/

    //submit information
    $("#submit").click(function(){
        //test for failure in at least one
        var fail = false;

        var name = $("#name").val();
        var email = $("#email").val();
        var phone = $("#phone").val();

        //Yay Regex!
        var testName = /^[A-Z ]+$/i;
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        var testPhone = /^[0-9 ()-]+$/;

     //Name Validation with error messages
        if (!testName.test(name))
        {
            $("#name").next().removeClass("hidden")
                .next().addClass("hidden");
            fail =true;
        }
        else if(["Escape the page","Escape the Page","Escape The Page", "escape the page", "EscapeThePage"].indexOf(name) > -1)
        {
            $("#name").next().addClass("hidden")
                .next().addClass("hidden");
        }
        else
        {
            $("#name").next().addClass("hidden")
                .next().removeClass("hidden");
            fail =true;
        }
    //email Validation with error messages
        if (!testEmail.test(email))
        {
            $("#email").next().removeClass("hidden")
                .next().addClass("hidden");
            fail =true;
        }
        else if(email == "escape@thepage.com")
        {
            $("#email").next().addClass("hidden")
                .next().addClass("hidden");
        }
        else
        {
            $("#email").next().addClass("hidden")
                .next().removeClass("hidden");
            fail =true;
        }
     //phone Validation with error messages
        if (!testPhone.test(phone)) {
            $("#phone").next().removeClass("hidden")
                .next().addClass("hidden");
            fail =true;
        }
        else if(["987-654-3210","9876543210","987 654 3210"].indexOf(phone) > -1) {
            $("#phone").next().addClass("hidden")
                .next().addClass("hidden");
        }
        else {
            $("#phone").next().addClass("hidden")
                .next().removeClass("hidden");
            fail =true;
        }
     //Final check if passed all
        if(!fail) {
            $("#panel1").addClass("hidden");
            $("#mapPanel").removeClass("hidden");
            $("#Piece4").removeClass("hidden");
        }
    });

    $("#pass").keypress(function(event) {
        if (event.which == 13) {
            if($(this).val()=="fourwordsalluppercase") {
                $("#Piece5").removeClass("hidden");
                $("#Piece6").removeClass("hidden");
                $("#panel3").addClass("hidden");
            }
            //this was fun to program! I like my implementation
            else{
                $(".showNext").removeClass("hidden")
                    .next("p").addClass("showNext")
            }
        }
    });


    //rotating puzzle pieces
    $(".draggable").draggable();

    //puzzle check
    var fail=false;
    var pieces = [$("#Piece1"), $("#Piece2"),$("#Piece3"),$("#Piece4"),$("#Piece5"),$("#Piece6")];
    //var drops = [$("#drop1"),$("#drop2"),$("#drop3"),$("#drop4"),$("#drop5"),$("#drop6")];

    $(".droppable").droppable({

        drop: function(event, ui){
            $("#"+ui.draggable.attr("id")).addClass("activated");

            fail=false;
            for(var i=0; i < 6; i++){
                if(!pieces[i].hasClass("activated")){
                    fail=true;
                }
            }
            if(!fail)
            {
                for(var i=0; i < 6; i++){
                    pieces[i].remove();
                }
                $("#logo").removeClass("hidden");
                $(".dropdown").removeClass("hidden");
            }
        }
    });


    $("#key").draggable()
        .mouseup(function() {
            var keyMidX = $(this).offset().left + $(this).width() / 2;
            var keyMidY = $(this).offset().top + $(this).height() / 2;

            var lockMidX = $("#logo").offset().left + $("#logo").width() / 2;
            var lockMidY = $("#logo").offset().top + $("#logo").height() / 2;

            if (keyMidX < lockMidX + 50 && keyMidX > lockMidX - 50 && keyMidY < lockMidY + 90 && keyMidY > lockMidY - 10) {
                window.open(["./Congrats.html"], "_self", false);
            }
        })


});
