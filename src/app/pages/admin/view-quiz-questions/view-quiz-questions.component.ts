import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-view-quiz-questions',
  standalone: false,
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent implements OnInit{

  qid : any;
  qTitle : any;
  questions : any = [];
  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService
  ){

  }
  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];

    this._question.getQuestionsOfQuiz(this.qid).subscribe((data:any) => {
      this.questions = data;
      console.log(this.questions);
    },
    (error) => {
      console.log(error);
    })  
  
    console.log(this.qid);
    console.log(this.qTitle);

  }
    
  }
  