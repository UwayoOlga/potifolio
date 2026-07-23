/**
 * AI Chat Concierge — Olga's Portfolio
 * A RAG-inspired client-side bot with resume knowledge base.
 * Retrieves the most relevant knowledge chunks for each query,
 * then generates a contextual, conversational response.
 */

;(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     KNOWLEDGE BASE  (resume + case studies)
  ───────────────────────────────────────────── */
  const KB = [
    {
      tags: ['who', 'olga', 'about', 'introduce', 'overview', 'summary'],
      answer: `Olga is a Full-Stack Software Developer based in Kigali, Rwanda, currently finishing her B.Sc. in Software Engineering at the Adventist University of Central Africa (AUCA), graduating November 2026. She builds production-grade web and mobile applications, has shipped work used by 5,000+ active users, and is passionate about turning ideas into clean, reliable software.`
    },
    {
      tags: ['education', 'degree', 'university', 'study', 'auca', 'school', 'gashora', 'coursework', 'academic'],
      answer: `**Education**\n\n🎓 **Adventist University of Central Africa (AUCA)**\n   B.Sc. Software Engineering — Expected Nov 2026\n   Relevant coursework: OOP, Data Structures, Databases, System Design, Full-Stack Development, Software Project Management\n   Capstone: IT system for Rwanda's school feeding policy\n\n🏫 **Gashora Girls Academy of Science & Technology**\n   High School Diploma (Jan 2019 – Jun 2022) — GPA: 4.0`
    },
    {
      tags: ['experience', 'work', 'job', 'role', 'engineer', 'intern', 'trainee', 'auca innovation', 'caystard', 'thegym', 'employed'],
      answer: `**Work Experience**\n\n1️⃣ **AUCA Innovation Center** — Full-Stack Engineer (Aug 2024 – Jul 2025, Kigali)\n   • Built an IT system supporting Rwanda's national school feeding policy\n   • Developed a School Dropout Reduction System using attendance analytics & automated alerts\n   • Led community outreach with Mastercard Foundation visiting 10 secondary schools\n\n2️⃣ **Caystard Group Ltd** — Software Developer Intern (Jun–Nov 2025, Remote)\n   • Designed & deployed 4+ critical features for Android apps serving 5,000+ users\n   • Achieved 97% test coverage for responsive UI components\n   • Reduced app load time by 15% through performance optimisation\n\n3️⃣ **TheGYM** — Software Development Trainee (Nov 2024 – Dec 2025, Kigali)\n   • 12-month traineeship working on real-world projects under international mentorship\n\n4️⃣ **AUCA** — IT Campus Librarian (Jan 2023 – Present)\n   • Managed digital library resources and implemented tools to automate routine tasks`
    },
    {
      tags: ['skill', 'technology', 'tech stack', 'language', 'framework', 'tool', 'programming', 'technical'],
      answer: `**Technical Skills**\n\n💻 **Languages:** Java, JavaScript, TypeScript, Python, C, SQL, R, Kotlin\n\n🔧 **Backend & Frameworks:** Spring Boot, Node.js, Django, Firebase, Express\n\n⚛️ **Frontend:** React, Next.js, Tailwind CSS, HTML/CSS\n\n📱 **Mobile:** Flutter & Dart, React Native\n\n🗄️ **Databases:** PostgreSQL, MySQL, Firebase\n\n📊 **Data Science:** Data Wrangling, EDA, Feature Engineering, Supervised & Unsupervised ML, Ensemble Modeling, Power BI\n\n🛠️ **Tools & DevOps:** Git, Postman, Docker (basics), CI/CD, Agile/Scrum, Cloud Deployment (Render/Netlify/Heroku)\n\n🧪 **Testing:** JUnit, Unit Testing, API Testing`
    },
    {
      tags: ['project', 'built', 'developed', 'portfolio', 'github', 'work', 'case study', 'application', 'system'],
      answer: `**Featured Projects**\n\n📚 **School Feeding Management System** (2025)\n   Full-stack system (Spring Boot + React + TypeScript) for Rwanda's national school feeding policy. Handles stock management, supplier coordination, automated reporting, and real-time dashboards for districts & schools.\n\n📊 **Uber Fares Dataset Analysis**\n   Data science project with Python — data wrangling, EDA, feature engineering, and machine learning models to predict fare pricing.\n\n💰 **Umurage** — Savings Group Platform\n   Modern fintech platform (Next.js + Express + PostgreSQL + Redis) for savings groups in Rwanda. Features instant loan requests, digital contribution tracking, audit trails, and automated financial reporting.\n\n🌊 **IoT-Based Flood Alert System** (2023)\n   Hybrid model using Dijkstra's Algorithm + priority queues for real-time sensor data processing (< 10 second alert latency). Deployed 3 sensor units in Ngororero & Musanze districts. Presented at Hanga Pitchfest 2023.\n\n🏠 **Escrow Chain Alliance** — Blockchain Rental Platform (2025)\n   Blockchain-based rental management (React + Node.js + Cardano smart contracts). Features secure escrow payments, decentralised dispute resolution, and role-based dashboards for tenants, landlords & admins. Built for Cardano Hackathon.`
    },
    {
      tags: ['contact', 'email', 'phone', 'reach', 'hire', 'connect', 'linkedin', 'github', 'youtube', 'social'],
      answer: `**Get in Touch with Olga**\n\n📧 **Email:** uwayoolga@gmail.com\n📞 **Phone:** +250 780 613 479 / +250 732 108 689\n💼 **LinkedIn:** linkedin.com/in/olga-uwayo-5a9aa7213\n🐙 **GitHub:** github.com/UwayoOlga\n▶️ **YouTube:** @olgauwayo\n📍 **Location:** Kigali, Rwanda\n\nShe's open to full-stack, data, and mobile development opportunities!`
    },
    {
      tags: ['certificate', 'certification', 'course', 'training', 'credential', 'award', 'achievement'],
      answer: `**Certifications & Achievements**\n\n📜 Applied Data Science Lab — WorldQuant University\n📜 Data Analytics — Analyst Builder\n📜 Data Analysis with Python — freeCodeCamp\n📜 Graduate Bridge Program — Carnegie Mellon University Africa\n📜 Mobile App Development — Technovation\n📜 Networking Essentials — CISCO\n📜 Python Core — Sololearn\n\n🏆 2nd Place — AUCA Innovation Center Hackathon (educational impact)\n🎤 Presented at Hanga Pitchfest 2023`
    },
    {
      tags: ['volunteer', 'volunteering', 'community', 'coach', 'teach', 'mentor', 'olympiad', 'debate', 'idebate'],
      answer: `**Volunteering**\n\n🖥️ **Rwanda Computing Olympiad** — Data Structures Coach (2023–Present)\n   Guiding students through algorithms and competitive programming challenges\n\n🎤 **iDebate Rwanda** — Public Speaking Coach (2022–2023)\n   Coached secondary school students in debate structure, critical thinking, and persuasive communication`
    },
    {
      tags: ['language', 'speak', 'kinyarwanda', 'english', 'communication'],
      answer: `Olga speaks **English** and **Kinyarwanda** fluently. She's an experienced communicator — she's coached debate and public speaking, and presented technical work at national events like Hanga Pitchfest.`
    },
    {
      tags: ['available', 'hire', 'open to', 'opportunity', 'freelance', 'full-time', 'part-time', 'remote', 'relocate'],
      answer: `Olga is currently **open to new opportunities** — full-time roles, internships, and freelance/contract projects in full-stack development, mobile, or data engineering. She can work remotely or on-site in Kigali. You can book a call at wa.me/250780613479 or email uwayoolga@gmail.com.`
    },
    {
      tags: ['java', 'spring', 'backend'],
      answer: `Olga's primary backend stack is **Java + Spring Boot**, which she used at AUCA Innovation Center to build production systems tracking meal distribution across Rwanda's public schools. She's comfortable with REST API design, JUnit testing, Maven, and database integration (PostgreSQL, MySQL).`
    },
    {
      tags: ['react', 'next', 'frontend', 'typescript', 'tailwind'],
      answer: `On the frontend, Olga works with **React, Next.js, and TypeScript**, styled with Tailwind CSS. She built Umurage (a fintech platform) and the School Feeding dashboard with these technologies, focusing on clean UI, performance, and responsive design.`
    },
    {
      tags: ['flutter', 'dart', 'mobile', 'android', 'kotlin', 'app'],
      answer: `For mobile, Olga is proficient in **Flutter/Dart** and has worked with **Kotlin** on Android at Caystard Group Ltd — where she deployed 4+ critical features for apps with 5,000+ active users and achieved 97% test coverage.`
    },
    {
      tags: ['data', 'machine learning', 'ml', 'python', 'analytics', 'analysis', 'science', 'power bi'],
      answer: `Olga has solid data science foundations: **Python, R, SQL, Power BI** — covering data wrangling, EDA, feature engineering, supervised/unsupervised ML, and ensemble modeling. She earned the Applied Data Science Lab cert from WorldQuant University and built the Uber Fares Analysis project as a showcase.`
    },
    {
      tags: ['blockchain', 'cardano', 'web3', 'smart contract', 'escrow'],
      answer: `Olga explored Web3 development at the Cardano Hackathon (2025), building **Escrow Chain Alliance** — a full-stack blockchain-based rental management platform using React, Node.js, and Cardano smart contracts. Features included secure escrow payments and decentralised dispute resolution.`
    },
    {
      tags: ['iot', 'flood', 'sensor', 'arduino', 'raspberry', 'hardware'],
      answer: `In 2023, Olga built an **IoT-Based Flood Alert System** using Arduino/Raspberry Pi microcontrollers and Python. The system used Dijkstra's Algorithm and priority queues for real-time processing, achieving alert latency under 10 seconds. She deployed 3 sensor units in Rwanda and presented the project at Hanga Pitchfest 2023.`
    }
  ];

  /* ─────────────────────────────────────────────
     RETRIEVAL ENGINE
     Scores KB entries by keyword overlap with query
  ───────────────────────────────────────────── */
  function retrieve(query) {
    const q = query.toLowerCase().replace(/[?!.,]/g, '');
    const tokens = q.split(/\s+/);

    let best = null;
    let bestScore = 0;

    KB.forEach(entry => {
      let score = 0;
      entry.tags.forEach(tag => {
        if (q.includes(tag)) score += 3;
        tokens.forEach(tok => {
          if (tag.includes(tok) || tok.includes(tag)) score += 1;
        });
      });
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    });

    return bestScore >= 1 ? best : null;
  }

  /* ─────────────────────────────────────────────
     RESPONSE FORMATTER
     Converts markdown-lite to HTML
  ───────────────────────────────────────────── */
  function format(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  function buildResponse(query) {
    const result = retrieve(query);

    if (!result) {
      return `I don't have specific information about that — but you're welcome to reach out to Olga directly at <strong><a href="mailto:uwayoolga@gmail.com" style="color:var(--accent-purple);">uwayoolga@gmail.com</a></strong> or <strong><a href="https://wa.me/250780613479" target="_blank" style="color:var(--accent-purple);">WhatsApp</a></strong>. She'd be happy to chat!`;
    }

    return format(result.answer);
  }

  /* ─────────────────────────────────────────────
     UI CONTROLLER
  ───────────────────────────────────────────── */
  const toggle     = document.getElementById('chat-toggle');
  const panel      = document.getElementById('chat-panel');
  const closeBtn   = document.getElementById('chat-close-btn');
  const messages   = document.getElementById('chat-messages');
  const input      = document.getElementById('chat-input');
  const sendBtn    = document.getElementById('chat-send');
  const openIcon   = document.getElementById('chat-open-icon');
  const closeIcon  = document.getElementById('chat-close-icon');

  let isOpen = false;

  function openChat() {
    panel.style.display = 'flex';
    isOpen = true;
    openIcon.style.display  = 'none';
    closeIcon.style.display = 'block';
    input.focus();
    // Re-trigger animation
    panel.style.animation = 'none';
    panel.offsetHeight; // reflow
    panel.style.animation = '';
  }

  function closeChat() {
    panel.style.display = 'none';
    isOpen = false;
    openIcon.style.display  = 'block';
    closeIcon.style.display = 'none';
  }

  toggle.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeChat();
  });

  function appendMessage(html, role) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${role}`;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = html;
    msg.appendChild(bubble);
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-message bot';
    typing.id = 'chat-typing-indicator';
    typing.innerHTML = `<div class="chat-typing"><span></span><span></span><span></span></div>`;
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('chat-typing-indicator');
    if (t) t.remove();
  }

  function handleSend() {
    const q = input.value.trim();
    if (!q) return;

    // Remove suggestion chips on first send
    const chips = document.querySelector('.chat-suggestions');
    if (chips) chips.remove();

    input.value = '';
    sendBtn.disabled = true;

    appendMessage(q, 'user');
    showTyping();

    // Simulate a natural response delay (350–900ms)
    const delay = 350 + Math.random() * 550;
    setTimeout(() => {
      removeTyping();
      appendMessage(buildResponse(q), 'bot');
      sendBtn.disabled = false;
      input.focus();
    }, delay);
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  // Suggestion chips
  document.addEventListener('click', e => {
    if (e.target.classList.contains('suggestion-chip')) {
      const q = e.target.dataset.q;
      if (!q) return;
      // Remove all chips
      const chips = document.querySelector('.chat-suggestions');
      if (chips) chips.remove();
      appendMessage(q, 'user');
      showTyping();
      const delay = 350 + Math.random() * 400;
      setTimeout(() => {
        removeTyping();
        appendMessage(buildResponse(q), 'bot');
      }, delay);
    }
  });

  // Nudge animation after 4s to draw attention
  setTimeout(() => {
    if (!isOpen) toggle.classList.add('nudge');
    toggle.addEventListener('animationend', () => toggle.classList.remove('nudge'), { once: true });
  }, 4000);
})();
