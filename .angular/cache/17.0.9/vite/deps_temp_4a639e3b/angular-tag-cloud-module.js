import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵStandaloneFeature,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵlistener,
  ɵɵresolveWindow
} from "./chunk-PQVVWZCZ.js";

// node_modules/angular-tag-cloud-module/fesm2022/angular-tag-cloud-module.mjs
var DEFAULT_HEIGHT = 400;
var DEFAULT_WIDTH = 1;
var DEFAULT_STEP = 1;
var _TagCloudComponent = class _TagCloudComponent {
  get calculatedWidth() {
    let width = this.config.width || this.width || DEFAULT_WIDTH;
    if (this.el.nativeElement.parentNode.offsetWidth > 0 && width <= 1 && width > 0) {
      width = this.el.nativeElement.parentNode.offsetWidth * width;
    }
    return width;
  }
  get calculatedHeight() {
    let height = this.config.height || this.height || DEFAULT_HEIGHT;
    if (this.el.nativeElement.parentNode.offsetHeight > 0 && height <= 1 && height > 0) {
      height = this.el.nativeElement.parentNode.offsetHeight * height;
    }
    return height;
  }
  constructor(el, r2) {
    this.el = el;
    this.r2 = r2;
    this.data = [];
    this.config = {};
    this.clicked = new EventEmitter();
    this.dataChanges = new EventEmitter();
    this.afterInit = new EventEmitter();
    this.afterChecked = new EventEmitter();
    this.cloudDataHtmlElements = [];
    this.dataArr = [];
  }
  onResize(event) {
    this.logMessage("debug", "rezisze triggered");
    window.clearTimeout(this.timeoutId);
    this.timeoutId = window.setTimeout(() => {
      if (this.options.realignOnResize) {
        this.reDraw();
      }
    }, 200);
  }
  ngOnChanges(changes) {
    this.logMessage("debug", "ngOnChanges fired", changes);
    this.config = __spreadValues({
      width: 500,
      height: 300,
      overflow: true,
      strict: false,
      zoomOnHover: {
        transitionTime: 0,
        scale: 1,
        delay: 0
      },
      realignOnResize: false,
      randomizeAngle: false,
      step: 2,
      log: false
    }, this.config);
    if (this.width) {
      this.config.width = this.width;
    }
    if (this.height) {
      this.config.height = this.height;
    }
    if (typeof this.overflow === "boolean") {
      this.config.overflow = this.overflow;
    }
    if (typeof this.strict === "boolean") {
      this.config.strict = this.strict;
    }
    if (typeof this.realignOnResize === "boolean") {
      this.config.realignOnResize = this.realignOnResize;
    }
    if (typeof this.randomizeAngle === "boolean") {
      this.config.randomizeAngle = this.randomizeAngle;
    }
    if (typeof this.background === "string") {
      this.config.background = this.background;
    }
    if (typeof this.font === "string") {
      this.config.font = this.font;
    }
    if (this.zoomOnHover) {
      this.config.zoomOnHover = this.zoomOnHover;
    }
    if (this.step) {
      this.config.step = this.step;
    }
    if (this.log) {
      this.config.log = this.log;
    }
    if (this.delay) {
      this.config.delay = this.delay;
    }
    this.logMessage("warn", "cloud configuration", this.config);
    if (this.config.font) {
      this.r2.setStyle(this.el.nativeElement, "font", this.config.font);
    }
    if (this.config.background) {
      this.r2.setStyle(this.el.nativeElement, "background", this.config.background);
    }
    this.reDraw(changes);
  }
  ngAfterContentInit() {
    this.afterInit?.emit();
    this.logMessage("debug", "afterInit emitted");
  }
  ngAfterContentChecked() {
    this.afterChecked?.emit();
    this.logMessage("debug", "afterChecked emitted");
  }
  /**
   * re-draw the word cloud
   * @param changes the change set
   */
  reDraw(changes) {
    this.dataChanges?.emit(changes);
    this.afterChecked?.emit();
    this.logMessage("debug", "dataChanges emitted");
    this.cloudDataHtmlElements = [];
    if (!this.data) {
      console.error("angular-tag-cloud: No data passed. Please pass an Array of CloudData");
      return;
    }
    this.el.nativeElement.innerHTML = "";
    if (changes && changes.data) {
      this.dataArr = changes.data.currentValue;
    }
    this.options = __spreadProps(__spreadValues({}, this.config), {
      aspectRatio: this.calculatedWidth / this.calculatedHeight,
      width: this.calculatedWidth,
      height: this.calculatedHeight,
      center: {
        x: this.calculatedWidth / 2,
        y: this.calculatedHeight / 2
      }
    });
    this.r2.setStyle(this.el.nativeElement, "width", this.options.width + "px");
    this.r2.setStyle(this.el.nativeElement, "height", this.options.height + "px");
    this.drawWordCloud();
    this.logMessage("debug", "reDraw finished");
  }
  /**
   * helper to generate a descriptive string for an entry to use when sorting alphabetically
   * @param entry the cloud entry to be used
   */
  descriptiveEntry(entry) {
    let description = entry.text;
    description += entry.color ? `-${entry.color}` : "";
    description += entry.external ? `-${entry.external}` : "";
    description += entry.link ? `-${entry.link}` : "";
    description += entry.rotate ? `-${entry.rotate}` : "";
    return description;
  }
  /**
   * proceed draw the cloud
   */
  drawWordCloud() {
    this.dataArr.sort((a, b) => this.descriptiveEntry(a).localeCompare(this.descriptiveEntry(b)));
    this.dataArr.sort((a, b) => b.weight - a.weight);
    const elementsWithFixedPositions = this.dataArr.filter((item) => item.position);
    const elementsWithRandomPositions = this.dataArr.filter((item) => !item.position);
    elementsWithFixedPositions.forEach((elem, index) => {
      this.drawWord(index, elem);
    });
    elementsWithRandomPositions.forEach((elem, index) => {
      this.drawWord(index, elem);
    });
  }
  /**
   * Helper function to test if an element overlaps others
   * @param testEl the HTML Element to be tested
   */
  hitTest(testEl) {
    for (const item of this.cloudDataHtmlElements) {
      if (this.overlapping(testEl, item)) {
        return true;
      }
    }
    return false;
  }
  /**
   * Pairwise overlap detection
   * @param e1 the first element for overlap detection
   * @param e2 the second element for overlap detection
   */
  overlapping(e1, e2) {
    const rect1 = e1.getBoundingClientRect();
    const rect2 = e2.getBoundingClientRect();
    const overlap = !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
    return overlap;
  }
  /**
   * Check if min(weight) > max(weight) otherwise use default
   * @param word the particular word configuration
   */
  getWeightForWord(word) {
    let weight = 5;
    if (this.dataArr[0].weight > this.dataArr[this.dataArr.length - 1].weight) {
      if (!this.options.strict) {
        weight = Math.round((word.weight - this.dataArr[this.dataArr.length - 1].weight) / (this.dataArr[0].weight - this.dataArr[this.dataArr.length - 1].weight) * 9) + 1;
      } else {
        if (word.weight > 10) {
          weight = 10;
          this.logMessage("warn", `[TagCloud strict] Weight property ${word.weight} > 10. Fallback to 10 as you are using strict mode`, word);
        } else if (word.weight < 1) {
          weight = 1;
          this.logMessage("warn", `[TagCloud strict] Given weight property ${word.weight} < 1. Fallback to 1 as you are using strict mode`, word);
        } else if (word.weight % 1 !== 0) {
          weight = Math.round(word.weight);
          this.logMessage("warn", `[TagCloud strict] Given weight property ${word.weight} is not an integer. Rounded value to ${weight}`, word);
        } else {
          weight = word.weight;
        }
      }
    }
    return weight;
  }
  /**
   * change the HTMLElements color style
   * @param el the HTML element
   * @param color the CSS color value
   */
  setWordColor(el, color) {
    this.r2.setStyle(el, "color", color);
  }
  /**
   * Add a tooltip to the element
   * @param el the HTML element
   * @param tooltip the tooltip text
   */
  setTooltip(el, tooltip) {
    this.r2.addClass(el, "tooltip");
    const tooltipSpan = this.r2.createElement("span");
    tooltipSpan.className = "tooltiptext";
    const text = this.r2.createText(tooltip);
    tooltipSpan.appendChild(text);
    el.appendChild(tooltipSpan);
  }
  /**
   * change the HTMLElements rotation style
   * @param el the HTML element
   * @param deg the rotation value (degrees)
   */
  setWordRotation(el, deg) {
    const transformString = deg ? `rotate(${deg}deg)` : "";
    this.r2.setStyle(el, "transform", transformString);
    return transformString;
  }
  /**
   * wrap the given node into an HTML anchor element
   * @param node the HTML node that should be wrapped
   * @param word the particular word configuration
   */
  wrapNodeIntoAnchorElement(node, word) {
    const wordLink = this.r2.createElement("a");
    wordLink.href = word.link || "";
    if (word.external !== void 0 && word.external) {
      wordLink.target = "_blank";
    }
    wordLink.appendChild(node);
    return wordLink;
  }
  /**
   * wrap the given node into an HTML anchor element
   * @param node the HTML node that should be wrapped
   * @param word the particular word configuration
   */
  applyZoomStyle(node, el, link, transformString) {
    if (this.options.zoomOnHover && this.options.zoomOnHover.scale !== 1) {
      if (!this.options.zoomOnHover.transitionTime) {
        this.options.zoomOnHover.transitionTime = 0;
      }
      if (!this.options.zoomOnHover.scale) {
        this.options.zoomOnHover.scale = 1;
      }
      el.onmouseover = () => {
        if (this.options.zoomOnHover?.transitionTime) {
          this.r2.setStyle(el, "transition", `transform ${this.options.zoomOnHover.transitionTime}s`);
        }
        if (this.options.zoomOnHover?.scale) {
          this.r2.setStyle(el, "transform", `scale(${this.options.zoomOnHover.scale}) ${transformString}`);
        }
        if (this.options.zoomOnHover?.delay) {
          this.r2.setStyle(el, "transition-delay", `${this.options.zoomOnHover.delay}s`);
        }
        if (this.options.zoomOnHover?.color) {
          link ? this.r2.setStyle(node, "color", this.options.zoomOnHover.color) : this.r2.setStyle(el, "color", this.options.zoomOnHover.color);
        }
      };
      el.onmouseout = () => {
        this.r2.setStyle(el, "transform", `none ${transformString}`);
        if (this.options.zoomOnHover?.color) {
          link ? this.r2.removeStyle(node, "color") : this.r2.removeStyle(el, "color");
        }
      };
    }
  }
  /**
   * Place the word at a calculated position
   * @param wordSpan The HTML Span element to be placed
   * @param word The word to be placed
   * @param index The index of the element
   */
  setPosition(wordSpan, word, index) {
    let angle = this.options.randomizeAngle ? 6.28 * Math.random() : 0;
    let radius = 0;
    const wordStyle = wordSpan.style;
    wordStyle.position = "absolute";
    const useFixedPosition = Boolean(word.position && word.position.left && word.position.top);
    const width = wordSpan.offsetWidth;
    const height = wordSpan.offsetHeight;
    let left = useFixedPosition && word.position?.left ? word.position.left : this.options.center.x - width / 2;
    let top = useFixedPosition && word.position?.top ? word.position.top : this.options.center.y - height / 2;
    wordStyle.left = left + "px";
    wordStyle.top = top + "px";
    if (this.options.delay) {
      wordSpan.classList.add("tag-animation-delay");
      wordStyle.setProperty("--tag-animation-delay", `${this.options.delay * index}ms`);
    }
    if (!useFixedPosition) {
      if (index === 0) {
        wordStyle.left = left + (Math.random() - 0.5) * 2 * (this.calculatedWidth / 5) + "px";
        wordStyle.top = top + (Math.random() - 0.5) * 2 * (this.calculatedHeight / 5) + "30px";
      } else {
        while (this.options.width && this.options.height && wordSpan.offsetHeight && wordSpan.offsetWidth && this.hitTest(wordSpan)) {
          radius += this.options.step || DEFAULT_STEP;
          angle += (index % 2 === 0 ? 1 : -1) * (this.options.step || DEFAULT_STEP);
          left = this.options.center.x - width / 2 + radius * Math.cos(angle) * this.options.aspectRatio;
          top = this.options.center.y + radius * Math.sin(angle) - height / 2;
          wordStyle.left = left + "px";
          wordStyle.top = top + "px";
        }
      }
    }
    if (!this.options.overflow && (left < 0 || top < 0 || left + width > this.calculatedWidth || top + height > this.calculatedHeight)) {
      this.logMessage("warn", "Word did not fit into the cloud and overflow is set to 'false'. The element will be removed", wordSpan);
      wordSpan.remove();
      return;
    }
  }
  /**
   * Methods to draw a word, by moving it in spiral until it finds a suitable empty place.
   * This will be iterated on each word.
   * @param index the index number for the word
   * @param word the particular word configuration
   */
  drawWord(index, word) {
    let wordSpan;
    const weight = this.getWeightForWord(word);
    wordSpan = this.r2.createElement("span");
    wordSpan.className = `w${weight}`;
    wordSpan.onclick = () => {
      this.clicked?.emit(word);
    };
    wordSpan.onmouseenter = () => {
      wordSpan.style.zIndex = "2";
    };
    wordSpan.onmouseleave = () => {
      wordSpan.style.zIndex = "1";
    };
    let node = this.r2.createText(word.text);
    if (word.color)
      this.setWordColor(wordSpan, word.color);
    const transformString = this.setWordRotation(wordSpan, word.rotate);
    if (word.link)
      node = this.wrapNodeIntoAnchorElement(node, word);
    if (this.options.zoomOnHover && this.options.zoomOnHover.scale !== 1) {
      this.applyZoomStyle(node, wordSpan, word.link, transformString);
    }
    wordSpan.appendChild(node);
    this.r2.appendChild(this.el.nativeElement, wordSpan);
    if (word.tooltip)
      this.setTooltip(wordSpan, word.tooltip);
    wordSpan.id = `angular-tag-cloud-item-${index}`;
    this.setPosition(wordSpan, word, index);
    this.logMessage("debug", "Adds new word <span>", wordSpan);
    this.cloudDataHtmlElements.push(wordSpan);
    this.logMessage("debug", "Placed words", this.cloudDataHtmlElements);
  }
  /**
   * Log messages to console
   * @param level the log level
   * @param args extra args to be logged
   */
  logMessage(level, ...args) {
    if (!this.config) {
      return;
    }
    if (this.config.log === "debug") {
      console.log(`[AngularTagCloudModule ${level}]`, ...args);
    } else if (this.config.log === "warn" && level === "warn") {
      console.warn(`[AngularTagCloudModule ${level}]`, ...args);
    }
  }
};
_TagCloudComponent.ɵfac = function TagCloudComponent_Factory(t) {
  return new (t || _TagCloudComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2));
};
_TagCloudComponent.ɵcmp = ɵɵdefineComponent({
  type: _TagCloudComponent,
  selectors: [["angular-tag-cloud"], ["ng-tag-cloud"], ["ngtc"]],
  hostBindings: function TagCloudComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("resize", function TagCloudComponent_resize_HostBindingHandler($event) {
        return ctx.onResize($event);
      }, false, ɵɵresolveWindow);
    }
  },
  inputs: {
    data: "data",
    width: "width",
    height: "height",
    step: "step",
    overflow: "overflow",
    strict: "strict",
    zoomOnHover: "zoomOnHover",
    realignOnResize: "realignOnResize",
    randomizeAngle: "randomizeAngle",
    background: "background",
    font: "font",
    delay: "delay",
    config: "config",
    log: "log"
  },
  outputs: {
    clicked: "clicked",
    dataChanges: "dataChanges",
    afterInit: "afterInit",
    afterChecked: "afterChecked"
  },
  standalone: true,
  features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  decls: 0,
  vars: 0,
  template: function TagCloudComponent_Template(rf, ctx) {
  },
  styles: ['[_nghost-%COMP%]{font-family:Helvetica,Arial,sans-serif;font-size:10px;line-height:normal;color:#09f;overflow:hidden;position:relative;display:block}.tag-animation-delay[_ngcontent-%COMP%]{--tag-animation-delay: .5s;animation:_ngcontent-%COMP%_fadeIn .5s;opacity:0;animation-fill-mode:forwards;animation-delay:var(--tag-animation-delay)}span[_ngcontent-%COMP%]{padding:0}span.w10[_ngcontent-%COMP%]{font-size:550%}span.w9[_ngcontent-%COMP%]{font-size:500%}span.w8[_ngcontent-%COMP%]{font-size:450%}span.w7[_ngcontent-%COMP%]{font-size:400%}span.w6[_ngcontent-%COMP%]{font-size:350%}span.w5[_ngcontent-%COMP%]{font-size:300%}span.w4[_ngcontent-%COMP%]{font-size:250%}span.w3[_ngcontent-%COMP%]{font-size:200%}span.w2[_ngcontent-%COMP%]{font-size:150%}span.w1[_ngcontent-%COMP%]{font-size:100%}a[_ngcontent-%COMP%]:hover{color:#0df}a[_ngcontent-%COMP%]:hover, span.w10[_ngcontent-%COMP%], span.w9[_ngcontent-%COMP%], span.w8[_ngcontent-%COMP%]{color:#0cf}span.w7[_ngcontent-%COMP%]{color:#39d}span.w6[_ngcontent-%COMP%]{color:#90c5f0}span.w5[_ngcontent-%COMP%]{color:#90a0dd}span.w4[_ngcontent-%COMP%]{color:#90c5f0}span.w3[_ngcontent-%COMP%]{color:#a0ddff}span.w2[_ngcontent-%COMP%]{color:#9ce}span.w1[_ngcontent-%COMP%]{color:#aab5f0}.tooltip[_ngcontent-%COMP%]   .tooltiptext[_ngcontent-%COMP%]{visibility:hidden;width:inherit;background-color:#555;color:#fff;text-align:center;border-radius:6px;padding:5px 10px;position:absolute;bottom:100%;left:0;opacity:0;transition:opacity .3s}.tooltip[_ngcontent-%COMP%]   .tooltiptext[_ngcontent-%COMP%]:after{content:"";position:absolute;top:100%;left:50%;margin-left:-5px;border-width:5px;border-style:solid;border-color:#555 transparent transparent transparent}.tooltip[_ngcontent-%COMP%]:hover   .tooltiptext[_ngcontent-%COMP%]{visibility:visible;opacity:1}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}']
});
var TagCloudComponent = _TagCloudComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TagCloudComponent, [{
    type: Component,
    args: [{
      selector: "angular-tag-cloud, ng-tag-cloud, ngtc",
      template: "",
      standalone: true,
      styles: [':host{font-family:Helvetica,Arial,sans-serif;font-size:10px;line-height:normal;color:#09f;overflow:hidden;position:relative;display:block}.tag-animation-delay{--tag-animation-delay: .5s;animation:fadeIn .5s;opacity:0;animation-fill-mode:forwards;animation-delay:var(--tag-animation-delay)}span{padding:0}span.w10{font-size:550%}span.w9{font-size:500%}span.w8{font-size:450%}span.w7{font-size:400%}span.w6{font-size:350%}span.w5{font-size:300%}span.w4{font-size:250%}span.w3{font-size:200%}span.w2{font-size:150%}span.w1{font-size:100%}a:hover{color:#0df}a:hover,span.w10,span.w9,span.w8{color:#0cf}span.w7{color:#39d}span.w6{color:#90c5f0}span.w5{color:#90a0dd}span.w4{color:#90c5f0}span.w3{color:#a0ddff}span.w2{color:#9ce}span.w1{color:#aab5f0}.tooltip .tooltiptext{visibility:hidden;width:inherit;background-color:#555;color:#fff;text-align:center;border-radius:6px;padding:5px 10px;position:absolute;bottom:100%;left:0;opacity:0;transition:opacity .3s}.tooltip .tooltiptext:after{content:"";position:absolute;top:100%;left:50%;margin-left:-5px;border-width:5px;border-style:solid;border-color:#555 transparent transparent transparent}.tooltip:hover .tooltiptext{visibility:visible;opacity:1}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}\n']
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }], {
    data: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    step: [{
      type: Input
    }],
    overflow: [{
      type: Input
    }],
    strict: [{
      type: Input
    }],
    zoomOnHover: [{
      type: Input
    }],
    realignOnResize: [{
      type: Input
    }],
    randomizeAngle: [{
      type: Input
    }],
    background: [{
      type: Input
    }],
    font: [{
      type: Input
    }],
    delay: [{
      type: Input
    }],
    config: [{
      type: Input
    }],
    log: [{
      type: Input
    }],
    clicked: [{
      type: Output
    }],
    dataChanges: [{
      type: Output
    }],
    afterInit: [{
      type: Output
    }],
    afterChecked: [{
      type: Output
    }],
    onResize: [{
      type: HostListener,
      args: ["window:resize", ["$event"]]
    }]
  });
})();
export {
  TagCloudComponent
};
//# sourceMappingURL=angular-tag-cloud-module.js.map
