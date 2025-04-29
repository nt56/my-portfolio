const typingText = document.querySelector(".typing-text");
const careers = [
  "MERN Stack Developer",
  "React Developer",
  "Frontend Developer",
  "Node Developer",
  "Backend Developer",
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
    typingSpeed = 1500; // Pause after full word typed
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    careerIndex = (careerIndex + 1) % careers.length;
    typingSpeed = 500; // Pause before typing next word
  }

  setTimeout(type, typingSpeed);
}

document.addEventListener("DOMContentLoaded", type);

emailjs.init("XfVfkRyIDwMd3AfwV");

// Handle form submission
$("#contact-form").submit(function (event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Send form data via EmailJS
  emailjs.sendForm("service_qmzk2ts", "template_lg1rme6", "#contact-form").then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      // Optionally reset the form
      document.getElementById("contact-form").reset();
      // Alert for success
      alert("Response Submitted Successfully!");
    },
    function (error) {
      console.log("FAILED...", error);
      // Alert for failure
      alert("Response Submission Failed! Try Again");
    }
  );
});
