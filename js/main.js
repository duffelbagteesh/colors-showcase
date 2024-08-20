

const anchors = document.querySelectorAll('h2');
const links = document.querySelectorAll('body > div > main > div.main-wrapper.center-style > aside > nav > a');

window.addEventListener('scroll', (event) => {
  if (typeof(anchors) != 'undefined' && anchors != null && typeof(links) != 'undefined' && links != null) {
    let scrollTop = window.scrollY;
    
    // highlight the last scrolled-to: set everything inactive first
    links.forEach((link, index) => {
      link.classList.remove("active");
    });
    
    // then iterate backwards, on the first match highlight it and break
    for (var i = anchors.length-1; i >= 0; i--) {
      if (scrollTop > anchors[i].offsetTop - 75) {
        links[i].classList.add('active');
        break;
      }
    }
  }
});


var picker = document.querySelector('.picker');


picker.addEventListener('change', function() {

  var red = document.querySelector('.red').value;
  var green = document.querySelector('.green').value;
  var blue = document.querySelector('.blue').value;

  var rgb = blue | (green << 8) | (red << 16);

  var output = "rgb(" + red + "," + green + "," + blue + ")";

  document.querySelector('.result').style.background = output;
  document.querySelector('.output-red').innerHTML = red;
  document.querySelector('.output-green').innerHTML = green;
  document.querySelector('.output-blue').innerHTML = blue;




});





console.clear();

var pickerdos = {
  container: document.getElementById("pickerdos"),
  sample: document.getElementById("sample")
};

var colors = {
  h: 320,
  s: 80,
  l: 50,
  textColor: function() {
    return this.l > 42 ?
      "black" :
      "white";
  },
  hueValue: function() {
    return Math.floor(this.h);
  },
  satValue: function() {
    return Math.floor(this.s) + "%";
  },
  lumValue: function() {
    return Math.floor(this.l) + "%";
  },
  getHSLString: function() {
    return "hsl(" + [
      colors.hueValue(),
      colors.satValue(),
      colors.lumValue()
    ].join(", ") + ")";
  },
  getHueLumString: function() {
    return "hsl(" +
      colors.hueValue() + ", 100%, " +
      colors.lumValue() + ")";
  },
  getHueSatString: function() {
    return "hsl(" +
      colors.hueValue() + ", " +
      colors.satValue() + ", 50%)";
  }
};

pickerdos.sliders = Array.from(
  pickerdos.container.querySelectorAll("input[type='range']")
);

pickerdos.sliders.forEach(function(p, i) {
  p.addEventListener("input", handleSliderChange);
  initSlider(p);
});

function handleSliderChange() {
  var sliderType = this.id.split("hsl-")[1];
  if(sliderType === "h") {
    colors.h = this.value;
  } else if(sliderType === "s") {
    colors.s = this.value;
  } else if(sliderType === "l") {
    colors.l = this.value;
  }
  updateColors();
}

function fixChromeRepaintIssue(event) {
  var updateable = pickerdos.sliders;
  if(event.type !== "mouseup") {
     updateable = pickerdos.sliders.filter(function(el) {
      return el !== event.target;
    });
  }
  updateable.forEach(forceRepaint)
}

function forceRepaint(element) {  
  element.style.display='none';
  element.offsetHeight;
  element.style.display='';
}

function updateColors() {
  pickerdos.sliders.forEach(updateColor);
}

function updateColor(color) {
  pickerdos.sliders[0].style.color = colors.getHSLString();
  pickerdos.sliders[1].style.color = colors.getHueLumString();
  pickerdos.sliders[2].style.color = colors.getHueSatString();
  pickerdos.sample.style.backgroundColor = colors.getHSLString();
  pickerdos.sample.innerHTML = getColorValuesHTML();
}

function getColorValuesHTML() {
  return [
    "<div class=\"" + colors.textColor() + "\">",
    [
      colors.getHSLString(),
      window.getComputedStyle(pickerdos.sliders[0]).color
    ].join("</div><div class=\"" + colors.textColor() + "\">"),
    "</div>"
  ].join("");
}

function initSlider(s) {
  if(s.id==="hsl-h") {
    s.value = colors.h;
  } else if(s.id ==="hsl-s") {
    s.value = colors.s;
  } else if(s.id ==="hsl-l") {
    s.value = colors.l;
  }
  updateColors();
}

