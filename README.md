# Toast

Toast is javascript based library for displaying a message or a notification on your website.
* javscript version : toast-js.js and toast-js.min.js
* jquery version : toast-jq.js and toast-jq.min.js

![Toast](https://github.com/AmanAgarwal041/Toast/blob/master/toast.png)

### How to use ?

*createToast* is a function attached to the window.
```
createToast({ 
    message: 'This is your new toast', 
    autoHide: false, 
    closeButton: true 
});
```
---
Options to be passed to the functions :

> **message** 					: 		text
> **toastClass**			: 		text - multiple classes separated by spaces
> **action**  					: 		Object
> **action.actionText**			: 		text | html
> **action.actionClass**		: 		text - multiple classes separated by spaces
> **closeButton** 				: 		Boolean : default true
> **closeClickEvent** 	    	: 		function : default undefined
> **autoHide** 					: 		Boolean : default true : true if closeButton is false
> **autoHideTime** 				: 		integer : default 3000ms
> **unique** 					: 		unique toast check : for this toastId parameter is must
> **toastId** 					: 		string : for uniqueness of the toast

### Tech

Toast uses number of open source projects :

* [javascript](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics) - Accessing the html and appending data into dom!
* [jQuery](https://jquery.com/) - Accessing the html and appending data into dom!
* [Css](https://developer.mozilla.org/en-US/docs/Web/CSS) - Providing awesome style to the toast elements.

And of course Toast itself is open source with a [public repository](https://github.com/AmanAgarwal041/Toast/) on GitHub.

### Installation

Toast requires [jQuery](https://jquery.com/) any version preferably latest to run if toast-jq or toast-jq.min is used.

```
* Include the script file and css file into your html
* Change the css for the display container and the toast message box.
```
`Special attention should be given to the z-index of the toast container if doesn't show up.`

`Toast is based on flex property of the css, so some browsers do not support flex yet. Change css as per your requirements.`

