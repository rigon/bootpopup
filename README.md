# BootPopup

Popup dialog boxes for Bootstrap.

## Demos

See the demos in [BootPopup - Examples](http://www.bootpopup.tk/#examples)


## API

### `bootpopup.alert(message[, title[, callback]])`
  
Shows an alert dialog box.

- **message**:
  - `(string)` message of the alert
- **title**:
  - `(string)` title of the alert. Default value is page title
  - `(function)()` callback when the alert is dismissed
- **callback**:
  - `(function)()` callback when the alert is dismissed


### `bootpopup.confirm(message[, title[, callback]])`

Shows a confirm dialog box.

- **message**:
  - `(string)` message to confirm
- **title**:
  - `(string)` title of the confirm dialog. Default value is page title
  - `(function)(answer)` callback when the confirm is answered. `answer` will be `true` if the anwser was yes and `false` if it was no. If dismissed, the default answer is no
- **callback**:
  - `(function)(answer)` callback when the confirm is answered. `answer` will be `true` if the anwser was yes and `false` if it was no. If dismissed, the default answer is no


### `bootpopup.prompt(label[, type[, message[, title[, callback]]]])`

Shows a prompt dialog box, asking to input a value.

- **label**:
  - `(string)` label of the value being asked
- **type**:
  - `(string)` type of the value being asked. This corresponds to the [HTML input types](http://www.w3schools.com/tags/att_input_type.asp). Default value is `text`
  - `(function)(answer)`
- **message**:
  - `(string)` message shown before the asked value. Default value is *Provide a `type` for:*
  - `(function)(answer)`
- **title**:
  - `(string)` title of the prompt dialog. Default value is page title
  - `(function)(answer)`
- **callback**:
  - `(function)(answer)`


### bootpopup(options)

Shows a cusmtomized dialog box. `bootpopup.alert`, `bootpopup.confirm` and `bootpopup.prompt` are mapped into this function.

**Options:** `(obejct)`

| Name      | Type     | Default             | Example          | Description
|-----------|----------|---------------------|------------------|------------
| title     | string   | `document.title`    | `"A title"`      | Title of the dialog box
| showclose | boolean  | `true`              | `"false"`        | Show or not the close button in the title
| content   | array    | `[]`                | `[ {p}, {p} ]`   | Content of the dialog box. See the [notes for full information](#note-for-content-option)
| buttons   | array    | `["close"]`         | `[ "yes", "no"]` | List of buttons to show in the bottom of the dialog box. The possible options are: `close`, `ok`, `cancel`, `yes`, `no`. See [notes](#note-for-buttons-option)
| dismiss   | function | `function(data) {}` |                  | Callback when the window is dismissed
| close     | function | `function(data) {}` |                  | Callback when OK button is selected
| ok        | function | `function(data) {}` |                  | Callback when OK button is selected
| cancel    | function | `function(data) {}` |                  | Callback when Cancel button is selected
| yes       | function | `function(data) {}` |                  | Callback when Yes button is selected
| no        | function | `function(data) {}` |                  | Callback when No button is selected
| complete  | function | `function(data) {}` |                  | This function is always called when the dialog box has completed

#### Note for **buttons** option:

If `buttons` is not specified, BootPopup will automatically select the buttons based on the defined callbacks. If some of the callbacks `close`, `ok`, `cancel`, `yes`, `no` are defined, the respective buttons are selected.
  
For example, if you define `ok` and `cancel` callbacks, the option `buttons` is automatically configured to `["ok", "cancel"]`.


#### Note for **content** option:

The biggest flexibility of BootPopup is the `content` option. The content is wrapped by a form and has the bootstrap class `.form-horizontal` allowing to create complex forms very quickly. When you are submitting data via a dialog box, BootPopup will grab all that data and deliver to you through the callbacks.

`content` is an array of objects and each object is represented as an entry of the form. For example, if you have the following object:

    { p: {class: "bold", text: "Insert data:"}}

This will add a `<p></p>` tag to the form. The options of `p` (`{class: "bold", text: "Insert data:"}`) are HTML attributes passed to the HTML tag. There is a speciall attribute for `text` which is defined as the inner text of the HTML tag. So, this example is equivalent to the following HTML:

    <p class="bold">Insert data:</p>





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
