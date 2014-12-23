  Meteor.startup(function () {
    Meteor.call('getGithub');
 });

  Meteor.methods({
      'getGithub':function(){
        //console.log("Github Called");
          Github.remove({});
          var jsonURL = 'https://api.github.com/search/repositories?q=stars%3a%3E1&s=stars&type=Repositories';
          var respJson = jsonCall(jsonURL);
          for (var i=0, len=respJson.items.length; i<len; i++){
              var currentRepo = respJson.items[i];

			  Github.insert({
				  name: currentRepo.name,
				  full_name: currentRepo.full_name,
				  description: currentRepo.description,
				  stars: currentRepo.stargazers_count,
				  language: currentRepo.language,
				  homepage: currentRepo.homepage
              });

          }
      }
  });

  Meteor.publish('github', function() {
    return Github.find({},{sort: {stars: -1}});
  });

  function jsonCall(jsonURL){
    var result = Meteor.http.get(jsonURL,
		{headers:
			{"User-Agent": "IvanCampos.com",
			timeout: 30000
			}
		}
	);
  			if(result.statusCode==200) {
  				var respJson = JSON.parse(result.content);
          	    //console.log("Initial Github Trend: " + );
  				return respJson;
  			} else {
          console.log("ERROR: " + jsonURL);
        }
  }
