import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-in-place-editor',
  templateUrl: './in-place-editor.component.html',
  styleUrls: ['./in-place-editor.component.css']
})
export class InPlaceEditorComponent implements OnInit {
  @Input() value: string;
  @Output() update: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  saveValue(event): void {
    this.update.emit(event);
  }

}
