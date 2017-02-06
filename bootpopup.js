/**************************************************************************
 * Popup dialog boxes for Bootstrap - http://www.bootpopup.tk
 * Copyright (C) 2016  rigon<ricardompgoncalves@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *************************************************************************/


var bootpopupFormCounter = 0;

function bootpopup(options) {
    bootpopupFormCounter++;

    var opts = {
        title: document.title,
        showclose: true,
        content: [],
        buttons: ["close"],
        dismiss: function(data) {},
        close: function(data) {},
        ok: function(data) {},
        cancel: function(data) {},
        yes: function(data) {},
        no: function(data) {},
        complete: function(data) {},
    }

    
    var buttons = [];
    for(key in options) {
        if(key in opts)
            opts[key] = options[key];
        // If an event for a button is given, show the respective button
        if(["close", "ok", "cancel", "yes", "no"].indexOf(key) >= 0)
            buttons.push(key);
    }
    // Copy news buttons to opts.buttons
    if(buttons.length > 0) {
        // Clear default buttons if new are not given
        if(!("buttons" in options)) opts.buttons = [];
        buttons.forEach(function(item) {
            if(opts.buttons.indexOf(item) < 0) opts.buttons.push(item);
        });
    }


    var modalWindow = $('<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="bootpopup-title"></div>');
    var dialog = $('<div class="modal-dialog" role="document"></div>');
    var content = $('<div class="modal-content"></div>');
    dialog.append(content);
    modalWindow.append(dialog);
    
    // Header
    var header = $('<div class="modal-header"></div>');
    if(opts.showclose)
        header.append('<button type="button" class="bootpopup-button close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
    header.append('<h4 class="modal-title" id="bootpopup-title">' + opts.title + '</h4>');

    content.append(header);
    
    // Body
    var body = $('<div class="modal-body"></div>').appendTo(content);
    var form = $("<form></form>", { id: "bootpopup-form" + bootpopupFormCounter, class: "form-horizontal" }).appendTo(body);

    for(element in opts.content) {
        for(type in opts.content[element]) {
            var attrs = opts.content[element][type];
            
            for(attribute in attrs)
                if(typeof attrs[attribute] === "function")
                    attrs[attribute] = "("+ attrs[attribute] + ")(this)";

            switch(type) {
                /* // List of input types
                case "button": case "checkbox": case "color": case "date": case "datetime-local": 
                case "email": case "file": case "hidden": case "image": case "month": case "number":
                case "password": case "radio": case "range": case "reset": case "search":
                case "submit": case "tel": case "text": case "time": case "url": case "week": */
                case "button": case "text": case "submit": case "color": case "url": case "password": 
                case "hidden": case "file": case "number": case "email": case "reset": case "date":
                    attrs.type = type;
                    // Continue for input
                case "input":
                    attrs.id = (typeof attrs.id === "undefined" ? "bootpopup-form-input" + element : attrs.id);
                    attrs.class = (typeof attrs.class === "undefined" ? "form-control" : attrs.class);
                    attrs.type = (typeof attrs.type === "undefined" ? "text" : attrs.type);

                    // Form Group
                    var formGroup = $('<div class="form-group"></div>').appendTo(form);
                    // Label
                    $("<label></label>", { for: attrs.id, class: "col-sm-2 control-label", text: attrs.label}).appendTo(formGroup);
                    // Input and div to control width
                    var divColSm = $('<div class="col-sm-10"></div>').appendTo(formGroup);
                    $("<input />", attrs).appendTo(divColSm);
                    break;
                default:
                    form.append($("<" + type + ">", attrs));
            }
        }
    }

    // Footer
    var footer = $('<div class="modal-footer"></div>');
    content.append(footer);

    for(key in opts.buttons) {
        var item = opts.buttons[key];
        var btnClass = "";
        var btnText = "";

        switch(item) {
            case "close": btnClass = "btn-primary"; btnText="Close"; break;
            case "ok": btnClass = "btn-primary"; btnText="OK"; break;
            case "cancel": btnClass = "btn-default"; btnText="Cancel"; break;
            case "yes": btnClass = "btn-primary"; btnText="Yes"; break;
            case "no": btnClass = "btn-default"; btnText="No"; break;
        }
        
        $("<button></button>", {
            type: "button",
            text: btnText,
            class: "btn " + btnClass,
            "data-dismiss": "modal",
            "data-callback": item,
            "data-form": "#bootpopup-form" + bootpopupFormCounter,
            click: function(e) {
                var callback = opts[$(e.target).attr("data-callback")];
                var form = $(e.target).attr("data-form");
                callback($(form).serializeArray(), e);
            }
        }).appendTo(footer);
    }

    // Fire the modal window
    modalWindow.modal();
    modalWindow.on('hide.bs.modal', function (e) { opts.dismiss(e); });
    modalWindow.on('hidden.bs.modal', function (e) { opts.complete(e); });
}


bootpopup.alert = function(message, title, callback) {
    if(typeof title === "function")
        callback = title;

    if(typeof title !== "string")
        title = document.title;
    if(typeof callback !== "function")
        callback = function() {};
    
    bootpopup({
        title: title,
        content: [{ p: {text: message}}],
        dismiss: function(data) { callback(); }
    });
}

bootpopup.confirm = function(message, title, callback) {
    if(typeof title === "function")
        callback = title;

    if(typeof title !== "string")
        title = document.title;
    if(typeof callback !== "function")
        callback = function() {};
    
    var answer = false;
    bootpopup({
        title: title,
        showclose: false,
        content: [{ p: {text: message}}],
        buttons: ["no", "yes"],
        yes: function(data) { answer = true; },
        dismiss: function(data) { callback(answer); }
    });
}

bootpopup.prompt = function(label, type, message, title, callback) {
    if(typeof type === "function")
        callback = type;
    if(typeof message === "function")
        callback = message;
    if(typeof title === "function")
        callback = title;

    if(typeof type !== "string")
        type = "text";
    if(typeof message !== "string")
        message = "Provide a " + type + " for:";
    if(typeof title !== "string")
        title = document.title;
    if(typeof callback !== "function")
        callback = function() {};
    
    bootpopup({
        title: title,
        content: [
            { p: {text: message}},
            { input: {type: type, name: "value", label: label}}],
        buttons: ["cancel", "ok"],
        ok: callback
    });
}
