var hiddenID=[], subID;

jQuery(document).ready(function(){
	jQuery('#submit').click(function(){
		subID = jQuery('#comment').val().match(/S[0-9]{8}/g);
		subID = subID.getUnique();
		console.log(subID.length)
		if ( subID.length==0 ){
			jQuery('#IDlistHidden').html('No result!');
		} else if (subID.length>500) {
			alert('Too many subID ('+subID.length.toString()+')... Try to split it in several group of 500.')
		}	else {
			var i=0, j=0;
			jQuery("body").css("cursor", "progress");
			jQuery('#submit').css("cursor", "progress");
			jQuery('#progress-bar-id').css('width', '0%');
			jQuery('#progress-bar-id').html('0/'+subID.length.toString())
			jQuery('#progress-id').removeClass('hidden');

			subID.forEach(function(ID){
				jQuery.getJSON('http://tseep.com/api/checklist?'+ID,function(data){
					i=i+1;
					jQuery('#progress-bar-id').css('width', (i/subID.length*100).toString()+'%');
					jQuery('#progress-bar-id').html(i.toString()+'/'+subID.length.toString())
					if (data.checklistID && data.observations.length == 0){
						hiddenID.push(data.checklistID);
						jQuery('#IDlistHidden').append('<a href="http://ebird.org/ebird/view/checklist/'+data.checklistID+'" target="_blank"><span class="label label-success">'+data.checklistID+ '</span></a>  ');
						j=j+1;
					}
					if (i>=subID.length){
						jQuery("body").css("cursor", "default");
						jQuery('#submit').css("cursor", "default");
						jQuery('#progress-id').addClass('hidden');
						if(j==0){
							jQuery('#IDlistHidden').html('No result!');
						}
					}
				})
			})
		}
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