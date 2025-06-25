import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-add-question',
  standalone: false,
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit {

  qid:any;
  qTitle:any;
  question:any = {
    quiz : { },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  };

  constructor(private _route:ActivatedRoute, private _question:QuestionService) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question.quiz['qid'] = this.qid;

    this._question.getQuestionsOfQuiz(this.qid).subscribe(
      (data: any) => {
        this.question = data;
        console.log(this.question);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(this.qid);
    console.log(this.qTitle);
  }

}
