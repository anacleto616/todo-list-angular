import { Component, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';
import { ELocalStorage } from '../../enums/ELocalStorage.enum';
import { IListItems } from './../../interfaces/IListItems.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  addItem = signal(true);
  private setListItems = signal<IListItems[]>(this.parseItems());
  getListItems = this.setListItems.asReadonly();

  getInputAndAddItem(value: IListItems) {
    localStorage.setItem(
      ELocalStorage.MY_LIST,
      JSON.stringify([...this.setListItems(), value])
    );

    return this.setListItems.set(this.parseItems());
  }

  listItemsStage(value: 'pending' | 'completed') {
    return this.getListItems().filter((item: IListItems) => {
      if (value === 'pending') return !item.checked;

      if (value === 'completed') return item.checked;

      return item;
    });
  }

  updateItemCheckbox(newItem: { id: string; checked: boolean }) {
    this.setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter((item) => {
        if (item.id === newItem.id) {
          item.checked = newItem.checked;
          return item;
        }
        return item;
      });

      return oldValue;
    });

    return this.updateLocalStorage();
  }

  updateItemText(newItem: { id: string; value: string }) {
    this.setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter((item) => {
        if (item.id === newItem.id) {
          item.value = newItem.value;
          return item;
        }
        return item;
      });

      return oldValue;
    });

    return this.updateLocalStorage();
  }

  deleteItem(id: string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar item!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.setListItems.update((oldValue: IListItems[]) => {
          return oldValue.filter((value) => value.id !== id);
        });

        return this.updateLocalStorage();
      }
    });
  }

  deleteAllItems() {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar tudo!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(ELocalStorage.MY_LIST);
        return this.setListItems.set(this.parseItems());
      }
    });
  }

  private parseItems() {
    return JSON.parse(localStorage.getItem(ELocalStorage.MY_LIST) || '[]');
  }

  private updateLocalStorage() {
    return localStorage.setItem(
      ELocalStorage.MY_LIST,
      JSON.stringify(this.setListItems())
    );
  }
}
