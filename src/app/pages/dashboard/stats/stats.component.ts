import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  private _route = inject(ActivatedRoute);
  private _scroller = inject(ViewportScroller);

  ngOnInit(): void {
    this._route.fragment.subscribe(frag => {
      if (frag) {
        setTimeout(() => {
          this._scroller.scrollToAnchor(frag);
        }, 100);
      }
    });
  }
}
