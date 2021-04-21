AFRAME.registerComponent(
  'mousemove', {
    schema: {speed: {default: 1}},

    init: function() {
      this.mouseDown = false
      this.x = this.y = 0

      document.addEventListener(
	'mousedown',
	this.OnDocumentMouseDown.bind(this))

      document.addEventListener(
	'mouseup',
	this.OnDocumentMouseUp.bind(this))

      document.addEventListener(
	'mousemove',
	this.OnDocumentMouseMove.bind(this))},

    OnDocumentMouseDown: function(event) {
      this.mouseDown = true
      this.x = event.clientX
      this.y = event.clientY},

    OnDocumentMouseUp: function () {
      this.mouseDown = false},

    OnDocumentMouseMove: function(event) {
      // The cursor component doesn't give us intersection data in
      // mousemove events, so we use a differential technique to
      // interpolate the project distance covered since the last time
      // we had intersection data. It loses accuracy over distance,
      // apparently linearly. The correction factors vary with camera
      // position and viewport size. The factors used here are for
      // when directly facing a 1440x900 canvas.

      this.el.movemouse(
	Math.round(((event.clientX - this.x) * 0.7)),
	Math.round(((event.clientY - this.y) * 0.7)))

      this.x = event.clientX
      this.y = event.clientY}})
