import './parallax.html'
import { TimelineMax, TweenMax, CSSPlugin, ScrollToPlugin, Circ, Sine, Power0, SlowMo, Draggable, Elastic } from "../../../lib/gsap/src/esm/all";

Template.Parallax.onRendered(function () {
    console.log($('#spaceman'));
    tl = new TimelineMax();
    etl = new TimelineMax();
    mtl = new TimelineMax();
    atl = new TimelineMax();
    tl.addLabel("man");
    etl.addLabel("earth");
    mtl.addLabel("moon");

    tl.to('#spaceman', 2, { y: '5%', repeat: -1, yoyo: true, ease: Sine.easeInOut })
    atl.to('#meteor', 12, { x: '150vw', repeat: -1, repeatDelay: 4, ease: Power0.easeOut })
    window.onmousemove = function (e) {
        tl.to('#spaceman', 0, { y: (window.innerHeight - e.clientY) / 10, ease: Circ.easeOut, })
        tl.to('#spaceman', 0, { x: (window.innerWidth - e.clientX) / 10, ease: Circ.easeOut, })
        etl.play()
        mtl.play()
        etl.to('#earth', 0, { y: (window.innerHeight - e.clientY) / 40, ease: Circ.easeOut }, "earth")
        etl.to('#earth', 0, { x: (window.innerWidth - e.clientX) / 40, ease: Circ.easeOut }, "earth")
        mtl.to('#moon', 0, { y: (window.innerHeight - e.clientY) / 150, ease: Circ.easeOut }, "moon")
        mtl.to('#moon', 0, { x: (window.innerWidth - e.clientX) / 150, ease: Circ.easeOut }, "moon")
        etl.to('#msg', 0, { y: (window.innerHeight - e.clientY) / 250, ease: Circ.easeOut }, "earth")
        etl.to('#msg', 0, { x: (window.innerWidth - e.clientX) / 250, ease: Circ.easeOut }, "earth")
    }
})

Template.Parallax.events({
    'click #search'() {
        $('#searchField').focus()
    }
})