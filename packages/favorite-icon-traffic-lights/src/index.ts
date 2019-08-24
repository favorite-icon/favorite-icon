import Favicon from '../../favorite-icon/src/index';

const MAX_STATUS_IMAGE = 3;

export default class FaviconTrafficLights {
    private isStatusImagesLoaded: boolean = false;
    private isFaviconLoaded: boolean = false;
    private countStatusImages = 0;
    
    private status?: favicon.TrafficLightsStatus;
    private options?: favicon.TrafficLightsOptions;

    private errorImage: HTMLImageElement;
    private okImage: HTMLImageElement;
    private warningImage: HTMLImageElement;

    private favicon: HTMLImageElement;

    constructor(rawOptions: favicon.TrafficLightsOptions) {
        this.options = rawOptions || {};
        this.options.size = this.options.size || Favicon.size;

        this.loadStatusImages();
        this.loadFavicon();
    }

    public set(status?: favicon.TrafficLightsStatus) {
        if (status) {
            this.status = status;
        }

        if (!this.isStatusImagesLoaded || !this.isFaviconLoaded || !this.status) {
            return;
        }

        const size =  this.options.size || Favicon.size;
        const image: HTMLImageElement = {
            ok: this.okImage,
            error: this.errorImage,
            warning: this.warningImage
        }[this.status];
    
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;

        const context = canvas.getContext('2d');    
        context.clearRect(0, 0, size, size);
    
        context.drawImage(this.favicon, 0, 0, this.options.size, this.options.size);

        const width = size / 2;
        const height = size / 2;
        const x = size - width;
        const y = size - height;

        context.drawImage(image, x, y, width, height);
    
        Favicon.set(canvas, this.options.links);
    }

    private loadStatusImages() {   
        this.okImage = new Image();
        this.errorImage = new Image();
        this.warningImage = new Image();
        
        this.okImage.onload =
        this.warningImage.onload =
        this.errorImage.onload = () => {
            this.countStatusImages++;
        
            if (this.countStatusImages === MAX_STATUS_IMAGE) {
                this.isStatusImagesLoaded = true;
                this.set();
            }
        };
        
        this.errorImage.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 348.333 348.334"><path d="M336.559 68.611L231.016 174.165l105.543 105.549c15.699 15.705 15.699 41.145 0 56.85-7.844 7.844-18.128 11.769-28.407 11.769-10.296 0-20.581-3.919-28.419-11.769L174.167 231.003 68.609 336.563c-7.843 7.844-18.128 11.769-28.416 11.769-10.285 0-20.563-3.919-28.413-11.769-15.699-15.698-15.699-41.139 0-56.85l105.54-105.549L11.774 68.611c-15.699-15.699-15.699-41.145 0-56.844 15.696-15.687 41.127-15.687 56.829 0l105.563 105.554L279.721 11.767c15.705-15.687 41.139-15.687 56.832 0 15.705 15.699 15.705 41.145.006 56.844z" fill="red"/></svg>';
        this.okImage.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 342.357 342.357"><path d="M290.04 33.286L118.861 204.427l-66.541-66.52L0 190.226l118.862 118.845L342.357 85.606z" fill="green"/></svg>';
        this.warningImage.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 438.533 438.533"><path d="M409.133 109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736 9.801 259.058 0 219.273 0c-39.781 0-76.47 9.801-110.063 29.407-33.595 19.604-60.192 46.201-79.8 79.796C9.801 142.8 0 179.489 0 219.267c0 39.78 9.804 76.463 29.407 110.062 19.607 33.592 46.204 60.189 79.799 79.798 33.597 19.605 70.283 29.407 110.063 29.407s76.47-9.802 110.065-29.407c33.593-19.602 60.189-46.206 79.795-79.798 19.603-33.596 29.403-70.284 29.403-110.062.001-39.782-9.8-76.472-29.399-110.064z" fill="orange"/></svg>';        
    }

    private loadFavicon() {   
        this.favicon = new Image();

        this.favicon.onload =
        this.favicon.onabort =
        this.favicon.onerror = () => {
            this.isFaviconLoaded = true;
            this.set();
        };

        this.favicon.src = this.options.faviconSrc || Favicon.getOriginalSrc();
    }

    public reset() {
        Favicon.reset();
    }
}
