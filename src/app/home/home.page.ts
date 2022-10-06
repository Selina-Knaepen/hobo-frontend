import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  devices: [];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo.watchQuery({
      query: gql`
        {
          devices {
            name,
            id
          }
        }
      `
    }).valueChanges.subscribe((results: any) => {
      this.devices = results?.data?.devices

      console.log('Devices: ', this.devices);
    });
  }

}
