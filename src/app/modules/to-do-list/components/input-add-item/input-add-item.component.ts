import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { IListItems } from '../../interfaces/IListItems.interface';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss',
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);

  @ViewChild('inputText') inputText!: ElementRef;
  @Input({ required: true }) inputListItems!: IListItems[];
  @Output() outputListAddItems = new EventEmitter<IListItems>();

  focusAndAddItem(value: string) {
    if (value) {
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';

      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const id = `ID-${timestamp}`;

      this.outputListAddItems.emit({
        id,
        checked: false,
        value,
      });

      return this.inputText.nativeElement.focus();
    }
  }
}
