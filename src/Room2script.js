/**
 * Created by ykjt on 12/31/15.
 */
$(document).ready(function(){


    $(".locked").click(function(event){
        event.preventDefault();
        alert("oops! level is locked. You must complete its previous levels before you can access it")
    });


    var reveal1=false;
    $("#hint1").hide();
    $("#panel2").hide();
    $(".left").hide();
    $("#panel3").hide();
    $("#hint4").hide();
    $("#hint5").hide();


    //hint
        $("#lock").hover(function () {
            if(!reveal1) {
                $("#hint1").show();
                $("#panel1").css("width", "20em")
            }
        });

    //key
    var found = false;
    $("#key").draggable()
        .hover(function(){
            if(!found) {
                $(this).addClass('highlight');
                found=true;
            }
        })
        .mousedown(function(){
            $(this).removeClass("highlight")
        })
        .mouseup(function() {
        var keyMidX = $(this).offset().left + $(this).width() / 2;
        var keyMidY = $(this).offset().top + $(this).height() / 2;

        var lockMidX = $("#lock").offset().left + $("#lock").width() / 2;
        var lockMidY = $("#lock").offset().top + $("#lock").height() / 2;

        if (keyMidX < lockMidX + 50 && keyMidX > lockMidX - 50 && keyMidY < lockMidY + 90 && keyMidY > lockMidY - 10) {
            $("#reveal").show();
            $("#panel1").css("width", "30em");
            $("#hint1").hide();
            $("#key").remove();
            reveal1 = true;
        }
    });

    //datepicker
    $("#reveal").hide()
        .datepicker()
        .change(function(){

        var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

        var month = monthNames[$(this).datepicker('getDate').getMonth()];
        var day = $(this).datepicker('getDate').getDate();
        $(this).val(month + " the " + day +"th be with you");

        if($(this).val() == "May the 4th be with you")
        {
            $("#panel2").show();
            $("#hint2").hide();
            $("#hint3").hide();

        }
    });

    //No, I am your father
    $("#text1").keypress(function(event) {
        if (event.which == 13) {
            var tempText = $("#text1").val();
           if(["No", "no", "NO", "No!", "no!", "NO!", "NOOOOO!!!!"].indexOf(tempText) > -1)
            {
                $(".left").show();
                $("#sortable").removeClass("hidden");
                //$("#container").css("padding-left", "15em");
                $("#hint2").hide();
                $("#hint3").hide();
            }
            else if(["Luke","luke"].indexOf(tempText) > -1)
           {
               $("#hint2").show();
               $("#hint3").hide();
           }
            else{
               $("#hint2").hide();
               $("#hint3").show();
           }
        }
    });

    //Star Trek
    $("#text2").keypress(function(event) {
        if (event.which == 13) {
            var tempText = $("#text2").val();
            if(["Star Trek", "Star trek", "Startrek","startrek", "star trek"].indexOf(tempText) > -1)
            {
                alert("The Force is strong with this one. Two rooms down, one to go");
                window.open(["./Room3.html"], "_self", false);

            }
            else if(["Star Wars", "Star wars", "Starwars","starwars", "star wars"].indexOf(tempText) > -1)
            {
                $("#hint4").show();
                $("#hint5").hide();
            }
            else{
                $("#hint4").hide();
                $("#hint5").show();
            }
        }
    });

    //left float riddle
    $(function() {
        $( "#sortable" ).sortable({
            stop: function(event, ui) {
                if($(this).sortable("toArray") == "Leia,Han,Luke,Padme,Vader")
                {
                    $("#magic").addClass("hidden");
                    $("#switch").removeClass("hidden");
                    $("#hint6").removeClass("hidden");
                    $("#dialog").dialog()
                        .show();
                }
            }
        })
            .disableSelection();
    });

    $("#switch").click(function(){
        $("#accordion").removeClass("hidden");
        //$("#panel3").show();
    });

    $("#here").click(function(){
        $("#panel3").show();
    });

    $("#dialog").hide();
    $("#accordion").accordion();


});
