import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Note } from './note.model';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'notes-app';

  notesForm:FormGroup;
  notesList:Note[]=[];
  noContent=false;
  // noFileChosen:string="No File Chosen";

  constructor(private notesService:NotesService){}

  ngOnInit(){
    this.notesForm=new FormGroup({
      'title':new FormControl(null,Validators.required),
      'description':new FormControl(null,Validators.required),
      'reminder':new FormControl(null),
      'tag1':new FormControl(null),
      'tag2':new FormControl(null),
      'tag3':new FormControl(null),
    });

    this.getNotes();


  }

 

  getNotes(){
    this.notesService.getNotes().subscribe(notesData => {
      console.log(notesData);
      this.notesList=[];
      if(notesData.status==204)
      {
        this.noContent=true;
      }
      for(let noteCount in notesData.body){
        this.notesList.push(notesData.body[noteCount]);
      }
    },err => {
      console.log(err.message);
    });
  }


  onSubmit(){
    console.log(this.notesForm.value);
    this.notesService.addNote(this.notesForm.value);
    this.notesForm.reset();
    this.getNotes();
  }


  

  
}
