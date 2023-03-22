document.addEventListener("DOMContentLoaded", function() {

    const gridItems = document.querySelectorAll(".grid-item");
    
    // Geselecteerde brands uit het geheugen ophalen
    const selectedBrandsInput = document.getElementById('selected-brands-hidden');

    if (localStorage.getItem('selectedBrandsLocal')) {
      selectedBrandsInput.value = localStorage.getItem('selectedBrandsLocal');
    }

    // display html lijst bijwerken op basis van selectie uit geheugen
    const displayBrandList = document.getElementById("display-brand-list"); // html lijst omzetten in variabele
    displayBrandList.innerHTML = ''; //huidige lijst leegmaken
    const selectedBrandsList = selectedBrandsInput.value.split(','); //omzetten van string naar een lijst
    selectedBrandsList.forEach(function(brand) { //loopen over alle items in de list 
      const li = document.createElement('li');
      li.innerText = brand;
      displayBrandList.appendChild(li);
    });
    

    // Griditems te voorschijn komen animatie
    gridItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = 1;
        item.style.transition = "opacity 1s ease-in-out";
        const img = item.querySelector('img');

        if (selectedBrandsInput.value.includes(img.getAttribute("data-brand"))) {
          item.classList.toggle('selected');
        }
      }, index * 100);

    });
  
    // Loopen over alle items en eventlistener erop zetten om vervolgens te selecteren of de-selecteren
    gridItems.forEach((item, index) => {
      const img = item.querySelector('img');
      const imgId = `img_${index}`;
      img.setAttribute('id', imgId);
     
      item.addEventListener('click', function() { 
        
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

    // Error / Succes message laten verdwijnen
    const errorMessage = document.querySelector('.alert-danger');
    const successMessage = document.querySelector('.alert-success');
    
    if (errorMessage) {
      errorMessage.style.display = 'block';
      setTimeout(() => {
        errorMessage.classList.add('fade-out');
        setTimeout(() => {
          errorMessage.style.display = 'none';
          errorMessage.classList.remove('fade-out');
        }, 2000);
      }, 5000);
    } else if (successMessage) {
      successMessage.style.display = 'block';
      setTimeout(() => {
        successMessage.classList.add('fade-out');
        setTimeout(() => {
          successMessage.style.display = 'none';
          successMessage.classList.remove('fade-out');
        }, 2000);
      }, 5000);
    }

    //items direct laten verschijnen wanneer de user iets in de search balk intypt
    document.querySelector('.search-input').addEventListener('input', function(event) {
      const searchText = event.target.value.toLowerCase();
      const gridItems = document.querySelectorAll('.grid-item');
      gridItems.forEach((item) => {
        const brandname = item.querySelector('img').getAttribute('data-brand').toLowerCase();
        
        if (brandname.includes(searchText)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });

  //parallax
  window.addEventListener('scroll', function () {
    var scrollPosition = window.scrollY;
    var heroImage = document.querySelector('.landingimage');
    var maxWidth = window.innerWidth - (heroImage.offsetWidth ); //hiermee schalen hoever hij kan naar rechts
    var maxHeight = window.innerHeight - (heroImage.offsetHeight*1.6); //hiermee schalen hoever hij kan naar beneden
  
    var horizontalTranslation = Math.min(scrollPosition * 0.2, maxWidth);
    var verticalTranslation = Math.min(scrollPosition * 0.2, maxHeight);
  
    var opacity = 1 - (horizontalTranslation / maxWidth) * 0.3;
  
    heroImage.style.transform = `translate3d(${horizontalTranslation}px, ${verticalTranslation}px, 0) scale(${1 - scrollPosition * 0.0005})`;
    heroImage.style.opacity = opacity;
  });
  // });


  //smooth scrollen
  var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 500,
  speedAsDuration: true
  });

  //call to action button scroll
  document.getElementById('calltoactionbutton').addEventListener('click', function() {
    window.scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth'
    });
  });



  //pagina direct naar beneden laten scrollen bij laden van nieuwe pagina
  const page = getQueryParam('page');
  if (page !== null) {
    smoothScrollDown(800);
  }

  //faq animations
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const question = item.querySelector(".question");
    question.addEventListener("click", () => {
      const answer = item.querySelector(".answer");

      if (!answer) return;

      const isOpen = answer.style.display;

      if (isOpen === 'block') {
        answer.style.display = 'none';
      } else {
        answer.style.display = 'block';
      }
    });
  });

  //landing page animations (how it works 3 steps)
  const steps = document.querySelectorAll('.step');

  function removeAnimation() {
    steps.forEach(step => {
      step.style.animation = 'none';
    });
  }

  function addAnimation() {
    steps[0].style.animation = 'highlight 6s cubic-bezier(0.25, 0.1, 0.25, 1) infinite';
    steps[1].style.animation = 'highlight 6s cubic-bezier(0.25, 0.1, 0.25, 1) 2s infinite';
    steps[2].style.animation = 'highlight 6s cubic-bezier(0.25, 0.1, 0.25, 1) 4s infinite';
  }

  steps.forEach(step => {
    step.addEventListener('mouseenter', removeAnimation);
    step.addEventListener('mouseleave', addAnimation);
  });
  //landingpage steps toggle function
  function toggleParagraph(event) {
    if (window.innerWidth <= 767) {
      const paragraph = event.currentTarget.querySelector('p');
      paragraph.classList.toggle('show-paragraph');
    }
  }
  
  steps.forEach(step => {
    step.addEventListener('click', toggleParagraph);
  });


  }); //einde van domcontentloaded
//
//
//
//


  function smoothScrollDown(px) {
    const targetScroll = window.scrollY + px;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }






// //functie om menu weg te halen
//   function toggleMenu() {
//     var categoryNav = document.getElementById("category-nav");
//     var categoryDiv = document.getElementById("category-div");
//     var logoDiv = document.getElementById("logo")
//     categoryNav.classList.toggle("hide");
//     if (categoryNav.classList.contains("hide")) {
//       categoryDiv.style.width = "50px";
//       categoryNav.style.translateX = "-200px";
//       // logoDiv.style.paddingLeft = "0px" 

//     } else {
//       categoryDiv.style.width = "200px";
//       categoryNav.style.translateX = "0px";
//       // logoDiv.style.paddingLeft = "200px"

//     }
//   }
  



