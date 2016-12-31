# BootDiag

Dialog boxes for Bootstrap.

## Demos

See the demos in the Homepage: http://www.bootdiag.tk


## Examples

Open `index.html` to see the library in action.

- Alert:

        bootdiag.alert("Hi there");

- Confirm:
        
        bootdiag.confirm("Do you confirm this message?");

- Prompt:
		
        bootdiag.prompt("Name");

- Customized prompt:

        bootdiag({
            title: "Add image",
            content: [
                { p: {text: "Insert image info here:"}},
                { input: {type: "text", label: "Title", name: "title", placeholder: "Description for image"}},
                { input: {type: "text", label: "Link", name: "link", placeholder: "Hyperlink for image"}}],
            cancel: function(data) { alert("Cancel"); },
            ok: function(data,e) { console.log(data,e); },
            complete: function() { alert("complete"); },
        });
