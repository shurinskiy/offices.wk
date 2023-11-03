(() => {

	document.querySelectorAll('.cards__items').forEach(block => {
		const items = block.querySelectorAll('.cards__item');
		const more = document.createElement('button');
		more.className = 'cards__more button button_outline-green';
		more.innerText = block.dataset.more || 'Показать еще';

		if ([...items].some(item => item.classList.contains('hidden'))) {
			block.after(more);
		
			more.addEventListener('click', (e) => {
				items.forEach(item => {
					item.classList.remove('hidden');
					item.classList.add('showed');
				});
				more.remove();
			});
		}
	});

})();
