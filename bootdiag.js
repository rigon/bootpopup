
function bootdiag(options) {
    var opts = {
        title: "",
        showclose: true,
        content: [],
        buttons: ["close"],
        ok: function(data) {},
        cancel: function(data) {},
        yes: function(data) {},
        no: function(data) {},
    }

    for(key in options)
        if(key in opts)
            opts[key] = options[key];

    var modal = $('<div class="modal fade help" tabindex="-1" role="dialog" aria-labelledby="bootdiag-title"></div>');
    var dialog = $('<div class="modal-dialog" role="document"></div>');
    var content = $('<div class="modal-content"></div>');
    dialog.append(content);
    modal.append(dialog);
    
    var header = $('<div class="modal-header"></div>');
    if(opts.showclose)
        header.append('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
    header.append('<h4 class="modal-title" id="bootdiag-title">' + opts.title + '</h4>');

    content.append(header);
    
    var body = $('<div class="modal-body"></div>');
    var form = $('<form id="bootdiag-form" class="form-horizontal"></form>');
    body.append(form);
    content.append(body);

    for(element in opts.content) {
        for(type in opts.content[element]) {
            var attrs = opts.content[element][type];
            
            switch(type) {
                case "input":
                    var inputID = (typeof attrs.id === "undefined" ? "bootdiag-form-input" + element : attrs.id);
                    attrs.id = inputID;
                    attrs.class = (typeof attrs.class === "undefined" ? "form-control" : attrs.class);
                    attrs.type = (typeof attrs.type === "undefined" ? "text" : attrs.type);

                    var formGroup = $('<div class="form-group"></div>');
                    var labelInput = $('<label for="' + inputID + '" class="col-sm-2 control-label">' + attrs.label + '</label>');
                    formGroup.append(labelInput);

                    var divColSm = $('<div class="col-sm-10"></div>');
                    var inputElement = $("<input />", attrs);
                    divColSm.append(inputElement);
                    formGroup.append(divColSm);
                    form.append(formGroup);

                    break;
                default:
                    form.append($("<" + type + ">", attrs));
            }
        }

        /*for(type in opts.content[element]) {
            switch(type) {
                case "label":
                    form.append("<p>" + opts.content[element][type] + "</p>");
                    break;
                case "button": case "checkbox": case "color": case "date": case "datetime-local": 
                case "email": case "file": case "hidden": case "image": case "month": case "number":
                case "password": case "radio": case "range": case "reset": case "search":
                case "submit": case "tel": case "text": case "time": case "url": case "week":
                    form.append(
                        '<div class="form-group">\
                            <label for="bootdiag-form-input' + element + '" class="col-sm-2 control-label">Email</label>\
                            <div class="col-sm-10">\
                                <input type="' + type + '" class="form-control" id="bootdiag-form-input' + element + '" placeholder="Email">\
                            </div>\
                        </div>');
                    break;
            }
        }*/
    }


    var footer = $('<div class="modal-footer"></div>');
    content.append(footer);

    for(key in opts.buttons) {
        switch(opts.buttons[key]) {
            case "close":
                footer.append('<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>');
                break;
            case "ok":
                footer.append('<button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>');
                break;
            case "cancel":
                footer.append('<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>');
                break;
            case "yes":
                footer.append('<button type="button" class="btn btn-primary" data-dismiss="modal">Yes</button>');
                break;
            case "no":
                footer.append('<button type="button" class="btn btn-default" data-dismiss="modal">No</button>');
                break;
        }
    }

    modal.modal();
}


bootdiag.alert = function(message, title) {
    if(typeof title !== "string")
        title = document.title;
    
    bootdiag({
        title: title,
        content: [{ p: {text: message}}],
        ok: function(data) {},
        cancel: function(data) {},
        yes: function(data) {},
        no: function(data) {},
    });
}
