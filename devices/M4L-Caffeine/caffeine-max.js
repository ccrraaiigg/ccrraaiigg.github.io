post('caffeine-max starting\n')
function bang() {post('hello from caffeine-max\n')}

function call(encoded) {
  var json = JSON.parse(encoded),
      tag = json.tag,
      func = json.func,
      arg = json.arg,
      object = new LiveAPI(tag),
      result

  post('object is ' + object + '\n')
  post('calling ' + func + ' with arg ' + JSON.stringify(arg) + ' of object ' + tag + '\n')

  try {
    if (func == 'apiProperty') {
      post('API property\n')
      result = object[arg]}
    else {
      if (func == 'attribute') {
	post('attribute\n')
	result = object.get(arg)}
      else {
	post('function\n')
	if (arg) {result = object.call(func, arg)}
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

function getSelectedScene() {
  return LiveAPI('live_set view').get('selected_scene')}

function fire(id) {
  LiveAPI('id ' + id).call('fire')
  return true}

function numberOfScenes() {
  var numberOfScenes = song.getcount('scenes')
  
  post('number of scenes: ' + numberOfScenes + '\n')
  return {numberOfScenes: numberOfScenes}}




