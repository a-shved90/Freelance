$(document).ready(function(){

  //Preloader
  $(window).load(function() {
    $("#loader").fadeOut();
    $("#mask").delay(1000).fadeOut("slow");
  });

  //Adding fixed position to header
  $(document).scroll(function() {
    if ($(document).scrollTop() >= 570) {
      $('.navbar').addClass('navbar-fixed-top');
      $('html').addClass('has-fixed-nav');
    } else {
      $('.navbar').removeClass('navbar-fixed-top');
      $('html').removeClass('has-fixed-nav');
    }
  });

  //Navigation Scrolling
  $('a[href*=#]').click(function() {
    $('a').parent().removeClass('active');
    $(this).parent().addClass('active');
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 50
        }, 1000);
        return false;
      }
    }
  });

  //Nav Selection
  $('#nav').onePageNav({
    currentClass: 'active',
    scrollOffset: 50
  });

  //Home Text Slider
  $('.home-slider').flexslider({
      animation: "slide",
      directionNav: false,
      controlNav: false,
      direction: "vertical",
      slideshowSpeed: 5000,
      animationSpeed: 1000,
      smoothHeight: true,
      useCSS: false
  });

  //Elements animation
  $('.animated').appear(function(){
    var element = $(this);
    var animation = element.data('animation');
    var animationDelay = element.data('delay');
    if (animationDelay) {
      setTimeout(function(){
        element.addClass( animation + " visible" );
        element.removeClass('hiding');
        if (element.hasClass('counter')) {
          element.children('.value').countTo();
        }
      }, animationDelay);
    }else {
      element.addClass( animation + " visible" );
      element.removeClass('hiding');
      if (element.hasClass('counter')) {
        element.children('.value').countTo();
      }
    }    
  },{accY: -150});

  //Portfolio filters
  $('#portfolio-grid').mixitup({
    effects: ['fade','scale'],
    easing: 'snap'
  });

  //Portfolio project slider
  function initProjectSlider() {
    $('.project-slider').flexslider({
      prevText: "",
      nextText: "",
      useCSS: false,
      animation: "slide"
    });
  };

  //Portfolio Project Loading
 //Portfolio Project Loading
  $('#portfolio').on('click','.open-project',function(){    
    var projectUrl = $(this).attr("href");      
    $('.portfolio-loader').fadeIn(200);

    $('#project-content').animate({opacity:0}, 600,function(){
      $("#project-content").load(projectUrl,function(){

        $('.portfolio-loader').fadeOut(400);
        if ($('.project-slider').length > 0) {
            initProjectSlider();
          }

      });
      $('#project-content').delay(400).animate({opacity:1}, 400);
    });  
    
    //Project Page Open

    if( !$('#project-extended').hasClass('open'))
    $('#project-extended').slideUp(200, function(){
      $('#project-extended').addClass('open');
      $('html, body').animate({ scrollTop: $(".portfolio-top").offset().top }, 900);
    }).delay(400).slideDown(200,function(){          
         
    });

    else
    {
       $('html, body').animate({ scrollTop: $(".portfolio-top").offset().top }, 900);
    }

    return false;       
  
  });

  //Project Page Close
  $('#close-project').click(function(event) {
    $('#project-content').animate({opacity:0}, 400,function(){
      $('#project-extended').delay(400).slideUp(400).removeClass('open');
      $('html, body').animate({ scrollTop: $(".portfolio-top").offset().top -60}, 900);
    });
    return false;
  });

  //Pricing table selection
  $('.plan').click(function(){
    $('.plan').removeClass('selected');
    $(this).addClass('selected');
  });

  //Testimonials slider
  $('.testimonials-slider').flexslider({
    animation: "slide",
    directionNav: false,
    slideshowSpeed: 4000,
    useCSS: false
  });

  //Clients carousel
  $("#clients-carousel").owlCarousel({
    items : 4,
    itemsDesktop : [1000,4],
    itemsDesktopSmall : [900,3],
    itemsTablet: [600,2],
    itemsMobile : false,
    autoPlay: 4000,
    pagination: false
  });

  //Contact form validation and submit with ajax
  $('#contact-us').validate({
    errorPlacement: function(error, element) {},
    highlight: function(element, errorClass) {        
        $(element).parent().removeClass('success').addClass('error');
    },
    unhighlight: function(element, errorClass) {
        $(element).parent().removeClass('error').addClass('success');
    },
    rules: {
      fullname:{
        required: true
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true
      },
      message: {
        required: true
      }
    },
    submitHandler: function(form) {
      var url = $(form).attr('action');
      $.ajax({
        type: "POST",
        url: url,
        data: $(form).serialize(), // serializes the form's elements.
        success: function(data)
        {
            $('.form-sent').slideDown(400); // show response from the php script.
        }
      });
    }
  });

$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
       $('.contact').addClass('animated swing')
   }
});

$(window).on('scroll',function (event){

    var scrollPosition = $(document).scrollTop();
    $('.nav-item a').each(function () {
      var currentLink = $(this);
      var refElement = $(currentLink.attr("href"));
      if (refElement.position().top <= scrollPosition ) {
        $('.nav-item').removeClass("active");
        currentLink.parent().addClass("active");
      }
      else{
        currentLink.parent().removeClass("active");
      }
    });
  });

});