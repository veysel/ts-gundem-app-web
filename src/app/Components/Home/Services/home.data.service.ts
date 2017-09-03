import { Injectable } from '@angular/core';

import { HomeService } from './home.service';

import { PodcastModel } from '../Models/podcast.model';
import { YearModel } from '../Models/year.model';

@Injectable()
export class HomeDataService {

    constructor(
        private _homeService: HomeService
    ) { }

    public GetYearList(tempModelList: Array<PodcastModel>): Array<YearModel> {
        let tempYearList: Array<YearModel> = new Array<YearModel>();

        let tempFlag: boolean = true;
        tempModelList.forEach(memberPodcast => {
            tempFlag = true;

            tempYearList.forEach(memberYear => {

                if (memberPodcast.year == memberYear.yearText) {
                    tempFlag = false;
                    memberYear.yearCount = memberYear.yearCount + 1;
                }

            });

            if (tempFlag) {
                let tempModel: YearModel = new YearModel();
                tempModel.yearText = memberPodcast.year;
                tempModel.yearCount = 1;
                tempYearList.push(tempModel);
            }
        });

        return tempYearList;
    }

}