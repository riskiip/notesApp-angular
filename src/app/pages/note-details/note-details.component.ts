import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note: Note = new Note('', '');
  noteId: number;
  new: boolean;

  constructor(
    private noteService: NotesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // Lakukan cek terlebih dahulu, ini baru atau lama note nya. kalo lama, kita edit
    this.route.params.subscribe( (params: Params) => {
      if (params.id) {
        this.note = this.noteService.get(params.id);
        this.noteId = params.id;
        this.new = false
      } else {
        this.new = true;
      }
    })
  }

  onSubmit(form: NgForm) {
    if (this.new) {
      this.noteService.addNote(form.value);
    } else {
      this.noteService.updateNote(this.noteId, form.value.title, form.value.body);
    }
    this.router.navigateByUrl('/');
  }

  cancel() {
    this.router.navigateByUrl('/');
  }
}
