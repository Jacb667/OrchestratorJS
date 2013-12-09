this.devicesTemplate = '<table>'
  +'<thead>'
    +'<tr>'
      +'<th>Status</th>'
      +'<th width="120">Identity</th>'
      +'<th width="130">Bluetooth MAC</th>'
      +'<th width="150">Device name</th>'
      +'<th width="100">Type</th>'
      +'<th>Capabilities</th>'
    +'</tr>'
  +'</thead>'
  +'<tbody>'
  +'{{#devices}}'
    +'<tr>'
      +'<td style="background-color:#{{statusColor}};"></td>'
      +'<td><p>{{identity}}</p></td>'
      +'<td><p>{{bluetoothMAC}}</p></td>'
      +'<td><p>{{name}}</p></td>'
      +'<td><p>{{type}}</p></td>'
      +'<td><table><tr>{{#capabilities}}<td class="has-tooltip" style="background-color: #{{color}};" title="{{name}}" ></td>{{/capabilities}}</tr></table></td>'
    +'</tr>'
    +'{{/devices}}'
  +'</tbody>'
+'</table>';