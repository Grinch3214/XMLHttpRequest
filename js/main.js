
function request() {
	const xhr = new XMLHttpRequest();

	xhr.open(
		'GET',
		'https://jsonplaceholder.typicode.com/todos',
	);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.responseType = 'json';

	xhr.send();

	xhr.onload = xhr.onerror = function (event) {
		if (this.status === 200) {
			console.log(`Ответ от сервера получен успешно, статус: ${this.status}`);
		} else {
			console.log(`Ошибка соединения, статус: ${this.status}`);
		};
	};

	xhr.onreadystatechange = function (event) {
		if (event.target.readyState === 4 &&
			event.target.status === 200) {
			let todos = xhr.response;
			let data = [];
			let users = [];
			for (let todo of todos) {
				data.push(todo);
			};

			users.push(data.filter(el => el.userId === 2).slice(0, 5));
			users.push(data.filter(el => el.userId === 4).slice(0, 5));
			users.push(data.filter(el => el.userId === 6).slice(0, 5));

			function createElem(idElem) {
				return document.createElement(idElem);
			};
			function querySelect(idElem) {
				return document.querySelector(idElem);
			};

			let h2, inpt, ul, li;

			let countOne = 0;
			let countTwo = 0;
			let countThree = 0;

			let userOne = querySelect('#user_1');
			let userTwo = querySelect('#user_2');
			let userThree = querySelect('#user_3');

			function createContent() {
				let divs = document.querySelectorAll('.list');
				for (let i = 0; i < divs.length; i++) {
					h2 = createElem('h2');
					divs[i].appendChild(h2);
					h2.innerText = `To-Do list for user №${users[i][i].userId}`;
				};

				function createListForUser(index, user, count) {
					for (let item of users[index]) {
						inpt = createElem('input');
						inpt.disabled = true;
						inpt.type = 'text';
						ul = createElem('ul');
						li = createElem('li');

						user.appendChild(ul).appendChild(li).appendChild(inpt);
						inpt.value = `${++count}. ${item.title}`;
					};
				};
				createListForUser(0, userOne, countOne);
				createListForUser(1, userTwo, countTwo);
				createListForUser(2, userThree, countThree);
			};
			createContent();
		};
	};
};
request();
