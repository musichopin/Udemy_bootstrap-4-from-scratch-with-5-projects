$(function() {//jQuery shorthand 4 $(document).ready(function() { ... });
  // Auto play modal video (on index.html)
  $(".video").click(function () {
    var theModal = $(this).data("target"),//alt:$(this).attr("data-target")
    videoSRC = $(this).attr("data-video"),/*gets the link*/
    videoSRCauto = videoSRC + 
      "?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1&autoplay=1";
    $(theModal + ' iframe').attr('src', videoSRCauto); /*sets the src*/
    $(theModal + ' button.close').click(function () { /*4 closing yt frame*/
      $(theModal + ' iframe').attr('src', videoSRC); // disrupts video
//videoSRC yerine başka isim de kullanılabilirdi
/*modal oldugu icin otomatik kapanmanın js ile ilgisi yoktur*/   
    });
  });
});

// Enlarges images in photo gallery using lightbox script (on index page)
$(document).on('click', '[data-toggle="lightbox"]', function(event){
  event.preventDefault(); /*prevents anchor's default behavior*/
  $(this).ekkoLightbox();
});

// 3rd party plugin called slick slider makes a neat slider 4 testimonials 
// (on about.html)
$('.slider').slick({
  infinite: true,
  slideToShow:1,
  slideToScroll:1
});
