import { Injectable } from '@angular/core';

import { HomeService } from './home.service';

@Injectable()
export class HomeDataService {

    constructor(
        private _homeService: HomeService
    ) { }

}