import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LoaderComponent {

  constructor(public loader: LoaderService) { }

}
