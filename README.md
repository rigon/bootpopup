# BootDiag

Dialog boxes for Bootstrap.


## Examples

- Alert:

      bootdiag.alert("Hi there");

- Customized prompt:

      bootdiag({
            title: "Add image",
            content: [
                { p: {text: "Insert image info here:"}},
                { input: {type: "text", label: "Title", placeholder: "Description for image"}},
                { input: {type: "text", label: "Link", placeholder: "Hyperlink for image"}}],
            buttons: ["cancel", "ok"],
            ok: function(data) {},
            cancel: function(data) {},
            yes: function(data) {},
            no: function(data) {},
        });