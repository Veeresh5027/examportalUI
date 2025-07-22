import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  standalone: false,
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit {

  qid: any;
  questions: any;

  marksGot: number = 0;
  correctAnswers: number = 0;
  attempted: number = 0;

  isSubmit: boolean = false;

  timer: any;


  constructor(private locationStr: LocationStrategy, private _route: ActivatedRoute, private _question: QuestionService) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestions();
  }

  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe((data: any) => {
      // console.log(data);

      this.questions = data;
      this.timer = this.questions.length * 2 * 60;
      this.questions.forEach((q: any) => {
        q['givenAnswer'] = '';
      });
      console.log(this.questions);
      this.startTimer();
    }, (error) => {
      console.log(error);
      Swal.fire('Error !!', 'Error in loading questions', 'error');
    })
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationStr.onPopState(() => {
      history.pushState(null, '', location.href);
    });
    window.onpopstate = () => {
      history.go(1);
    }
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evalQuiz();
        // this.isSubmit = true;
      }
    });
  }

  startTimer() {
    let timer = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(timer);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz(){
      // // Reset counts
      //   this.isSubmit = true;
      //   this.correctAnswers = 0;
      //   this.marksGot = 0;
      //   this.attempted = 0;

      //call server

      this._question.evaluateQuiz(this.questions).subscribe(
        (data: any)=>{
          console.log(data);
          this.marksGot = parseFloat(data.marksGot);
          this.correctAnswers = data.correctAnswers;
          this.attempted = data.attempted;
          this.isSubmit = true; 
        },
        (error)=>{
          console.log(error);
        }
      )

      //   this.questions.forEach((q: any) => {
      //     if (q.givenAnswer == q.answer) {
      //       this.correctAnswers++;
      //       let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
      //       this.marksGot += marksSingle;
      //     }

      //     if (q.givenAnswer.trim() != '') {
      //       this.attempted++;
      //     }
      //   });

      //   console.log("Correct Answers: " + this.correctAnswers);
      //   console.log("Marks Got: " + this.marksGot);
  }

  //print the result
  printPage() {
    window.print();
  }

}
