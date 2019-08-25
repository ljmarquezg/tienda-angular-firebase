// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Forms
import { ReactiveFormsModule } from '@angular/forms';
// Angular Material
import { LayoutModule } from '@angular/cdk/layout';
// Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Angular Buttons & Indicators
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// Angular Layout
import {MatCardModule} from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';

// Angular Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
// Angular Firebase Config file
import { enviroment } from './enviroment/enviroment';
// App components
import { AppComponent } from './app.component';
import { TiendaComponent } from './componentes/tienda/tienda.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { LoginComponent } from './componentes/login/login.component';
import { CheckoutComponent } from './componentes/checkout/checkout.component';
import { NavigationComponent } from './componentes/navigation/navigation.component';
import { AuthService } from './services/auth/auth.service';
import { SpinnerComponent } from './componentes/common/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    TiendaComponent,
    ProductoComponent,
    CarritoComponent,
    LoginComponent,
    CheckoutComponent,
    NavigationComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(enviroment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
