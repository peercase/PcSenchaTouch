/**
 * @class Ext.form.Slider
 * @extends Ext.form.Field
 * <p>Form component allowing a user to move a 'thumb' along a slider axis to choose a value. Sliders can equally be used outside
 * of the context of a form. Example usage:</p>
   <pre><code>
new Ext.form.FormPanel({
    items: [
        {
            xtype   : 'slider',
            label   : 'Volume',
            value   : 5,
            minValue: 0,
            maxValue: 10
        }
    ]
});
   </code></pre>
 * Or as a standalone component:
   <pre><code>
var slider = new Ext.form.Slider({
    value: 5,
    minValue: 0,
    maxValue: 10
});

slider.setValue(8); //will update the value and move the thumb;
slider.getValue(); //returns 8
   </code></pre>
 * @xtype slider
 */
Ext.form.Slider = Ext.extend(Ext.form.Field, {
    ui: 'slider',
    /**
     * @cfg {Boolean} showClear @hide
     */

    /**
     * @cfg {String} inputCls Overrides {@link Ext.form.Field}'s inputCls. Defaults to 'x-slider'
     */
    inputCls: 'x-slider',

    /**
     * @cfg {Number} minValue The lowest value any thumb on this slider can be set to (defaults to 0)
     */
    minValue: 0,

    /**
     * @cfg {Number} maxValue The highest value any thumb on this slider can be set to (defaults to 100)
     */
    maxValue: 100,

    /**
     * @cfg {Boolean} animate When set to true, the slider thumbs are animated when their values change. Defaults to true
     */
    animate: true,

    /**
     * @cfg {Number} value The value to initialize the thumb at (defaults to 0)
     */
    value: 0,

    renderTpl: [
        '<div <tpl if="id">id="{id}" </tpl>class="{baseCls} {cls} {cmpCls}<tpl if="ui"> {uiBase}-{ui}</tpl> <tpl if="label">{labelAlign}</tpl>" <tpl if="style"> style="{style}"</tpl>>',
        '<tpl if="label"><label <tpl if="fieldEl">for="{inputId}"</tpl>>{label}</label></tpl>',
        '<tpl if="fieldEl"><div id="{inputId}" name="{name}" class="{fieldCls}"',
        '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>',
        '<tpl if="style">style="{style}" </tpl>',
        '/></tpl>',
        '<div class="x-field-mask"></div>',
        '</div>'
    ],

    /**
     * @cfg {Number} increment The increment by which to snap each thumb when its value changes. Defaults to 1. Any thumb movement
     * will be snapped to the nearest value that is a multiple of the increment (e.g. if increment is 10 and the user tries to move
     * the thumb to 67, it will be snapped to 70 instead)
     */
    increment: 1,

    /**
     * @cfg {Array} values The values to initialize each thumb with. One thumb will be created for each value. This configuration
     * should always be defined but if it is not then it will be treated as though [0] was passed.
     */

    /**
     * @cfg {Array} thumbs Optional array of Ext.form.Slider.Thumb instances. Usually {@link values} should be used instead
     */

    // @private
    constructor: function(config) {
        this.addEvents(
            /**
             * @event beforechange
             * Fires before the value of a thumb is changed. Return false to cancel the change
             * @param {Ext.form.Slider} slider The slider instance
             * @param {Ext.form.Slider.Thumb} thumb The thumb instance
             * @param {Number} oldValue The previous value
             * @param {Number} newValue The value that the thumb will be set to
             */
            'beforechange',

            /**
             * @event change
             * Fires when the value of a thumb is changed.
             * @param {Ext.form.Slider} slider The slider instance
             * @param {Ext.form.Slider.Thumb} thumb The thumb instance
             * @param {Number} oldValue The previous value
             * @param {Number} newValue The value that the thumb will be set to
             */
            'change',
            /**
             * @event drag
             * Fires while the thumb is actively dragging.
             * @param {Ext.form.Slider} slider The slider instance
             * @param {Ext.form.Slider.Thumb} thumb The thumb instance
             * @param {Number} value The value of the thumb.
             */
            'drag'
        );

        Ext.form.Slider.superclass.constructor.call(this, config);
    },

    // @private
    initComponent: function() {
        //TODO: This will be removed once multi-thumb support is in place - at that point a 'values' config will be accepted
        //to create the multiple thumbs
        this.values = [this.value];

        Ext.form.Slider.superclass.initComponent.apply(this, arguments);

        if (this.thumbs == undefined) {
            var thumbs = [],
                values = this.values,
                length = values.length,
                i;

            for (i = 0; i < length; i++) {
                thumbs[thumbs.length] = new Ext.form.Slider.Thumb({
                    value: values[i],
                    slider: this,

                    listeners: {
                        scope: this,
                        drag: this.onDrag,
                        dragend: this.onThumbDragEnd
                    }
                });
            }

            this.thumbs = thumbs;
        }
    },

    /**
     * Sets the new value of the slider, constraining it within {@link minValue} and {@link maxValue}, and snapping to the nearest
     * {@link increment} if set
     * @param {Number} value The new value
     * @return {Number} The value the thumb was set to
     */
    setValue: function(value) {
        //TODO: this should accept a second argument referencing which thumb to move
        var me = this,
            thumb = me.getThumb(),
            oldValue = thumb.getValue(),
            newValue = me.constrain(value);

        if (me.fireEvent('beforechange', me, thumb, oldValue, newValue) !== false) {
            this.moveThumb(thumb, this.getPixelValue(newValue, thumb));
            thumb.setValue(newValue);
            me.doComponentLayout();

            me.fireEvent('change', me, thumb, oldValue, newValue);
        }
    },

    /**
     * @private
     * Takes a desired value of a thumb and returns the nearest snap value. e.g if minValue = 0, maxValue = 100, increment = 10 and we
     * pass a value of 67 here, the returned value will be 70. The returned number is constrained within {@link minValue} and {@link maxValue},
     * so in the above example 68 would be returned if {@link maxValue} was set to 68.
     * @param {Number} value The value to snap
     * @return {Number} The snapped value
     */
    constrain: function(value) {
        var increment = this.increment,
        div = Math.floor(Math.abs(value / increment)),
        lower = this.minValue + (div * increment),
        higher = Math.min(lower + increment, this.maxValue),
        dLower = value - lower,
        dHigher = higher - value;

        return (dLower < dHigher) ? lower: higher;
    },

    /**
     * Returns the current value of the Slider's thumb
     * @return {Number} The thumb value
     */
    getValue: function() {
        //TODO: should return values from multiple thumbs
        return this.getThumb().getValue();
    },

    /**
     * Returns the Thumb instance bound to this Slider
     * @return {Ext.form.Slider.Thumb} The thumb instance
     */
    getThumb: function() {
        //TODO: This function is implemented this way to make the addition of multi-thumb support simpler. This function
        //should be updated to accept a thumb index
        return this.thumbs[0];
    },

    /**
     * @private
     * Maps a pixel value to a slider value. If we have a slider that is 200px wide, where minValue is 100 and maxValue is 500,
     * passing a pixelValue of 38 will return a mapped value of 176
     * @param {Number} pixelValue The pixel value, relative to the left edge of the slider
     * @return {Number} The value based on slider units
     */
    getSliderValue: function(pixelValue, thumb) {
        var thumbWidth = thumb.el.getOuterWidth(),
            halfWidth = thumbWidth / 2,
            trackWidth = this.fieldEl.getWidth() - thumbWidth,
            range = this.maxValue - this.minValue,

            //number of pixels per slider value unit
            ratio = range / trackWidth;

        return this.minValue + (ratio * (pixelValue - halfWidth));
    },

    /**
     * @private
     * The inverse of {@link getSliderValue}, when passed a value in slider units (e.g. the value a {@link Ext.form.Slider.Thumb thumb}
     * might represent), this returns the pixel on the rendered slider that the thumb should be positioned at
     * @param {Number} value The internal slider value
     * @return {Number} The pixel value, rounded and relative to the left edge of the scroller
     */
    getPixelValue: function(value, thumb) {
        var thumbWidth = thumb.el.getOuterWidth(),
            halfWidth = thumbWidth / 2,
            trackWidth = this.fieldEl.getWidth() - thumbWidth,
            range = this.maxValue - this.minValue,

            //number of pixels per slider value unit
            ratio = trackWidth / range;

        return (ratio * (value - this.minValue)) + halfWidth;
    },

    /**
     * @private
     * Creates an Ext.form.Slider.Thumb instance for each configured {@link values value}. Assumes that this.el is already present
     */
    renderThumbs: function() {
        var thumbs = this.thumbs,
            length = thumbs.length,
            i;

        for (i = 0; i < length; i++) {
            thumbs[i].render(this.fieldEl);
        }
    },

    /**
     * @private
     * Updates a thumb after it has been dragged
     */
    onThumbDragEnd: function(draggable) {
        this.setValue(this.getThumbValue(draggable));
    },
    
    /**
     * @private
     * Get the value for a draggable thumb.
     */
    getThumbValue: function(draggable){
        var thumb = draggable.thumb,
            sliderBox = this.fieldEl.getPageBox(),
            thumbBox = thumb.el.getPageBox(),

            thumbWidth = thumbBox.width,
            halfWidth = thumbWidth / 2,
            center = (thumbBox.left - sliderBox.left) + halfWidth;
            
        return this.getSliderValue(center, thumb);
    },
    
    /**
     * @private
     * Fires drag events so the user can interact.
     */
    onDrag: function(draggable){
        var value = this.getThumbValue(draggable);
        this.fireEvent('drag', this, draggable.thumb, this.constrain(value));
    },

    /**
     * @private
     * Updates the value of the nearest thumb on tap events
     */
    onTap: function(e) {
        var sliderBox = this.fieldEl.getPageBox(),
            leftOffset = e.pageX - sliderBox.left,
            thumb = this.getNearest(leftOffset);

        this.setValue(this.getSliderValue(leftOffset, thumb));
    },

    /**
     * @private
     * Moves the thumb element. Should only ever need to be called from within {@link setValue}
     * @param {Ext.form.Slider.Thumb} thumb The thumb to move
     * @param {Number} pixel The pixel the thumb should be centered on
     * @param {Boolean} animate True to animate the movement
     */
    moveThumb: function(thumb, pixel, animate) {
        var halfWidth = thumb.el.getOuterWidth() / 2;

        thumb.el.setLeft(pixel - halfWidth);
    },

    // inherit docs
    afterRender: function(ct) {
        this.renderThumbs();

        Ext.form.Slider.superclass.afterRender.apply(this, arguments);

        this.fieldEl.on({
            scope: this,
            tap: this.onTap
        });
    },

    /**
     * @private
     * Finds and returns the nearest {@link Ext.form.Slider.Thumb thumb} to the given value.
     * @param {Number} value The value
     * @return {Ext.form.Slider.Thumb} The nearest thumb
     */
    getNearest: function(value) {
        //TODO: Implemented this way to enable multi-thumb support later
        return this.thumbs[0];
    }
});

Ext.reg('slider', Ext.form.Slider);

/**
 * @class Ext.form.Slider.Thumb
 * @extends Ext.form.Field
 * @xtype thumb
 * @ignore
 * Utility class used by Ext.form.Slider - should never need to be used directly.
 */
Ext.form.Slider.Thumb = Ext.extend(Ext.form.Field, {
    isField: false,
    ui: 'thumb',
    autoCreateField: false,
    draggable: true,

    /**
     * @cfg {Number} value The value to initialize this thumb with (defaults to 0)
     */
    value: 0,

    /**
     * @cfg {Ext.form.Slider} slider The Slider that this thumb is attached to. Required
     */

    // inherit docs
    onRender: function() {
        Ext.form.Slider.Thumb.superclass.onRender.apply(this, arguments);

        this.dragConfig = {
            direction: 'horizontal',
            constrain: this.slider.fieldEl,
            revert: false,
            thumb: this
        };
    },

    // inherit docs
    setValue: function(newValue) {
        this.value = newValue;
    },

    // inherit docs
    getValue: function() {
        return this.value;
    }
});

Ext.reg('thumb', Ext.form.Slider.Thumb);
