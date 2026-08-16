console.log("StudentHub JS Loded Successfully");
console.log("StudentHUb");
// ===============================
// StudentHub JavaScript
// ===============================

// Sticky Navbar Shadow
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
        header.style.background = "#ffffff";
    } else {
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.08)";
    }
});

// =====================================
// Smooth Scroll
// =====================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

// =====================================
// Scroll Reveal Animation
// =====================================

const cards = document.querySelectorAll(".card,.event-card,.notice-box,.about-left,.about-right");

function reveal(){

    const trigger = window.innerHeight * 0.85;

    cards.forEach(card=>{

        const top = card.getBoundingClientRect().top;

        if(top < trigger){

            card.style.opacity="1";

            card.style.transform="translateY(0)";

        }

    });

}

cards.forEach(card=>{

    card.style.opacity="0";

    card.style.transform="translateY(50px)";

    card.style.transition="all .8s ease";

});

window.addEventListener("scroll",reveal);

reveal();

// =====================================
// Button Hover Effect
// =====================================

const buttons=document.querySelectorAll("button");

buttons.forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="scale(1.05)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="scale(1)";

});

});

// =====================================
// Active Navigation
// =====================================

const navLinks=document.querySelectorAll("nav a");

navLinks.forEach(link=>{

link.addEventListener("click",function(){

navLinks.forEach(item=>item.classList.remove("active"));

this.classList.add("active");

});

});

// =====================================
// Back To Top Button
// =====================================

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

document.body.appendChild(topBtn);

topBtn.style.position="fixed";
topBtn.style.bottom="30px";
topBtn.style.right="30px";
topBtn.style.width="50px";
topBtn.style.height="50px";
topBtn.style.border="none";
topBtn.style.borderRadius="50%";
topBtn.style.background="#2563eb";
topBtn.style.color="#fff";
topBtn.style.fontSize="20px";
topBtn.style.cursor="pointer";
topBtn.style.display="none";
topBtn.style.zIndex="1000";
topBtn.style.boxShadow="0 10px 25px rgba(0,0,0,.2)";

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

// =====================================
// Typing Effect
// =====================================

const heading=document.querySelector(".left h1");

if(heading){

const text=heading.innerHTML;

heading.innerHTML="";

let i=0;

function type(){

if(i<text.length){

heading.innerHTML+=text.charAt(i);

i++;

setTimeout(type,40);

}

}

type();

}

// =====================================
// Welcome Message
// =====================================

window.addEventListener("load",()=>{

console.log("Welcome to StudentHub");

}); 