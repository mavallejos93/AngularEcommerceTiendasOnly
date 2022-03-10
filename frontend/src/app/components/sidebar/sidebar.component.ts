import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public identity:any;
  public token:any;


  constructor(private userService: UserService, private router: Router,) {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
   }

  ngOnInit(): void {}
  
  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    this.identity = null;
    this.token = null;

    this.router.navigate(['']);
  }
}
