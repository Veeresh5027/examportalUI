import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar-user',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  categories : any;

  constructor(private _cat: CategoryService, private _snack:MatSnackBar) { }


/*************  ✨ Windsurf Command 🌟  *************/
  /**
   * Initializes the component by fetching the categories.
   */
  ngOnInit(): void {
    // Fetch all categories
    this._cat.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories:', error);
        this._snack.open('Error loading categories', '', {
          duration: 3000
        });
      }
    );
  }
/*******  4b4d2c5d-ee8a-4ddb-bd21-34f877c4b20f  *******/  



}
