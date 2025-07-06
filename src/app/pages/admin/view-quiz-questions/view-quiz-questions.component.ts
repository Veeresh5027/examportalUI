import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

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
  deleteQuestion(quesId: any, index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this question!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this._question.deleteQuestion(quesId).subscribe(
          (data) => {
            // Remove the deleted question from the list
            this.questions.splice(index, 1);

            Swal.fire('Deleted!', 'Question has been deleted.', 'success');
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Something went wrong!', 'error');
          }
        );
      }
    });
  }
    
  }
  