/**
 * @class Ext.Container
 * @extends Ext.Component
 * <p>Base class for any {@link Ext.BoxComponent} that may contain other Components. Containers handle the
 * basic behavior of containing items, namely adding, inserting and removing items.</p>
 *
 * <p><u><b>Layout</b></u></p>
 * <p>Container classes delegate the rendering of child Components to a layout
 * manager class which must be configured into the Container using the
 * <code><b>{@link #layout}</b></code> configuration property.</p>
 * <p>When either specifying child <code>{@link #items}</code> of a Container,
 * or dynamically {@link #add adding} Components to a Container, remember to
 * consider how you wish the Container to arrange those child elements, and
 * whether those child elements need to be sized using one of Ext's built-in
 * <b><code>{@link #layout}</code></b> schemes. By default, Containers use the
 * {@link Ext.layout.AutoContainerLayout AutoContainerLayout} scheme which only
 * renders child components, appending them one after the other inside the
 * Container, and <b>does not apply any sizing</b> at all.</p>
 * <p>A common mistake is when a developer neglects to specify a
 * <b><code>{@link #layout}</code></b>. If a Container is left to use the default
 * {@link Ext.layout.AutoContainerLayout AutoContainerLayout} scheme, none of its
 * child components will be resized, or changed in any way when the Container
 * is resized.</p>
 * @xtype container
 */
Ext.Container = Ext.extend(Ext.Component, {
    /**
     * @cfg {String/Object} layout
     * <p><b>*Important</b>: In order for child items to be correctly sized and
     * positioned, typically a layout manager <b>must</b> be specified through
     * the <code>layout</code> configuration option.</p>
     * <br><p>The sizing and positioning of child {@link items} is the responsibility of
     * the Container's layout manager which creates and manages the type of layout
     * you have in mind.  For example:</p>
     * <p>If the {@link #layout} configuration is not explicitly specified for
     * a general purpose container (e.g. Container or Panel) the
     * {@link Ext.layout.AutoContainerLayout default layout manager} will be used
     * which does nothing but render child components sequentially into the
     * Container (no sizing or positioning will be performed in this situation).</p>
     * <br><p><b><code>layout</code></b> may be specified as either as an Object or
     * as a String:</p><div><ul class="mdetail-params">
     *
     * <li><u>Specify as an Object</u></li>
     * <div><ul class="mdetail-params">
     * <li>Example usage:</li>
     * <pre><code>
layout: {
    type: 'vbox',
    padding: '5',
    align: 'left'
}
       </code></pre>
     *
     * <li><code><b>type</b></code></li>
     * <br/><p>The layout type to be used for this container.  If not specified,
     * a default {@link Ext.layout.ContainerLayout} will be created and used.</p>
     * <br/><p>Valid layout <code>type</code> values are:</p>
     * <div class="sub-desc"><ul class="mdetail-params">
     * <li><code><b>{@link Ext.layout.ContainerLayout auto}</b></code> &nbsp;&nbsp;&nbsp; <b>Default</b></li>
     * <li><code><b>{@link Ext.layout.CardLayout card}</b></code></li>
     * <li><code><b>{@link Ext.layout.FitLayout fit}</b></code></li>
     * <li><code><b>{@link Ext.layout.HBoxLayout hbox}</b></code></li>
     * <li><code><b>{@link Ext.layout.VBoxLayout vbox}</b></code></li>
     * </ul></div>
     *
     * <li>Layout specific configuration properties</li>
     * <br/><p>Additional layout specific configuration properties may also be
     * specified. For complete details regarding the valid config options for
     * each layout type, see the layout class corresponding to the <code>type</code>
     * specified.</p>
     *
     * </ul></div>
     *
     * <li><u>Specify as a String</u></li>
     * <div><ul class="mdetail-params">
     * <li>Example usage:</li>
     * <pre><code>
layout: {
    type: 'vbox',
    padding: '5',
    align: 'left'
}
       </code></pre>
     * <li><code><b>layout</b></code></li>
     * <br/><p>The layout <code>type</code> to be used for this container (see list
     * of valid layout type values above).</p><br/>
     * <br/><p>Additional layout specific configuration properties. For complete
     * details regarding the valid config options for each layout type, see the
     * layout class corresponding to the <code>layout</code> specified.</p>
     * </ul></div></ul></div>
     */
    /**
     * @cfg {Object} layoutConfig
     * This is a config object containing properties specific to the chosen
     * <b><code>{@link #layout}</code></b> if <b><code>{@link #layout}</code></b>
     * has been specified as a <i>string</i>.</p>
     */


    /**
     * @cfg {String/Number} activeItem
     * A string component id or the numeric index of the component that should be initially activated within the
     * container's layout on render.  For example, activeItem: 'item-1' or activeItem: 0 (index 0 = the first
     * item in the container's collection).  activeItem only applies to layout styles that can display
     * items one at a time (like {@link Ext.layout.CardLayout} and
     * {@link Ext.layout.FitLayout}).  Related to {@link Ext.layout.ContainerLayout#activeItem}.
     */
    /**
     * @cfg {Object/Array} items
     * <pre><b>** IMPORTANT</b>: be sure to <b>{@link #layout specify a <code>layout</code>} if needed ! **</b></pre>
     * <p>A single item, or an array of child Components to be added to this container,
     * for example:</p>
     * <pre><code>
// specifying a single item
items: {...},
layout: 'fit',    // specify a layout!

// specifying multiple items
items: [{...}, {...}],
layout: 'hbox', // specify a layout!
       </code></pre>
     * <p>Each item may be:</p>
     * <div><ul class="mdetail-params">
     * <li>any type of object based on {@link Ext.Component}</li>
     * <li>a fully instanciated object or</li>
     * <li>an object literal that:</li>
     * <div><ul class="mdetail-params">
     * <li>has a specified <code>{@link Ext.Component#xtype xtype}</code></li>
     * <li>the {@link Ext.Component#xtype} specified is associated with the Component
     * desired and should be chosen from one of the available xtypes as listed
     * in {@link Ext.Component}.</li>
     * <li>If an <code>{@link Ext.Component#xtype xtype}</code> is not explicitly
     * specified, the {@link #defaultType} for that Container is used.</li>
     * <li>will be "lazily instanciated", avoiding the overhead of constructing a fully
     * instanciated Component object</li>
     * </ul></div></ul></div>
     * <p><b>Notes</b>:</p>
     * <div><ul class="mdetail-params">
     * <li>Ext uses lazy rendering. Child Components will only be rendered
     * should it become necessary. Items are automatically laid out when they are first
     * shown (no sizing is done while hidden), or in response to a {@link #doLayout} call.</li>
     * <li>Do not specify <code>{@link Ext.Panel#contentEl contentEl}</code>/
     * <code>{@link Ext.Panel#html html}</code> with <code>items</code>.</li>
     * </ul></div>
     */
    /**
     * @cfg {Object|Function} defaults
     * <p>This option is a means of applying default settings to all added items whether added through the {@link #items}
     * config or via the {@link #add} or {@link #insert} methods.</p>
     * <p>If an added item is a config object, and <b>not</b> an instantiated Component, then the default properties are
     * unconditionally applied. If the added item <b>is</b> an instantiated Component, then the default properties are
     * applied conditionally so as not to override existing properties in the item.</p>
     * <p>If the defaults option is specified as a function, then the function will be called using this Container as the
     * scope (<code>this</code> reference) and passing the added item as the first parameter. Any resulting object
     * from that call is then applied to the item as default properties.</p>
     * <p>For example, to automatically apply padding to the body of each of a set of
     * contained {@link Ext.Panel} items, you could pass: <code>defaults: {bodyStyle:'padding:15px'}</code>.</p>
     * <p>Usage:</p><pre><code>
defaults: {               // defaults are applied to items, not the container
    autoScroll:true
},
items: [
    {
        xtype: 'panel',   // defaults <b>do not</b> have precedence over
        id: 'panel1',     // options in config objects, so the defaults
        autoScroll: false // will not be applied here, panel1 will be autoScroll:false
    },
    new Ext.Panel({       // defaults <b>do</b> have precedence over options
        id: 'panel2',     // options in components, so the defaults
        autoScroll: false // will be applied here, panel2 will be autoScroll:true.
    })
]
       </code></pre>
     */


    /** @cfg {Boolean} autoDestroy
     * If true the container will automatically destroy any contained component that is removed from it, else
     * destruction must be handled manually (defaults to true).
     */
    autoDestroy : true,

     /** @cfg {String} defaultType
      * <p>The default {@link Ext.Component xtype} of child Components to create in this Container when
      * a child item is specified as a raw configuration object, rather than as an instantiated Component.</p>
      * <p>Defaults to <code>'panel'</code>.</p>
      */
    defaultType: 'panel',

    isContainer : true,

    baseCls: 'x-container',

    /**
     * @cfg {String} animation
     * Animation to be used during transitions of cards. Note this only works when this container has a CardLayout.
     * Any valid value from Ext.anims can be used ('fade', 'slide', 'flip', 'cube', 'pop', 'wipe').
     * Defaults to null.
     */
    animation: null,

    // @private
    initComponent : function(){
        Ext.Container.superclass.initComponent.call(this);

        this.addEvents(
            /**
             * @event afterlayout
             * Fires when the components in this container are arranged by the associated layout manager.
             * @param {Ext.Container} this
             * @param {ContainerLayout} layout The ContainerLayout implementation for this container
             */
            'afterlayout',
            /**
             * @event beforeadd
             * Fires before any {@link Ext.Component} is added or inserted into the container.
             * A handler can return false to cancel the add.
             * @param {Ext.Container} this
             * @param {Ext.Component} component The component being added
             * @param {Number} index The index at which the component will be added to the container's items collection
             */
            'beforeadd',
            /**
             * @event beforeremove
             * Fires before any {@link Ext.Component} is removed from the container.  A handler can return
             * false to cancel the remove.
             * @param {Ext.Container} this
             * @param {Ext.Component} component The component being removed
             */
            'beforeremove',
            /**
             * @event add
             * @bubbles
             * Fires after any {@link Ext.Component} is added or inserted into the container.
             * @param {Ext.Container} this
             * @param {Ext.Component} component The component that was added
             * @param {Number} index The index at which the component was added to the container's items collection
             */
            'add',
            /**
             * @event remove
             * @bubbles
             * Fires after any {@link Ext.Component} is removed from the container.
             * @param {Ext.Container} this
             * @param {Ext.Component} component The component that was removed
             */
            'remove',            
            /**
             * @event beforecardswitch
             * Fires before this container switches the active card. This event
             * is only available if this container uses a CardLayout. Note that
             * TabPanel and Carousel both get a CardLayout by default, so both
             * will have this event.
             * A handler can return false to cancel the card switch.
             * @param {Ext.Container} this
             * @param {Ext.Component} newCard The card that will be switched to
             * @param {Ext.Component} oldCard The card that will be switched from
             * @param {Number} index The index of the card that will be switched to
             * @param {Boolean} animated True if this cardswitch will be animated
             */
            'beforecardswitch',
            /**
             * @event cardswitch
             * Fires after this container switches the active card. If the card
             * is switched using an animation, this event will fire after the
             * animation has finished. This event is only available if this container 
             * uses a CardLayout. Note that TabPanel and Carousel both get a CardLayout 
             * by default, so both will have this event.
             * @param {Ext.Container} this
             * @param {Ext.Component} newCard The card that has been switched to
             * @param {Ext.Component} oldCard The card that has been switched from
             * @param {Number} index The index of the card that has been switched to
             * @param {Boolean} animated True if this cardswitch was animated
             */
            'cardswitch'
        );

        this.initItems();
    },

    // @private
    initItems : function(){
        var items = this.items;
        /**
         * @property items
         * @type {@link Ext.util.MixedCollection}
         * The MixedCollection containing all the child items of this container.
         */
        this.items = new Ext.util.MixedCollection(false, this.getComponentId);
        if (items) {
            this.add(items);
        }
    },

    // @private
    setLayout : function(layout) {
        if (this.layout && this.layout != layout) {
            this.layout.setOwner(null);
        }
        this.layout = layout;
        layout.setOwner(this);
    },

    // @private
    prepareItems : function(items, applyDefaults) {
        if (!Ext.isArray(items)) {
            items = [items];
        }
        // Make sure defaults are applied and item is initialized
        var item, i, ln;
        for (i = 0, ln = items.length; i < ln; i++) {
            item = items[i];
            if (applyDefaults) {
                item = this.applyDefaults(item);
            }
            items[i] = this.lookupComponent(item);
        }
        return items;
    },

    // @private
    applyDefaults : function(c) {
        var d = this.defaults;
        if (d) {
            if (Ext.isFunction(d)) {
                d = d.call(this, c);
            }
            if (typeof c == 'string') {
                c = Ext.ComponentMgr.get(c);
                Ext.apply(c, d);
            }
            else if (!c.events) {
                Ext.applyIf(c, d);
            }
            else {
                Ext.apply(c, d);
            }
        }
        return c;
    },

    // @private
    lookupComponent : function(comp) {
        if (typeof comp == 'string') {
            return Ext.ComponentMgr.get(comp);
        }
        else if (!comp.events) {
            return this.createComponent(comp);
        }
        return comp;
    },

    // @private
    createComponent : function(config, defaultType){
        if (config.render) {
            return config;
        }
        // add in ownerCt at creation time but then immediately
        // remove so that onBeforeAdd can handle it
        var c = Ext.create(Ext.apply({
            ownerCt: this
        }, config), defaultType || this.defaultType);
        delete c.initialConfig.ownerCt;
        delete c.ownerCt;
        return c;
    },

    // @private
    afterRender : function() {
        this.layout = this.initLayout(this.layout, 'auto');
        this.setLayout(this.layout);

        Ext.Container.superclass.afterRender.call(this);
    },

    /**
     * Force this container's layout to be recalculated. A call to this function is required after adding a new component
     * to an already rendered container, or possibly after changing sizing/position properties of child components.
     * @return {Ext.Container} this
     */
    doLayout : function() {
        if (this.rendered && this.layout) {
            this.layout.layout();
        }
        return this;
    },

    // @private
    afterLayout : function(layout) {
        if (this.floating && this.centered) {
            this.setCentered(true, true);
        }

        if (this.scroller) {
            this.scroller.updateBounds();
        }

        this.fireEvent('afterlayout', this, layout);
    },

    /**
     * <p>Returns the Element to be used to contain the child Components of this Container.</p>
     * <p>An implementation is provided which returns the Container's {@link #getEl Element}, but
     * if there is a more complex structure to a Container, this may be overridden to return
     * the element into which the {@link #layout layout} renders child Components.</p>
     * @return {Ext.Element} The Element to render child Components into.
     */
    getLayoutTarget : function(){
        return this.el;
    },

    // @private - used as the key lookup function for the items collection
    getComponentId : function(comp){
        return comp.getItemId();
    },

    /**
     * <p>Adds {@link Ext.Component Component}(s) to this Container.</p>
     * <br><p><b>Description</b></u> :
     * <div><ul class="mdetail-params">
     * <li>Fires the {@link #beforeadd} event before adding</li>
     * <li>The Container's {@link #defaults default config values} will be applied
     * accordingly (see <code>{@link #defaults}</code> for details).</li>
     * <li>Fires the {@link #add} event after the component has been added.</li>
     * </ul></div>
     * <br><p><b>Notes</b></u> :
     * <div><ul class="mdetail-params">
     * <li>If the Container is <i>already rendered</i> when <code>add</code>
     * is called, you may need to call {@link #doLayout} to refresh the view which causes
     * any unrendered child Components to be rendered. This is required so that you can
     * <code>add</code> multiple child components if needed while only refreshing the layout
     * once. For example:<pre><code>
var tb = new {@link Ext.Toolbar}();
tb.render(document.body);  // toolbar is rendered
tb.add({text:'Button 1'}); // add multiple items ({@link #defaultType} for {@link Ext.Toolbar Toolbar} is 'button')
tb.add({text:'Button 2'});
tb.{@link #doLayout}();             // refresh the layout
     * </code></pre></li>
     * <li><i>Warning:</i> Containers directly managed by the BorderLayout layout manager
     * may not be removed or added.  See the Notes for {@link Ext.layout.BorderLayout BorderLayout}
     * for more details.</li>
     * </ul></div>
     * @param {...Object/Array} component
     * <p>Either one or more Components to add or an Array of Components to add.  See
     * <code>{@link #items}</code> for additional information.</p>
     * @return {Ext.Component/Array} The Components that were added.
     */
    add : function() {
        var args = Array.prototype.slice.call(arguments),
            index = -1;

        if (typeof args[0] == 'number') {
            index = args.shift();
        }

        var hasMultipleArgs = args.length > 1;
        if (hasMultipleArgs || Ext.isArray(args[0])) {
            var items = hasMultipleArgs ? args : args[0],
                results = [],
                i, ln, item;

            for (i = 0, ln = items.length; i < ln; i++) {
                item = items[i];
                if (index != -1) {
                    item = this.add(index + i, item);
                }
                else {
                    item = this.add(item);
                }
                results.push(item);
            }

            return results;
        }

        var cmp = this.prepareItems(args[0], true)[0];
        index = (index !== -1) ? index : this.items.length;

        if (this.fireEvent('beforeadd', this, cmp, index) !== false && this.onBeforeAdd(cmp) !== false) {
            this.items.insert(index, cmp);
            cmp.onAdded(this, index);
            this.onAdd(cmp);
            this.fireEvent('add', this, cmp, index);
        }

        return cmp;
    },

    onAdd : Ext.emptyFn,
    onRemove : Ext.emptyFn,

    /**
     * Inserts a Component into this Container at a specified index. Fires the
     * {@link #beforeadd} event before inserting, then fires the {@link #add} event after the
     * Component has been inserted.
     * @param {Number} index The index at which the Component will be inserted
     * into the Container's items collection
     * @param {Ext.Component} component The child Component to insert.<br><br>
     * Ext uses lazy rendering, and will only render the inserted Component should
     * it become necessary.<br><br>
     * A Component config object may be passed in order to avoid the overhead of
     * constructing a real Component object if lazy rendering might mean that the
     * inserted Component will not be rendered immediately. To take advantage of
     * this 'lazy instantiation', set the {@link Ext.Component#xtype} config
     * property to the registered type of the Component wanted.<br><br>
     * For a list of all available xtypes, see {@link Ext.Component}.
     * @return {Ext.Component} component The Component (or config object) that was
     * inserted with the Container's default config values applied.
     */
    insert : function(index, comp){
        this.add(index, comp);
    },

    // @private
    onBeforeAdd : function(item) {
        if (item.ownerCt) {
            item.ownerCt.remove(item, false);
        }
        if (this.hideBorders === true){
            item.border = (item.border === true);
        }
    },

    /**
     * Removes a component from this container.  Fires the {@link #beforeremove} event before removing, then fires
     * the {@link #remove} event after the component has been removed.
     * @param {Component/String} component The component reference or id to remove.
     * @param {Boolean} autoDestroy (optional) True to automatically invoke the removed Component's {@link Ext.Component#destroy} function.
     * Defaults to the value of this Container's {@link #autoDestroy} config.
     * @return {Ext.Component} component The Component that was removed.
     */
    remove : function(comp, autoDestroy) {
        var c = this.getComponent(comp);
        if (c && this.fireEvent('beforeremove', this, c) !== false) {
            this.doRemove(c, autoDestroy);
            this.fireEvent('remove', this, c);
        }
        return c;
    },

    // @private
    doRemove : function(component, autoDestroy) {
        var layout = this.layout,
            hasLayout = layout && this.rendered;

        if (hasLayout) {
            layout.onRemove(component);
        }

        this.items.remove(component);
        component.onRemoved();
        this.onRemove(component);

        if (autoDestroy === true || (autoDestroy !== false && this.autoDestroy)) {
            component.destroy();
        }

        if (hasLayout) {
            layout.afterRemove(component);
        }
    },

    /**
     * Removes all components from this container.
     * @param {Boolean} autoDestroy (optional) True to automatically invoke the removed Component's {@link Ext.Component#destroy} function.
     * Defaults to the value of this Container's {@link #autoDestroy} config.
     * @return {Array} Array of the destroyed components
     */
    removeAll : function(autoDestroy) {
        var item,
            removeItems = this.items.items.slice(),
            items = [],
            ln = removeItems.length,
            i;
        for (i = 0; i < ln; i++) {
            item = removeItems[i];
            this.remove(item, autoDestroy);
            if (item.ownerCt !== this) {
                items.push(item);
            }
        }
        return items;
    },

    /**
     * Examines this container's <code>{@link #items}</code> <b>property</b>
     * and gets a direct child component of this container.
     * @param {String/Number} comp This parameter may be any of the following:
     * <div><ul class="mdetail-params">
     * <li>a <b><code>String</code></b> : representing the <code>{@link Ext.Component#itemId itemId}</code>
     * or <code>{@link Ext.Component#id id}</code> of the child component </li>
     * <li>a <b><code>Number</code></b> : representing the position of the child component
     * within the <code>{@link #items}</code> <b>property</b></li>
     * </ul></div>
     * <p>For additional information see {@link Ext.util.MixedCollection#get}.
     * @return Ext.Component The component (if found).
     */
    getComponent : function(comp) {
        if (Ext.isObject(comp)) {
            comp = comp.getItemId();
        }
        return this.items.get(comp);
    },

    // @private
    onShow : function(){
        // removes css classes that were added to hide
        Ext.Container.superclass.onShow.apply(this, arguments);
        // If we were sized during the time we were hidden, layout.
        if (Ext.isDefined(this.deferLayout)) {
            delete this.deferLayout;
            this.doLayout(true);
        }
    },

    /**
     * Returns the layout currently in use by the container.  If the container does not currently have a layout
     * set, a default {@link Ext.layout.ContainerLayout} will be created and set as the container's layout.
     * @return {ContainerLayout} layout The container's layout
     */
    getLayout : function() {
        if (!this.layout) {
            var layout = new Ext.layout.AutoLayout(this.layoutConfig);
            this.setLayout(layout);
        }
        return this.layout;
    },

    // inherit docs
    setScrollable : function(direction) {
        Ext.Container.superclass.setScrollable.call(this, direction);

        if (direction !== false) {
            this.originalGetLayoutTarget = this.getLayoutTarget;
            this.getLayoutTarget = function() {
                return this.scrollEl;
            };
        }
        else {
            this.getLayoutTarget = this.originalGetLayoutTarget;
        }
    },

    // @private
    beforeDestroy : function() {
        var c;
        if (this.items) {
            c = this.items.first();
            while (c) {
                this.doRemove(c, true);
                c = this.items.first();
            }
        }
        Ext.destroy(this.layout);
        Ext.Container.superclass.beforeDestroy.call(this);
    },

    /**
     * Returns the current activeItem for the layout (only for a card layout)
     * @return {activeItem} activeItem Current active component
     */
    getActiveItem : function() {
        if (this.layout && this.layout.type === 'card') {
            return this.layout.activeItem;
        }
        else {
            return null;
        }
    },

    /**
     * Allows you to set the active card in this container. This
     * method is only available if the container uses a CardLayout.
     * Note that a Carousel and TabPanel both get a CardLayout
     * automatically, so both of those components are able to use this method.
     * @param {Ext.Component/Number/Object} card The card you want to be made active. A number
     * is interpreted as a card index. An object will be converted to a Component using the
     * objects xtype property, then added to the container and made active. Passing a Component
     * will make sure the component is a child of this container, and then make it active.
     * @param {String/Object} animation (optional) The animation used to switch between the cards.
     * This can be an animation type string or an animation configuration object.
     * @return {Ext.Container} this
     */
    setCard : function(card, animation) {
        this.layout.setActiveItem(card, animation);
        return this;
    },
        
    /**
     * A template method that can be implemented by subclasses of
     * Container. By returning false we can cancel the card switch.
     * @param {Ext.Component} newCard The card that will be switched to
     * @param {Ext.Component} oldCard The card that will be switched from
     * @param {Boolean} animated True if this cardswitch will be animated
     * @private
     */
    onBeforeCardSwitch : function(newCard, oldCard, animated) {
        return this.fireEvent('beforecardswitch', this, newCard, oldCard, this.items.indexOf(newCard), animated);
    },
    
    /**
     * A template method that can be implemented by subclasses of
     * Container. If the card is switched using an animation, this method 
     * will be called after the animation has finished.
     * @param {Ext.Component} newCard The card that has been switched to
     * @param {Ext.Component} oldCard The card that has been switched from
     * @param {Boolean} animated True if this cardswitch was animated
     * @private
     */
    onCardSwitch : function(newCard, oldCard, animated) {
        return this.fireEvent('cardswitch', this, newCard, oldCard, this.items.indexOf(newCard), animated);
    }
});

// Backwards compatibility (DEPRECATED)
Ext.Container.LAYOUTS = Ext.layout.TYPES;

Ext.reg('container', Ext.Container);
