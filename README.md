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
  - `(function)(answer)` callback when the confirm is answered. `answer` will be `true` if the answer was yes and `false` if it was no. If dismissed, the default answer is no
- **callback**:
  - `(function)(answer)` callback when the confirm is answered. `answer` will be `true` if the answer was yes and `false` if it was no. If dismissed, the default answer is no


### `bootpopup.prompt(label[, type[, message[, title[, callback]]]])`

Shows a prompt dialog box, asking to input a value.

- **label**:
  - `(string)` label of the value being asked
- **type**:
  - `(string)` type of the value being asked. This corresponds to the [HTML input types](http://www.w3schools.com/tags/att_input_type.asp). Default value is `text`
  - `(function)(answer)` callback with the introduced data. This is only called when OK is pressed
- **message**:
  - `(string)` message shown before the asked value. Default value is *Provide a `type` for:*
  - `(function)(answer)` callback with the introduced data. This is only called when OK is pressed
- **title**:
  - `(string)` title of the prompt dialog. Default value is page title
  - `(function)(answer)` callback with the introduced data. This is only called when OK is pressed
- **callback**:
  - `(function)(answer)` callback with the introduced data. This is only called when OK is pressed


### `bootpopup(options)`

Shows a customized dialog box. `bootpopup.alert`, `bootpopup.confirm` and `bootpopup.prompt` are mapped into this function.

**Options:** `(object)`

| Name      | Type     | Default             | Example          | Description
|-----------|----------|---------------------|------------------|------------
| title     | string   | `document.title`    | `"A title"`      | Title of the dialog box
| showclose | boolean  | `true`              | `false`          | Show or not the close button in the title
| content   | array    | `[]`                | `[ {p}, {p} ]`   | Content of the dialog box. Learn more [about the content option](#about-the-content-option)
| buttons   | array    | `["close"]`         | `[ "yes", "no"]` | List of buttons to show in the bottom of the dialog box. The possible options are: `close`, `ok`, `cancel`, `yes`, `no`. Learn more [about the buttons option](#about-the-buttons-option)
| dismiss   | function | `function(data) {}` |                  | Callback when the window is dismissed
| close     | function | `function(data) {}` |                  | Callback when OK button is selected
| ok        | function | `function(data) {}` |                  | Callback when OK button is selected
| cancel    | function | `function(data) {}` |                  | Callback when Cancel button is selected
| yes       | function | `function(data) {}` |                  | Callback when Yes button is selected
| no        | function | `function(data) {}` |                  | Callback when No button is selected
| complete  | function | `function(data) {}` |                  | This function is always called when the dialog box has completed

#### About the **buttons** option:

If `buttons` is not specified, BootPopup will automatically select the buttons based on the defined callbacks.
If some of the callbacks `close`, `ok`, `cancel`, `yes`, `no` are defined, the respective buttons are selected.
  
For example, if you define `ok` and `cancel` callbacks, the option `buttons` is automatically configured to
`["ok", "cancel"]`.


#### About the **content** option:

The biggest flexibility of BootPopup is the `content` option. The content is wrapped by a form and has the
bootstrap class `.form-horizontal` allowing to create complex forms very quickly. When you are submitting data
via a dialog box, BootPopup will grab all that data and deliver to you through the callbacks.

1. `content` is an array of objects and each object is represented as an entry of the form. For example, if you
   have the following object:
   
   ```javascript
   { p: {class: "bold", text: "Insert data:"}}
   ```
   
   This will add a `<p></p>` tag to the form. The options of `p` (`{class: "bold", text: "Insert data:"}`) are HTML
   attributes passed to the HTML tag. There is a special attribute for `text` which is defined as the inner text of
   the HTML tag. So, this example is equivalent to the following HTML:
   
   ```html
   <p class="bold">Insert data:</p>
   ```

2. But it is when it comes to adding inputs that things become easy. Look at this example:
   
   ```javascript
   { input: {type: "text", label: "Title", name: "title", placeholder: "Description" }}
   ```
   
   This will create an `input` element with the attributes `type: "text", label: "Title", name: "title", placeholder: "Description"`.
   Note there is also a special attribute `label`. This attribute is used by BootPopup to create a label for the input form entry.
   The above example is equivalent to the following HTML:
   
   ```html
   <div class="form-group">
     <label for="title" class="col-sm-2 control-label">Title</label>
     <div class="col-sm-10">
       <input label="Title" name="title" id="bootpopup-form-input" placeholder="Description" class="form-control" type="text">
     </div>
   </div>
   ```
   
3. In order to make it even simpler, there are shortcuts for most common input types (`button`, `text`, `submit`, `color`,
   `url`, `password`, `hidden`, `file`, `number`, `email`, `reset`, `date`).
   The previous example can be simply written as:
   
   ```javascript
   { text: {label: "Title", name: "title", placeholder: "Description" }}
   ```

4. Another useful feature is the ability to support functions directly as an attribute. Take the following `button` example:
   
   ```javascript
   { button: {name: "button", value: "Open image", class: "btn btn-info", onclick: function(obj) {
       console.log(obj);
       bootpopup.alert("Hi there");
   }}}
   ```
   This will create a `onclick` event for the button. The reference for the object is passed as argument to the function.



## Examples

Open `index.html` to see the library in action.

- Alert:

  ```javascript
  bootpopup.alert("Hi there");
  ```

- Confirm:

  ```javascript
  bootpopup.confirm("Do you confirm this message?");
  ```

- Prompt:

  ```javascript		
  bootpopup.prompt("Name");
  ```

- Customized prompt:

  ```javascript
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
  ```
