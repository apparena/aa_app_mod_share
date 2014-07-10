# Appalizr.com Module: Share Buttons
* Github: https://github.com/apparena/aa_app_mod_share
* Docs:   http://www.appalizr.com/index.php/share.html
* This is a module of the [aa_app_template](https://github.com/apparena/aa_app_template)

## Module job
Creates a share button with a bubble to show a list with additional buttons to share the current site or action in a social network. If only one social media chanel is activated in the config value "share_social_networks" (App-Manager config value), this chanel will be called directly on a click, without open a additional bubble. Sounds confusing? Ahh no it's very easy, try the demo with the app template ;-)

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
| &nbsp; | &nbsp; | &bull; btn_name or name - *Button value text (Name)* |
| &nbsp; | &nbsp; | &bull; placement - *Bubble placement for content buttons (* **top**, *right, buttom, left)* |
| &nbsp; | &nbsp; | &bull; section - *button placement, to load the right templates (navigation or* **button** *)* |
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

#### App-Manager config values
| config | default | description |
|--------|--------|--------|
| share_image | empty | image value with src selection to show a share image on google stream or facebook open graph posts or share messages |
| general_title | empty | Share title |
| general_desc | empty | Share description |
| share_social_networks | ["fb","twitter","gplus"] | share chanel selection to show selected share buttons |

#### App-Manager locale values
| locale | value example |
|--------|--------|
| share | [DE] Teilen, [EN] Share |