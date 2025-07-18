import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  standalone: false,
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})
export class LoadQuizComponent implements OnInit {

  catId : any;
  quizzes : any;

  constructor(private _route:ActivatedRoute, private _quiz:QuizService) { }

  ngOnInit(): void {
    // this.catId = this._route.snapshot.params['catId'];

    this._route.params.subscribe((params) => {
      this.catId = params['catId'];
      console.log(this.catId);
       if(this.catId == 0){
      console.log('load all the quizzes of all categories for user');
      this._quiz.getActiveQuizzes().subscribe((data:any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      }, (error) => {
        console.log(error);
        alert('Error in loading quizzes');
      })
    } else{
      console.log('load all the quizzes of a particular category for user');
      this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe((data:any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      }, (error) => {
        console.log(error);
        alert('Error in loading quizzes');
      })
    }
    })
  }

}
