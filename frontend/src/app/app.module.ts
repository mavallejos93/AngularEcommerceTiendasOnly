import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
//routes
import { APP_ROUTING } from "./app.routes";

import { AppComponent } from './app.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { PayGateComponent } from './components/pay-gate/pay-gate.component';
import { StoreComponent } from './components/store/store.component';
import { UserClientComponent } from './components/user-client/user-client.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { LoginComponent } from './components/my-account/login/login.component';
import { RegisterComponent } from './components/my-account/register/register.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    AdminDashboardComponent,
    CartComponent,
    ContactComponent,
    HomeComponent,
    MyAccountComponent,
    PayGateComponent,
    StoreComponent,
    UserClientComponent,
    HeaderComponent,
    FooterComponent,
    CardProductComponent,
    SidebarComponent,
    ListProductComponent,
    CreateProductComponent,
    EditProductComponent,
    LoginComponent,
    RegisterComponent,
    ListUserComponent,
    EditUserComponent,
    DetailProductComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    APP_ROUTING
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
