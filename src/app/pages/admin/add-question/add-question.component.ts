import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  standalone: false,
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit {

  qid: any;
  qTitle: any;

  question: any = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  };

  // This new array will hold the options specifically for the 'Select Correct Answer' dropdown
  optionsForAnswerSelect: string[] = [];

  constructor(private _route: ActivatedRoute, private _question: QuestionService, private _router: Router) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question.quiz['qid'] = this.qid;

    // Initialize optionsForAnswerSelect with empty strings or as desired
    // It's crucial to NOT directly bind to question.optionX here for the dropdown values
    this.updateAnswerOptions(); // Call this initially to populate the dropdown
  }

  // Helper method to update the options available in the 'Select Correct Answer' dropdown
  // You can call this when appropriate, e.g., on input change (though that might still be too frequent)
  // or before submitting the form. For now, we'll bind the mat-select directly to the question.optionX values.
  // The primary fix is in the HTML mat-select's options.
  updateAnswerOptions() {
    this.optionsForAnswerSelect = [
      this.question.option1,
      this.question.option2,
      this.question.option3,
      this.question.option4
    ].filter(option => option && option.trim() !== ''); // Filter out empty options
  }

  // Method to handle form submission
  public addQuestion() {
    // Before submission, ensure the answer options are up-to-date in the dropdown
    this.updateAnswerOptions();

    // Basic validation
    if (this.question.content.trim() === '' || this.question.option1.trim() === '' || this.question.answer.trim() === '') {
      Swal.fire('Error', 'Content, Option 1, and Answer are required!', 'error');
      return;
    }

    // Call the service to add the question
    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Question added successfully!', 'success').then(() => {
        // Navigate only after the alert is closed
        this._router.navigate(['/admin/view-questions', this.qid, this.qTitle]);
      });
      },
      (error) => {
        Swal.fire('Error', 'Error adding question. Please try again.', 'error');
        console.error('Error adding question:', error);
      }
    );
  }

  // Method to reset the form
  public resetForm() {
    this.question = {
      quiz: { qid: this.qid },
      content: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: ''
    };
    this.optionsForAnswerSelect = []; // Clear the options in the select as well
  }
}