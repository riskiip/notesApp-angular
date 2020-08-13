import { Component, OnInit } from "@angular/core";
import { Note } from "src/app/shared/note.model";
import { NotesService } from "src/app/shared/notes.service";
import { trigger, transition, style, animate, query, stagger } from "@angular/animations";
import { element } from 'protractor';

@Component({
  selector: "app-notes-list",
  templateUrl: "./notes-list.component.html",
  styleUrls: ["./notes-list.component.scss"],
  animations: [
    trigger("itemAnim", [
      transition("void => *", [
        style({
          height: 0,
          opacity: 0,
          transform: "scale(0.85)",
          "margin-bottom": 0,

          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight: '*'
        })),
        animate(70)
      ]),

      transition('* => void', [
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        animate('120ms ease-out', style({
          transform: 'scale(0.70)',
          opacity: 0
        })),

        // animate spacing include height, padding and margin
        animate('150ms ease-out', style({
          height: 0,
          "margin-bottom": '0',
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }))
      ])
    ]),
    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  ],
})
export class NotesListComponent implements OnInit {
  notes: Note[] = new Array<Note>();
  filteredNote: Note[] = new Array<Note>();

  constructor(private noteService: NotesService) {}

  ngOnInit() {
    this.notes = this.noteService.getAll();
    this.filteredNote = this.notes;
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id);
  }

  filter(query: string) {
    query = query.toLowerCase().trim();

    let allResult: Note[] = new Array<Note>();

    //split up the space
    let terms: string[] = query.split(' ');
    terms = this.removeDuplicates(terms);

    //compile all relevant notes
    terms.forEach(term => {
      let results: Note[] = this.relevantNote(term);
      //append result
      allResult = [...allResult, ...results]
    });

    let unique = this.removeDuplicates(allResult);
    this.filteredNote = unique;
  }

  removeDuplicates(arr: Array<any>) : Array<any> {
    let unique: Set<any> = new Set<any>();
    arr.forEach(e => unique.add(e));
    return Array.from(unique);
  }

  relevantNote(query: string): Array<Note> {
    query = query.toLowerCase().trim();
    let relevantNote = this.notes.filter( note => {
      if (note.title && note.title.toLowerCase().includes(query)) {
        return true;
      }
      if (note.body && note.body.toLowerCase().includes(query)) {
        return true;
      }
      else {
        return false;
      }
    });
    return relevantNote;
  }
}
