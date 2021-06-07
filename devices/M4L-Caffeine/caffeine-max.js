post('caffeine-max starting\n')
function bang() {post('hello from caffeine-max\n')}

function call(encoded) {
  var json = JSON.parse(encoded),
      tag = json.tag,
      func = json.func,
      args = json.args,
      object = new LiveAPI(tag),
      result

  post('object is ' + object + '\n')
  post('calling ' + func + ' with args ' + JSON.stringify(args) + ' of object ' + tag + '\n')

  try {
    if (func == 'apiProperty') {
      post('API property\n')
      if (args[1].length > 0) {
	post('set\n')
	object[args[0]] = (args[1])[0]}
      else {
	post('get\n')
	result = object[args[0]]}}
    else {
      if (func == 'attribute') {
	post('attribute\n')
	if (args[1].length > 0) {
	  post('set\n')
	  result = object.set(args[0], (args[1])[0])}
	else {
	  post('get\n')
	  result = object.get(args[0])}}
      else {
	post('function\n')
	if (args) {result = object.call(func, args)}
	else {result = object.call(func)}}}}
  catch (error) {
    post(error + '\n')
    result = null}

  if (typeof(result) == 'string') {result = result.replace(/"/g, '')}
  post('result is ' + result + ' (' + typeof(result) + ')\n')
  
  outlet(
    0,
    JSON.stringify({
      invocationID: json.invocationID,
      func: func,
      cls: json.cls,
      result: result}))}

