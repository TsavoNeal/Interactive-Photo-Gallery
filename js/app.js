// PROBLEM: Images provide a lousy browser experience. 
// SOLUTION: Implement a lightbox with a search function!

var $overlay = $('<div id="overlay"><div></div></div>');
var $image = $("<img>");
var $caption = $("<p></p>");
var $next = $('<a href=#><i class="fa fa-angle-right"></i></a>').addClass('next');
var $prev = $('<a href=#><i class="fa fa-angle-left"></i></a>').addClass('prev');
var $random = $('<a href=#><i class="fa fa-random"></i></a>').addClass('random');
var $exit = $('<a href=#><i class="fa fa-times"></i></a>').addClass('exit');

// Keep track of image index for prev/next
var $index = 0;

// Grabbing the list items from imageGallery and assigning the length total
var $galleryLength = $("#imageGallery li").length;

// Add overlay + arrow buttons
$("body").append($overlay);
$('body').append($next);
$('body').append($prev);
$('body').append($random);
$('body').append($exit);

// Add image + caption
$overlay.append($image);
$overlay.append($caption);

// Update image overlay
function updateImage (imageLocation, imageCaption){

  // Update the overlay with the image linked in the link
  $image.attr("src", imageLocation);

  // Get images alt attribute and set caption
  $caption.text(imageCaption);

}

// Click <a> event to an image
$("#imageGallery a").click(function(event){
  event.preventDefault();
    var imageLocation = $(this).attr("href");
    var imageCaption =  $(this).children("img").attr("alt");

    // Update index to current image
    $index = $(this).parent().index(); 

    // Call the update function above
    updateImage(imageLocation, imageCaption);

    // Show the overlay and arrows
    $overlay.fadeIn(imageLocation);
    $next.show();
    $prev.show();
    $random.show();
    $exit.show();   

});

// Button function
function prevNext(prev) {

  // If flag set move backwards, if not move forwards
  if(!prev) { 
    $index++; 
  } else { 
    $index--; 
  }

  // If out of index reset 
  if ($index < 0) { $index = $galleryLength-1;}
  if ($index > $("#imageGallery li").length) { $index = 0; }

  // Grab the element by index and then get the link
  var newImgSelected = $("#imageGallery li").get($index).getElementsByTagName("a");

  // Grab link information
  var imageLocation = $(newImgSelected).attr("href");
  var imageCaption =  $(newImgSelected).children("img").attr("alt");

  //Update Overlay
  updateImage(imageLocation, imageCaption);

}

// Hide all overlay elements
function hideAll() {
  $overlay.hide();
  $next.hide();
  $prev.hide();
  $random.hide();
  $exit.hide();
}

// Button events
$prev.click(function(event) {
  prevNext(true);
});

$next.click(function(event) {
  prevNext();
});

// Keyboard navigation
$("body").on("keydown", function(e) {

  // on right or down arrow
  if(e.keyCode === 39 || e.keyCode === 40 ) {
    prevNext();
  }

  // on left arrow or up arrow
  if(e.keyCode === 37 || e.keyCode === 38 ) {
    prevNext(true);
  }

});

// Random button
$random.click(function(){
  $index = 1 + Math.floor(Math.random() * 13);
  prevNext();
});

// Exit button
$exit.click(function(){
    hideAll();
});

// When overlay is clicked
$overlay.click(function(event){
  // Hide the overlay  
    if(event.target.id == "overlay")
    $(this).slideUp("fast");
    hideAll(); 
});

// Search function
$("#search").on("keyup", function() {
    var userQuery = $(this).val().toLowerCase();    
    $('li img').each(function() {
        var name = $(this).attr('alt').toLowerCase();
        $(this).closest('li')[ name.indexOf(userQuery) !== -1 ? 'fadeIn' : 'fadeOut' ]();       
    });    
}); 






















































