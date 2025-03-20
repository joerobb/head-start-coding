(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();

    //Overlay js
    var $navbarToggler = $('.navbar .navbar-toggler');
    var $navbarClose = $('.navbar .navbar-close');
    var $navbarCollapse = $('.navbar-collapse');
    var $nav = $('.navbar-collapse .navbar-nav a');
    var $overlay = $('.overlay');

    //Show overlay

    $navbarToggler.click(function(event) {
         // Get the center point of the screen
         var x = window.innerWidth / 2;
         var y = window.innerHeight / 2;
 
         // Calculate the maximum radius to cover the entire screen
         var maxRadius = Math.sqrt(x * x + y * y);
 
         // Show the modal overlay
         $overlay.show();
 
         anime({
         targets: $overlay[0],
         clipPath: ['circle(0% at ' + x + 'px ' + y + 'px)', 'circle(' + maxRadius + 'px at ' + x + 'px ' + y + 'px)'],
         duration: 1000, // Adjust the duration as needed
         easing: 'linear'
         });
      
        $navbarClose.toggle(); // Toggle the close button
        $(this).hide(); // Hide the toggle button
      });


    //Hide Overlay
    $navbarClose.click(function(event) {
        var x = event.pageX;
        var y = event.pageY;
      
        anime({
          targets: $overlay[0], // Use [0] to access the DOM element from the jQuery object
          clipPath: ['circle(100% at ' + x + 'px ' + y + 'px)', 'circle(0% at ' + x + 'px ' + y + 'px)'],
          duration: 500, // Animation duration in milliseconds
          easing: 'linear',
          complete: function() {
            // Hide the overlay when the animation is complete
            $overlay.hide();
          }
        });
      
        $navbarCollapse.toggleClass('show'); // Toggle the collapse class
        $(this).toggle(100); // Hide the close button
        $navbarToggler.show(); // Show the toggle button
    });


    $nav.on("click", function() {
        $navbarToggler.show();
    });

if (document.body.classList.contains("sign-up")) {
      
// Modal elements
const $modalOverlay = $(".modal-overlay");
const $triggerYes = $(".trigger-yes");
const $triggerNo = $(".trigger-no");
const $triggerNext = $(".trigger-next");
const $closeButton = $(".close-button");
const $questionBox = $(".question-box");
const $modal = $(".modal");
const $questionTitle = $(".model-sub-title");
const $introRow = $(".intro-display-none");

// Question and answer management
const qaData = [
    {
        question: "Do you have a child between the ages of 8 and 16 years old?",
        answerClass: "a-1",
        answerNoClass: "no-1"
    },
    {
        question: "Do they like playing games like Minecraft and Roblox?",
        answerClass: "a-2",
        answerNoClass: "no-2"
    },
    {
        question: "Is your child comfortable using a keyboard for basic typing?",
        answerClass: "a-3",
        answerNoClass: "no-3"
    },
    {
        question: "Curious about exciting future prospects for coders?",
        answerClass: "a-4",
        answerNoClass: "no-4"
    },
    {
        question: "Fancy a sneak peak at the skills your child can learn in our courses?",
        answerClass: "a-5",
        answerNoClass: "no-5"
    },
    {
        question: "Would you like to hear testimonials from other parents?",
        answerClass: "a-6",
        answerNoClass: "no-6"
    },
    {
        question: "Ready to take the first step toward your child's coding adventure?",
        answerClass: "a-7",
        answerNoClass: "no-7"
    }
];

// State management
let currentQuestionIndex = 0;

// Get the center point of the screen
var x = window.innerWidth / 2;
var y = window.innerHeight / 2;

// Calculate the maximum radius to cover the entire screen
var maxRadius = Math.sqrt(x * x + y * y);

function showModal(initialColor, transitionColor) {
    // Show the modal overlay with animation
    
    $modalOverlay.show();
    $modal.css({ display: "block", opacity: 1 });
    const currentAnswerClass = qaData[currentQuestionIndex].answerClass;        
    $(`.${currentAnswerClass}`).fadeIn();
    
    // Always show the next button for "Yes" answers
    $triggerNext.show();
    $(".no-options-container").hide();

    // Slower counter animation
    
    $('[data-toggle="counter-up"]').each(function () {
        $(this).counterUp({
            delay: 30,
            time: 2000
        });
    });
    
    anime({
        targets: $modalOverlay[0],
        clipPath: [
            `circle(0% at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`
        ],
        backgroundColor: [initialColor, transitionColor],
        opacity: { value: [0, 1], duration: 1000 },
        duration: 1500,
        easing: "easeInOutQuad",
    });

    $questionBox.hide();
}

function showNoModal(initialColor, transitionColor) {
    // If we're on question 4 or 5, just skip to the next question
    if (currentQuestionIndex >= 3) {
        showNextQuestion();
        return;
    }

    // Show the modal overlay with animation
    $modalOverlay.show();
    $modal.css({ display: "block", opacity: 1 });
    const currentAnswerClass = qaData[currentQuestionIndex].answerNoClass;        
    $(`.${currentAnswerClass}`).fadeIn();
    
    // If this is the first question (age restriction), show multiple buttons instead of "Next"
    if (currentQuestionIndex === 0) {
        $triggerNext.hide(); // Hide the standard "Next" button
        
        // Check if buttons don't already exist before adding
        if ($(".no-options-container").length === 0) {
            // Create button container
            const $optionsContainer = $('<div class="no-options-container fadeInUp wow" data-wow-delay="0.3s"></div>');
            
            // Create the three buttons
            const $startAgainBtn = $('<button class="trigger trigger-restart">Start Again</button>');
            const $emailUsBtn = $('<a href="mailto:hello@headstartcoding.com" class="trigger trigger-email">Email Us</a>');
            const $homePageBtn = $('<a href="/" class="trigger trigger-home">Visit Home Page</a>');
            
            // Add buttons to container
            $optionsContainer.append($startAgainBtn, $emailUsBtn, $homePageBtn);
            
            // Add container after the content in the "no-1" div
            $(`.${currentAnswerClass}`).after($optionsContainer);
            
            // Set up event handlers for the new buttons
            $startAgainBtn.click(function() {
                resetForm();
            });
        } else {
            // Just make sure they're visible if they already exist
            $(".no-options-container").show();
        }
    } else {
        // For other questions, ensure the Next button is visible and the options are hidden
        $triggerNext.show();
        $(".no-options-container").hide();
    }
    
    anime({
        targets: $modalOverlay[0],
        clipPath: [
            `circle(0% at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`
        ],
        backgroundColor: [initialColor, transitionColor],
        opacity: { value: [0, 1], duration: 1000 },
        duration: 1500,
        easing: "easeInOutQuad",
    });

    $questionBox.hide();
}

function hideModal() {
    const currentAnswerClass = qaData[currentQuestionIndex].answerClass;
    const currentAnswerNoClass = qaData[currentQuestionIndex].answerNoClass;
    $modal.hide();
    $(`.${currentAnswerClass}`).fadeOut();
    $(`.${currentAnswerNoClass}`).fadeOut();
    $(".no-options-container").hide(); // Also hide the options container
    
    anime({
        targets: $modalOverlay[0], 
        clipPath: [
            `circle(${maxRadius}px at ${x}px ${y}px)`,
            `circle(0% at ${x}px ${y}px)`
        ],
        opacity: { value: [1, 0], duration: 1000 },
        duration: 1000,
        easing: "easeInOutQuad",
        complete: function () {
            $modalOverlay.hide();
            showNextQuestion();
        }
    });
}

function resetForm() {
    // Hide all content
    const currentAnswerClass = qaData[currentQuestionIndex].answerClass;
    const currentAnswerNoClass = qaData[currentQuestionIndex].answerNoClass;
    $modal.hide();
    $(`.${currentAnswerClass}`).fadeOut();
    $(`.${currentAnswerNoClass}`).fadeOut();
    $(".no-options-container").hide();
    
    // Animate closing
    anime({
        targets: $modalOverlay[0], 
        clipPath: [
            `circle(${maxRadius}px at ${x}px ${y}px)`,
            `circle(0% at ${x}px ${y}px)`
        ],
        opacity: { value: [1, 0], duration: 1000 },
        duration: 1000,
        easing: "easeInOutQuad",
        complete: function () {
            $modalOverlay.hide();
            
            // Reset to first question
            currentQuestionIndex = 0;
            $questionTitle.text(qaData[currentQuestionIndex].question);
            $questionBox.fadeIn(500);
        }
    });
}

function showNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= 3) {
        $triggerNo.text("Skip");
    } else {
        $triggerNo.text("No");
    }

    if (currentQuestionIndex === qaData.length - 1) {
        $triggerNo.hide(); 
        $triggerYes.text("Let's go!");
    }
    const nextQuestion = qaData[currentQuestionIndex].question;
    $questionTitle.text(nextQuestion);
    $questionBox.fadeIn(500);
}


function launchFireworks() {
    const container = document.getElementById("fireworks-container");
    const fireworks = new Fireworks.default(container, {
        hue: { min: 0, max: 345 }, 
        acceleration: 1.1, 
        brightness: { min: 17, max: 95 }, 
        decay: { min: 0.015, max: 0.036 }, 
        delay: { min: 30, max: 60 }, 
        explosion: 10, 
        flickering: 50, 
        intensity: 30, 
        friction: 0.97, 
        gravity: 1.5, 
        opacity: 0.5, 
        particles: 60, 
        traceLength: 3, 
        traceSpeed: 10, 
        rocketsPoint: { min: 50, max: 50 }, 
        lineWidth: { explosion: { min: 1, max: 4 }, trace: { min: 0.1, max: 1 } }, 
        lineStyle: "round"
    });

    fireworks.start();

    // Stop fireworks after 4 seconds
    setTimeout(() => {
        fireworks.stop();
    }, 4000);
}

// Testimonial code

document.addEventListener("DOMContentLoaded", function () {
    const testimonials = document.querySelectorAll(".testimonial");
    const dotsContainer = document.querySelector(".dots-container");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    let currentIndex = 0;
    let autoSlide;

    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.classList.remove("active");
            if (i === index) t.classList.add("active");
        });

        updateDots();
    }

    function updateDots() {
        document.querySelectorAll(".dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    function createDots() {
        testimonials.forEach((_, i) => {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => {
                currentIndex = i;
                showTestimonial(currentIndex);
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        });
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
        resetAutoSlide();
    }

    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
        resetAutoSlide();
    }

    function autoSlideTestimonials() {
        autoSlide = setInterval(nextTestimonial, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlideTestimonials();
    }

    prevBtn.addEventListener("click", prevTestimonial);
    nextBtn.addEventListener("click", nextTestimonial);

    createDots();
    showTestimonial(currentIndex);
    autoSlideTestimonials();
});




$triggerYes.click(function () {
    const initialColor = "rgba(46, 204, 113, 0.9)";
    const transitionColor = "rgba(147, 51, 234, 0.9)";

    if (currentQuestionIndex === qaData.length - 1) {
        // Final CTA question:
        $triggerNext.hide();
        launchFireworks();

        setTimeout(() => {
            showModal(initialColor, transitionColor);
            $triggerNext.hide(); // Hide the "Next" button
        }, 3000);
    } else {
        showModal(initialColor, transitionColor);
    }

});

$triggerNo.click(function () {
    const initialColor = "rgba(231, 76, 60, 0.9)";
    const transitionColor = "rgba(147, 51, 234, 0.9)";
    showNoModal(initialColor, transitionColor);
});

$triggerNext.click(hideModal);
$closeButton.click(hideModal);

// Initialize first question
$questionTitle.text(qaData[currentQuestionIndex].question);

}

    // Sticky Navbar

    if($('#mobile-indicator').is(':visible')) {
        $('.navbar .navbar-collapse .navbar-nav a').on("click", function() {
            $overlay.toggle(500);
            $navbarCollapse.toggleClass('show');
            $navbarClose.toggle();
        });
        $(window).scroll(function () {
            if ($(this).scrollTop() > 45) {
                $('.navbar').removeClass('sticky-top shadow-sm');
            } else {
                $('.navbar').removeClass('sticky-top shadow-sm');
            }
        });
    } else {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 45) {
                $('.navbar').addClass('sticky-top shadow-sm');
            } else {
                $('.navbar').removeClass('sticky-top shadow-sm');
            }
        });
    }

    //Rotate logo on scroll

    $(document).ready(function(){
        var bodyHeight = $("body").height()-$(window).height();
        window.onscroll = function() {
     
           //Determine the amount to rotate by.
           var deg = window.scrollY*(720/bodyHeight);
     
           $(".sticky-top.navbar-light .logo-color img").css({
             "transform": "rotate("+deg+"deg)",
           });
     
        };
     });
 

    //Click functionality for service boxes

    $('.service-item-container a.btn').on("click", function(event) {
        event.preventDefault();
        $(this).parent().toggleClass('active');
        $(this).siblings('.flip-container').toggleClass('hover');
    });

    //Modal javascript

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // // Skills
    // $('.skill').waypoint(function () {
    //     $('.progress .progress-bar').each(function () {
    //         $(this).css("width", $(this).attr("aria-valuenow") + '%');
    //     });
    // }, {offset: '80%'});

    //Intro Skills

    $(document).ready(function () {
        // Disable the Waypoint initially
        var skillWaypoint = new Waypoint({
            element: $('.skill'),
            handler: function () {
                $('.progress .progress-bar').each(function () {
                    $(this).css("width", $(this).attr("aria-valuenow") + '%');
                });
            },
            enabled: false,  // Keep it disabled initially
            offset: '80%'    // You can keep this same offset
        });
    
        // Modal show logic
        $('.trigger-yes').on('click', function () {
            // Show the modal
            $('.modal').fadeIn();
    
            // Enable and refresh the Waypoint after the modal is shown
            skillWaypoint.enable();
            Waypoint.refreshAll();  // Refresh all waypoints
        });
    
        // Close modal logic (optional if you have a close button)
        $('.close-button').on('click', function () {
            $('.modal').fadeOut();
        });
    });


    // Facts counter
    // $('[data-toggle="counter-up"]').counterUp({
    //     delay: 10,
    //     time: 2000
    // });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);

