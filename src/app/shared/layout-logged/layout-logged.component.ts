import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../components/authenticacion/auth.service';
import { ITokenDecode } from '../../interfaces/ITokenDecode';
import { adminMenus } from './helpers/adminMenus';
import { usersMenus } from './helpers/usersMenus';


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


  inizialiceMenus() {
    console.log(this.user.role)
   switch (this.user.role) {
      case 'Admin':
        this.menus = adminMenus
        return
        break;
      case 'User':
        console.log("Hola")
        this.menus = usersMenus
        break;
      
      default:
        break;
    }
  }
  ngOnInit(): void {
    this.user = this.authService.getUser()
    this.inizialiceMenus()
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
