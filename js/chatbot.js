document.addEventListener('DOMContentLoaded', function() {
    initChatbot();
});

function initChatbot() {
    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');

    chatbotButton.addEventListener('click', () => {
        chatbotButton.classList.toggle('active');
        chatbotContainer.classList.toggle('active');
        if (chatbotContainer.classList.contains('active')) {
            chatbotInput.focus();
        }
    });

    document.addEventListener('click', (e) => {
        if (!chatbotContainer.contains(e.target) && !chatbotButton.contains(e.target)) {
            chatbotButton.classList.remove('active');
            chatbotContainer.classList.remove('active');
        }
    });

    const knowledgeBase = {
        greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'],
        skills: ['skill', 'skills', 'what can you do', 'technologies', 'programming languages', 'tech stack'],
        java: ['java', 'swing', 'desktop', 'gui'],
        web: ['web', 'javascript', 'html', 'css', 'frontend', 'react', 'typescript'],
        teaching: ['teach', 'teaching', 'educator', 'lecturer', 'students', 'college', 'gauteng city college'],
        projects: ['project', 'projects', 'portfolio', 'work', 'built', 'created'],
        education: ['education', 'degree', 'qualification', 'study', 'university'],
        experience: ['experience', 'years', 'worked', 'career'],
        learning: ['learning', 'currently learning', 'studying', 'future'],
        contact: ['contact', 'email', 'phone', 'reach', 'get in touch', 'whatsapp'],
        cv: ['cv', 'resume', 'curriculum vitae', 'download'],
        about: ['about', 'who are you', 'tell me about yourself', 'bio']
    };

    const responses = {
        greetings: "Hey there! I'm Uwami's digital assistant. I can tell you about:\n\n• His journey from C++ newbie to teaching 200+ students\n• The projects he's built (and the bugs he's squashed)\n• What it's like teaching Java in 2025\n• How to get in touch for a chat\n\nWhat would you like to know?",
        
        skills: "Uwami is proficient in multiple technologies:\n\n💎 Core Expertise:\n• Java & Java Swing (Primary)\n• JavaScript (ES6+)\n• C++\n• Python\n• SQL\n• CSS3\n\n🌱 Currently Learning:\n• React\n• TypeScript\n• C#\n• Vite\n\nHe specializes in desktop applications with Java Swing and is expanding into modern web development!",
        
        java: "Java is Uwami's primary strength! 💪\n\n✨ Expertise includes:\n• Java Swing GUI development\n• Desktop application architecture\n• Object-Oriented Programming\n• Database integration with Java\n• Complex system design\n\nHe's built numerous Java applications including student management systems and inventory trackers. Would you like to see his projects?",
        
        web: "Uwami is actively developing his web development skills:\n\n🌐 Current Skills:\n• JavaScript (Modern ES6+)\n• HTML5 & CSS3\n• Responsive design\n• DOM manipulation\n\n🚀 Learning Path:\n• React for component-based UIs\n• TypeScript for type safety\n• Modern build tools (Vite)\n\nHe's bridging desktop and web development to become a versatile full-stack developer!",
        
        teaching: "Uwami loves teaching!\n\nAt Gauteng City College:\n• IT Systems Development Lecturer\n• Has taught 200+ students\n• Specializes in making complex concepts click\n\nHis approach:\n\"I still remember my first 'Hello World' struggle, so I get it when students are confused. My job is turning those confused faces into confident coders.\"\n\nHe says the best part is watching quiet students become confident developers!",
        
        projects: "Uwami has worked on diverse projects:\n\nFeatured Projects:\n\n• Student Management System\n  - Java Swing desktop app\n  - Database integration\n  - Academic progress tracking\n\n• Inventory Tracker\n  - Modern web application\n  - Real-time updates\n  - Comprehensive reporting\n\n• Data Analyzer\n  - Python-based tool\n  - Data visualization\n  - Automated reporting\n\n50+ projects completed overall! Visit the Projects section for details.",
        
        education: "Uwami's educational background reflects his commitment to technology and teaching:\n\n🎓 Qualifications:\n• IT Systems Development expertise\n• Continuous professional development\n• Self-directed learning in emerging technologies\n\nHe believes in lifelong learning and constantly updates his skills to stay current with industry trends!",
        
        experience: "Uwami brings 6+ years of experience:\n\n💼 Professional Journey:\n• Started with C++ (2019)\n• Mastered Java & Swing (2020)\n• Expanded to web technologies (2021)\n• Added Python & SQL (2022)\n• Began teaching (2024)\n• Currently learning modern frameworks (2025)\n\nHis experience spans development, education, and continuous learning!",
        
        learning: "Uwami is always expanding his skillset!\n\nCurrent Focus:\n• React (70% progress)\n• TypeScript (60% progress)\n• C# (50% progress)\n• Vite (65% progress)\n\nHe believes: \"In technology, the moment you stop learning is the moment you become obsolete.\"\n\nWhat technology interests you?",
        
        contact: "Ready to connect with Uwami?\n\nContact Information:\n• Email: uwamimgxekwa@gmail.com\n• Phone: +27 63 572 2080\n• WhatsApp: Available\n• GitHub: github.com/Uwami-Mgxekwa\n• Location: Gauteng, South Africa\n\nHe's open to:\n• Development opportunities\n• Collaboration\n• Educational consulting\n• Tech discussions\n\nFeel free to reach out!",
        
        cv: "You can access Uwami's complete CV!\n\nWhat's included:\n• Educational background\n• Professional experience\n• Technical skills & competencies\n• Project portfolio highlights\n• Certifications\n\nOptions:\n• Download PDF (2.5 MB)\n• View online in browser\n\nVisit the CV section on this page to download or view!",
        
        about: "Let me tell you about Uwami!\n\nUwami Mgxekwa is:\n• Software Developer specializing in Java\n• IT Systems Development Lecturer at Gauteng City College\n• Ranked #1 Developer in South Africa on committers.top\n• Passionate educator who's taught 200+ students\n• Lifelong learner exploring modern technologies\n\nPhilosophy:\n\"I teach Java during the day and build desktop applications at night. What started as curiosity has turned into a passion for both creating solutions and helping others discover programming.\"\n\nHe bridges the gap between development and education!\n\nWhat else would you like to know?",
        
        default: "I'm here to help you learn about Uwami!\n\nI can answer questions about:\n• Technical skills & expertise\n• Teaching experience\n• Projects & portfolio\n• Educational background\n• Contact information\n• CV download\n\nWhat would you like to know? Or try asking:\n\"Tell me about your skills\"\n\"What projects have you worked on?\"\n\"How can I contact you?\""
    };

    function findBestMatch(userMessage) {
        const message = userMessage.toLowerCase();
        
        for (const [category, keywords] of Object.entries(knowledgeBase)) {
            if (keywords.some(keyword => message.includes(keyword))) {
                return category;
            }
        }
        
        return 'default';
    }

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = isUser ? 'U' : 'UM';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = message;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot';
        typingDiv.id = 'typing-indicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = 'UM';
        
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(indicator);
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function removeTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    function handleUserMessage(message) {
        if (!message.trim()) return;
        
        addMessage(message, true);
        chatbotInput.value = '';
        
        showTyping();
        
        setTimeout(() => {
            removeTyping();
            const category = findBestMatch(message);
            const response = responses[category];
            addMessage(response);
            
            if (category === 'greetings' || category === 'default') {
                addQuickReplies();
            }
        }, 800 + Math.random() * 400);
    }

    function addQuickReplies() {
        const lastMessage = chatbotMessages.lastElementChild;
        if (lastMessage && lastMessage.classList.contains('bot')) {
            const quickRepliesDiv = document.createElement('div');
            quickRepliesDiv.className = 'quick-replies';
            quickRepliesDiv.innerHTML = `
                <button class="quick-reply-btn" data-message="Tell me about your skills">Skills</button>
                <button class="quick-reply-btn" data-message="What projects have you worked on?">Projects</button>
                <button class="quick-reply-btn" data-message="How can I contact you?">Contact</button>
            `;
            
            const messageContent = lastMessage.querySelector('.message-content') || lastMessage.lastElementChild;
            messageContent.parentElement.appendChild(quickRepliesDiv);
            
            quickRepliesDiv.querySelectorAll('.quick-reply-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    handleUserMessage(btn.dataset.message);
                });
            });
        }
    }

    chatbotSend.addEventListener('click', () => {
        handleUserMessage(chatbotInput.value);
    });

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage(chatbotInput.value);
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-reply-btn')) {
            handleUserMessage(e.target.dataset.message);
        }
    });
}