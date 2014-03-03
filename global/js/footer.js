// Please make sure jQuery and jQuery UI is loaded before this document

// insert header
var headerHTML = [
'<style scoped>',
'	@import url("/global/styles/footer.css");',
'</style>',
'<div class="header-content">',
'	<div class="info-position">',
'		<div class="avatar-pack">',
'			<div class="avatar-circle" id="avatar-image">',
'				<div class="avatar-wrapper">',
'					<div class="avatar"></div>',
'				</div>',
'				<div class="avatar-overtop-layer" onclick="$(\'#avatar-image\').effect(\'shake\', { times:2, distance:3 });">',
'				</div>',
'			</div>',
'		</div>',
'		<div class="namebox"> <a href="http://cnphil.com/" style="text-decoration:none; color:inherit;">Phil Xiaojun Hu</a> </div>',
'		',
'		<div style="margin-top: 2px; letter-spacing: 5px; font-size: 14px; text-decoration:none;">',
'			<a href="https://twitter.com/cnphil"><i class="fa fa-twitter header-icons"></i></a>',
'			<a href="https://github.com/phil5"><i class="fa fa-github-alt header-icons"></i></a>',
'			<a href="http://cnphil.com/"><i class="fa fa-rss header-icons"></i></a>',
'		</div>',
'	</div>',
'</div>',
'<div class="bar">',
'	<!-- <div class="bar-highlight"></div> -->',
'	<div class="bar-line" id="bar-posts">',
'		<div class="bar-text">posts</div>',
'		<div class="bar-chinese" style="background-image: url(\'/images/log.png\');"></div>',
'		<div class="bar-rect" onclick="location.href=\'/posts\'; event.cancelBubble=true;"></div>',
'	</div>',
'	<div class="bar-line" id="bar-projects">',
'		<div class="bar-text">projects</div>',
'		<div class="bar-chinese" style="background-image: url(\'/images/fun.png\');"></div>',
'		<div class="bar-rect" onclick="location.href=\'/projects\'; event.cancelBubble=true;"></div>',
'	</div>',
'	<div class="bar-line" id="bar-trips">',
'		<div class="bar-text">trips</div>',
'		<div class="bar-chinese" style="background-image: url(\'/images/tour.png\');"></div>',
'		<div class="bar-rect" onclick="location.href=\'/trips\'; event.cancelBubble=true;"></div>',
'	</div>',
'	<div class="bar-line" id="bar-quotes">',
'		<div class="bar-text">quotes</div>',
'		<div class="bar-chinese" style="background-image: url(\'/images/talk.png\');"></div>',
'		<div class="bar-rect" onclick="location.href=\'/quotes\'; event.cancelBubble=true;"></div>',
'	</div>',
'</div>',
].join("\n");
document.getElementById("header").innerHTML = headerHTML;
// end of insert header

if(typeof(window.barShouldShow) == "undefined") window.barShouldShow = 1;
window.barShown = window.barShouldShow;
window.bars = ["#bar-posts", "#bar-projects", "#bar-trips", "#bar-quotes"];
$(window.bars[window.barShown]).css("visibility", "visible");
window.animationMutex = 0;

function barAnimation(currentBar, nextBar, nextOrig, currentTo, nextTo, nextBounce, mutexSignal)
{
	barHeight = 36;
	$(nextBar).css("top", barHeight * nextOrig);
	$(nextBar).css("visibility", "visible");
	$(currentBar).animate({top: barHeight * currentTo}, 250, function() {
		$(currentBar).css("visibility", "hidden");
	});
	$(nextBar).animate({top: nextTo + nextBounce}, 250, function () {
		$(nextBar).animate({top: nextTo}, 150, function() {
			if(window.animationMutex == mutexSignal) window.animationMutex = 0;
		});
	});
}

$(function() {
	$(".bar").click(function() {
		if(window.animationMutex > 0) {
			return; // I know this mutex is weak...
		} else {
			window.animationMutex = 1;
		}
		prev = window.bars[window.barShown];
		window.barShown = (window.barShown + 1) % window.bars.length;
		barAnimation(prev, window.bars[window.barShown], -1.5, 1.5, 0, 7, 1);
	});
	$(".bar").on({
		mouseleave: function() {
			if(window.barShouldShow == window.barShown || window.animationMutex == 2) return;
			window.animationMutex = 2;
			prev = window.bars[window.barShown];
			window.barShown = window.barShouldShow;
			setTimeout(function() {
				barAnimation(prev, window.bars[window.barShown], 1.5, -1.5, 0, 0, 2);
			}, 500);
		
		}
	});
});