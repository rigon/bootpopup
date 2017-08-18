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


/* // List of input types
case "button": case "checkbox": case "color": case "date": case "datetime-local": 
case "email": case "file": case "hidden": case "image": case "month": case "number":
case "password": case "radio": case "range": case "reset": case "search":
case "submit": case "tel": case "text": case "time": case "url": case "week": */
var INPUT_SHORTCUT_TYPES = [ "button", "text", "submit", "color", "url", "password",
    "hidden", "file", "number", "email", "reset", "date", "checkbox" ];


function bootpopup(options) {
    // Create a global random ID for the form
    this.formid = "bootpopup-form" + String(Math.random()).substr(2);

    var opts = {
        title: document.title,
        showclose: true,
        size: "normal",
        size_labels: "col-sm-4",
        size_inputs: "col-sm-8",
        content: [],
        buttons: ["close"],
        before: function() {},
        dismiss: function() {},
        close: function() {},
        ok: function() {},
        cancel: function() {},
        yes: function() {},
        no: function() {},
        complete: function() {},
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

    // Option for modal dialog size
    var classModalDialog = "modal-dialog";
    if(opts.size == "large") classModalDialog += " modal-lg";
    if(opts.size == "small") classModalDialog += " modal-sm";

    // Create HTML elements for modal dialog
    var modalWindow = $('<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="bootpopup-title"></div>');
    var dialog = $('<div></div>', { class: classModalDialog, role: "document" });
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
    var form = $("<form></form>", { id: this.formid, class: "form-horizontal", onsubmit: "return false;" }).appendTo(body);

    // Iterate over entries
    for(var i in opts.content) {
        var entry = opts.content[i];
        switch(typeof entry) {
            case "string":		// HTML string
                form.append(entry);
                break;
            case "object":
                for(var type in entry) {
                    var attrs = entry[type];
                    
                    // Convert functions to string to be used as callback
                    for(var attribute in attrs)
                        if(typeof attrs[attribute] === "function")
                            attrs[attribute] = "("+ attrs[attribute] + ")(this)";

                    // Check if type is a shortcut for input
                    if(INPUT_SHORTCUT_TYPES.indexOf(type) >= 0) {
                        attrs.type = type;  // Add attribute for type
                        type = "input";     // Continue to input
                    }
                    
                    if(type == "input") {
                        // To avoid adding "form-control" class
                        if(attrs.type === "checkbox" && typeof attrs.class === "undefined")
                            attrs.class = "";

                        // Create a random id for the input if none provided
                        attrs.id = (typeof attrs.id === "undefined" ? "bootpopup-input" + String(Math.random()).substr(2) : attrs.id);
                        attrs.class = (typeof attrs.class === "undefined" ? "form-control" : attrs.class);
                        attrs.type = (typeof attrs.type === "undefined" ? "text" : attrs.type);

                        // Create input
                        var input = $("<input />", attrs);

                        // Special case for checkbox
                        if(attrs.type === "checkbox") {
                            input = $('<div class="checkbox"></div>')
                                .append($('<label></label>')
                                .append(input)
                                .append(attrs.label));
                            // Clear label to not add as header, it was added before
                            attrs.label = "";
                        }

                        // Form Group
                        var formGroup = $('<div class="form-group"></div>').appendTo(form);
                        // Label
                        $("<label></label>", { for: attrs.id, class: "control-label " + opts.size_labels, text: attrs.label }).appendTo(formGroup);

                        // Input and div to control width
                        var divInput = $('<div></div>', { class: opts.size_inputs });
                        divInput.append(input);
                        formGroup.append(divInput)
                    }
                    else    // Anything else besides input
                        form.append($("<" + type + "></" + type + ">", attrs));     // Add directly
                }
                break;
            default:
                throw "Invalid entry type";
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
            "data-form": this.formid,

            click: function(e) {
                var button = $(e.target);
                var callback = opts[button.attr("data-callback")];
                var form = button.attr("data-form");
                var array = $("#" + form).serializeArray();
                var keyval = {};
                for(var i in array)
                    keyval[array[i].name] = array[i].value;

                callback(keyval, array, e);
            }
        }).appendTo(footer);
    }

    // Setup events for dismiss and complete
    modalWindow.on('hide.bs.modal', opts.dismiss);
    modalWindow.on('hidden.bs.modal', function(e) {
        opts.complete(e);
        modalWindow.remove();   // Delete window after complete
    });

    // Add window to body
    $(document.body).append(modalWindow);

    // Call before event
    opts.before(modalWindow);
    
    // Fire the modal window
    modalWindow.modal();
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
        dismiss: function() { callback(); }
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
        yes: function() { answer = true; },
        dismiss: function() { callback(answer); }
    });
}

bootpopup.prompt = function(label, type, message, title, callback) {
    // Callback can be in any position, except label
    var callback_function = function() {};
    if(typeof type === "function")
        callback_function = type;
    if(typeof message === "function")
        callback_function = message;
    if(typeof title === "function")
        callback_function = title;
    if(typeof callback === "function")
        callback_function = callback;

    // If a list of values is provided, then the parameters are shifted
    // because type should be ignored
    if(typeof label === "object") {
        title = message;
        message = type;
        type = null;
    }

    // Sanitize message and title
    if(typeof message !== "string")
        message = "Please, provide values for:";
    if(typeof title !== "string")
        title = document.title;

    // Add message to the window
    var content = [{ p: {text: message}}];

    // If label is a list of values to be asked to input
    if(typeof label === "object") {
        label.forEach(function(entry) {
            if(typeof entry.name !== "string")  // Name in lower case and dashes instead spaces
                entry.name = entry.label.toLowerCase().replace(/\s+/g,"-");
            if(typeof entry.type !== "string")
                entry.type = "text";
            content.push({ input: entry });
        });
    }
    else {
        if(typeof type !== "string") type = "text";
        content.push({ input: {type: type, name: "value", label: label}});
        callback_tmp = callback_function;   // Overload callback function to return "data.value"
        callback_function = function(data) { callback_tmp(data.value); };
    }
    
    bootpopup({
        title: title,
        content: content,
        buttons: ["cancel", "ok"],
        ok: function(data) {
            callback_function(data);
        }
    });
}

/**
 * AMD support: require.js
 */
if(typeof define === "function") {
    define(["jquery", "bootstrap"], function() {
      return bootpopup;
    });
}
