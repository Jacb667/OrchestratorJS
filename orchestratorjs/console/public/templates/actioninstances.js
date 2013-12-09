this.actioninstancesTemplate = '<table>'
  +'<thead>'
    +'<tr>'
      +'<th>Action name</th>'
      +'<th width="120">Identity</th>'
      +'<th>Participants</th>'
      +'<th></th>'
    +'</tr>'
  +'</thead>'
  +'<tbody>'
  +'{{#actioninstances}}'
    +'<tr>'
      +'<td><p>{{name}}</p></td>'
      +'<td><p>{{identity}}</p></td>'
      +'<td><ul class="inline-list">{{#participants}}<li>{{.}}</li>{{/participants}}</ul></td>'
      //+'<td><table><tr>{{#participants}}<td>{{.}}</td>{{/participants}}</tr></table></td>'
      +'<td><a href="#" onclick="deleteActionInstance(\'{{identity}}\');" ><i class="foundicon-remove"></i></a></td>'
    +'</tr>'
    +'{{/actioninstances}}'
  +'</tbody>'
+'</table>';
