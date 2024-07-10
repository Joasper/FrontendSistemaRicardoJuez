import { Component, OnInit } from '@angular/core';
import { IBlogs } from '../../../interfaces/IBlog';
import { NotificationService } from '../../../notificacion/notificacion.service';
import { BlogServide } from '../blog.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leer-blog',
  standalone: true,
  imports: [LoadingComponent, CommonModule],
  templateUrl: './leer-blog.component.html',
  styleUrl: './leer-blog.component.css'
})
export class LeerBlogComponent implements OnInit{

  blog: IBlogs = {} as IBlogs;
  isLogged: boolean = false;
  isLoading: boolean = false;

  constructor(private notificationSv: NotificationService, 
              private blogService: BlogServide,
              private params: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const token = localStorage.getItem('token')
    if(token){
      this.isLogged = true
    }
    
    this.isLoading = true;
    this.params.paramMap.subscribe({
      next: (params) => {
        this.blogService.getById(params.get('id')!).subscribe({
          next: (response) => {
            if(response.success){
              this.isLoading = false
              this.blog = response.data
            }else if(response.success === false){
              this.isLoading = false
              this.notificationSv.showErrorMessage(response.message)
            }
          },
          error: (error) => {
            console.error(error)
            this.isLoading = false
            this.notificationSv.showErrorMessage("Error al obtener el blog")
          }
        })
      }
    })
  }

}
