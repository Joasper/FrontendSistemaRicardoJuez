import { CommonModule } from '@angular/common';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { IBlogs } from '../../interfaces/IBlog';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { NotificationService } from '../../notificacion/notificacion.service';
import { BlogServide } from './blog.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  safeHtml: SafeHtml = '';
  isLoading: boolean = false;
  blogs: IBlogs[] = [];

  constructor(
    private notificationSv: NotificationService,
    private blogService: BlogServide,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.blogService.getAll().subscribe({
      next: (blogs) => {
        if (blogs.success) {
          this.blogs = blogs.data.map((blog) => {
            return {
              ...blog,
              content: this.getTruncatedContent(this.setHtmlContent(blog.content)) as string
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
  setHtmlContent(html: string) {
    return this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
 
  }

  getTruncatedContent(safeHtml: SafeHtml): string {
    // Convierte el SafeHtml a string y luego aplica substring
    const htmlString = this.sanitizer.sanitize(SecurityContext.HTML, safeHtml);
    return htmlString ? htmlString.substring(0, 100) + '...' : '';
  }

  leerBlog(title: string) {
    console.log(title)
    this.router.navigate([`/home/blog/${title} `.replace(/ /g, '-')]);
  }
}
