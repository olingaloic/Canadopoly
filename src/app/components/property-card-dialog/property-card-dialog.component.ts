import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { City } from 'src/app/model/city';
import { Property } from 'src/app/model/square';

export interface PropertyCardDialogData {
  property: Property;
}
@Component({
  selector: 'app-property-card-dialog',
  templateUrl: './property-card-dialog.component.html',
  styleUrls: ['./property-card-dialog.component.css']
})
export class PropertyCardDialogComponent implements OnInit {
  property: Property;
  city: City;
  constructor(@Inject(MAT_DIALOG_DATA) public data: PropertyCardDialogData, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.property = this.data.property;
    if(this.property.isCity()) this.city = this.property as City;
  }
}
