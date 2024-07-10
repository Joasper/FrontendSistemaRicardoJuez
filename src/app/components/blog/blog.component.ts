import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IBlogs } from '../../interfaces/IBlog';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { NotificationService } from '../../notificacion/notificacion.service';
import { BlogServide } from './blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {

  isLoading: boolean = false;
  blog: IBlogs[] = [];

  constructor(
    private notificationSv: NotificationService,
    private blogService: BlogServide,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.blogService.getAll().subscribe({
      next: (blogs) => {
        if (blogs.success) {
          this.blog = blogs.data.map((blog) => {
            return {
              ...blog,
              content: blog.content.substring(0, 100) + '...'
              };
          });
          this.isLoading = false;
        } else if (blogs.success === false) {
          console.error('Error al obtener los blogs', blogs.message);
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error al obtener los blogs', error);
        this.isLoading = false;
      }
    });
  }

  leerBlog(id: string) {
    this.router.navigate([`/blog/leer/${id} ` ]);
  }
}
