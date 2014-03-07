# Appalizr.com Module: Share Buttons

## Information
* Github: [Repository](https://github.com/apparena/aa_app_mod_share)
* Docs:   [Appalizr.com](http://www.appalizr.com/docs.html)
* This is a module of the [aa_app_template](https://github.com/apparena/aa_app_template)

## Module job
> Creates an share button with a bubble to show a list with buttons to share the current site or action with a social
network. If only one social media chanel is activated in the config value "share_social_networks" (App-Manager config value) config, this chanel will be called directly
on a click, without open a additional bubble.

## Load module with require
`modules/aa_app_mod_share/js/views/GenerateShareButtonView`

### Dependencies
* [aa_app_mod_facebook](https://github.com/apparena/aa_app_mod_facebook)
* [aa_app_mod_google](https://github.com/apparena/aa_app_mod_google)
* [aa_app_mod_twitter](https://github.com/apparena/aa_app_mod_twitter)

## Methods

### render(options, callback)
> Defines all button settings, load the needed templates and start a callback function. With the callback, you can add
the button to the place where you want to show it.

#### Params
| Param | Type | Description |
| ------ |----- | ----------- |
| options | Object | Button settings as JSON (btn_name or name, placement, section) |
|  |  | &bull; btn_name or name - *Button value text (Name)* |
|  |  | &bull; placement - *Bubble placement for content buttons (* **top**,* right, buttom, left)* |
|  |  | &bull; section - *button placement, to load the right templates (navigation or * **button** *)* |
| callback | Function | To add the button to DOM or something else |

#### Return
`this`

- - -

### getButton(name)
> Returns the renderd button HTML, to put them into the DOM. Over the parameter, you can change the button value text.
This is not required, but when you use the some button on different places, you can change the button texts with this param.

#### Params
| Param | Type | Description |
| ------ |----- | ----------- |
| name | String | Change button value text (not required) |

#### Return
`void`

## Examples
### Generate a share button in the navigation
```javascript
// initialize the script first
var shareBtnNavi = GenerateShareButtonView().init();
// now render a new button for the navigation section to decide the navigation template
shareBtnNavi.render({section: 'navigation'}, function () {
    // add the button to .navbar-right in the callback function
    $('.navbar-right').prepend(shareBtnNavi.getButton());
});
```

### Generate a share button for content area
```javascript
// initialize the script first
var shareBtnContent = GenerateShareButtonView().init();
// now render a new button to use it for normal content. Use "button" as "section" to decide the button template, change button text with "name" and define the bubble position to top
shareBtnContent.render({section: 'button', name: 'Share Button', placement: 'top'}, function () {
    $('.content-wrapper').html(shareBtnContent.getButton());
});
```