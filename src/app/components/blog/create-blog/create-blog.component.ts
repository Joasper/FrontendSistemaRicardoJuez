import { Component } from '@angular/core';
import { BlogForm } from '../form/blog.form';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../notificacion/notificacion.service';
import { BlogServide } from '../blog.service';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { AngularEditorModule } from '@kolkov/angular-editor';


@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent, AngularEditorModule],
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
    if(this.url === null || this.url === undefined || this.url === '') {
      this.notificationSv.showErrorMessage("Debe seleccionar una imagen")
      return;
    }
    if(this.blog.title === null || this.blog.title === undefined || this.blog.title === '') {
      this.notificationSv.showErrorMessage("Debe ingresar un titulo")
      return;
    }
    // if(this.blog.content === null || this.blog.content === undefined || this.blog.content === '') {
    //   this.notificationSv.showErrorMessage("Debe ingresar un contenido")
    //   return;
    // }
    if(this.blog.dowloadLink === null || this.blog.dowloadLink === undefined || this.blog.dowloadLink === '') {
      this.notificationSv.showErrorMessage("Debe ingresar un link de descarga")
      return;
    }

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
          this.router.navigate(['/home/blog'])
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
