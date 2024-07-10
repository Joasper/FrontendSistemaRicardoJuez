import { Component } from '@angular/core';
import { BlogForm } from '../form/blog.form';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../notificacion/notificacion.service';
import { BlogServide } from '../blog.service';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../../shared/loading/loading.component';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css'
})
export class CreateBlogComponent {

  isLoading: boolean = false;
  url: string = 'imagepreview.jpg';
  blog = new BlogForm()

  constructor(private notificationSv: NotificationService,
              private router: Router,
              private blogService: BlogServide
  ) { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.url = reader.result as string;
    }
    console.log(this.url);
  }

  crearBlog() {
    this.isLoading = true;
    this.blogService.create({
      content: this.blog.content!,
      image: this.url,
      title: this.blog.title!,
      dowloadLink: this.blog.dowloadLink!

    }).subscribe({
      next: (response) => {
        if(response.success){
          this.isLoading = false;
          this.notificationSv.showSuccessMessage("Blog creado correctamente")
          this.router.navigate(['/blog'])
        }else if(response.success === false){
          this.isLoading = false;
          this.notificationSv.showErrorMessage(response.message)
        }
      },
      error: (error) => {
        console.error(error)
        this.isLoading = false;
        this.notificationSv.showErrorMessage("Error al crear el blog")
      }
    })
  }

}
