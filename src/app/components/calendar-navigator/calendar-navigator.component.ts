import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { addMonths, subMonths, isThisMonth } from 'date-fns';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calendar-navigator',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './calendar-navigator.component.html',
  styleUrl: './calendar-navigator.component.scss'
})
export class CalendarNavigatorComponent implements OnInit {
  faChevronCircleLeft = faChevronCircleLeft;
  faChevronCircleRight = faChevronCircleRight;

  @Output() dateChange = new EventEmitter<Date>();
  activeDate: Date = new Date();

  ngOnInit(): void {
    this.dateChange.emit(this.activeDate)
  }

  goPrev(){
    this.activeDate = subMonths(this.activeDate, 1)
    this.dateChange.emit(this.activeDate)
  }

  goNext(){
    this.activeDate = addMonths(this.activeDate, 1)
    this.dateChange.emit(this.activeDate)
  }

  currentMonthCheck(){
    return isThisMonth(this.activeDate)
  }

}
