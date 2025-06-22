import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-quiz',
  standalone: false,
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit {

  categories = [
    {cid: 0, title: 'Category 1'},
    {cid: 1, title: 'Category 2'},
    {cid: 2, title: 'Category 3'},
    {cid: 3, title: 'Category 4'},
    {cid: 4, title: 'Category 5'},
  ];

  constructor() { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

}
