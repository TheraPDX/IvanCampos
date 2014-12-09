if (Meteor.isClient) {
  
  Meteor.startup(function () {
   
  });
  
}

if (Meteor.isServer) {
  
  Meteor.startup(function () {
    cheerio = Meteor.npmRequire('cheerio');
    
   //Meteor.call("getRoster", function(error, result) {});
    
  });
  
  Meteor.methods({
    getRoster: function () {
        result = Meteor.http.get("http://espn.go.com/nfl/team/roster/_/name/mia/miami-dolphins");
        $ = cheerio.load(result.content);
        var roster = $('table').html();
           $('table > tr').each(function() {
			   $('td').each(function() {
				   if(this.children[0].type=='tag'){
					   if(this.children[0].children[0]){
	             	  	//console.log(this.children[0].children[0].data);
					   }
				   } else if (this.children[0].type=='text'){
			 		   	//console.log(this.children[0].data);
				   }  
			   });
			  //console.log("***END***"); 
           });
        return roster;
    }
  });
  
}