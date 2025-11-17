import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="post-container">
      <div class="breadcrumb">
        Usuario {{ userId }} → Post {{ postId }}
      </div>

      @if (post) {
        <article>
          <h1>{{ post.title }}</h1>
          <div class="meta">
            Por: <strong>{{ post.author }}</strong> |
            {{ post.date | date:'short' }}
          </div>
          <p>{{ post.content }}</p>
        </article>
      }
    </div>
  `,
  styles: [`
    .post-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .breadcrumb {
      padding: 0.5rem 1rem;
      background: #e9ecef;
      border-radius: 4px;
      margin-bottom: 2rem;
      font-size: 0.9rem;
    }

    article {
      line-height: 1.8;
    }

    .meta {
      color: #6c757d;
      margin: 1rem 0 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #dee2e6;
    }
  `]
})
export class PostDetailComponent implements OnInit {
  @Input() userId?: string;
  @Input() postId?: string;

  post: any = null;

  ngOnInit() {
    console.log('User ID:', this.userId, 'Post ID:', this.postId);
    this.loadPost();
  }

  loadPost() {
    this.post = {
      title: 'Introducción a Angular 18',
      author: 'Usuario ' + this.userId,
      date: new Date(),
      content: 'Contenido completo del post sobre Angular 18...'
    };
  }
}
