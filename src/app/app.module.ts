import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogboxComponent } from './Dialog-box/dialogbox/dialogbox.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpInterceptorService } from './cors/intercepter/http.interceptor';
import { RegisterLoginModule } from './register-login/register-login.module';

@NgModule({
  declarations: [
    AppComponent,
    DialogboxComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgbTooltipModule,
    RegisterLoginModule,

  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true // This is important!
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
