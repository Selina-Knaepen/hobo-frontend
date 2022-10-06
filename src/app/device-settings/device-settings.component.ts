import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RangeCustomEvent } from '@ionic/angular';
import { Apollo, gql } from 'apollo-angular';

const CHANGE_WHITE = gql`
  mutation UpdateFloat($id: BigInteger!, $requested: Float, $color: String!){
    updateFloatProperties(deviceId: $id, updates: [{
      property: $color,
      request: $requested
    }]) {
      name
      reported
      requested
    }
  }
`;

const CHANGE_RED = gql`
mutation UpdateFloat($id: BigInteger!, $requested: Float){
  updateFloatProperties(deviceId: $id, updates: [{
    property: "red",
    request: $requested
  }]) {
    name
    reported
    requested
  }
}
`;

@Component({
  selector: 'app-device-settings',
  templateUrl: './device-settings.component.html',
  styleUrls: ['./device-settings.component.scss'],
})
export class DeviceSettingsComponent implements OnInit {
  id: number;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.id = params['id']);
  }

  valueChanged(event, color) {
    const value = (event as RangeCustomEvent).detail.value;

    this.apollo.mutate({
      mutation: CHANGE_WHITE,
      variables: {
        id: +this.id,
        requested: value,
        color
      }
    }).subscribe(() => {},(error) => {
      console.log('there was an error sending the query', error);
    });
  }
}
