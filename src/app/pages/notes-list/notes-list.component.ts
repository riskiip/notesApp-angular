import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  iniTitle = 'Halo, ini judul';
  iniBody = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat qui debitis, doloribus autem consectetur ex sit reprehenderit quisquam nostrum minima tempora nisi. Deleniti dolorem eum quis, et ducimus at itaque?';
  constructor() { }

  ngOnInit() {
  }

}
