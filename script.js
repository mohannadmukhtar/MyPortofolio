

// Scroll Reveal Logic
const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', reveal);
window.onload = reveal;

// Force download CV
document.querySelector('a[download]').addEventListener('click', function(e) {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = this.href;
    link.download = this.getAttribute('download');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Portfolio Data
const portfolioData = {
    projects: [
        {
            title: "Gym Landing Page",
            desc: "A responsive gym landing page built with HTML, CSS, and JavaScript, featuring modern design and interactive elements to attract fitness enthusiasts.",
            tags: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
            image: "https://thumbs.dreamstime.com/z/man-lifting-heavy-weights-gym-back-view-lifts-spacious-modern-s-high-ceilings-ample-lighting-emphasize-muscular-build-334017764.jpg?w=992",
            icon: "fa-dumbbell",
            link: "https://github.com/mohannadmukhtar/GYM-landing-page.git"
        },
        {
            title: "company management system",
            desc: "A secure and efficient system to manage company operations, employee data, and reporting, helping organizations streamline their workflow.",
            tags: ["SQL Server", "Azure", "Identity"],
            image: "https://www.agilitysystem.net/wp-content/uploads/2023/10/Business-Management-Featured-Image.png",
            icon: "fa-building"
        },

    ]
};

// Projects rendering (grid default) + mobile menu and See All toggle
const container = document.getElementById('projects-container');

function renderProjects(list, layout = 'grid') {
    // clear to avoid duplicates
    container.innerHTML = '';

    // set container layout classes (keep gap)
    if (layout === 'list') {
        container.className = 'flex flex-col gap-8';
    } else {
        container.className = 'grid md:grid-cols-2 lg:grid-cols-3 gap-8';
    }

    list.forEach(project => {
        const linkButton = project.link ? `<a href="${project.link}" target="_blank" class="mt-4 inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-bold transition">View on GitHub</a>` : '';
        container.innerHTML += `
            <div class="glass-card rounded-2xl overflow-hidden hover-target">
                <div class="project-image" style="background-image: url('${project.image}')"></div>
                <div class="p-6">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-8 h-8 dot-net-gradient rounded flex items-center justify-center">
                            <i class="fas ${project.icon} text-white text-sm"></i>
                        </div>
                        <h3 class="text-xl font-bold">${project.title}</h3>
                    </div>
                    <p class="text-slate-400 text-sm mb-6 leading-relaxed">${project.desc}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${project.tags.map(tag => `<span class="text-[10px] bg-indigo-500/10 text-indigo-300 px-2 py-1 rounded border border-indigo-500/20 font-bold uppercase">${tag}</span>`).join('')}
                    </div>
                    ${linkButton}
                </div>
            </div>
        `;
    });
}

// initial grid render using only existing projects
renderProjects(portfolioData.projects, 'grid');

// See All button toggles between grid and vertical list without adding or fetching new items
const seeAllBtn = document.getElementById('see-all-btn');
let showingList = false;
if (seeAllBtn) {
    seeAllBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        showingList = !showingList;
        if (showingList) {
            renderProjects(portfolioData.projects, 'list');
            seeAllBtn.innerHTML = 'Show Grid <i class="fas fa-th-large"></i>';
        } else {
            renderProjects(portfolioData.projects, 'grid');
            seeAllBtn.innerHTML = 'See All Projects <i class="fas fa-arrow-right"></i>';
        }
    });
}

// Mobile menu toggle (show/hide nav links)
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('hidden');
    });
    // hide mobile menu after clicking a link
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            if (window.innerWidth < 768) navLinks.classList.add('hidden');
        });
    });
}

// ===== Email Configuration with FormSubmit =====
// حل أسهل - مجاني تماماً، لا بيانات معقدة!

function sendMessage() {
    const btn = event.target;
    const originalText = btn.innerHTML;
    const form = document.getElementById('contact-form');
    
    // تحقق من ملء الحقول
    const name = document.getElementById('from_name').value.trim();
    const email = document.getElementById('from_email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        alert('من فضلك ملء جميع الحقول');
        return;
    }

    // التحقق من صيغة الإيميل
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('من فضلك أدخل بريد إلكتروني صحيح');
        return;
    }
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // إرسال البيانات باستخدام FormSubmit - طريقة بسيطة جداً
    const formDataToSend = new FormData();
    formDataToSend.append('name', name);
    formDataToSend.append('email', email);
    formDataToSend.append('message', message);
    // هذا الإيميل هو المهم - غيره بـ الإيميل بتاعك!
    formDataToSend.append('_to', 'mohanadmokhtarsalah@gmail.com');
    formDataToSend.append('_subject', `New Contact Message from ${name}`);

    fetch('https://formsubmit.co/ajax/mohanadmokhtarsalah@gmail.com', {
        method: 'POST',
        body: formDataToSend
    })
    .then(response => response.json())
    .then(data => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.classList.replace('bg-indigo-600', 'bg-emerald-600');
        
        console.log('Success:', data);
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.replace('bg-emerald-600', 'bg-indigo-600');
            form.reset();
        }, 3000);
    })
    .catch(error => {
        btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error!';
        btn.classList.replace('bg-indigo-600', 'bg-red-600');
        console.error('Error:', error);

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.replace('bg-red-600', 'bg-indigo-600');
        }, 3000);
    });
}

// ===== Dark/Light Mode Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Check saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    themeIcon.classList.replace('text-yellow-400', 'text-indigo-400');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');

        if (isLight) {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            themeIcon.classList.replace('text-yellow-400', 'text-indigo-400');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            themeIcon.classList.replace('text-indigo-400', 'text-yellow-400');
            localStorage.setItem('theme', 'dark');
        }
    });
}