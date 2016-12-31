
var bootdiagFormCounter = 0;

function bootdiag(options) {
    bootdiagFormCounter++;

    var opts = {
        title: "",
        showclose: true,
        content: [],
        buttons: ["close"],
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


    var modalWindow = $('<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="bootdiag-title"></div>');
    var dialog = $('<div class="modal-dialog" role="document"></div>');
    var content = $('<div class="modal-content"></div>');
    dialog.append(content);
    modalWindow.append(dialog);
    
    // Header
    var header = $('<div class="modal-header"></div>');
    if(opts.showclose)
        header.append('<button type="button" class="bootdiag-button close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
    header.append('<h4 class="modal-title" id="bootdiag-title">' + opts.title + '</h4>');

    content.append(header);
    
    // Body
    var body = $('<div class="modal-body"></div>').appendTo(content);
    var form = $("<form></form>", { id: "bootdiag-form" + bootdiagFormCounter, class: "form-horizontal" }).appendTo(body);

    for(element in opts.content) {
        for(type in opts.content[element]) {
            var attrs = opts.content[element][type];
            
            switch(type) {
                case "input":
                    var inputID = (typeof attrs.id === "undefined" ? "bootdiag-form-input" + element : attrs.id);
                    attrs.id = inputID;
                    attrs.class = (typeof attrs.class === "undefined" ? "form-control" : attrs.class);
                    attrs.type = (typeof attrs.type === "undefined" ? "text" : attrs.type);

                    // Form Group
                    var formGroup = $('<div class="form-group"></div>').appendTo(form);
                    // Label
                    $("<label></label>", { for: inputID, class: "col-sm-2 control-label", text: attrs.label}).appendTo(formGroup);
                    // Input and div to control width
                    var divColSm = $('<div class="col-sm-10"></div>').appendTo(formGroup);
                    $("<input />", attrs).appendTo(divColSm);
                    break;
                default:
                    form.append($("<" + type + ">", attrs));
                
                /* // List of input types
                case "button": case "checkbox": case "color": case "date": case "datetime-local": 
                case "email": case "file": case "hidden": case "image": case "month": case "number":
                case "password": case "radio": case "range": case "reset": case "search":
                case "submit": case "tel": case "text": case "time": case "url": case "week": */
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
            "data-form": "#bootdiag-form" + bootdiagFormCounter,
            click: function(e) {
                var callback = opts[$(e.target).attr("data-callback")];
                var form = $(e.target).attr("data-form");
                callback($(form).serializeArray(), e);
            }
        }).appendTo(footer);
    }

    // Fire the modal window
    modalWindow.modal();
    modalWindow.on('hidden.bs.modal', function (e) { opts.complete(e); });
}


bootdiag.alert = function(message, title) {
    if(typeof title !== "string")
        title = document.title;
    
    bootdiag({
        title: title,
        content: [{ p: {text: message}}]
    });
}

bootdiag.confirm = function(message, title, answerCallback) {
    if(typeof title !== "string")
        title = document.title;
    
    var isYes = false;
    bootdiag({
        title: title,
        content: [{ p: {text: message}}],
        buttons: ["no", "yes"],
        yes: function(data) { isYes = true; answerCallback("yes"); },
        complete: function(data) { if(!isYes) answerCallback("no"); }
    });
}

bootdiag.prompt = function(label, type, message, title, onOKCallback) {
    if(typeof type !== "string")
        type = "text";
    if(typeof message !== "string")
        message = "Provide a " + type + " for:";
    if(typeof title !== "string")
        title = document.title;
    if(typeof onOKCallback !== "function")
        onOKCallback = function() {};
    
    bootdiag({
        title: title,
        content: [
            { p: {text: message}},
            { input: {type: type, name: "value", label: label}}],
        buttons: ["cancel", "ok"],
        ok: onOKCallback
    });
}
