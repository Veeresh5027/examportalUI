import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  standalone: false,
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit {

  qid = 0;
  quiz: any = null;
  categories: any[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _category: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];

    // Fetch quiz details
    this._quiz.getQuiz(this.qid).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log('Quiz Loaded:', this.quiz);
      },
      (error) => {
        console.error('Error loading quiz:', error);
      }
    );

    // Fetch all categories
    this._category.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  // Used by [compareWith] to match selected category by cid
  compareCategory(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.cid === c2.cid : c1 === c2;
  }

  //update quiz
  public updateQuiz() {
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire('Success !!', 'Quiz Updated Successfully', 'success').then((e) => {
          // this.quiz = null;
          this.router.navigate(['/admin/quizzes']);
        })
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in updating quiz', 'error');
      }
    )
  }
}
