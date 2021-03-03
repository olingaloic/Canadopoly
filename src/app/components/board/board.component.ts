import { AfterViewInit, ViewChild, Renderer2, NgModule, Input} from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/model/city';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})


export class BoardComponent implements OnInit, AfterViewInit {
  
  squares: Array<ElementRef>;
  
  @ViewChild('pawn') 
  pawn: ElementRef;

  @ViewChild('square0')
  square0: ElementRef;

  @ViewChild('square1')
  square1: ElementRef;

  @ViewChild('square2')
  square2: ElementRef;

  @ViewChild('square3')
  square3: ElementRef;

  @ViewChild('square4')
  square4: ElementRef;

  @ViewChild('square5')
  square5: ElementRef;

  @ViewChild('square6')
  square6: ElementRef;

  @ViewChild('square7')
  square7: ElementRef;

  @ViewChild('square8')
  square8: ElementRef;

  @ViewChild('square9')
  square9: ElementRef;

  @ViewChild('square10')
  square10: ElementRef;

  @ViewChild('square11')
  square11: ElementRef;

  @ViewChild('square12')
  square12: ElementRef;

  @ViewChild('square13')
  square13: ElementRef;

  @ViewChild('square14')
  square14: ElementRef;

  @ViewChild('square15')
  square15: ElementRef;

  @ViewChild('square16')
  square16: ElementRef;

  @ViewChild('square17')
  square17: ElementRef;

  @ViewChild('square18')
  square18: ElementRef;

  @ViewChild('square19')
  square19: ElementRef;

  @ViewChild('square20')
  square20: ElementRef;

  @ViewChild('square21')
  square21: ElementRef;

  @ViewChild('square22')
  square22: ElementRef;

  @ViewChild('square23')
  square23: ElementRef;

  @ViewChild('square24')
  square24: ElementRef;

  @ViewChild('square25')
  square25: ElementRef;

  @ViewChild('square26')
  square26: ElementRef;

  @ViewChild('square27')
  square27: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    console.log(this.square1)
    this.squares = [this.square0, this.square1, this.square2, this.square3, this.square4, this.square5,
    this.square6, this.square7, this.square8, this.square9, this.square10, this.square11, this.square12, this.square13,
    this.square14, this.square15, this.square16, this.square17, this.square18, this.square19, this.square20,
    this.square21, this.square22, this.square23, this.square24, this.square25, this.square26, this.square27];


  }
 
  renderMovePawn(position){
    var pawn = this.pawn.nativeElement;
    //pawn.remove();
    if (position == 0)
      this.renderer.appendChild(this.squares[0].nativeElement, pawn);
    if (position >= 1 && position <= 8 || position >= 14 && position <= 21)
      this.renderer.insertBefore(this.squares[position].nativeElement, pawn, this.squares[position].nativeElement.children[1]);
    if(position >= 9 && position <= 13)
      this.renderer.insertBefore(this.squares[position].nativeElement, pawn, this.squares[position].nativeElement.children[0]);
    if(position >= 22 && position <= 27)
      this.renderer.insertBefore(this.squares[position].nativeElement, pawn, this.squares[position].nativeElement.children[2]);
      //this.renderer.appendChild(this.squares[position].nativeElement, pawn);



    
  }

  renderBuyProperty(propertyId){
    var square = this.squares[propertyId].nativeElement;
    square.style.backgroundColor = '#ff6666';
  }

  renderBuyHouse(city: City) {
    //throw new Error('Method not implemented.');
  }
}


