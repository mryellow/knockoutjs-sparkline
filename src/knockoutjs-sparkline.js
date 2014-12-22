/**
 * Omnipotent Sparkline binder for KnockoutJS.
 *
 * @author: Mr-Yellow <mr-yellow@mr-yellow.com>
 */
ko.bindingHandlers.sparkLine = {

    data: [],
    defaults: {
        type: 'line',
        height: 'auto',
        width: 'auto',
        fillColor: '#72e572',
        lineColor: '#000000',
        spotColor: '#f08000',
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
        chartRangeMin: -20,
        chartRangeMax: 100,
        normalRangeMin: 5,
        normalRangeMax: 60,
        normalRangeColor: '#e55e5b',
        drawNormalOnTop: true,
        tooltipFormatter: function (sparkline, options, fields) {
            console.log([fields.x,fields.y]);
            return ko.bindingHandlers.sparkLine.epochToLocal(fields.x) + ': ' + fields.y;
        },
        timeWindowMin: (60*60*4*1000),
        timeWindowMax: (60*1000),
        dateFormat: 'LLLL'
    },
    epochToLocal: function(epoch) {
        if (epoch) {
            // JS Epoch to localised format
            return moment(epoch).format(ko.bindingHandlers.sparkLine.defaults.dateFormat);
        }
    },

    /**
     * ko binding init
     */
    init: function(element, valueAccessor, allBindingsAccessor, deprecated, bindingContext) {
        console.log('--INIT:'+element.id);

        var observable = valueAccessor() || { };
        var unwrapped = ko.unwrap(observable);

        ko.bindingHandlers.sparkLine.data = unwrapped;
        
        if (allBindingsAccessor().hasOwnProperty('sparkType')) ko.bindingHandlers.sparkLine.defaults.type = allBindingsAccessor().sparkType;

        if (allBindingsAccessor().hasOwnProperty('sparkHeight')) ko.bindingHandlers.sparkLine.defaults.height = allBindingsAccessor().sparkHeight;
        if (allBindingsAccessor().hasOwnProperty('sparkWidth')) ko.bindingHandlers.sparkLine.defaults.width = allBindingsAccessor().sparkWidth;

        if (allBindingsAccessor().hasOwnProperty('sparkChartRangeMin')) ko.bindingHandlers.sparkLine.defaults.chartRangeMin = allBindingsAccessor().sparkChartRangeMin;
        if (allBindingsAccessor().hasOwnProperty('sparkChartRangeMax')) ko.bindingHandlers.sparkLine.defaults.chartRangeMax = allBindingsAccessor().sparkChartRangeMax;
        if (allBindingsAccessor().hasOwnProperty('sparkNormalRangeMin')) ko.bindingHandlers.sparkLine.defaults.normalRangeMin = allBindingsAccessor().sparkNormalRangeMin;
        if (allBindingsAccessor().hasOwnProperty('sparkNormalRangeMax')) ko.bindingHandlers.sparkLine.defaults.normalRangeMax = allBindingsAccessor().sparkNormalRangeMax;

        if (allBindingsAccessor().hasOwnProperty('sparkFillColor')) ko.bindingHandlers.sparkLine.defaults.fillColor = allBindingsAccessor().sparkFillColor;
        if (allBindingsAccessor().hasOwnProperty('sparkLineColor')) ko.bindingHandlers.sparkLine.defaults.lineColor = allBindingsAccessor().sparkLineColor;
        if (allBindingsAccessor().hasOwnProperty('sparkSpotColor')) ko.bindingHandlers.sparkLine.defaults.spotColor = allBindingsAccessor().sparkSpotColor;
        if (allBindingsAccessor().hasOwnProperty('sparkNormalRangeColor')) ko.bindingHandlers.sparkLine.defaults.normalRangeColor = allBindingsAccessor().sparkNormalRangeColor;

        if (allBindingsAccessor().hasOwnProperty('sparkChartRangeMinX')) ko.bindingHandlers.sparkLine.defaults.chartRangeMinX = allBindingsAccessor().sparkChartRangeMinX;
        if (allBindingsAccessor().hasOwnProperty('sparkChartRangeMaxX')) ko.bindingHandlers.sparkLine.defaults.chartRangeMaxX = allBindingsAccessor().sparkChartRangeMaxX;

        if (allBindingsAccessor().hasOwnProperty('sparkTimeWindowMin')) ko.bindingHandlers.sparkLine.defaults.timeWindowMin = allBindingsAccessor().sparkTimeWindowMin;
        if (allBindingsAccessor().hasOwnProperty('sparkTimeWindowMax')) ko.bindingHandlers.sparkLine.defaults.timeWindowMax = allBindingsAccessor().sparkTimeWindowMax;

        if (allBindingsAccessor().hasOwnProperty('sparkDateformat')) ko.bindingHandlers.sparkLine.defaults.dateFormat = allBindingsAccessor().sparkDateformat;

        if (allBindingsAccessor().hasOwnProperty('sparkTooltipFormatter')) ko.bindingHandlers.sparkLine.defaults.tooltipFormatter = allBindingsAccessor().sparkTooltipFormatter;

        /**
         * Recalculate window.
         */
        var now = new Date().getTime();
        ko.bindingHandlers.sparkLine.defaults.chartRangeMinX = now - ko.bindingHandlers.sparkLine.defaults.timeWindowMin;
        ko.bindingHandlers.sparkLine.defaults.chartRangeMaxX = now - ko.bindingHandlers.sparkLine.defaults.timeWindowMax;

        /**
         * Initalise sparkline.
         */
        $(element).sparkline(ko.bindingHandlers.sparkLine.data, ko.bindingHandlers.sparkLine.defaults);

        //return { controlsDescendantBindings: true };
    },

    /**
     * ko binding update
     */
    update: function(element, valueAccessor, allBindingsAccessor, deprecated, bindingContext) {
        console.log('--UPDATE:'+element.id);

        var observable = valueAccessor() || { };
        var unwrapped = ko.unwrap(observable);

        ko.bindingHandlers.sparkLine.data = unwrapped;

        /**
         * Recalculate window.
         */
        var now = new Date().getTime();
        ko.bindingHandlers.sparkLine.defaults.chartRangeMinX = now - ko.bindingHandlers.sparkLine.defaults.timeWindowMin;
        ko.bindingHandlers.sparkLine.defaults.chartRangeMaxX = now - ko.bindingHandlers.sparkLine.defaults.timeWindowMax;

        $(element).sparkline(ko.bindingHandlers.sparkLine.data, ko.bindingHandlers.sparkLine.defaults);

    }

};
