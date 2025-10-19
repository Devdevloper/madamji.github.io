// FINGERPRINT SCAN
window.addEventListener("DOMContentLoaded", () => {
  const fingerprint = document.querySelector(".fingerprint-container");
  let hoverTime = 0;
  let interval;

  const startHover = () => {
    interval = setInterval(() => {
      hoverTime += 100;
      if (hoverTime >= 2000) {
        clearInterval(interval);
        // Fingerprint scan complete animation
        gsap.to(".fingerprint", { scale: 1.3, duration: 0.5, repeat: 1, yoyo: true });
        showTypewriterPopup();
      }
    }, 100);
  };

  const stopHover = () => {
    clearInterval(interval);
    hoverTime = 0;
  };

  // Desktop hover
  fingerprint.addEventListener("mouseenter", startHover);
  fingerprint.addEventListener("mouseleave", stopHover);
  // Mobile touch
  fingerprint.addEventListener("touchstart", startHover);
  fingerprint.addEventListener("touchend", stopHover);

  // Typewriter popup function
  function showTypewriterPopup() {
    fingerprint.style.display = "none"; // hide fingerprint
    Swal.fire({
      title: '',
      html: '<p id="typewriter"></p>',
      showConfirmButton: true,
      confirmButtonText: 'OK',
      didOpen: () => {
        const message = "Oh you are the beautiful girl for whom this lazy guy was developing this page";
        let i = 0;
        const typewriterEl = document.getElementById("typewriter");
        const typeInterval = setInterval(() => {
          typewriterEl.innerHTML += message[i];
          i++;
          if (i >= message.length) clearInterval(typeInterval);
        }, 50); // speed of typing
      },
    }).then(() => {
      // Continue with music prompt
      document.querySelector(".song")?.pause(); // ensure song is paused initially
      Swal.fire({
        title: "Do you want to play music in the background?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          document.querySelector(".song").play();
          animationTimeline();
        } else {
          animationTimeline();
        }
      });
    });
  }
});

// trigger to play music in the background with sweetalert
window.addEventListener("load", () => {
  Swal.fire({
    title: "Do you want to play music in the background?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      document.querySelector(".song").play();
      animationTimeline();
    } else {
      animationTimeline();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const dayElement = document.getElementById("day");
  const monthElement = document.getElementById("month");
  const yearElement = document.getElementById("year");
  const ageElement = document.getElementById("age");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const targetDay = 24;
  const targetMonthIndex = 9; // October
  const targetYear = 2025;
  const birthYear = 2000;

  let currentDay = 1;
  let currentMonthIndex = 0;
  let currentYear = birthYear;
  let currentAge = 0;

  const interval = setInterval(() => {
    // Update day, month, year, and age in the DOM
    dayElement.textContent = currentDay;
    monthElement.textContent = months[currentMonthIndex];
    yearElement.textContent = currentYear;
    ageElement.textContent = currentAge;

    // Smoothly increment day, month, year, and age
    if (currentDay < targetDay) {
      currentDay++;
    } else if (currentMonthIndex < targetMonthIndex) {
      currentDay = targetDay; // Fix day
      currentMonthIndex++;
    } else if (currentYear < targetYear) {
      currentMonthIndex = targetMonthIndex; // Fix month
      currentYear++;
      currentAge++;
    } else {
      // Stop animation when target is reached
      clearInterval(interval);
    }
  }, 150); // Smoother speed adjustment
});

// animation timeline
const animationTimeline = () => {
  // split chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
  };

  // timeline
  const tl = new TimelineMax();

  tl.to(".container", 0.6, {
    visibility: "visible",
  })
    .from(".one", 0.9, {
      opacity: 0,
      y: 10,
    })
    .from(".two", 0.9, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=3.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=3"
    )
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0,
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0,
    })
    .staggerTo(
      ".hbd-chatbox span",
      1.5,
      {
        visibility: "visible",
      },
      0.05
    )
    .to(
      ".fake-btn",
      0.1,
      {
        backgroundColor: "rgb(127, 206, 248)",
      },
      "+=4"
    )
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150,
      },
      "+=1"
    )
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0,
      },
      "+=1.5"
    )
    .to(
      ".idea-5 span",
      0.7,
      {
        rotation: 90,
        x: 8,
      },
      "+=1.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0,
      },
      "+=2"
    )
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut,
      },
      0.2
    )
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut,
      },
      0.2,
      "+=1.5"
    )
    .staggerFromTo(
      ".baloons img",
      2.5,
      {
        opacity: 0.9,
        y: 1400,
      },
      {
        opacity: 1,
        y: -1000,
      },
      0.2
    )
    .from(
      ".profile-picture",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45,
      },
      "-=2"
    )
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0,
    })
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        // scale: 0.3,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5),
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150,
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut,
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg",
      },
      "party"
    )
    .staggerTo(
      ".eight svg",
      1.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4,
      },
      0.3
    )
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1",
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90,
      },
      "+=1"
    );

  // Restart Animation on click
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    tl.restart();
  });
};

// Confetti generator
function createConfetti() {
  const colors = ["#ff5f6d", "#ffc371", "#9b59b6", "#3498db", "#2ecc71"];
  for (let i = 0; i < 50; i++) {
    const conf = document.createElement("div");
    conf.classList.add("confetti");
    conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    conf.style.left = Math.random() * window.innerWidth + "px";
    conf.style.animation = `fall ${2 + Math.random() * 3}s linear infinite`;
    document.body.appendChild(conf);
  }
}

const style = document.createElement("style");
style.innerHTML = `
@keyframes fall {
  0% {transform: translateY(0);}
  100% {transform: translateY(${window.innerHeight + 50}px);}
}`;
document.head.appendChild(style);
createConfetti();

// Stars generator
function createStars() {
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.top = Math.random() * window.innerHeight + "px";
    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.width = 1 + Math.random() * 3 + "px";
    star.style.height = star.style.width;
    star.style.animationDuration = 1 + Math.random() * 3 + "s";
    document.body.appendChild(star);
  }
}
createStars();

// Heart particles on wish
function createHearts() {
  const wish = document.querySelector(".wish");
  for (let i = 0; i < 10; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "px";
    wish.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }
}

// Trigger hearts when HBD appears
document.querySelector(".wish-hbd").addEventListener("animationend", createHearts);
