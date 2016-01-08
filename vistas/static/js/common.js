/*  Cart  */
jQuery(function($) {
    "use strict";

    function deleteCartInCheckoutPage() {
        return jQuery(".checkout-cart-index a.btn-remove2,.checkout-cart-index a.btn-remove").on("click", function(e) {
            return e.preventDefault(), confirm(confirm_content) ? void 0 : !1
        }), !1
    }
    /*  Top Cart */
    function slideEffectAjax() {
        "use strict";
        jQuery(".top-cart-contain").mouseenter(function() {
            jQuery(this).find(".top-cart-content").stop(true, true).slideDown()
        }), jQuery(".top-cart-contain").mouseleave(function() {
            jQuery(this).find(".top-cart-content").stop(true, true).slideUp()
        })
    }

    function deleteCartInSidebar() {
        "use strict";
        return is_checkout_page > 0 ? !1 : void jQuery("#cart-sidebar a.btn-remove, #mini_cart_block a.btn-remove").each(function() {})
    }
    /*  Menu */
    function wpShowMenuPopup(e, i, t) {
        "use strict";
        var s = jQuery(".subCatThree, .sortslt").blur();
        s.css("visibility", "hidden"), setTimeout(function() {
            s.css("visibility", "visible")
        }, 1), "undefined" != typeof wpCustommenuTimerHide[t] && clearTimeout(wpCustommenuTimerHide[t]), e = jQuery(e.id);
        var n = jQuery(t);
        n && (wpActiveMenu && wpHideMenuPopup(e, i, wpActiveMenu.popupId, wpActiveMenu.menuId), wpActiveMenu = {
            menuId: e.id,
            popupId: t
        }, e.hasClassName("active") || (wpCustommenuTimerShow[t] = setTimeout(function() {
            jQuery(oe_overlay).css({
                display: "block",
                opacity: .7
            }), e.addClassName("active");
            var i = CUSTOMMENU_POPUP_WIDTH;
            i || (i = n.getWidth());
            var s = wpPopupPos(e, i);
            n.style.top = s.top + "px", n.style.left = s.left + "px", wpSetPopupZIndex(n), CUSTOMMENU_POPUP_WIDTH && (n.style.width = CUSTOMMENU_POPUP_WIDTH + "px");
            var a = jQuery(t).select("div.block2");
            if ("undefined" != typeof a[0]) {
                var o = a[0].id.indexOf("_w");
                if (o > -1) var l = a[0].id.substr(o + 2);
                else {
                    var l = 0;
                    jQuery(t).select("div.block1 div.column").each(function(e) {
                        l += jQuery(e).getWidth()
                    })
                }
                l && (a[0].style.width = l + "px")
            }
            var r = jQuery(e.select("a")[0]);
            wpChangeTopMenuHref(r, !0), "undefined" == typeof jQuery ? n.style.display = "block" : jQuery("#" + t).stop(true, true).fadeIn()
        }, CUSTOMMENU_POPUP_DELAY_BEFORE_DISPLAYING)))
    }

    function wpHideMenuPopup(e, i, t, s) {
        "use strict";
        "undefined" != typeof wpCustommenuTimerShow[t] && clearTimeout(wpCustommenuTimerShow[t]);
        var e = jQuery(e),
            n = jQuery(s),
            a = jQuery(t);
        if (a) {
            var o = getCurrentMouseTarget(i);
            o && (wpIsChildOf(e, o) || e == o || wpIsChildOf(a, o) || a == o || n.hasClassName("active") && (wpCustommenuTimerHide[t] = setTimeout(function() {
                n.removeClassName("active"), jQuery(oe_overlay).css({
                    display: "none",
                    opacity: 0
                });
                var e = jQuery(n.select("a")[0]);
                wpChangeTopMenuHref(e, !1), "undefined" == typeof jQuery ? a.style.display = "none" : jQuery("#" + t).stop(true, true).fadeOut()
            }, CUSTOMMENU_POPUP_DELAY_BEFORE_HIDING)))
        }
    }
    
    jQuery(function() {
			/*  Best Seller Slider */
            jQuery("#best-seller-slider .slider-items").owlCarousel({
                    items: 3,
                    itemsDesktop: [1024, 2],
                    itemsDesktopSmall: [900, 2],
                    itemsTablet: [600, 2],
                    itemsMobile: [320, 1],
                    navigation: !0,
                    navigationText: ['<a class="flex-prev"></a>', '<a class="flex-next"></a>'],
                    slideSpeed: 500,
                    pagination: !1,
                    autoPlay: !0
                }),
                /*  New Product Slider */
                jQuery("#new-pro-slider .slider-items").owlCarousel({
                    items: 3,
                    itemsDesktop: [1024, 4],
                    itemsDesktopSmall: [900, 3],
                    itemsTablet: [600, 2],
                    itemsMobile: [320, 1],
                    navigation: !0,
                    navigationText: ['<a class="flex-prev"></a>', '<a class="flex-next"></a>'],
                    slideSpeed: 500,
                    pagination: !1,
                    autoPlay: !0
                }),
                /*  Featured Product Slider */
                jQuery("#featured-slider .slider-items").owlCarousel({
                    items: 4,
                    itemsDesktop: [1024, 4],
                    itemsDesktopSmall: [900, 3],
                    itemsTablet: [600, 2],
                    itemsMobile: [320, 1],
                    navigation: !0,
                    navigationText: ['<a class="flex-prev"></a>', '<a class="flex-next"></a>'],
                    slideSpeed: 500,
                    pagination: !1,
                    autoPlay: !0
                }),
                /*  Latest Deals Slider */
                jQuery("#latest-deals-slider .slider-items").owlCarousel({
                    items: 2,
                    itemsDesktop: [1024, 1],
                    itemsDesktopSmall: [900, 1],
                    itemsTablet: [600, 2],
                    itemsMobile: [320, 1],
                    navigation: !0,
                    navigationText: ['<a class="flex-prev"></a>', '<a class="flex-next"></a>'],
                    slideSpeed: 500,
                    pagination: !1
                }),
                /*  Bag Slider */
                jQuery("#bag-seller-slider .slider-items").owlCarousel({
                    items: 3,
                    itemsDesktop: [1024, 4],
                    itemsDesktopSmall: [900, 3],
                    itemsTablet: [600, 2],
                    itemsMobile: [320, 1],
                    navigation: !0,
                    navigationText: ['<a class="flex-prev"></a>', '<a class="flex-next"></a>'],
                    slideSpeed: 500,
                    pagination: !1
                }),
                /*  Shoes Slider */
                jQuery("#shoes-slider .slider-items").owlCarousel({
                    items: 3,
                    itemsDesktop: [1024, 4],
                    itemsDesktopSmall: [900, 3],
                    itemsTablet: [600, 2],
                    itemsMobile: [320, 1],
                    navigation: !0,
                    navigationText: ['<a class="flex-prev"></a>', '<a class="flex-next"></a>'],
                    slideSpeed: 500,
                    pagination: !1
                }),
                /*  Recommended Product Slider */
                jQuery("#recommend-slider .slider-items").owlCarousel({
                    items: 6,
                    itemsDesktop: [1024, 4],
                    itemsDesktopSmall: [900, 3],
                    itemsTablet: [600, 2],
                    itemsMobile: [320, 1],
                    navigation: !0,
                    navigationText: ['<a class="flex-prev"></a>', '<a class="flex-next"></a>'],
                    slideSpeed: 500,
                    pagination: !1
                }),
                /*  Brand Logo Slider */
                jQuery("#brand-logo-slider .slider-items").owlCarousel({
                    autoPlay: !0,
                    items: 6,
                    itemsDesktop: [1024, 4],
                    itemsDesktopSmall: [900, 3],
                    itemsTablet: [600, 2],
                    itemsMobile: [320, 1],
                    navigation: !0,
                    navigationText: ['<a class="flex-prev"></a>', '<a class="flex-next"></a>'],
                    slideSpeed: 500,
                    pagination: !1
                }),
                /*  Category Description Slider */
                jQuery("#category-desc-slider .slider-items").owlCarousel({
                    autoplay: !0,
                    items: 1,
                    itemsDesktop: [1024, 1],
                    itemsDesktopSmall: [900, 1],
                    itemsTablet: [600, 1],
                    itemsMobile: [320, 1],
                    navigation: !0,
                    navigationText: ['<a class="flex-prev"></a>', '<a class="flex-next"></a>'],
                    slideSpeed: 500,
                    pagination: !1
                }),
                /*  Related Products Slider */
                jQuery("#related-products-slider .slider-items").owlCarousel({
                    items: 4,
                    itemsDesktop: [1024, 4],
                    itemsDesktopSmall: [900, 3],
                    itemsTablet: [600, 2],
                    itemsMobile: [320, 1],
                    navigation: !0,
                    navigationText: ['<a class="flex-prev"></a>', '<a class="flex-next"></a>'],
                    slideSpeed: 500,
                    pagination: !1
                }),
                /*  Upsell Products Slider */
                jQuery("#upsell-products-slider .slider-items").owlCarousel({
                    items: 4,
                    itemsDesktop: [1024, 4],
                    itemsDesktopSmall: [900, 3],
                    itemsTablet: [600, 2],
                    itemsMobile: [320, 1],
                    navigation: !0,
                    navigationText: ['<a class="flex-prev"></a>', '<a class="flex-next"></a>'],
                    slideSpeed: 500,
                    pagination: !1
                }),
				/*  Menu */
                jQuery(".toggle").on("click", function() {
                    return jQuery(".submenu").is(":hidden") ? jQuery(".submenu").slideDown("fast") : jQuery(".submenu").slideUp("fast"), !1
                }), jQuery(".topnav").accordion({
                    accordion: !1,
                    speed: 300,
                    closedSign: "+",
                    openedSign: "-"
                }), jQuery("#nav > li").hover(function() {
                    var e = jQuery(this).find(".level0-wrapper");
                    e.hide(), e.css("left", "0"), e.stop(true, true).delay(150).fadeIn(300, "easeOutCubic")
                }, function() {
                    jQuery(this).find(".level0-wrapper").stop(true, true).delay(100).fadeOut(100, "easeInCubic")
                });
            jQuery("#nav > li").hover(function() {
                jQuery("#oe_overlay").show()
            }, function() {
                jQuery("#oe_overlay").hide()
            }), jQuery("#nav li.level0.drop-menu").mouseover(function() {
                return jQuery(window).width() >= 740 && jQuery(this).children("ul.level1").fadeIn(100), !1
            }).mouseleave(function() {
                return jQuery(window).width() >= 740 && jQuery(this).children("ul.level1").fadeOut(100), !1
            }), jQuery("#nav li.level0.drop-menu li").mouseover(function() {
                if (jQuery(window).width() >= 740) {
                    jQuery(this).children("ul").css({
                        top: 0,
                        left: "165px"
                    });
                    var e = jQuery(this).offset();
                    e && jQuery(window).width() < e.left + 325 ? (jQuery(this).children("ul").removeClass("right-sub"), jQuery(this).children("ul").addClass("left-sub"), jQuery(this).children("ul").css({
                        top: 0,
                        left: "-167px"
                    })) : (jQuery(this).children("ul").removeClass("left-sub"), jQuery(this).children("ul").addClass("right-sub")), jQuery(this).children("ul").fadeIn(100)
                }
            }).mouseleave(function() {
                jQuery(window).width() >= 740 && jQuery(this).children("ul").fadeOut(100)
            }), jQuery().UItoTop()
        }), jQuery(document).ready(function() {
            jQuery(".subDropdown")[0] && jQuery(".subDropdown").on("click", function() {
                jQuery(this).toggleClass("plus"), jQuery(this).toggleClass("minus"), jQuery(this).parent().find("ul").slideToggle()
            })
        }), jQuery(window).scroll(function() {
            jQuery(this).scrollTop() > 1 ? jQuery("nav").addClass("sticky") : jQuery("nav").removeClass("sticky")
        }),
		/*  To Top */
        function(e) {
            "use strict";
            e.fn.UItoTop = function(i) {
                var t = {
                        text: "",
                        min: 200,
                        inDelay: 600,
                        outDelay: 400,
                        containerID: "toTop",
                        containerHoverID: "toTopHover",
                        scrollSpeed: 1200,
                        easingType: "linear"
                    },
                    s = e.extend(t, i),
                    n = "#" + s.containerID,
                    a = "#" + s.containerHoverID;
                e("body").append('<a href="#" id="' + s.containerID + '">' + s.text + "</a>"), e(n).hide().on("click", function() {
                    return e("html, body").animate({
                        scrollTop: 0
                    }, s.scrollSpeed, s.easingType), e("#" + s.containerHoverID, this).stop().animate({
                        opacity: 0
                    }, s.inDelay, s.easingType), !1
                }).prepend('<span id="' + s.containerHoverID + '"></span>').hover(function() {
                    e(a, this).stop().animate({
                        opacity: 1
                    }, 600, "linear")
                }, function() {
                    e(a, this).stop().animate({
                        opacity: 0
                    }, 700, "linear")
                }), e(window).scroll(function() {
                    var i = e(window).scrollTop();
                    "undefined" == typeof document.body.style.maxHeight && e(n).css({
                        position: "absolute",
                        top: e(window).scrollTop() + e(window).height() - 50
                    }), i > s.min ? e(n).fadeIn(s.inDelay) : e(n).fadeOut(s.Outdelay)
                })
            }
        }(jQuery), jQuery(document).ready(function() {
            slideEffectAjax()
        }), jQuery.extend(jQuery.easing, {
            easeInCubic: function(e, i, t, s, n) {
                return s * (i /= n) * i * i + t
            },
            easeOutCubic: function(e, i, t, s, n) {
                return s * ((i = i / n - 1) * i * i + 1) + t

            }
        }),
        function(e) {
            e.fn.extend({
                accordion: function() {
                    return this.each(function() {})
                }
            })
        }(jQuery), jQuery(function(e) {
            e(".accordion").accordion(), e(".accordion").each(function() {
                var i = e(this).find("li.active");
                i.each(function(t) {
                    e(this).children("ul").css("display", "block"), t == i.length - 1 && e(this).addClass("current")
                })
            })
        }),
        function(e) {
            e.fn.extend({
                accordion: function(i) {
                    var t = {
                            accordion: "true",
                            speed: 300,
                            closedSign: "[+]",
                            openedSign: "[-]"
                        },
                        s = e.extend(t, i),
                        n = e(this);
                    n.find("li").each(function() {
                        0 != e(this).find("ul").size() && (e(this).find("a:first").after("<em>" + s.closedSign + "</em>"), "#" == e(this).find("a:first").attr("href") && e(this).find("a:first").on("click", function() {
                            return !1
                        }))
                    }), n.find("li em").on("click", function() {
                        0 != e(this).parent().find("ul").size() && (s.accordion && (e(this).parent().find("ul").is(":visible") || (parents = e(this).parent().parents("ul"), visible = n.find("ul:visible"), visible.each(function(i) {
                            var t = !0;
                            parents.each(function(e) {
                                return parents[e] == visible[i] ? (t = !1, !1) : void 0
                            }), t && e(this).parent().find("ul") != visible[i] && e(visible[i]).slideUp(s.speed, function() {
                                e(this).parent("li").find("em:first").html(s.closedSign)
                            })
                        }))), e(this).parent().find("ul:first").is(":visible") ? e(this).parent().find("ul:first").slideUp(s.speed, function() {
                            e(this).parent("li").find("em:first").delay(s.speed).html(s.closedSign)
                        }) : e(this).parent().find("ul:first").slideDown(s.speed, function() {
                            e(this).parent("li").find("em:first").delay(s.speed).html(s.openedSign)
                        }))
                    })
                }
            })
        }(jQuery),
        function(e) {
            e.fn.extend({
                accordionNew: function() {
                    return this.each(function() {
                        function i(i, s) {
                            e(i).parent(r).siblings().removeClass(n).children(o).slideUp(l), e(i).siblings(o)[s || a]("show" == s ? l : !1, function() {
                                e(i).siblings(o).is(":visible") ? e(i).parents(r).not(t.parents()).addClass(n) : e(i).parent(r).removeClass(n), "show" == s && e(i).parents(r).not(t.parents()).addClass(n), e(i).parents().show()
                            })
                        }
                        var t = e(this),
                            s = "accordiated",
                            n = "active",
                            a = "slideToggle",
                            o = "ul, div",
                            l = "fast",
                            r = "li";
                        if (t.data(s)) return !1;
                        e.each(t.find("ul, li>div"), function() {
                            e(this).data(s, !0), e(this).hide()
                        }), e.each(t.find("em.open-close"), function() {
                            e(this).on("click", function() {
                                return void i(this, a)
                            }), e(this).on("activate-node", function() {
                                t.find(o).not(e(this).parents()).not(e(this).siblings()).slideUp(l), i(this, "slideDown")
                            })
                        });
                        var u = location.hash ? t.find("a[href=" + location.hash + "]")[0] : t.find("li.current a")[0];
                        u && i(u, !1)
                    })
                }
            })
        }(jQuery);
    var oe_overlay = "#oe_overlay";
});