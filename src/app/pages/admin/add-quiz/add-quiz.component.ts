import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  standalone: false,
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit {

 categories : any = [];

 quizData = {
  title: '',
  description: '',
  maxMarks: '',
  numberOfQuestions: '',
  active: true,
  category: {
    cid: ''
  }
 }

  constructor(private _cat:CategoryService, private _snack:MatSnackBar, private _quiz:QuizService) { }
  ngOnInit(): void {
    this._cat.getCategories().subscribe(  (data:any)=>{
      this.categories = data;
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error !!', 'Error in loading data', 'error');
    })
  }

  //add quiz
  addQuiz(){
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open('Title Required !! ', '', {
        duration: 3000,
      });
      return;
    }

    //call server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data: any) => {
        Swal.fire('Success !!', 'Quiz Added Successfully', 'success').then((e) => {
          this.quizData = {
            title: '',
            description: '',
            maxMarks: '',
            numberOfQuestions: '',
            active: true,
            category: {
              cid: ''
            }
           }
        });
      },
      (error) => {
        console.log(error);
        this._snack.open('Error in Adding Category !!', '', {
          duration: 3000,
        });
      }
    );
  }

}
