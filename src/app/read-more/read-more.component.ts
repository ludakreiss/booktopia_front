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
  @Input() maxLength: number = 1000; // Default to 1000 characters if not specified
  showReadMore: boolean = false;
  isCollapsed: boolean = true;
  displayText: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text'] || changes['maxLength']) {
      this.showReadMore = this.text.length > this.maxLength;
      this.updateDisplayText();
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.updateDisplayText();
  }

  private updateDisplayText() {
    if (this.isCollapsed) {
      this.displayText = this.text.slice(0, this.maxLength);
    } else {
      this.displayText = this.text;
    }
  }
}
