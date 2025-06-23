import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  standalone: false,
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent implements OnInit {

  quizzes : any[] = [
    {
      qid: 1,
      title: 'Quiz 1',
      description: 'Description 1',
      maxMarks: '10',
      numberOfQuestions: '5',
      active: '',
      category: {
        cid: 1,
        title: 'Category 1',
        description: 'Description 1'
      } 
    }
  ];

  constructor(private _quiz:QuizService ) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe((data:any)=>{
      this.quizzes = data;
    },
    (error)=>{
      Swal.fire('Error !!', 'Error in loading data', 'error');
    })
  }

  deleteQuiz(qid:any){
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure want to delete this quiz ?'
    }).then((result)=>{
      if(result.isConfirmed){
        //delete
        this._quiz.deleteQuiz(qid).subscribe((data)=>{
          this.quizzes = this.quizzes.filter((q:any) => q.qid != qid);
          Swal.fire('Success !!', 'Quiz Deleted Successfully', 'success');
          this.ngOnInit();
        },
        (error)=>{
          Swal.fire('Error !!', 'Error in deleting quiz', 'error');
        })
      }
    })
  }

}
