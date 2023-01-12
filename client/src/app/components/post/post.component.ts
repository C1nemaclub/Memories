import { Component, Input, Directive, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post: any = [];
  @Input() user: any = '';

  constructor(
    private sanitizer: DomSanitizer,
    { nativeElement }: ElementRef<HTMLImageElement>
  ) {
    const supports = 'loading' in HTMLImageElement.prototype;

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    }
  }
  ngOnInit() {}

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    const saneImg = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    return saneImg;
  }
}
