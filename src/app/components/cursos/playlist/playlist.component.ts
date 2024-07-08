import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { AdminMenus } from './menus';
import { ICurso, Lesson } from '../../../interfaces/ICurso';
import { CursosService } from '../cursos.service';
import { SafePipe } from '../../../pipes/safe.pipe';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { generarCertificado } from './helpers/generarCertificado';
import { ITokenDecode } from '../../../interfaces/ITokenDecode';
import { AuthService } from '../../authenticacion/auth.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, SafePipe],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {

  menuForm!: FormGroup

  isDarkMode: boolean = false;
  isUserMenuOpen: boolean = false;

  ItemsMenu: any = [];
  currentUrl: string = '';
  isAvailableCertificate: boolean = false;

  curso: ICurso = {} as ICurso;
  leccionActual: Lesson = {} as Lesson;
  userLoged: ITokenDecode = {} as ITokenDecode;


  constructor(

    private router: Router,
    private fb: FormBuilder,
    private param: ActivatedRoute,
    private cursoService: CursosService,
    private authService: AuthService

  ) {
    this.menuForm = this.fb.group({
      menus: this.fb.array([])
    })
  
    console.log(this.menus.controls);


  }

  ngOnInit(): void {
    this.param.paramMap.subscribe({
      next: (params: ParamMap) => {
        this.cursoService.getById(params.get('id')!).subscribe({
          next: (response) => {
            if (response.success) {
              this.curso = response.data;
              this.initializeMenus();
              this.leccionActual = this.curso.lessons![0];
              console.log(this.curso);
            }


          },
          error: (error) => {

            console.log(error)
          }
        });
      }
    });

    this.userLoged = this.authService.getUser();

  }
  isActiveMenu: string = '';

  isSidebarOpen: boolean = true;
  isOpenDropdown: any = {};
  isOpenDropdown2: any = false;
  menusOpens: any = [];

  toggleDropdown(index: any) {
    console.log({
      index,
      isOpenDropdown: this.isOpenDropdown,
      isOpenDropdown2: this.isOpenDropdown2

    })



    this.isOpenDropdown[index] = !this.isOpenDropdown[index];
    this.menusOpens.push({
      index,
      isOpenDropdown: this.isOpenDropdown,
      isOpenDropdown2: this.isOpenDropdown2
    });
    console.log(this.menusOpens);

  }

  get menus(): FormArray {
    return this.menuForm.get("menus") as FormArray
  }

  initializeMenus(): void {


    this.curso.lessons?.forEach(menu => {
      console.log(menu);
      this.addMenus(menu);
    });
  }
  // AdminMenus.forEach(menu => {
  //   this.addMenus(menu.name, menu.children);
  // })


  addMenus(menu: any, submenus?: any[]): void {
    const subMenuFormArray = this.fb.array(submenus ? submenus.map(menu => this.fb.group(menu)) : []);
    const menuFormGroup = this.fb.group({
      name: menu.name,
      icon: menu.icon,
      id: menu.id,
      path: menu.path,
      children: subMenuFormArray,
      open: false
    });

    this.menus.push(menuFormGroup);
  }

  toggleMenus(index: number) {
    this.menus.controls.forEach((menu, i) => {
      console.log(menu);
      if (i === index) {
        menu.get("open")!.setValue(!menu.get("open")!.value)
      } else {
        menu.get("open")!.setValue(false)
      }
    })
  }

  tomarExamen() {
    this.router.navigate(['/cursos/quizz/' + this.leccionActual.quizLesson?.id])
  }

  changeCursoActual(leccion: Lesson) {
    console.log(leccion);
    const findLesson = this.curso.lessons?.find(lesson => lesson.id === leccion.id);
    this.leccionActual = findLesson!;
    const verifyIsLastLesson = this.curso.lessons?.findIndex(lesson => lesson.id === leccion.id) === this.curso.lessons?.length!- 1;
    if (verifyIsLastLesson) {
      this.isAvailableCertificate = true;
      console.log("isAvailableCertificate", this.isAvailableCertificate)
    } else {
      this.isAvailableCertificate = false;
    } 
  }

  generarCertificado() {
    const fechaActual = new Date();
    const data = generarCertificado(this.curso.name, this.userLoged.name, fechaActual.toLocaleDateString());
    pdfMake.createPdf(data).open()

  }

   prevLesson() {
    const currentIndex = this.curso.lessons?.findIndex(lesson => lesson.id === this.leccionActual.id);
    if (currentIndex! > 0) {
      this.leccionActual = this.curso.lessons![currentIndex! - 1];
    }
  }
  esUltimaLeccion(): boolean {
   
    return this.leccionActual === this.curso.lessons![this.curso.lessons!.length - 1];
  }
  nextLesson() {
    const verifyIsLastLesson = this.curso.lessons?.findIndex(lesson => lesson.id === this.leccionActual.id) === this.curso.lessons?.length!- 1;
    if(verifyIsLastLesson){
      this.isAvailableCertificate = true;
    }else if(!verifyIsLastLesson){
      this.isAvailableCertificate = false;
    }
    const currentIndex = this.curso.lessons?.findIndex(lesson => lesson.id === this.leccionActual.id);
    if (currentIndex! < this.curso.lessons!.length! - 1) {
      this.leccionActual = this.curso.lessons![currentIndex! + 1];
    }
  }
}
