import scrollLock from 'scroll-lock';
import { makeModalFrame } from "../../js/libs/modal";
import { selectTweaker } from "../../js/libs/selectTweaker";

(() => {
	const setPlayButton = (content, video) => {
		let play = content.querySelector('.modal__play');

		if (!! video?.canPlayType) {
			video.controls = true;
			play ||= document.createElement('button');
			play.className = 'modal__play';
			play.addEventListener('click', (e) => video.play());
			content.append(play);

			['pause', 'ended', 'playing'].forEach((event) => {
				video.addEventListener(event, (e) => {
					play.classList.toggle('playing', !(video.paused || video.ended));
				});
			});
		} else {
			content.querySelectorAll('video').forEach((video) => video.pause());
			play?.remove();
		}
	}

	const modal = makeModalFrame({ 
		select: '[data-modal]', 
		scrollLock,
		open: function({ slideshow }, button) {
			const active = slideshow ? '.active': '';
			const info = this.querySelector('.form__field_info input');
			
			if(info) info.value = button.dataset?.info;

			selectTweaker(this.querySelectorAll('.form__field_sect'));
			setPlayButton(this, this.querySelector(`video${active}`));
		},
		move: function() {
			setPlayButton(this, this.querySelector('video.active'));
		}
	});
})();