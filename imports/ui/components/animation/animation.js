import "./animation.html";
import * as PIXI from "pixi.js";
import {
  TimelineMax,
  TweenMax,
  CSSPlugin,
  ScrollToPlugin,
  Circ,
  Sine,
  Power0,
  SlowMo,
  Draggable,
  Elastic,
} from "../../../lib/gsap/src/esm/all";
import { ReflectionFilter, DropShadowFilter } from "pixi-filters";
import { SimpleLightmapFilter } from "pixi-filters";
import { DisplacementFilter } from "pixi-filters";

Template.Animation.onCreated(function () {
  this.login = new ReactiveVar(false);
});

Template.Animation.onRendered(function () {
  const plugins = [CSSPlugin, ScrollToPlugin];
  const view = $("#view")[0];

  // const app = new PIXI.Application({
  //     view,
  //     width: window.innerWidth,

  //     height: window.innerHeight,
  //     autoResize: true,
  //     resolution: devicePixelRatio,
  //     resizeTo: window,
  //     transparent: true,
  // });

  const renderer = new PIXI.Renderer({
    view,
    width: window.innerWidth,
    height: window.innerHeight,
    autoResize: true,
    resolution: devicePixelRatio,
    autoDensity: true,
    // resizeTo: window,
    transparent: true,
  });
  const stage = new PIXI.Container();
  const ticker = new PIXI.Ticker();

  window.addEventListener("resize", resize);

  function resize() {
    console.log("Width:", window.innerWidth, "Height:", window.innerHeight);
    // Determine which screen dimension is most constrained
    // ratio = Math.min(1920 / window.innerWidth,
    //     1080 / window.innerHeight);
    let _w = window.innerWidth;
    let _h = window.innerHeight;
    console.log("window", _w, "height:", _h, "ratio:", _w / _h);
    let ratio = _w / _h;
    _w < 800 ? (stage.visible = false) : (stage.visible = true);
    if (ratio < 1.7) {
      _w = window.innerHeight * 1.7;
      _h = window.innerHeight;
    } else if (ratio > 1.8) {
      _w = window.innerWidth;
      _h = window.innerWidth / 1.7;
    }
    stage.scale = new PIXI.Point(_w / 1920, _h / 1080);
    renderer.resize(window.innerWidth, window.innerHeight);
    console.log("Width:", _w, "Height:", _h);
    // stage.width = renderer.screen.width;
  }
  resize();

  ticker.add(animate);
  ticker.start();
  /////////////////////watterfilter///////////////////////////
  const displacementTexture = PIXI.Texture.from("img/dismaps/dismap12.png");
  const displacementSprite = new PIXI.Sprite(displacementTexture);
  displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
  displacementSprite.scale.y = 2;
  displacementSprite.scale.x = 2;
  const displacementFilter = new PIXI.filters.DisplacementFilter(
    displacementSprite
  );
  stage.addChild(displacementSprite);

  /////////////////////3D effect Filter/////////////////////////////
  depthMap = new PIXI.Sprite.from("img/hotel/hotel-dis-map.png");
  stage.addChild(depthMap);

  _3dFilter = new PIXI.filters.DisplacementFilter(depthMap);
  stage.filters = [_3dFilter];

  window.onmousemove = function (e) {
    console.log("Moving mouse", (window.innerWidth - e.clientX) / 200);

    _3dFilter.scale.x = (window.innerWidth - e.clientX) / 50;
    _3dFilter.scale.y = (window.innerHeight - e.clientY) / 50;
  };
  ///////////////////hotel//////////////////
  const beach = PIXI.Sprite.from("img/hotel/beach.png");
  const hotel = PIXI.Sprite.from("img/hotel/hotel.png");
  const sky = PIXI.Sprite.from("img/hotel/sky.png");
  const clouds = [];
  for (let i = 1; i < 6; i++) {
    clouds.push(PIXI.Sprite.from(`img/hotel/cloud_${i}.png`));
  }

  ///////////////hotel///////////////////
  beach.filters = [displacementFilter];
  stage.addChild(beach);
  stage.addChild(sky);
  clouds.forEach((cloud) => {
    stage.addChild(cloud);
  });
  stage.addChild(hotel);
  // stage.addChild(depthMap)

  clouds[0].x -= 100;
  clouds[1].x += 100;
  clouds[2].x -= 1000;
  clouds[3].x += 800;
  clouds[4].x = 1;

  function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  const random = [];
  for (let i = 0; i < clouds.length; i++) {
    random.push(getRandomFloat(0.05, 0.15));
  }
  function animate() {
    // start the timer for the next animation loop
    // this is the main render call that makes pixi draw your container and its children.
    // displacementSprite.scale.x += 1;
    // displacementSprite.scale.y += 1;
    displacementSprite.x -= 0.2;
    displacementSprite.y -= 0.2;
    // cloud_1.x += 0.3;
    // cloud_2.x += 0.2;
    // cloud_3.x += 0.1;
    // cloud_4.x += 0.2;
    // cloud_5.x += 0.3;
    // clouds.map(cloud => {
    for (let i = 0; i < clouds.length; i++) {
      if (clouds[i].x > window.innerWidth) {
        // console.log('Entring if condition', 'Cloud X:', clouds[i].x);
        clouds[i].x -= clouds[i].width + window.innerWidth;
        // console.log('After calculation', 'Cloud X:', clouds[i].x);
      }
      clouds[i].x += random[i];
    }
    // console.log(getRandomFloat(0.1, 0.4))//Math.floor(Math.random() * 3) + 1)
    renderer.render(stage);
    // requestAnimationFrame(animate);
  }
  t = new TimelineMax();
  const words = $("#title").find("span");
  console.log(words);

  for (let i = 0; i < words.length; i++) {
    t.to(words[i], 2, { opacity: "1.0", ease: Circ.easeOut }, "-= 1.5");
  }
  t.to("#airplane", 2.5, {
    y: "1%",
    repeat: -1,
    repeatDelay: 0.4,
    yoyo: true,
    ease: Sine.easeInOut,
  });
});

Template.Animation.helpers({
  login() {
    return Template.instance().login.get();
  },
});

Template.Animation.events({
  "click #log"(e, template) {
    console.log("login", template.login.get());
    // tl.addLabel('headAndBody')
    tl.to("#btn", 0.4, {
      opacity: "1.0",
      width: "25vw",
      height: "auto",
      backgroundColor: "white",
      color: "#12b5d6",
      ease: Circ.easeOut,
    });
    template.login.set(true);

    // tl.to("#header", 0.4, { opacity: '0.0', ease: Circ.easeOut }, "headAndBody")
    // tl.to("#mes", 0.4, { opacity: '0.0', ease: Circ.easeOut }, "headAndBody")
    // tl.to("#login", 0.8, { left: 0, ease: Circ.easeOut }, "headAndBody")
  },
  "click #cancel"(e, template) {
    if ($("#user").val() && $("#password").val()) {
      // tl.addLabel('headAndBody')
      // tl.to("#login", 0.8, { left: '-250px', ease: Circ.easeOut })
      tl.to("#btn", 0.4, {
        opacity: "1.0",
        width: "6rem",
        height: "auto",
        backgroundColor: "transparent",
        color: "white",
        ease: Circ.easeOut,
      });
      tl.to("#main", 1.5, { y: "100vh", ease: Circ.easeOut });
      template.login.set(false);
      // tl.to("#header", 0.4, { opacity: '1.0', ease: Circ.easeOut }, "headAndBody")
      // tl.to("#mes", 0.4, { opacity: '1.0', ease: Circ.easeOut }, "headAndBody")
      const items = $(".menu-item");
      tl.to(".menu-line", 0.8, { bottom: "0", ease: Circ.easeOut }, "-=0.1");
      for (let i = 0; i < items.length; i++) {
        tl.to(
          items[i],
          0.8,
          { transform: "scale(1,1)", ease: Elastic.easeOut.config(1, 0.3) },
          "-=0.2"
        );
      }
    } else {
      tl.to("#btn", 0.3, {
        x: "2vw",
        color: "red",
        repeat: 3,
        yoyo: true,
        ease: Sine.easeInOut,
      });
      // tl.to(['#user', '#password'], 0.3, { borderBottomColor: 'red', repeat: 3, yoyo: true, }, "headAndBody")
    }
  },
  "click #forgot"() {
    tl.to("#btn", 1, { rotationY: "180", ease: Circ.easeOut });
  },
  "mouseenter .menu-item"(event, template) {
    console.log("Mouse Over", event.currentTarget.id);
    if (!timelines[event.currentTarget.id].isActive()) {
      console.log("Triguering animation");

      menuItemsAnimations[event.currentTarget.id]();
    }
  },
  "mouseleave .menu-item"(event, template) {
    console.log("Mouse Out", event.currentTarget.id);
    if (timelines[event.currentTarget.id].isActive()) {
      console.log("Stopping Animation");

      timelines[event.currentTarget.id].pause(0);
    }
  },
  "click #planeItem"() {
    console.log("plane clicked");

    $(".flight-panel").css("visibility", "visible");
  },
});

export const tl = new TimelineMax();
export const tr = new TimelineMax();

const timelines = {
  flights: new TimelineMax(),
  cars: new TimelineMax(),
  cruises: new TimelineMax(),
  hotels: new TimelineMax(),
};
timelines.flights.addLabel("same");
timelines.flights.addLabel("clouds");
menuItemsAnimations = {
  flights: function () {
    timelines.flights
      .to("#path12", 1, { y: "20px", x: "-120px" }, "same")
      .to("#path10", 1, { y: "20px", x: "-120px" }, "same")
      .to("#path4", 1, { y: "-20px", rotationZ: "15" })
      .to("#path4", 3, {
        y: "5px",
        repeat: -1,
        repeatDelay: 0.2,
        yoyo: true,
        ease: Sine.easeInOut,
      })
      .to(
        "#smallCloud",
        6,
        { x: "-220", repeat: -1, repeatDelay: 0.4, ease: Power0.easeOut },
        "clouds+=2"
      )
      .to(
        "#bigCloud",
        8,
        { x: "-250", repeat: -1, repeatDelay: 0.2, ease: Power0.easeOut },
        "clouds+=2"
      )
      .play();
  },
  cars: function () {
    return true;
  },
  cruises: function () {
    return true;
  },
  hotels: function () {
    return true;
  },
};
