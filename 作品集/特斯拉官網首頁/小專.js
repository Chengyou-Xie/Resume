

document.addEventListener("DOMContentLoaded", function () {


    new fullpage('#fullpage', {
        //options here
        autoScrolling: true,
        scrollHorizontally: true,
        onLeave: function (origin, destination, direction, trigger) {
            var loading2 = new TimelineMax();
            //  element, 秒數, {初始狀態}, {結束狀態}, 
            loading2.fromTo(".upper h2", 1, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 })
                .fromTo(".upper p", 0.6, { autoAlpha: 0 }, { autoAlpha: 1 })
                .fromTo(".btn1", 0.6, { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0 }, "<")
                .fromTo(".btn2", 0.6, { autoAlpha: 0, x: 20 }, { autoAlpha: 1, x: 0 }, "<")
                .fromTo(".lower p", 0.6, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 })
                .fromTo(".arrow", 0.6, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 }, "<");
        }
    });


    var loading = new TimelineMax();
    //  element, 秒數, {初始狀態}, {結束狀態}, 
    loading.fromTo(".upper h2", 1, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 })
        .fromTo(".upper p", 0.6, { autoAlpha: 0 }, { autoAlpha: 1 })
        .fromTo(".btn1", 0.6, { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0 }, "<")
        .fromTo(".btn2", 0.6, { autoAlpha: 0, x: 20 }, { autoAlpha: 1, x: 0 }, "<")
        .fromTo(".lower p", 0.6, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 })
        .fromTo(".arrow", 0.6, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 }, "<");

});
