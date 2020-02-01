import Favicon from '../../favorite-icon/src/index';

const MAX_STATUS_IMAGE = 3;
const IMAGE_WIDTH = 12;
const IMAGE_HEIGHT = 16;

export default class FaviconStatus {
    private isStatusImagesLoaded: boolean = false;
    private isFaviconLoaded: boolean = false;
    private countStatusImages = 0;
    
    private status?: favicon.StatusType;
    private options?: favicon.StatusOptions;

    private errorImage: HTMLImageElement;
    private okImage: HTMLImageElement;
    private warningImage: HTMLImageElement;

    private favicon: HTMLImageElement;

    constructor(rawOptions: favicon.StatusOptions) {
        this.options = {
            faviconSrc: rawOptions && rawOptions.faviconSrc || Favicon.getOriginalSrc(),
            links: rawOptions && rawOptions.links,
            size: rawOptions && rawOptions.size || Favicon.size,
        };

        this.loadStatusImages();
        this.loadFavicon();
    }

    public set(status?: favicon.StatusType) {
        if (status) {
            this.status = status;
        }

        if (!this.isStatusImagesLoaded || !this.isFaviconLoaded || !this.status) {
            return;
        }

        this.draw();
    }

    private draw() {    
        const size =  this.options.size;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;

        const context = canvas.getContext('2d');    
        context.clearRect(0, 0, size, size);
        context.drawImage(this.favicon, 0, 0, size, size);

        const width = size / 1.2;
        const height = size / 1.2;
        const x = size / 3.5;
        const y = size / 3.5;

        context.drawImage({
            ok: this.okImage,
            error: this.errorImage,
            warning: this.warningImage
        }[this.status], 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, x, y, width, height);
    
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
        
        this.errorImage.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z" fill="rgb(203, 36, 49)" stroke="black" stroke-width="0.5" /></svg>';
        this.okImage.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z" fill="rgb(40, 167, 69)" stroke="black" stroke-width="0.5" /></svg>';
        this.warningImage.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><circle cx="6" cy="8" r="4" fill="rgb(255, 165, 0)" stroke="black" stroke-width="0.5" /></svg>';
    }

    private loadFavicon() {   
        this.favicon = new Image();

        this.favicon.onload =
        this.favicon.onabort =
        this.favicon.onerror = () => {
            this.isFaviconLoaded = true;
            this.set();
        };

        this.favicon.src = this.options.faviconSrc;
    }

    public reset() {
        Favicon.reset();
    }
}
