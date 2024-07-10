import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../components/authenticacion/auth.service';
import { ITokenDecode } from '../../interfaces/ITokenDecode';
import { usersMenus } from './helpers/usersMenus';
import { adminMenus } from './helpers/adminMenus';



@Component({
  selector: 'app-layout-logged',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './layout-logged.component.html',
  styleUrl: './layout-logged.component.css'
})
export class LayoutLoggedComponent implements OnInit{

  isDropdownOpen = false;
  user: ITokenDecode = {} as ITokenDecode;
  menus: {
    name: string;
    path: string;
    icon: string;
}[] = []

  constructor(private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser()
    this.inizialiceMenus()
  }

  inizialiceMenus() {
    console.log(this.user.role)
   switch (this.user.role) {
      case 'Admin':
        this.menus = adminMenus
        console.log("SOy admin")
        break;
      case 'User':
        console.log("Hola")
        this.menus = usersMenus
        break;
      
      default:
        break;
    }
    console.log(this.menus)
  }


  toggleDropdown() {
    console.log('toggleDropdown')
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.authService.logout()
    this.router.navigate(["/public/authenticacion/login"])
  }

}
