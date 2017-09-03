import { Component, OnInit } from '@angular/core';

import { ViewTypeModel } from './Models/view.type.model';

import { ViewTypeEnum } from './Enums/view.type.enum';

@Component({
    selector: 'home',
    templateUrl: 'home.template.html'
})
export class HomeComponent implements OnInit {

    private viewTypeOptions: ViewTypeModel = new ViewTypeModel();

    ngOnInit() {
        this.SetViewTypeOptions(ViewTypeEnum.ViewMainList);
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

}