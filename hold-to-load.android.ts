/***************************************************************************************
* Made for the {N} community by Brad Martin @BradWayneMartin
* https://twitter.com/BradWayneMartin
* https://github.com/bradmartin
* http://bradmartin.net
* Open Source Lib : https://github.com/melihaksoy/HoldToLoadLayout
*************************************************************************************/

import {ContentView} from 'ui/content-view';
import { Color } from "color";

declare var android, com: any;


export class HoldToLoadLayout extends ContentView {
    public static holdCompleteEvent = "holdComplete";
    public static holdResetEvent = "holdReset";
    public static angleChangeEvent = "angleChange";

    private _duration: number;
    private _strokeWidth: number;
    private _strokeAlpha: number;
    private _playReverseAnimation: boolean;
    private _stopWhenFilled: boolean;
    private _startColor: string;
    private _endColor: string;
    private _startAngle: number;
    private _androidViewId: number;
    private _android: com.melih.holdtoload.HoldToLoadLayout;


    constructor() {
        super();
    }


    get android(): any {
        return this._android;
    }

    get _nativeView(): any {
        return this._android;
    }


    set duration(value: number) {
        this._duration = value;
        if (this._android)
            this._android.setDuration(value);
    }

    set strokeWidth(value: number) {
        this._strokeWidth = value;
        if (this._android)
            this._android.setStrokeWidth(value);
    }

    set strokeAlpha(value: number) {
        this._strokeAlpha = value;
        if (this._android)
            this._android.setStrokeAlpha(value);
    }

    set startColor(value: string) {
        this._startColor = value;
    }

    set endColor(value: string) {
        this._endColor = value;
    }

    set playReverseAnimation(value: boolean) {
        this._playReverseAnimation = value;
        if (this._android)
            this._android.setPlayReverseAnimation(value);
    }

    set stopWhenFilled(value: boolean) {
        this._stopWhenFilled = value;
        if (this._android)
            this._android.setStopWhenFilled(value);
    }

    set startAngle(value: number) {
        this._startAngle = value;
        if (this._android)
            this._android.setStartAngle(value);
    }


    public _createUI() {
        let Layout = com.melih.holdtoload.HoldToLoadLayout;
        this._android = new Layout(this._context);

        if (!this._androidViewId) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._android.setId(this._androidViewId);


        // Set duration of fill time in milliseconds.
        if (this._duration)
            this.duration = this._duration;

        // Set stroke width in px ( dp in xml )
        if (this._strokeWidth)
            this.strokeWidth = this._strokeWidth;

        // Set alpha value of paint ( 0 - 255 )
        if (this._strokeAlpha)
            this.strokeAlpha = this._strokeAlpha;

        // Reverse like it fills, with animation
        if (this._playReverseAnimation)
            this.playReverseAnimation = this._playReverseAnimation;

        // Stop when holded fully
        if (this._stopWhenFilled)
            this.stopWhenFilled = this._stopWhenFilled;

        // Animate color while drawing
        if (this._startColor) {

            let start = this._startColor;
            let end = this._endColor;
            // check if endColor is set
            if (!end) {
                end = this._startColor;
            }

            this._android.setColorAnimator(new Color(start).android, new Color(end).android);
        }



        // Starting angle of loading
        if (this._startAngle)
            this.startAngle = this._startAngle;



        try {

            var that = new WeakRef(this);

            this._android.setFillListener(new Layout.FillListener({
                get owner() {
                    return that.get();
                },

                onFull: function () {
                    var owner = that.get();
                    if (owner) {
                        owner._emit(HoldToLoadLayout.holdCompleteEvent);
                    }
                },

                onEmpty: function () {
                    var owner = that.get();
                    if (owner) {
                        owner._emit(HoldToLoadLayout.holdResetEvent);
                    }
                },

                onAngleChanged: function (angle: number) {
                    var owner = that.get();
                    if (owner) {
                        owner.notify({ eventName: HoldToLoadLayout.angleChangeEvent, object: owner, angle: angle});
                    }
                }

            }));

        } catch (err) {
            console.log('ERROR: ' + err);
        }




    }


}