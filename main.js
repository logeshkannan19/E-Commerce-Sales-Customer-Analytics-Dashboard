import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrubEngine } from './scrubEngine.js';
import { tunnelVertexShader, tunnelFragmentShader } from './tunnelShader.js';

gsap.registerPlugin(ScrollTrigger);

class PortfolioApp {
    constructor() {
        this.canvas = document.getElementById('hero-canvas');
        this.heroSection = document.getElementById('hero');
        this.workSection = document.getElementById('work');
        
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.mesh = null;
        this.material = null;
        
        this.scrubEngine = null;
        this.scrollProgress = 0;
        this.targetFrame = 0;
        this.currentFrame = 0;
        this.lastFrame = -1;
        this.isTransitioning = false;
        this.animationFrameId = null;
        this.clock = new THREE.Clock();
        
        this.init();
    }
    
    async init() {
        this.setupThreeJS();
        this.setupScrollTrigger();
        await this.loadFrames();
        this.setupEventListeners();
        this.animate();
    }
    
    setupThreeJS() {
        this.scene = new THREE.Scene();
        
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        this.camera.position.z = 1;
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: false,
            antialias: true,
            powerPreference: 'high-performance'
        });
        
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        
        const geometry = new THREE.PlaneGeometry(2, 2);
        
        const placeholderTexture = this.createPlaceholderTexture();
        
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: placeholderTexture },
                uTexture2: { value: null },
                uBlendFactor: { value: 0.0 },
                uProgress: { value: 0.0 },
                uFocalPoint: { value: new THREE.Vector2(0.5, 0.51) },
                uZoomIntensity: { value: 0.15 },
                uTime: { value: 0.0 }
            },
            vertexShader: tunnelVertexShader,
            fragmentShader: tunnelFragmentShader
        });
        
        this.mesh = new THREE.Mesh(geometry, this.material);
        this.scene.add(this.mesh);
    }
    
    createPlaceholderTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1920;
        canvas.height = 1080;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#0B0B0D';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#1a1a1d';
        ctx.font = '48px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Loading...', canvas.width / 2, canvas.height / 2);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        
        return texture;
    }
    
    async loadFrames() {
        this.scrubEngine = new ScrubEngine({
            frameCount: 190,
            framePrefix: 'ezgif-frame-',
            frameSuffix: '.jpg',
            basePath: './Model image/',
            padding: 3,
            smoothFactor: 0.2,
            onProgress: (progress) => {
                this.updateLoadingProgress(progress);
            },
            onFrameReady: (frameIndex, texture) => {
                if (frameIndex === 0 && !this.material.uniforms.uTexture.value) {
                    this.material.uniforms.uTexture.value = texture;
                }
            },
            onComplete: () => {
                this.onFramesLoaded();
            }
        });
        
        await this.scrubEngine.preload();
    }
    
    updateLoadingProgress(progress) {
        const loadingText = document.querySelector('.loading-text');
        if (loadingText) {
            loadingText.textContent = `Loading frames: ${progress}%`;
        }
    }
    
    onFramesLoaded() {
        console.log('All frames loaded successfully');
        this.isTransitioning = false;
        
        const initialTexture = this.scrubEngine.getCurrentTexture();
        if (initialTexture) {
            this.material.uniforms.uTexture.value = initialTexture;
        }
    }
    
    setupScrollTrigger() {
        ScrollTrigger.create({
            trigger: this.heroSection,
            start: 'top top',
            end: '+=150%',
            scrub: 1,
            pin: true,
            onUpdate: (self) => {
                this.scrollProgress = self.progress;
                this.handleScrollProgress(self.progress);
            },
            onLeave: () => {
                this.fadeOutCanvas();
            },
            onLeaveBack: () => {
                this.fadeInCanvas();
            },
            onEnter: () => {
                this.fadeInCanvas();
            }
        });
        
        gsap.to(this.heroSection, {
            opacity: 1,
            duration: 0.1
        });
    }
    
    handleScrollProgress(progress) {
        if (!this.scrubEngine) return;
        
        const frameCount = this.scrubEngine.getTotalCount();
        const targetFrame = progress * (frameCount - 1);
        
        this.targetFrame = targetFrame;
        
        const currentFrameFloat = this.currentFrame;
        const frameDelta = Math.abs(targetFrame - currentFrameFloat);
        
        if (frameDelta > 1) {
            const texture = this.scrubEngine.getTexture(Math.round(targetFrame));
            if (texture) {
                this.material.uniforms.uTexture.value = texture;
                this.lastFrame = Math.round(targetFrame);
            }
        }
        
        this.scrubEngine.setFrame(targetFrame);
        
        this.material.uniforms.uProgress.value = progress;
        this.material.uniforms.uTime.value = performance.now() * 0.001;
    }
    
    fadeOutCanvas() {
        gsap.to(this.canvas, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut'
        });
    }
    
    fadeInCanvas() {
        gsap.to(this.canvas, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.inOut'
        });
    }
    
    setupEventListeners() {
        window.addEventListener('resize', this.handleResize.bind(this));
        this.setupProjectCardHover();
        
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                this.scrollToProgress(Math.min(1, this.scrollProgress + 0.1));
            } else if (e.key === 'ArrowLeft') {
                this.scrollToProgress(Math.max(0, this.scrollProgress - 0.1));
            }
        });
    }
    
    scrollToProgress(progress) {
        const scrollHeight = this.heroSection.offsetHeight * 2.5;
        const targetScroll = this.heroSection.offsetTop + (progress * scrollHeight);
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
    
    setupProjectCardHover() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const image = card.querySelector('.project-image');
            
            card.addEventListener('mouseenter', () => {
                gsap.to(image, {
                    scale: 1.08,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(image, {
                    scale: 1,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            });
        });
    }
    
    handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    
    animate() {
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
        
        const delta = this.clock.getDelta();
        
        if (this.scrubEngine && this.scrubEngine.isPreloaded) {
            const wasUpdated = this.scrubEngine.update(delta * 60);
            
            if (wasUpdated) {
                const currentTexture = this.scrubEngine.getCurrentTexture();
                if (currentTexture && currentTexture !== this.material.uniforms.uTexture.value) {
                    this.material.uniforms.uTexture.value = currentTexture;
                }
            }
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    destroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        
        if (this.scrubEngine) {
            this.scrubEngine.dispose();
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        if (this.material) {
            this.material.dispose();
        }
        
        if (this.mesh && this.mesh.geometry) {
            this.mesh.geometry.dispose();
        }
        
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});

window.addEventListener('beforeunload', () => {
    if (window.portfolioApp) {
        window.portfolioApp.destroy();
    }
});
