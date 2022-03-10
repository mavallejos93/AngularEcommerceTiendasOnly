import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../models/user';

import { UserService } from '../../services/user.service';
import { global } from '../../services/GLOBAL';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: any;
  public id: any;
  public url: any;
  public mensajeExito: any;
  public mensajeError: any;
  public pass = "";
  public identity:any;

  constructor(private route: ActivatedRoute, private userService: UserService ) {
    this.url = global.url;
    this.identity = this.userService.getIdentity();
  }

  ngOnInit(): void {

    let id = this.identity._id;
      this.userService.getUserID(id).subscribe(
        (response) => {
          this.user = response.user; 
        },
        (error) => {
          console.log(error);
        }
      );
    };
  

}
