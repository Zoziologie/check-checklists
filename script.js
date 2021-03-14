
function getChecklists(test){
	var subID = jQuery('#comment').val().match(/S[0-9]{8}/g);
	subID = subID.getUnique();
	console.log(subID.length)
	if ( subID.length==0 ){
		jQuery('#subIDResult').html('No result!');
	} else if (subID.length>500) {
		alert('Too many subID ('+subID.length.toString()+')... Try to split it in several group of 500.')
	}	else {
		jQuery("body").css("cursor", "progress");
		jQuery('#checkHidden').css("cursor", "progress");
		jQuery('#comment').css("cursor", "progress");
		
		//jQuery('#progress-bar-id').css('width', '0%');
		//jQuery('#progress-bar-id').html('0/'+subID.length.toString())
		//jQuery('#progress-id').removeClass('hidden');
		subID.forEach(function(subIDi,idx){
			jQuery.ajax({
				"async": true,
				"crossDomain": true,
				"url": "https://ebird.org/ws2.0/product/checklist/view/"+subIDi,
				"method": "GET",
				"headers": {
					"X-eBirdApiToken": token.ebird
				}
			}).done(function (response) {
				if (response.reasonCodeLatest=="obshide"){
					jQuery('#subIDResult').append('<a href="http://ebird.org/ebird/view/checklist/'+subIDi+'" target="_blank"><span class="label label-success">'+subIDi+ '</span></a>  ');
				}
				if (idx === subID.length - 1){ 
					jQuery('#subIDResult').append('Finished ('+ subID.length.toString()+ ' checklists tested)' )
					jQuery("body").css("cursor", "default");
					jQuery('#checkHidden').css("cursor", "default");
					jQuery('#comment').css("cursor", "default");
			   }
			});
		})


		/*jQuery.getJSON('https://tseep.com/api/checklist?'+subID.join(','),function(chlts){
			console.log(chlts)
			if (chlts){
				jQuery('#subIDResult').html('');
				var count=0;
				chlts.forEach(function(chlt,i){
					if (Test(chlt,test)){
						count = count + 1;
						jQuery('#subIDResult').append('<a href="http://ebird.org/ebird/view/checklist/'+chlt.checklistID+'" target="_blank"><span class="label label-success">'+chlt.checklistID+ '</span></a>  ');
					}
					if (i==chlts.length-1){
						if (count == 0){
							jQuery('#subIDResult').append('No checklist found ('+ chlts.length.toString()+ ' checklists tested)' )
						} else {
							jQuery('#subIDResult').append('<br>'+count.toString()+' checklist(s) found ('+ chlts.length.toString()+ ' checklists tested)' )
						}
					}
				})
			} else{
				alert('Query did not work. Double check your subID and retry. If the problem percist, please contact me at rafnuss@gmail.com')
			}
			jQuery("body").css("cursor", "default");
			jQuery('#submit').css("cursor", "default");
		})*/
	}
}

function Test(chlt,test){
	if (test == "hidden"){
		return chlt.hidden;
	} else if (test == "flikr"){
		var i = chlt.observations.length;
		while (i--) {
			if (chlt.observations[i].comments.indexOf('flickr')>0){
				return true;
			}
		}
		return false;
	} else {
		console.log('not defined test')
	}	
}

jQuery(document).ready(function(){
	jQuery('#checkHidden').click(function(){
		getChecklists('hidden');
	});

	jQuery('#checkFlickr').click(function(){
			getChecklists('flikr');
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