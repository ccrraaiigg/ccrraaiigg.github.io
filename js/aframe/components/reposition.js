AFRAME.registerComponent(
  'reposition',
  {
    init: function () {
      var el = this.el

      function startRepositioning(event) {
	window.addEventListener('mousemove', reposition, false)
	window.addEventListener('mouseup', stopRepositioning, false)}

      function reposition(event) {
	// Move along the x or z axis, depending on the y-rotation of the camera.

	var oldPosition = el.getAttribute('position'),
	    newPosition = new THREE.Vector3(),
	    positionDelta = new THREE.Vector3(),
	    factor = 0.01,
	    alignedOnZ = Math.abs((Math.cos((camera.getAttribute('rotation').y + 90) * (Math.PI * 2 / 360)))) < Math.cos(Math.PI / 4)

	if (alignedOnZ) {
	  if (camera.getAttribute('position').z > oldPosition.z)
	    newPosition.x = oldPosition.x + (factor * event.movementX)
	  else
	    newPosition.x = oldPosition.x - (factor * event.movementX)

	  if (event.shiftKey) {
	    newPosition.y = oldPosition.y - (factor * event.movementY)
	    newPosition.z = oldPosition.z}
	  else {
	    newPosition.y = oldPosition.y
	    newPosition.z = oldPosition.z + (factor * event.movementY)}}
	else {
	  // aligned on X
	  if (camera.getAttribute('position').x > oldPosition.x)
	    newPosition.z = oldPosition.z - (factor * event.movementX)
	  else
	    newPosition.z = oldPosition.z + (factor * event.movementX)

	  if (event.shiftKey) {
	    newPosition.y = oldPosition.y - (factor * event.movementY)
	    newPosition.x = oldPosition.x}
	  else {
	    newPosition.y = oldPosition.y
	    newPosition.x = oldPosition.x + (factor * event.movementY)}}

	positionDelta.x = newPosition.x - oldPosition.x
	positionDelta.y = newPosition.y - oldPosition.y
	positionDelta.z = newPosition.z - oldPosition.z
	
	for (i = 0; i < el.group.length; i++) {
	  var child = el.group[i],
	      oldChildPosition = child.getAttribute('position')
	  
	  child.setAttribute(
	    'position',
	    {
	      x: oldChildPosition.x + positionDelta.x,
	      y: oldChildPosition.y + positionDelta.y,
	      z: oldChildPosition.z + positionDelta.z})}

      	el.setAttribute('position', newPosition)}

      function stopRepositioning(event) {
	window.removeEventListener('mousemove', reposition, false)
	window.removeEventListener('mouseup', stopRepositioning, false)}

      el.setAttribute('class', 'squeaky')
      
      el.addEventListener(
	'mouseenter',
	function (event) {if (!mousedown) disableControls('look-controls')})

      el.addEventListener(
	'mousedown',
	startRepositioning,
	false)

      el.addEventListener(
	'mouseleave',
	function (event) {enableControls('look-controls')},
	false)}})

