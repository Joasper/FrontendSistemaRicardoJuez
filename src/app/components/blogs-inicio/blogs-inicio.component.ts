import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BlogComponent } from '../blog/blog.component';
import { IBlogs } from '../../interfaces/IBlog';
import { NotificationService } from '../../notificacion/notificacion.service';
import { BlogServide } from '../blog/blog.service';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-blogs-inicio',
  standalone: true,
  imports: [CommonModule, BlogComponent, LoadingComponent],
  templateUrl: './blogs-inicio.component.html',
  styleUrl: './blogs-inicio.component.css'
})
export class BlogsInicioComponent {

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
    this.router.navigate([`/public/blogs/leer/${id} ` ]);
  }
}
