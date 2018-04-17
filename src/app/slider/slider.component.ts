import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';

interface Image {
  title : string;
  url : string;
  cssClass? : string;
}

@Component({
  selector   : 'ff-slider',
  templateUrl: 'slider.component.html',
  styleUrls  : ['slider.component.scss']
})
export class SliderComponent implements OnDestroy {
  @Input() images : Image[];
  @Input() autoplay = false;
  @Input() interval = 2000;
  @Input() buttons = true;
  @Input() selectItem = true;
  @Input() shadow = '';
  @Input() maxSlidesToShow = 1;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.stop();
    this.init();
  }

  length;
  sliderWidth;
  slideWidth;
  timer;
  center;
  left;
  animation = false;
  transition = '0s';


  constructor(private el : ElementRef) {
  }

  onLoad() {
    this.init();
  }

  init() {
    this.sliderWidth = this.getWidth(this.el.nativeElement);
    this.slideWidth = this.getWidth(this.el.nativeElement.querySelector('.ff-slider__slide'));
    this.length = this.images.length;
    this.center = (this.sliderWidth - (this.length * this.slideWidth)) / 2 - (this.slideWidth * (this.length - 1) / 2);
    this.left = this.center;
    this.play();
  }

  getWidth(elem) {
    const style = elem.currentStyle || window.getComputedStyle(elem),
      width = elem.offsetWidth,
      margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
      padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
      border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
    return width + margin + padding + border;
  }

  nextSlide(left) {
    if (this.animation) {
      return;
    }
    this.animation = true;
    this.transition = this.interval + "ms ease";
    this.left += left * -this.slideWidth;
    window.setTimeout(() => {
      while (left) {
        const first = this.el.nativeElement.querySelectorAll('.ff-slider__slide')[0];
        this.el.nativeElement.querySelector('.ff-slider__tracker').appendChild(first);
        left--;
      }
      this.transition = '0s';
      this.left = this.center;
      this.animation = false;
    }, this.interval);
  }

  previousSlide(left) {
    if (this.animation) {
      return;
    }
    this.animation = true;
    this.transition = this.interval + "ms ease";
    this.left += left * this.slideWidth;
    window.setTimeout(() => {
      while (left) {
        const last = this.el.nativeElement.querySelectorAll('.ff-slider__slide')[this.el.nativeElement.querySelectorAll('.ff-slider__slide').length - 1];
        this.el.nativeElement.querySelector('.ff-slider__tracker').prepend(last);
        left--;
      }

      this.transition = '0s';
      this.left = this.center;
      this.animation = false;
    }, this.interval);
  }

  play() {
    if (this.autoplay) {
      if (this.timer) {
        return;
      }
      this.timer = setInterval(() => {
          this.nextSlide(1);
        },
        this.interval);
    }
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
  }

  select(i) {
    if (this.animation) {
      return;
    }
    const position = this.position(i),
      // center = (Math.floor(this.length / 2) * this.slideWidth) + ((this.length % 2) + 1) * this.slideWidth;
      // center = (this.slideWidth * this.length) / 2 - (this.slideWidth / 2);
      center = this.slideWidth * this.length - this.slideWidth;
    console.log(position);
    console.log(center);
    console.log(this.center);
    if (center === position.left) {
      return;
    } else if (center > position.left) {
      this.previousSlide((center - position.left) / this.slideWidth)
    } else if (center < position.left) {
      this.nextSlide((center - position.left) / -this.slideWidth);
    }
  }

  ngOnDestroy() {
    this.stop();
  }

  offset(elem) {
    if (!elem) {
      return;
    }
    let rect, win;
    if (!elem.getClientRects().length) {
      return { top: 0, left: 0 };
    }
    rect = elem.getBoundingClientRect();
    win = elem.ownerDocument.defaultView;
    return {
      top : rect.top + win.pageYOffset,
      left: rect.left + win.pageXOffset
    };
  };

  position(elem) {
    if (!elem) {
      return;
    }
    let offsetParent, offset, doc,
      parentOffset = { top: 0, left: 0 };
    if (elem.style.position === "fixed") {
      offset = elem.getBoundingClientRect();
    } else {
      offset = this.offset(elem);
      doc = elem.ownerDocument;
      offsetParent = elem.offsetParent || doc.documentElement;
      while (offsetParent &&
      ( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
      offsetParent.style.position === "static") {
        offsetParent = offsetParent.parentNode;
      }
      if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
        parentOffset = this.offset(offsetParent);
        parentOffset.top += offsetParent.style.borderTopWidth;
        parentOffset.left += offsetParent.style.borderLeftWidth;
      }
    }
    const style = elem.currentStyle || window.getComputedStyle(elem);
    return {
      top : offset.top - parentOffset.top - parseFloat(style.marginTop),
      left: offset.left - parentOffset.left - parseFloat(style.marginLeft)
    };
  }

  onDragStart(event) {
    console.log('start', event);
  }

  onDragEnd(event) {
    console.log('drag', event);

  }

  onDrag(event) {
    console.log('end', event);
  }
}
