/**
 * Created by ykjt on 12/7/15.
 */
$(document).ready(function() {

//lock & key

    var isDragging = false;
    var isClicked = false;

    $("#key").draggable()
        .mouseup(function(){
            var keyMidX = $(this).offset().left + $(this).width()/2;
            var keyMidY = $(this).offset().top + $(this).height()/2;

            var lockMidX = $("#lock").offset().left + $("#lock").width()/2;
            var lockMidY=  $("#lock").offset().top + $("#lock").height()/2;

            if(keyMidX < lockMidX +50 && keyMidX > lockMidX -50 && keyMidY < lockMidY +90 && keyMidY > lockMidY -10 )
            {
                alert("unlocked!");
                window.open(["./Room1.html"], "_self", false);
            }
        });
//Header stuff
    $(".locked").click(function(event){
            event.preventDefault();
        alert("oops! level is locked. You must complete its previous levels before you can access it")
        });

//Carousel
    var slider = $("#key_list");
    slider.css("left", -25); //starting point
    var leftProperty, newLeft;

    $("#right_button").click(function() {
        // get value of current left property
        leftProperty = parseInt(slider.css("left"));
        // determine new value of left property
        if (leftProperty <= -225) {
            newLeft = -25; }
        else {
            newLeft = leftProperty - 75; }
        // use the animate function to change the left property
        slider.animate( {left: newLeft}, 1000);
    });  // end click

    $("#left_button").click(function() {
        // get value of current right property
        leftProperty = parseInt(slider.css("left"));

        // determine new value of left property
        if (leftProperty < -25) {
            newLeft = leftProperty + 75;
        }
        else {
            newLeft = -250;
        }

        //set new left
        slider.animate( {left: newLeft}, 1000);
    });  // end click



});
