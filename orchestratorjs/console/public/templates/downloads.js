this.downloadsTemplate = '<div class="row contents"><div class="large-12 columns">'
  							+'{{#client_app_names}}'
							+'<div class="row"><a href="/api/'+apiVersion+'/downloads/{{.}}">{{.}}</a></div>'
  							+'{{/client_app_names}}'
						+'</div></div>';