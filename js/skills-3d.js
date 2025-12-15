/**
 * 3D Skills Hexagon Display using Three.js
 * Creates floating 3D hexagons for each skill with interactive animations
 */

class Skills3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.hexagons = [];
        this.mouse = { x: 0, y: 0 };
        this.isInitialized = false;
        this.container = null;
        this.animationId = null;
        
        // Skills data with colors and proficiency levels
        this.skillsData = [
            { name: 'Java', level: 95, color: 0xED8B00, icon: 'devicon-java-plain', iconColor: '#ED8B00' },
            { name: 'Spring Boot', level: 88, color: 0x6DB33F, icon: 'devicon-spring-plain', iconColor: '#6DB33F' },
            { name: 'JavaScript', level: 90, color: 0xF7DF1E, icon: 'devicon-javascript-plain', iconColor: '#F7DF1E' },
            { name: 'C++', level: 85, color: 0x00599C, icon: 'devicon-cplusplus-plain', iconColor: '#00599C' },
            { name: 'SQL', level: 85, color: 0x336791, icon: 'devicon-mysql-plain', iconColor: '#336791' },
            { name: 'CSS', level: 90, color: 0x1572B6, icon: 'devicon-css3-plain', iconColor: '#1572B6' }
        ];
        
        this.init();
    }
    
    init() {
        this.container = document.getElementById('skills-3d-container');
        if (!this.container) {
            console.warn('3D Skills container not found');
            return;
        }
        
        this.setupScene();
        this.createHexagons();
        this.setupEventListeners();
        this.animate();
        this.isInitialized = true;
    }
    
    setupScene() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = null; // Transparent background
        
        // Camera
        const containerRect = this.container.getBoundingClientRect();
        this.camera = new THREE.PerspectiveCamera(
            75,
            containerRect.width / containerRect.height,
            0.1,
            1000
        );
        this.camera.position.z = 8;
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        this.renderer.setSize(containerRect.width, containerRect.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        this.scene.add(directionalLight);
        
        const pointLight = new THREE.PointLight(0xf1c40f, 1, 100);
        pointLight.position.set(0, 0, 10);
        this.scene.add(pointLight);
    }
    
    createHexagonGeometry() {
        const shape = new THREE.Shape();
        const radius = 1;
        const sides = 6;
        
        for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            if (i === 0) {
                shape.moveTo(x, y);
            } else {
                shape.lineTo(x, y);
            }
        }
        shape.lineTo(Math.cos(0) * radius, Math.sin(0) * radius);
        
        const extrudeSettings = {
            depth: 0.2,
            bevelEnabled: true,
            bevelSegments: 2,
            steps: 2,
            bevelSize: 0.05,
            bevelThickness: 0.05
        };
        
        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }
    
    createHexagons() {
        const geometry = this.createHexagonGeometry();
        
        this.skillsData.forEach((skill, index) => {
            // Create hexagon material
            const material = new THREE.MeshPhongMaterial({
                color: skill.color,
                transparent: true,
                opacity: 0.8,
                shininess: 100
            });
            
            const hexagon = new THREE.Mesh(geometry, material);
            
            // Position hexagons in a circular pattern
            const angle = (index / this.skillsData.length) * Math.PI * 2;
            const radius = 3;
            hexagon.position.x = Math.cos(angle) * radius;
            hexagon.position.y = Math.sin(angle) * radius;
            hexagon.position.z = 0;
            
            // Add rotation
            hexagon.rotation.x = Math.random() * 0.5;
            hexagon.rotation.y = Math.random() * 0.5;
            
            // Store original position and skill data
            hexagon.userData = {
                originalPosition: hexagon.position.clone(),
                skill: skill,
                originalRotation: hexagon.rotation.clone(),
                hovered: false,
                floatOffset: Math.random() * Math.PI * 2
            };
            
            this.hexagons.push(hexagon);
            this.scene.add(hexagon);
            
            // Create text label
            this.createTextLabel(hexagon, skill);
        });
    }
    
    createTextLabel(hexagon, skill) {
        // Create canvas for text and icon texture
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 180;
        
        // Clear canvas with transparent background
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw a simple geometric icon based on skill type
        this.drawSkillIcon(context, skill, canvas.width / 2, 40);
        
        // Draw skill name
        context.fillStyle = '#ffffff';
        context.font = 'bold 20px Inter, sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(skill.name, canvas.width / 2, canvas.height / 2 + 20);
        
        // Draw level
        context.font = '14px Inter, sans-serif';
        context.fillStyle = '#f1c40f';
        context.fillText(`${skill.level}%`, canvas.width / 2, canvas.height / 2 + 45);
        
        // Create texture and material
        const texture = new THREE.CanvasTexture(canvas);
        const labelMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            alphaTest: 0.1
        });
        
        const labelGeometry = new THREE.PlaneGeometry(2.5, 1.8);
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        
        // Position label above hexagon
        label.position.copy(hexagon.position);
        label.position.y += 2.2;
        label.lookAt(this.camera.position);
        
        hexagon.userData.label = label;
        this.scene.add(label);
    }
    
    drawSkillIcon(context, skill, x, y) {
        const size = 32;
        context.fillStyle = skill.iconColor;
        context.strokeStyle = skill.iconColor;
        context.lineWidth = 3;
        
        switch (skill.name) {
            case 'Java':
                // Draw coffee cup shape
                context.beginPath();
                context.roundRect(x - size/2, y - size/2, size, size * 0.8, 4);
                context.fill();
                // Handle
                context.beginPath();
                context.arc(x + size/2 + 4, y, size/4, Math.PI * 0.3, Math.PI * 1.7, false);
                context.stroke();
                // Steam lines
                context.beginPath();
                context.moveTo(x - 8, y - size/2 - 4);
                context.lineTo(x - 8, y - size/2 - 12);
                context.moveTo(x, y - size/2 - 4);
                context.lineTo(x, y - size/2 - 12);
                context.moveTo(x + 8, y - size/2 - 4);
                context.lineTo(x + 8, y - size/2 - 12);
                context.stroke();
                break;
                
            case 'Spring Boot':
                // Draw leaf shape
                context.beginPath();
                context.ellipse(x, y, size/2, size/3, Math.PI/4, 0, Math.PI * 2);
                context.fill();
                // Leaf vein
                context.beginPath();
                context.moveTo(x - size/3, y + size/4);
                context.lineTo(x + size/3, y - size/4);
                context.strokeStyle = '#ffffff';
                context.lineWidth = 2;
                context.stroke();
                break;
                
            case 'JavaScript':
                // Draw JS letters
                context.font = 'bold 28px Arial';
                context.fillStyle = '#000000';
                context.fillRect(x - size/2, y - size/2, size, size);
                context.fillStyle = skill.iconColor;
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText('JS', x, y);
                break;
                
            case 'C++':
                // Draw C++ text
                context.font = 'bold 20px monospace';
                context.fillStyle = skill.iconColor;
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText('C++', x, y);
                break;
                
            case 'SQL':
                // Draw database cylinder
                context.beginPath();
                context.ellipse(x, y - size/3, size/2, size/6, 0, 0, Math.PI * 2);
                context.fill();
                context.fillRect(x - size/2, y - size/3, size, size/1.5);
                context.beginPath();
                context.ellipse(x, y + size/4, size/2, size/6, 0, 0, Math.PI * 2);
                context.fill();
                break;
                
            case 'CSS':
                // Draw CSS shield
                context.beginPath();
                context.moveTo(x, y - size/2);
                context.lineTo(x + size/2, y - size/4);
                context.lineTo(x + size/3, y + size/2);
                context.lineTo(x, y + size/3);
                context.lineTo(x - size/3, y + size/2);
                context.lineTo(x - size/2, y - size/4);
                context.closePath();
                context.fill();
                // CSS text
                context.font = 'bold 12px Arial';
                context.fillStyle = '#ffffff';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText('CSS', x, y);
                break;
                
            default:
                // Default circle
                context.beginPath();
                context.arc(x, y, size/2, 0, Math.PI * 2);
                context.fill();
                break;
        }
    }
    
    setupEventListeners() {
        // Mouse movement
        this.container.addEventListener('mousemove', (event) => {
            const rect = this.container.getBoundingClientRect();
            this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        });
        
        // Click interaction
        this.container.addEventListener('click', (event) => {
            this.onHexagonClick(event);
        });
        
        // Resize handler
        window.addEventListener('resize', () => {
            this.onWindowResize();
        });
        
        // Intersection observer for performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startAnimation();
                } else {
                    this.stopAnimation();
                }
            });
        });
        
        observer.observe(this.container);
    }
    
    onHexagonClick(event) {
        const raycaster = new THREE.Raycaster();
        const rect = this.container.getBoundingClientRect();
        const mouse = new THREE.Vector2();
        
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        raycaster.setFromCamera(mouse, this.camera);
        const intersects = raycaster.intersectObjects(this.hexagons);
        
        if (intersects.length > 0) {
            const clickedHexagon = intersects[0].object;
            this.animateHexagonClick(clickedHexagon);
            
            // Show skill details
            this.showSkillDetails(clickedHexagon.userData.skill);
        }
    }
    
    animateHexagonClick(hexagon) {
        // Create a bounce animation
        const originalScale = hexagon.scale.clone();
        
        // Scale up
        new TWEEN.Tween(hexagon.scale)
            .to({ x: 1.3, y: 1.3, z: 1.3 }, 200)
            .easing(TWEEN.Easing.Back.Out)
            .onComplete(() => {
                // Scale back down
                new TWEEN.Tween(hexagon.scale)
                    .to(originalScale, 300)
                    .easing(TWEEN.Easing.Elastic.Out)
                    .start();
            })
            .start();
        
        // Spin animation
        const currentRotation = hexagon.rotation.y;
        new TWEEN.Tween(hexagon.rotation)
            .to({ y: currentRotation + Math.PI * 2 }, 1000)
            .easing(TWEEN.Easing.Cubic.Out)
            .start();
    }
    
    showSkillDetails(skill) {
        // Create or update skill details popup
        let popup = document.getElementById('skill-details-popup');
        if (!popup) {
            popup = document.createElement('div');
            popup.id = 'skill-details-popup';
            popup.className = 'skill-details-popup';
            document.body.appendChild(popup);
        }
        
        popup.innerHTML = `
            <div class="skill-popup-content">
                <button class="skill-popup-close">&times;</button>
                <div class="skill-popup-header">
                    <div class="skill-popup-icon">
                        <i class="${skill.icon} colored" style="color: ${skill.iconColor};"></i>
                    </div>
                    <h3>${skill.name}</h3>
                </div>
                <div class="skill-popup-level">
                    <div class="skill-popup-bar">
                        <div class="skill-popup-progress" style="width: ${skill.level}%"></div>
                    </div>
                    <span class="skill-popup-percentage">${skill.level}%</span>
                </div>
                <p class="skill-popup-description">
                    ${this.getSkillDescription(skill.name)}
                </p>
            </div>
        `;
        
        popup.classList.add('active');
        
        // Close popup functionality
        const closeBtn = popup.querySelector('.skill-popup-close');
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
        });
        
        // Close on outside click
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
            }
        });
    }
    
    getSkillDescription(skillName) {
        const descriptions = {
            'Java': 'Expert in Java development with extensive experience in desktop applications using Swing framework and enterprise solutions.',
            'Spring Boot': 'Proficient in building robust REST APIs and microservices with Spring Boot, including security and data management.',
            'JavaScript': 'Strong foundation in modern JavaScript, DOM manipulation, and creating interactive web experiences.',
            'C++': 'Solid understanding of system programming, algorithms, and object-oriented programming principles.',
            'SQL': 'Experienced in database design, complex queries, and data management across various database systems.',
            'CSS': 'Advanced styling capabilities including animations, responsive design, and modern CSS features.'
        };
        return descriptions[skillName] || 'A key technology in my development toolkit.';
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        if (!this.isInitialized) return;
        
        const time = Date.now() * 0.001;
        
        // Update hexagons
        this.hexagons.forEach((hexagon, index) => {
            const userData = hexagon.userData;
            
            // Floating animation
            const floatY = Math.sin(time + userData.floatOffset) * 0.2;
            hexagon.position.y = userData.originalPosition.y + floatY;
            
            // Gentle rotation
            hexagon.rotation.x = userData.originalRotation.x + Math.sin(time * 0.5) * 0.1;
            hexagon.rotation.y = userData.originalRotation.y + Math.cos(time * 0.3) * 0.1;
            
            // Mouse interaction
            const distance = hexagon.position.distanceTo(this.camera.position);
            const mouseInfluence = 1 / (distance * 0.5);
            
            hexagon.position.x = userData.originalPosition.x + this.mouse.x * mouseInfluence * 0.5;
            hexagon.position.z = userData.originalPosition.z + this.mouse.y * mouseInfluence * 0.3;
            
            // Update label position
            if (userData.label) {
                userData.label.position.copy(hexagon.position);
                userData.label.position.y += 2.2;
                userData.label.lookAt(this.camera.position);
            }
        });
        
        // Update TWEEN animations
        if (typeof TWEEN !== 'undefined') {
            TWEEN.update();
        }
        
        // Render
        this.renderer.render(this.scene, this.camera);
    }
    
    startAnimation() {
        if (!this.animationId) {
            this.animate();
        }
    }
    
    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    onWindowResize() {
        if (!this.container) return;
        
        const containerRect = this.container.getBoundingClientRect();
        
        this.camera.aspect = containerRect.width / containerRect.height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(containerRect.width, containerRect.height);
    }
    
    destroy() {
        this.stopAnimation();
        
        if (this.renderer) {
            this.container.removeChild(this.renderer.domElement);
            this.renderer.dispose();
        }
        
        // Clean up geometries and materials
        this.hexagons.forEach(hexagon => {
            hexagon.geometry.dispose();
            hexagon.material.dispose();
            if (hexagon.userData.label) {
                hexagon.userData.label.geometry.dispose();
                hexagon.userData.label.material.dispose();
            }
        });
        
        this.isInitialized = false;
    }
}

// Initialize when DOM is loaded and Three.js is available
function initSkills3D() {
    if (typeof THREE !== 'undefined') {
        new Skills3D();
    } else {
        console.warn('Three.js not loaded. 3D skills will not be available.');
    }
}

// Auto-initialize if Three.js is already loaded
if (typeof THREE !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSkills3D);
    } else {
        initSkills3D();
    }
}

// Export for manual initialization
window.Skills3D = Skills3D;
window.initSkills3D = initSkills3D;