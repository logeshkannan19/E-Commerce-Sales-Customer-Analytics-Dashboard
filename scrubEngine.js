import * as THREE from 'three';

export class ScrubEngine {
    constructor(options = {}) {
        this.frameCount = options.frameCount || 190;
        this.framePrefix = options.framePrefix || 'ezgif-frame-';
        this.frameSuffix = options.frameSuffix || '.jpg';
        this.basePath = options.basePath || './Model image/';
        this.padding = options.padding || 3;
        this.textureLoader = new THREE.TextureLoader();
        
        this.textures = [];
        this.imageData = [];
        this.loadedCount = 0;
        this.isPreloaded = false;
        this.isLoading = false;
        
        this.currentFrame = 0;
        this.targetFrame = 0;
        this.smoothFactor = options.smoothFactor || 0.15;
        
        this.onProgress = options.onProgress || (() => {});
        this.onFrameReady = options.onFrameReady || (() => {});
        this.onComplete = options.onComplete || (() => {});
    }
    
    getFramePath(frameNumber) {
        const paddedNumber = String(frameNumber).padStart(this.padding, '0');
        return `${this.basePath}${this.framePrefix}${paddedNumber}${this.frameSuffix}`;
    }
    
    async preload() {
        if (this.isLoading || this.isPreloaded) return;
        this.isLoading = true;
        
        const totalBatches = Math.ceil(this.frameCount / 5);
        
        for (let batch = 0; batch < totalBatches; batch++) {
            const promises = [];
            const start = batch * 5;
            const end = Math.min(start + 5, this.frameCount);
            
            for (let i = start; i < end; i++) {
                promises.push(this.loadFrame(i));
            }
            
            await Promise.all(promises);
            this.onProgress(Math.round((end / this.frameCount) * 100));
        }
        
        this.isPreloaded = true;
        this.isLoading = false;
        this.onComplete();
    }
    
    async preloadAround(targetFrame, range = 10) {
        const promises = [];
        const start = Math.max(0, targetFrame - range);
        const end = Math.min(this.frameCount, targetFrame + range);
        
        for (let i = start; i < end; i++) {
            if (!this.textures[i]) {
                promises.push(this.loadFrame(i));
            }
        }
        
        if (promises.length > 0) {
            await Promise.all(promises);
        }
    }
    
    loadFrame(frameIndex) {
        return new Promise((resolve) => {
            const path = this.getFramePath(frameIndex);
            
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                
                this.imageData[frameIndex] = canvas;
                
                const texture = new THREE.CanvasTexture(canvas);
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.generateMipmaps = false;
                
                this.textures[frameIndex] = texture;
                this.loadedCount++;
                this.onFrameReady(frameIndex, texture);
                resolve(texture);
            };
            
            img.onerror = () => {
                console.warn(`Failed to load frame ${frameIndex}`);
                resolve(null);
            };
            
            img.src = path;
        });
    }
    
    setFrame(frameIndex, immediate = false) {
        const clampedIndex = Math.max(0, Math.min(frameIndex, this.frameCount - 1));
        this.targetFrame = clampedIndex;
        
        if (immediate) {
            this.currentFrame = clampedIndex;
        }
        
        return this.getTexture(Math.round(this.currentFrame));
    }
    
    updateByProgress(progress, immediate = false) {
        const frameIndex = progress * (this.frameCount - 1);
        return this.setFrame(frameIndex, immediate);
    }
    
    update(deltaTime) {
        if (Math.abs(this.currentFrame - this.targetFrame) > 0.01) {
            this.currentFrame += (this.targetFrame - this.currentFrame) * this.smoothFactor;
            return true;
        }
        return false;
    }
    
    getTexture(frameIndex) {
        const clampedIndex = Math.max(0, Math.round(frameIndex));
        if (clampedIndex >= 0 && clampedIndex < this.textures.length) {
            return this.textures[clampedIndex];
        }
        return null;
    }
    
    getCurrentTexture() {
        return this.getTexture(Math.round(this.currentFrame));
    }
    
    getFrameData(frameIndex) {
        const clampedIndex = Math.max(0, Math.round(frameIndex));
        return this.imageData[clampedIndex];
    }
    
    dispose() {
        this.textures.forEach(texture => {
            if (texture) texture.dispose();
        });
        this.imageData.forEach(canvas => {
            if (canvas) {
                canvas.width = 0;
                canvas.height = 0;
            }
        });
        this.textures = [];
        this.imageData = [];
        this.loadedCount = 0;
        this.isPreloaded = false;
    }
    
    getProgress() {
        return this.loadedCount / this.frameCount;
    }
    
    getLoadedCount() {
        return this.loadedCount;
    }
    
    getTotalCount() {
        return this.frameCount;
    }
    
    isFrameLoaded(frameIndex) {
        return !!this.textures[frameIndex];
    }
}
