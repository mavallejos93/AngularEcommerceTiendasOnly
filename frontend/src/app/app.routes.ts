import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StoreComponent } from './components/store/store.component' ;
import { AboutUsComponent } from './components/about-us/about-us.component' ;
import { ContactComponent } from './components/contact/contact.component' ;
import { MyAccountComponent } from './components/my-account/my-account.component' ;
import { CartComponent } from './components/cart/cart.component' ;
import { CardProductComponent } from './components/card-product/card-product.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { LoginComponent } from './components/my-account/login/login.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { RegisterComponent } from './components/my-account/register/register.component';
import { ProfileComponent } from "./components/profile/profile.component";
import { AuthGuard } from './auth.guard';



const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'store', component: StoreComponent},
    { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]},
    { path: 'aboutUs', component: AboutUsComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'myAccount', component: MyAccountComponent, canActivate: [AuthGuard]},
    { path: 'cart', component: CartComponent},
    { path: 'product', component: ListProductComponent, canActivate: [AuthGuard]},
    { path: 'product/createproduct', component: CreateProductComponent, canActivate: [AuthGuard]},
    { path: 'product/editproduct/:id', component: EditProductComponent, canActivate: [AuthGuard]},
    { path: 'user/listuser', component: ListUserComponent, canActivate: [AuthGuard]},
    { path: 'user/edituser/:id', component: EditUserComponent, canActivate: [AuthGuard]},
    { path: 'detailproduct/:id', component: DetailProductComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent},

    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });
