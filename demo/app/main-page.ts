import { Color } from "color";
import { Page } from 'ui/page';
import { Observable, EventData } from 'data/observable';
import { HelloWorldModel } from './main-view-model';
import * as app from "application";
import * as platformModule from "platform";

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();

    
    if (app.android && platformModule.device.sdkVersion >= "21") {
        var window = app.android.startActivity.getWindow();
        window.setStatusBarColor(new Color("#336699").android);
    }
}