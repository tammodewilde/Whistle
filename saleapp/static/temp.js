$(document).ready(function () {


    //Dit zal allemaal gaan over grid items en selecteren van brands enzovoort
    //
    //
    //
    //
    // alle brand items selecteren en opslaan in  variabele
    const gridItems = $(".brand-container");
    // Geselecteerde brands uit het geheugen ophalen
    const selectedBrandsInput = $('#selected-brands-hidden');    
    
    // kijken of er al iets in het geheugen staat
    if (localStorage.getItem('selectedBrandsLocal')) {
        selectedBrandsInput.value = localStorage.getItem('selectedBrandsLocal');
      }

    // Griditems te voorschijn komen animatie
    gridItems.each(function (index, item) {
        setTimeout(() => {
            $(item).css({
                opacity: 1,
                transition: "opacity 1s ease-in-out",
            });
            const img = $(item).find('img');
    
            if (selectedBrandsInput.val().includes(img.attr("data-brand"))) {
                $(item).toggleClass('selected');
            }
        }, index * 100);
    });

       // Loopen over alle items en eventlistener erop zetten om vervolgens te selecteren of de-selecteren
       gridItems.each(function (index, item) {
        const img = $(item).find('img');
        const imgId = `img_${index}`;
        img.attr('id', imgId);
       
        $(item).on('click', function() { 
          
          // Als er op het item geclickt wordt, wordt hij geselecteerd
          item.classList.toggle('selected');
          const brandname = img.getAttribute('data-brand'); //data attribute van afbeelding opslaan in variabele
          const selectedBrandsInput = document.getElementById('selected-brands-hidden'); //variabele creeeren die gelijk staat aan de value van het hidden input field
  
          // check if the clicked item is currently selected
          if (item.classList.contains('selected')) {
            // merk toevoegen aan hidden input field
            if (selectedBrandsInput.value === '') {  
              selectedBrandsInput.value += brandname;
            } else {
              if (!selectedBrandsInput.value.includes(brandname)){ // alleen toevoegen als de naam niet al in de value zit
                selectedBrandsInput.value += ',' + brandname; 
              }
            }
            console.log(selectedBrandsInput.value)
  
          } else {
            const currentBrands = selectedBrandsInput.value.split(',');
            const newBrands = currentBrands.filter(name => name !== brandname); 
            selectedBrandsInput.value = newBrands.join(',');
            console.log(selectedBrandsInput.value)
          }
  
          // geselecteerde items lokaal opslaan in browser
          localStorage.setItem('selectedBrandsLocal', selectedBrandsInput.value);
          
          // inhoud van selectedBrandsInput weergeven in een list 
          const displayBrandList = document.getElementById("display-brand-list"); // html lijst omzetten in variabele
          displayBrandList.innerHTML = ''; //huidige lijst leegmaken
          const selectedBrandsList = selectedBrandsInput.value.split(','); //omzetten van string naar een lijst
          selectedBrandsList.forEach(function(brand) { //loopen over alle items in de list 
            const li = document.createElement('li');
            li.innerText = brand;
            displayBrandList.appendChild(li);
          });
  
        }) 
      });
  

    //
    //
    //
    //
    //
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
            800 // Adjust the duration as desired (in milliseconds)
        );

        // Reset and animate steps with a 1000 ms delay
        resetSteps();
        setTimeout(() => animateSteps(1000), 800);
    });



    // 
    // 
    // How It Works 
    // 
    // 
    
    const steps = $(".step");
    const animationOffset = 300;

    function animateSteps() {
        let stepIndex = 0;
        steps.each(function (i) {
            if ($(this).offset().top <= $(window).scrollTop() + $(window).height() - animationOffset) {
                if (!$(this).hasClass("show")) {
                    $(this).addClass("show");
                    stepIndex++;
                }
            }
        });
    }

    function highlightSteps(delay = 0) {
        let stepIndex = 0;
        steps.each(function (i) {
            if ($(this).hasClass("show")) {
                setTimeout(() => {
                    $(this).find(".step-icon img").addClass("highlight");
                }, delay + 400 * stepIndex);
                stepIndex++;
            }
        });
    }

    function resetHighlighting() {
        steps.find(".step-icon img").removeClass("highlight");
    }

    function runAnimationLoop() {
        resetHighlighting();
        setTimeout(() => highlightSteps(1000), 600);
        setTimeout(runAnimationLoop, 1000 + 400 * steps.length + 3000);
    }

    animateSteps();
    $(window).on("scroll", animateSteps);
    runAnimationLoop();


    //
    //
    // Testimonial section 
    //
    //
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

//
//
//einde domcontent loaded
//
//
});