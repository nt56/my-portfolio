const typingText = document.querySelector(".typing-text");
const careers = [
  "Frontend Developer",
  "React Developer",
  "React Native Developer",
  "Next.js Developer",
  "MERN Stack Developer",
];

let careerIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentCareer = careers[careerIndex];

  if (isDeleting) {
    typingText.textContent = currentCareer.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentCareer.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = 100;

  if (!isDeleting && charIndex === currentCareer.length) {
    typingSpeed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    careerIndex = (careerIndex + 1) % careers.length;
    typingSpeed = 500;
  }

  setTimeout(type, typingSpeed);
}

document.addEventListener("DOMContentLoaded", type);

// Scroll Reveal Animation using Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
  // Add reveal classes to elements
  const revealElements = document.querySelectorAll(
    ".about .row .image, .about .row .content, .education .box-container .box, " +
      ".timeline-item, .projects .box, .contact .container, " +
      ".skills .heading, .education .heading, .work-experience .heading, " +
      ".projects .heading, .contact .heading, .about .heading",
  );

  revealElements.forEach((el) => {
    el.classList.add("reveal");
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);

        // Remove reveal classes after animation completes (800ms) to prevent hover transition conflicts
        setTimeout(() => {
          entry.target.classList.remove(
            "reveal",
            "reveal-left",
            "reveal-right",
            "active",
          );
        }, 800);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".reveal, .reveal-left, .reveal-right")
    .forEach((el) => {
      observer.observe(el);
    });

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("header .navbar ul li a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
});

emailjs.init("XfVfkRyIDwMd3AfwV");

// Handle form submission
$("#contact-form").submit(function (event) {
  event.preventDefault();

  emailjs.sendForm("service_qmzk2ts", "template_lg1rme6", "#contact-form").then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      document.getElementById("contact-form").reset();
      alert("Response Submitted Successfully!");
    },
    function (error) {
      console.log("FAILED...", error);
      alert("Response Submission Failed! Try Again");
    },
  );
});
