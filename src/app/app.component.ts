import {Component} from '@angular/core';

@Component({
  selector: 'ff-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ff';

  images = [
    {
      title: '1',
      url: 'http://via.placeholder.com/250x150'
    },
    {
      title: '2',
      url: 'http://via.placeholder.com/250x150'
    },
    {
      title: '3',
      url: 'http://via.placeholder.com/250x150'
    },
    {
      title: '4',
      url: 'http://via.placeholder.com/250x150'
    },
    {
      title: '5',
      url: 'http://via.placeholder.com/250x150'
    }
  ];
  images2 = [
    {
      title: 'one',
      url: 'http://via.placeholder.com/375x150'
    },
    {
      title: 'two',
      url: 'http://via.placeholder.com/375x150'
    },
    {
      title: 'three',
      url: 'http://via.placeholder.com/375x150'
    },
    {
      title: 'four',
      url: 'http://via.placeholder.com/375x150'
    }
  ]
}
