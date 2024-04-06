import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service'
import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {


  constructor(private authguardService: AuthGuardService, private renderer: Renderer2, private el: ElementRef) { 
   
  }

  ngOnInit(): void {
    // this.authguardService.logout()
    console.log("inside home"+this.authguardService.getuserrole())
   
  }

 
  testimonials = [
    {
      profilePicture:"https://cdn.theorg.com/b4f5bf2b-459b-4a0c-9d79-b897e0283785_thumb.jpg",
      Name:"Shivakumar Ganesan",
      Designation:"CEO of Exotel",
      review:"Conversion Crew is an exceptional digital agency that combines expertise, transparency, and creativity. Their results-driven approach and collaborative partnership make them stand out. Highly recommended Feel free to use this as a starting point and adjust it according to your preference."
    },{
      profilePicture:"https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      Name:"Alex",
      Designation:"CEO of What's Ashore",
      review:"As the CEO of Whatsashore, I am impressed by the exceptional digital marketing services provided by ConversionCrew. Their strategic approach and expertise have significantly amplified our brand's online presence. From SEO optimization to engaging content creation, ConversionCrew's team demonstrates unparalleled dedication and professionalism."
    },
    {
      profilePicture:"https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      Name:"Jane Thomas",
      Designation:"Manager of Izzy’s on the Peninsula",
      review:" I am delighted to commend ConversionCrew for their outstanding digital marketing services. Their expertise has been instrumental in elevating our brand's online visibility and engagement. From targeted SEO strategies to compelling content creation, ConversionCrew's approach is both comprehensive and results-oriented."
    },
   
  ];

  currentIndex=0;   
  showNext() {
    if (this.currentIndex < this.testimonials.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  showPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.testimonials.length - 1;
    }
  }

}
