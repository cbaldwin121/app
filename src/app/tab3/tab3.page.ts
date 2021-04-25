import { Component } from '@angular/core';
import { Auth } from 'aws-amplify'
import { CognitoUser } from '@aws-amplify/auth'
import { UserService } from '../service/user.service';

import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}

}
