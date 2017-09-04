import { Component, OnInit } from '@angular/core';

import { ViewTypeModel } from './Models/view.type.model';
import { PodcastModel } from './Models/podcast.model';
import { YearModel } from './Models/year.model';

import { ViewTypeEnum } from './Enums/view.type.enum';

import { HomeService } from './Services/home.service';
import { HomeDataService } from './Services/home.data.service';

@Component({
    selector: 'home',
    templateUrl: 'home.template.html'
})
export class HomeComponent implements OnInit {

    private viewTypeOptions: ViewTypeModel = new ViewTypeModel();
    private viewMainListOptions = {
        yearList: new Array<YearModel>()
    };
    private viewPodcastListOptions = {
        podcastList: new Array<PodcastModel>()
    };
    private viewPodcastDetailsOptions = {
        podcast: new PodcastModel()
    };

    constructor(
        private _homeService: HomeService,
        private _homeDataService: HomeDataService
    ) { }

    ngOnInit() {
        this.SetViewTypeOptions(ViewTypeEnum.ViewMainList);
        this.UpdateYearList();
    }

    private SetViewTypeOptions(viewType: ViewTypeEnum) {
        // For Make False All Property.
        this.viewTypeOptions = new ViewTypeModel();

        switch (viewType) {
            case ViewTypeEnum.ViewMainList: {
                this.viewTypeOptions.ViewMainList = true;
                break;
            }
            case ViewTypeEnum.ViewPodcastList: {
                this.viewTypeOptions.ViewPodcastList = true;
                break;
            }
            case ViewTypeEnum.ViewDetails: {
                this.viewTypeOptions.ViewDetails = true;
                break;
            }
            default: {
                break;
            }
        }
    }

    private ChangeSearchInput(event: any) {
        console.clear();
        console.log(event.target.value);
    }

    private UpdateYearList() {
        this.viewMainListOptions.yearList = new Array<YearModel>();

        this._homeService.GetAllData().subscribe(member => {
            this.viewMainListOptions.yearList = this._homeDataService.GetYearList(member.list);
        });
    }

    private GoToViewPodcastList(year: string) {
        this.SetViewTypeOptions(ViewTypeEnum.ViewPodcastList);

        this.viewPodcastListOptions.podcastList = new Array<PodcastModel>();
        this._homeService.GetAllData().subscribe(member => {
            this.viewPodcastListOptions.podcastList = this._homeDataService.GetPodcastList(member.list, year);
        });
    }

    private GoToViewMainList() {
        this.SetViewTypeOptions(ViewTypeEnum.ViewMainList);
        this.UpdateYearList();
    }

    private GoToViewPodcastDetails(totalCount: number) {
        this.SetViewTypeOptions(ViewTypeEnum.ViewDetails);

        this.viewPodcastDetailsOptions.podcast = new PodcastModel();
        this._homeService.GetAllData().subscribe(member => {
            this.viewPodcastDetailsOptions.podcast = this._homeDataService.GetPodcast(member.list, totalCount);
        });
    }

    private BackToViewPodcastList() {
        this.SetViewTypeOptions(ViewTypeEnum.ViewPodcastList);
    }

}