import { ContentView } from 'ui/content-view';
export declare class HoldToLoadLayout extends ContentView {
    static holdCompleteEvent: string;
    static holdResetEvent: string;
    static angleChangeEvent: string;
    private _duration;
    private _strokeWidth;
    private _strokeAlpha;
    private _playReverseAnimation;
    private _stopWhenFilled;
    private _startColor;
    private _endColor;
    private _startAngle;
    private _androidViewId;
    private _android;
    constructor();
    android: any;
    _nativeView: any;
    duration: number;
    strokeWidth: number;
    strokeAlpha: number;
    startColor: string;
    endColor: string;
    playReverseAnimation: boolean;
    stopWhenFilled: boolean;
    startAngle: number;
}
