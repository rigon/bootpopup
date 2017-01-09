# BootPopup

Popup dialog boxes for Bootstrap.

## Demos

See the demos in the Homepage: http://www.bootpopup.tk/#examples

## API

- `bootpopup.alert(message[, title[, callback])`

  - **message**: `(string)` message of the alert
  - **title**: `(string)` title of the alert; `(function)` callback when the alert is dismissed
  - **callback**: `(function)` callback when the alert is dismissed


## Examples

Open `index.html` to see the library in action.

- Alert:

        bootpopup.alert("Hi there");

- Confirm:
        
        bootpopup.confirm("Do you confirm this message?");

- Prompt:
		
        bootpopup.prompt("Name");

- Customized prompt:

        bootpopup({
            title: "Add image",
            content: [
                { p: {text: "Insert image info here:"}},
                { input: {type: "text", label: "Title", name: "title", placeholder: "Description for image"}},
                { input: {type: "text", label: "Link", name: "link", placeholder: "Hyperlink for image"}}],
            cancel: function(data) { alert("Cancel"); },
            ok: function(data,e) { console.log(data,e); },
            complete: function() { alert("complete"); },
        });
