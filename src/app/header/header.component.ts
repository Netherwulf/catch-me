import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  opened: boolean;
  @Output() public sidenavToggle = new EventEmitter();

  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit() {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  onSelectSignIn() {
    this.router.navigate(['/login']);
  }

  onSelectSignUp() {
    this.router.navigate(['/register']);
  }

  onLogOut() {
    this.authService.doLogout();
    this.router.navigate(['']);
  }

  onSelectMyAccount() {
    this.router.navigate(['/user']);
  }

  onSelectIndexPage() {
    this.router.navigate(['']);
  }

}
