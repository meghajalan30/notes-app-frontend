import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Note } from "./note.model";

@Injectable({providedIn:'root'})
export class NotesService{

    constructor(private http:HttpClient){}
    
    getNotes(){
        return this.http.get('http://localhost:8080/notes',{observe:'response'});
    }

    addNote(note:Note){
        this.http.post('http://localhost:8080/notes',note).subscribe(responseData => {
            console.log(responseData);
        });
    }
}