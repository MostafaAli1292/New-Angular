import { Component } from '@angular/core';
 import { COMPONENT_KEYWORDS } from '../COMPONENT_KEYWORDS';
import { HomeServiceService } from '../services/home-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  titleKey:any
  descriptionKey:any
  constructor(
    private home: HomeServiceService
  ) {}

  ngOnInit(): void {
    debugger

    this.titleKey='Salamtak Gate'
     this.descriptionKey='Salamtak Group is your gate to medical information, free meidcal advice, and online medical care.'
      

    const keywords = COMPONENT_KEYWORDS.SalamtakGate.join(', '); 
    this.home.updateDynamicMetaTags(this.titleKey, this.descriptionKey, keywords);
    }
 }
