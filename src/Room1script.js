/**
 * Created by ykjt on 12/12/15.
 */
$(document).ready(function() {

    $(".locked").click(function(event){
        event.preventDefault();
        alert("oops! level is locked. You must complete its previous levels before you can access it")
    });

    var beginPressed= false;
    $("#hint").hide();
    $("#hint2").hide();
    $("#hint3").hide();
    $("#collapse2").hide();

    $(".left").hide();

    //unlucky prime
    $("#input1").hide()
        .keypress(function(event) {
        if (event.which == 13) {
            if ($("#text1").val() == "13") {
                event.preventDefault();
                $("#hint2").hide(500);
                $("#collapse2").show(500);
            }
            else {
                $("#hint2").show(500);
                $("#collapse2").hide(500);
            }
        }

    });

    //step1
    $("#logo").click( function(){
        $("#hint").remove();
        $("#input1").show();
    });

    $("#panel1").hover(function () {
            $("#hint").show()
        }, function () {
            $("#hint").hide();
        }
    );

    //progress bar
    $("#begin").click(function(){
        beginPressed =true;

            $("#bar").css("width","54%");
            $(".left").show();

    });

//spectrum
    $("#rgb").spectrum({
        preferredFormat: "rgb",
        showInput: true,
        change: function(color){

            if(color.toHexString()=="#960d36")
            {
                alert("Sweet job! You passed the first room! On to the 2nd");
                window.open(["./Room2.html"], "_self", false);


            }
        },
        show: function(color){
            $("#hint3").show();
        },
        hide: function(color) {
            $("#hint3").hide();
        }

    });


});
