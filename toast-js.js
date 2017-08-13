(function (window){
	// Close toast
	document.addEventListener("click",function(e) {
		if (e.target && (e.target.matches('span.toast-close') || e.target.matches('span.toast-action'))) {
			closeToast(e);
		}
	});
	/* Create a toast
	 * @param {Object}  data.
	 */
	function createToast(options){
		/*	Options Parameter Keys
		 *  - message 								: 		text
		 *  - toastClass							: 		text - multiple classes separated by spaces
		 *  - action  								: 		Object
		 *    - action.actionText			: 		text | html
		 *    - action.actionClass		: 		text - multiple classes separated by spaces
		 *	- closeButton 						: 		Boolean : default true
		 *	- closeClickEvent 				: 		function : default undefined
		 *  - autoHide 								: 		Boolean : default true : true if closeButton is false
		 *  - autoHideTime 						: 		integer : default 3000ms
		 *  - unique 									: 		unique toast check : for this toastId parameter is must
		 *  - toastId 								: 		string : for uniqueness of the toast
		 */
		var data = {}, html = '', closeFn = '';
		options = options || {};
		if (options.unique && options.toastId) {
			var elements = document.getElementById('toast-container');
			if (!elements) {
				return;
			}
			var toast = [], elemChild = elements.children;
			for(var i = 0; i < elemChild.length; i++){
				if(elemChild[i].getAttribute('data-toastid') === options.toastId) {
					toast.push(elemChild[i]);
				}
			}
			if(toast.length !== 0) {
				return;
			}
		}
		data.message = (options.message? options.message : 'Toast');
		data.toastClass = (options.toastClass? options.toastClass : '');
		data.closeButton = (typeof options.closeButton == "boolean"? options.closeButton : true);
		data.autoHide = (typeof options.autoHide  == "boolean"? options.autoHide : true);
		data.autoHideTime = (options.autoHideTime? options.autoHideTime:3000);
		if(options.action){
			data.action = {};
			data.action.actionText = (options.action.actionText? options.action.actionText : '');
			data.action.actionClass = (options.action.actionClass? options.action.actionClass : '');
		}
		html += '<div class="toast '+data.toastClass+'"';
		if (options.unique && options.toastId) {
			html += 'data-toastid = "'+options.toastId+'"';
		}
		if (data.autoHide) {
			html += 'autoHide = true';
		}
		html += ' >';
		html += '<span class="toast-message">'+data.message+'</span>';
		if(options.action){
			html += '<span class="toast-action '+data.action.actionClass+'">'+data.action.actionText+'</span>';
		}
		if(data.closeButton){
			html += '<span class="toast-close" ';
			if(options.closeClickEvent && typeof options.closeClickEvent === "function"){
				html += 'onclick="closeFnEvent(this)" ';
				closeFn = '<script> var closeFnEvent = '+options.closeClickEvent+';</script>';
			}
			html += '>X</span>';
		}
		else{
			data.autoHide = true;
		}
		html += '</div>';
		html += closeFn;
		var container = document.getElementById('toast-container');
		if(container){
			var htmlelem = document.createElement('div');
			htmlelem.innerHTML = html;
			container.prepend(htmlelem.children[0]);
		} else{
			var htmlelem = document.createElement('div');
			htmlelem.setAttribute('id', 'toast-container');
			htmlelem.innerHTML = html;
			document.getElementsByTagName('body')[0].append(htmlelem);
		}
		if(data.autoHide){
			setTimeout(function(){
				closeToast();
			}, data.autoHideTime);
		}
	}

	window.createToast = createToast;

	// close toast
	function closeToast(ev){
		var clickedElem = (ev && ev.target) ? ev.target : this;
		var elem = closest.call(clickedElem, 'div.toast');
		var toastLength = document.getElementById('toast-container').children.length;
		if(1 == toastLength){
			document.getElementById('toast-container').remove();
		}
		else{
			if(elem){
				elem.remove();
			}
			else{
				var elements = document.getElementById('toast-container').children;
				if (elements) {
					for(var i = elements.length - 1; i >= 0; i--) {
						if(elements[i].matches('div.toast[autoHide = true]')) {
							elements[i].remove();
							break;
						}	
					}
				}
			}
		}
	}
	function closest(elem) {
		var parent = this.parentNode;
		if (!parent) {
			return null;
		}
		try {
			if (parent.matches(elem)) {
				return parent;
			}
			return closest.call(parent, elem);
		} catch(e) {
			console.log(e);
			return null;
		}
	}
})(window)
