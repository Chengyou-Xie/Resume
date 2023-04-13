

document.addEventListener("DOMContentLoaded", function () {


    new fullpage('#fullpage', {
        //options here
        autoScrolling: true,
        scrollHorizontally: true,
        onLeave: function (origin, destination, direction, trigger) {
            var loading2 = new TimelineMax();
            //  element, 秒數, {初始狀態}, {結束狀態}, 
            loading2
            .fromTo("#p3_1", .5, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0 })
            .fromTo("#p3_2", .5, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0 }, '<')
            .fromTo("#p3_3", .5, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0 })
            .fromTo("#p3_4", .5, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0 }, '<')
            .fromTo("#p3_5", .5, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0 })
            .fromTo("#p3_6", .5, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0 }, '<')
        }

    });


    var loading = new TimelineMax();
    //  element, 秒數, {初始狀態}, {結束狀態}, 
    loading
        .fromTo(".lower p", 0, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0 })
        .fromTo(".upper>h2", 0.6, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 })
        .fromTo(".upper>p", 0.6, { autoAlpha: 0 }, { autoAlpha: 1 })
        .fromTo("#li_1>h3", 0.15, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 })
        .fromTo("#li_1>p", 0.15, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 }, "<")
        .fromTo("#li_2>h3", 0.15, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 })
        .fromTo("#li_2>p", 0.15, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 }, "<")
        .fromTo("#li_3>h3", 0.15, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 })
        .fromTo("#li_3>p", 0.15, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 }, "<")
        .fromTo("#li_4>h3", 0.15, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 })
        .fromTo("#li_4>p", 0.15, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0 }, "<");

   
});
