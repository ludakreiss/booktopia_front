import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-read-more',
  template: `
    <div [class.collapsed]="isCollapsed">
      {{ displayText }}
    </div>
    <div *ngIf="showReadMore" (click)="toggleCollapse()" class="read">{{ isCollapsed ? 'READ MORE' : 'READ LESS' }}</div>
    <div *ngIf="!showReadMore" style="padding-bottom: 20px;"></div>
  `,
  styleUrls: ['./read-more.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class ReadMoreComponent implements OnChanges {
  @Input() text: string = '';
  showReadMore: boolean = false;
  isCollapsed: boolean = true;
  displayText: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text']) {
      this.showReadMore = this.text.length > 1000;
      this.updateDisplayText();
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.updateDisplayText();
  }

  private updateDisplayText() {
    if (this.isCollapsed) {
      this.displayText = this.text.slice(0, 1000);
    } else {
      this.displayText = this.text;
    }
  }
}
