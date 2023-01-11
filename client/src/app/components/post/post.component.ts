import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { convertToParamMap } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post: any = [];
  @Input() user: any = '';

  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit() {}

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    const saneImg = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    return saneImg;
  }
}
