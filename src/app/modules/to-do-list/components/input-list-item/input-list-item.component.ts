import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListItems } from '../../interfaces/IListItems.interface';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss',
})
export class InputListItemComponent {
  @Input({ required: true }) inputListItems!: IListItems[];

  @Output() outputUpdateItemCheckbox = new EventEmitter<{
    id: string;
    checked: boolean;
  }>();

  @Output() outputUpdateItemText = new EventEmitter<{
    id: string;
    value: string;
  }>();

  @Output() outputDeleteItem = new EventEmitter<string>();

  updateItemCheckBox(id: string, checked: boolean) {
    return this.outputUpdateItemCheckbox.emit({ id, checked });
  }

  updateItemText(id: string, value: string) {
    return this.outputUpdateItemText.emit({ id, value });
  }

  deleteItem(id: string) {
    return this.outputDeleteItem.emit(id);
  }
}
