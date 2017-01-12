console.log('hello')

var hiddenID=[], subID;

jQuery(document).ready(function(){
	jQuery('#submit').click(function(){
		subID = jQuery('#comment').val().match(/S[0-9]{8}/g);

		subID = subID.getUnique();
		jQuery('#IDlist').html('');
		jQuery('#IDlistHidden').html('');
		subID.forEach(function(ID){
			jQuery('#IDlist').append('<a href="http://ebird.org/ebird/view/checklist/'+ID+'" target="_blank">'+ID+ '</a>, ');
			//jQuery("body").css("cursor", "progress");
			jQuery.getJSON('http://tseep.com/api/checklist?'+ID,function(data){
				if (data.checklistID && data.observations.length == 0){
					hiddenID.push(data.checklistID);
					jQuery('#IDlistHidden').append('<a href="http://ebird.org/ebird/view/checklist/'+data.checklistID+'" target="_blank">'+data.checklistID+ '</a>, ');
				}
			})
			//jQuery("body").css("cursor", "default");
		})
	});
});


Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}