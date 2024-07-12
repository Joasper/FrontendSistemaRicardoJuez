import { CommonModule } from '@angular/common';
import { Component, SecurityContext } from '@angular/core';
import { BlogComponent } from '../blog/blog.component';
import { IBlogs } from '../../interfaces/IBlog';
import { NotificationService } from '../../notificacion/notificacion.service';
import { BlogServide } from '../blog/blog.service';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blogs-inicio',
  standalone: true,
  imports: [CommonModule, BlogComponent, LoadingComponent],
  templateUrl: './blogs-inicio.component.html',
  styleUrl: './blogs-inicio.component.css'
})
export class BlogsInicioComponent {

  safeHtml: any;

  isLoading: boolean = false;
  blog: IBlogs[] = [];

  constructor(
    private notificationSv: NotificationService,
    private blogService: BlogServide,
    private router: Router,
    private sanitizer: DomSanitizer

  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.blogService.getAll().subscribe({
      next: (blogs) => {
        if (blogs.success) {
          this.blog = blogs.data.map((blog) => {
            return {
              ...blog,
              content: this.getTruncatedContent(this.setHtmlContent(blog.content)) as string
              };
          });
          console.log(this.blog)
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


  getTruncatedContent(safeHtml: SafeHtml): string {
    // Convierte el SafeHtml a string y luego aplica substring
    const htmlString = this.sanitizer.sanitize(SecurityContext.HTML, safeHtml);
    return htmlString ? htmlString.substring(0, 100) + '...' : '';
  }
  leerBlog(id: string) {
    this.router.navigate([`/blogs/${id} `.replace(/ /g, '-')]);
  }

  setHtmlContent(html: string) {
   return this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(html);

  }
}
