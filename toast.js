(function ($, window){
	// Close toast
	$(document).on('click', '.toast-close, .toast-action', closeToast);
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
			var toast = $("#toast-container").find('.toast[data-toastid="'+options.toastId+'"]');
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
		if(1 == $("#toast-container").length){
			$("#toast-container").prepend(html);
		}
		else{
			$('body').append('<div id="toast-container">'+html+'</div>');
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
		var elem = $(this).closest('.toast');
		var toastLength = $('#toast-container').find('.toast').length;
		if(1 == toastLength){
			$('#toast-container').remove();
		}
		else{
			if(elem && elem.length){
				elem.remove();
			}
			else{
				$('#toast-container .toast').last().remove();
			}
		}
	}
})(jQuery, window)
