(function() {
    var tapHandler = function(button, event) {
        var txt = "User tapped the '" + button.text + "' button.";
        Ext.getCmp('toolbartxt').update(txt);
    };
    
    var buttonsGroup1 = [{
        text: 'Back',
        ui: 'back',
        handler: tapHandler
    }, {
        text: 'Default',
        badgeText: '2',
        handler: tapHandler
    }, {
        text: 'Round',
        ui: 'round',
        handler: tapHandler
    }];
    
    var buttonsGroup2 = [{
        xtype: 'splitbutton',
        activeButton: 0,
        items: [{
            text: 'Option 1',
            handler: tapHandler
        }, {
            text: 'Option 2',
            handler: tapHandler
        }, {
            text: 'Option 3',
            handler: tapHandler
        }]    
    }];
    
    var buttonsGroup3 = [{
        text: 'Action',
        ui: 'action',
        handler: tapHandler
    },
    {
        text: 'Forward',
        ui: 'forward',
        handler: tapHandler
    }];
    
    if (!Ext.platform.isPhone) {
        buttonsGroup1.push({xtype: 'spacer'});
        buttonsGroup2.push({xtype: 'spacer'});
        
        var dockedItems = [new Ext.Toolbar({
            // dock this toolbar at the bottom
            ui: 'light',
            dock: 'bottom',
            items: buttonsGroup1.concat(buttonsGroup2).concat(buttonsGroup3)
        })];
    }
    else {
        var dockedItems = [{
            xtype: 'toolbar',
            ui: 'light',
            items: buttonsGroup1,
            dock: 'bottom'
        }, {
            xtype: 'toolbar',
            ui: 'dark',
            items: buttonsGroup2,
            dock: 'bottom'
        }, {
            xtype: 'toolbar',
            ui: 'metal',
            items: buttonsGroup3,
            dock: 'bottom'
        }];
    }
    
    demos.Toolbars = new Ext.Panel({
        id: 'toolbartxt',
        cls: 'card',
        html: 'Pick a button, any button. <br /><small>By using SASS, all of the buttons on this screen can be restyled dynamically. The only images used are masks.</small>',
        dockedItems: dockedItems
    });
})();