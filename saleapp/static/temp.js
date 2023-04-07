$(document).ready(function () {
    Splitting();

    // Scroll to Featured Brands Section
    $("#scrollToBrands").on("click", function () {
        var sectionTop = $("#how-it-works-section").offset().top;
        var sectionHeight = $("#how-it-works-section").outerHeight();
        var windowHeight = $(window).height();
        
        var scrollTarget = sectionTop + sectionHeight - windowHeight;
    
        $("html, body").animate(
            {
                scrollTop: scrollTarget,
            },
            1400 // Adjust the duration as desired (in milliseconds)
        );
    });
    // Animate How It Works steps
    const steps = $(".step");
    const animationOffset = 300;
    function animateSteps() {
        steps.each(function () {
            if ($(this).offset().top <= $(window).scrollTop() + $(window).height() - animationOffset) {
                $(this).addClass("show");
            }
        });
    }
    animateSteps();
    $(window).on("scroll", animateSteps);

// Testimonial slider
const testimonials = $(".testimonial");
let currentTestimonialIndex = 0;

function showTestimonial(index) {
    testimonials.css({ display: "none", opacity: 0 });
    testimonials.eq(index).css({ display: "block" }).animate({ opacity: 1 }, 1000);
}

function updateTestimonials(newIndex) {
    if (newIndex === currentTestimonialIndex) return;
    showTestimonial(newIndex);
    currentTestimonialIndex = newIndex;
}

// Initialize the first testimonial
showTestimonial(currentTestimonialIndex);

$(".slider-control.right").on("click", function () {
    const nextTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    updateTestimonials(nextTestimonialIndex);
});

$(".slider-control.left").on("click", function () {
    const prevTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonials(prevTestimonialIndex);
});

// Automatic carousel animation
setInterval(() => {
    const nextTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    updateTestimonials(nextTestimonialIndex);
}, 5000); // Change the interval duration (in milliseconds) as needed


  //smooth scrollen
  var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 500,
    speedAsDuration: true
    });

});