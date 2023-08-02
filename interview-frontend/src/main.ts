import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppComponent } from './app/app_component/app.component';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
