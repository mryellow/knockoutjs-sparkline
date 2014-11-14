/**
 * Omnipotent Sparkline binder for KnockoutJS.
 *
 * @author: Mr-Yellow <mr-yellow@mr-yellow.com>
 */
console.log('include');

/**
 * Sparkline custom binding
 */
ko.bindingHandlers.sparkLine = {

	/**
     * ko binding init
     */
    init: function(element, valueAccessor, allBindingsAccessor, deprecated, bindingContext) {
    	console.log('--INIT:'+element.id);

		var observable = valueAccessor() || { };

		/**
		 * Destroy sparkline
		 *
		 * Handle disposal (if KO removes by the template binding)
		 */
		ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
			console.log('Destroy sparkline');
		});


       	/**
		 * Initalise sparkline.
		 */
		var now = new Date().getTime();
        $(element).sparkline(data, {
            type: 'line',
            height: '22px',
            width: '80px',
            fillColor: '#72e572',
            lineColor: '#000000',
            spotColor: '#f08000',
            minSpotColor: undefined,
            maxSpotColor: undefined,
            highlightSpotColor: undefined,
            highlightLineColor: undefined,
            chartRangeMinX: now - (60*60*4*1000),
            chartRangeMaxX: now + 60*1000, // Add 60 seconds to create space for mouseover
            chartRangeMin: -20,
            chartRangeMax: 100,
            normalRangeMin: 5,
            normalRangeMax: 60,
            normalRangeColor: '#e55e5b',
            drawNormalOnTop: true,
            tooltipFormatter: function (sparkline, options, fields) {
                //return epochToLocal(fields.x, dateformat) + ': ' + fields.y + '°'; // TODO: Get units from temperature record.
                return fields.x + ': ' + fields.y + '°'; // TODO: Get units from temperature record.
            }
        });

		//return { controlsDescendantBindings: true };

    },

    /**
     * ko binding update
     */
    update: function(element, valueAccessor, allBindingsAccessor, deprecated, bindingContext) {
        console.log('--UPDATE:'+element.id);
        var observable = valueAccessor() || { };
        var peeked = ko.unwrap(observable.peek());
        console.log(JSON.stringify(peeked));

    }

};