import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  standalone: false,
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent implements OnInit {

  constructor(private _category:CategoryService) { }

  categories : any[] = [

  ];

  ngOnInit(): void {
    this._category.getCategories().subscribe((data:any)=>{
      console.log(data);
      this.categories = data;
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error !!', 'Error in loading data', 'error');
    })
  }

}
