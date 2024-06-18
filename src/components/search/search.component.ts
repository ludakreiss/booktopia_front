import { Component,ViewEncapsulation, OnInit  } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class SearchComponent implements OnInit{
  data:any
  errorMessage = '';
  constructor(private searchService : SearchService){

  }
  
  ngOnInit(): void {
      this.getBooksSearch()
  }

  // getBookSearch(searchedWord :any ){
  //     const keyword = searchedWord.target.value;
  //     const search = this.searchService.getBookSearch(keyword).then( response => {
  //       this.data = response
  //       console.log(this.data)
  //     })
  // }
  getBooksSearch(searchedWord?: any) {
    this.searchService.getBookSearch(searchedWord).subscribe({
      next: (response) => {
        if(response){
          console.log(response)
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching reviews:', error);
        this.errorMessage = 'Failed to fetch reviews. Please try again later.';
      },
    });
  }
}