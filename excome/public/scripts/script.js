let account = [];
const newAccount = () => {
	let i;
	let exista = 0;
	let found = 0;
	let mail = document.querySelector('#mail_input_first').value;
	let confirmed_mail = document.querySelector('#mail_input_confirm').value;
	let password = document.querySelector('#password_input_first').value;
	let confirmed_password = document.querySelector('#password_input_confirm').value;
	if(mail && confirmed_mail && password && confirmed_password) {
		exista = 0;
		if(mail === confirmed_mail && password === confirmed_password) {
			if(localStorage.getItem('order')) {
				i=localStorage.getItem('order');
				exista = 1;
			} else {
				i = 0;
			}
			if(exista) {
				found=0;
				for(let j=0;j<i && found===0;j++) {
					if(mail === localStorage.getItem(`mail${j}`) && password === localStorage.getItem(`password${j}`)) {
						found = 1;
					}
				}
				if(found) {
					document.querySelector('#password_input_first').value = '';
					document.querySelector('#password_input_confirm').value = '';
					document.querySelector('#mail_input_first').value = '';
					document.querySelector('#mail_input_confirm').value = '';
					alert('THIS ACCOUNT ALREADY EXISTS');
				} else {
					localStorage.setItem(`mail${i}`,mail);
					localStorage.setItem(`password${i}`,password);
					i++;
					localStorage.setItem('order',i);
					let new_account = {
						income_names:[],
						income_sums:[],
						expense_names:[],
						expense_sums:[],
						total_income:0,
						total_expense:0,
						budget:0,
						income_indexes:[],
						expense_indexes:[],
						currency:'lei',
						periodic_income_names:[],
						periodic_income_sums:[],
						periodic_expense_sums:[],
						periodic_expense_names:[],
						periodic_income_indexes:[],
						periodic_expense_indexes:[],
						period_income_types:[],
						period_income_amount:[],
						period_expense_types:[],
						period_expense_amount:[],
						period_income_update:[],
						period_expense_update:[],
					}
					account=localStorage.getItem('account').split(',');	
					account.push(JSON.stringify(new_account));				
					localStorage.setItem('account',account);
					window.open('index.html','_self');
				}
			} else {
				localStorage.setItem(`mail${i}`,mail);
				localStorage.setItem(`password${i}`,password);
				i++
				localStorage.setItem('order',i);
				let new_account = {
					income_names:[],
					income_sums:[],
					expense_names:[],
					expense_sums:[],
					total_income:0,
					total_expense:0,
					budget:0,
					income_indexes:[],
					expense_indexes:[],
					currency:'lei',
					periodic_income_names:[],
					periodic_income_sums:[],
					periodic_expense_sums:[],
					periodic_expense_names:[],
					periodic_income_indexes:[],
					periodic_expense_indexes:[],
					period_income_types:[],
					period_income_amount:[],
					period_expense_types:[],
					period_expense_amount:[],
					period_income_update:[],
					period_expense_update:[],
				}
				account = [];
				account[0] = JSON.stringify(new_account);
				localStorage.setItem('account',account);
				window.open('index.html','_self');
			}
		} else {
			if(mail===confirmed_mail && confirmed_password!==password) {
				document.querySelector('#password_input_first').value = '';
				document.querySelector('#password_input_confirm').value = '';
				document.querySelector('#password_input_first').focus();
				alert('PASSWORDS DON\'T MATCH!');
			} else if (mail!==confirmed_mail && password===confirmed_password) {
				document.querySelector('#mail_input_first').value = '';
				document.querySelector('#mail_input_confirm').value = '';
				document.querySelector('#mail_input_first').focus();
				alert('MAILS DON\'T MATCH!');
			} else {
				document.querySelector('#password_input_first').value = '';
				document.querySelector('#password_input_confirm').value = '';
				document.querySelector('#mail_input_first').value = '';
				document.querySelector('#mail_input_confirm').value = '';
				document.querySelector('#mail_input_first').focus();
				alert('DATAS DON\'T MATCH');
			}
		}
	} else {
		alert('YOU MUST COMPLETE THE SPACES');
	}
}
//delete content

const deleteContent = () => {
	let id;
	let acc;
	let account_number = localStorage.getItem('account_nr')-1;
	let current_account;
	let current_account_string;
	if(localStorage.getItem('order') == 1) {
		acc=localStorage.getItem('account');
		current_account_string = acc;
	} else if(localStorage.getItem('order')>1) {
		acc = localStorage.getItem('account').split(',{');
		if(account_number !== 0) {
			current_account_string = '{' + acc[account_number];
			for(let k = 1;k<acc.length;k++) {
				acc[k] = '{' + acc[k];
			}
		} else {
			current_account_string = acc[0];
			for(let k = 1;k<acc.length;k++) {
				acc[k] = '{' + acc[k];
			}
		}
	}
	current_account = JSON.parse(current_account_string);
	current_account={
		income_names:[],
		income_sums:[],
		expense_names:[],
		expense_sums:[],
		total_income:0,
		total_expense:0,
		budget:0,
		income_indexes:[],
		expense_indexes:[],
		currency:'lei',
		periodic_income_names:[],
		periodic_income_sums:[],
		periodic_expense_sums:[],
		periodic_expense_names:[],
		periodic_income_indexes:[],
		periodic_expense_indexes:[],
		period_income_types:[],
		period_income_amount:[],
		period_expense_types:[],
		period_expense_amount:[],
		period_income_update:[],
		period_expense_update:[],
	}
	if(localStorage.getItem('order') == 1) {
		acc = JSON.stringify(current_account);
	} else if(localStorage.getItem('order')>1) {
		acc[account_number] = JSON.stringify(current_account);
	}
	localStorage.setItem('account',acc);
}

//login

const login = () => {
	let i,j;
	let mail = document.querySelector('#mail_input_login').value;
	let password = document.querySelector('#parola_input_login').value;
	let exista = 0;
	if(localStorage.getItem('order')) {
		exista = 1;
		i=localStorage.getItem('order');
	}
	if(exista) {
		found=0;
		for(j=0;j<i && found===0;j++) {
			if(mail === localStorage.getItem(`mail${j}`) && password === localStorage.getItem(`password${j}`)) {
				found = 1;
			}
		}
		if(found) {
			localStorage.setItem('account_nr',j);
			window.open('main.html','_self');
		} else {
			alert('PAROLA SAU MAIL GRESITE');
		}
	} else {
		alert('NU EXISTA CONTURI');
		let mail = document.querySelector('#mail_input_login');
		let password = document.querySelector('#parola_input_login');
		mail.value = '';
		password.value = '';
		mail.focus();
	}
}

//change mail

const changeMail = () => {
	let j = localStorage.getItem('account_nr')-1;
	let new_mail = document.querySelector('#changeMail').value;
	localStorage.setItem(`mail${j}`,new_mail);
	document.querySelector('#changeMail').value='';
}

//change password

const changePassword = () => {
	let j = localStorage.getItem('account_nr')-1;
	let new_password = document.querySelector('#changePassword').value;
	localStorage.setItem(`password${j}`,new_password);
	document.querySelector('#changePassword').value='';
}

//Set Currency

const change_currency = () => {
	let id;
	let acc;
	let account_number = localStorage.getItem('account_nr')-1;
	let current_account;
	let current_account_string;
	if(localStorage.getItem('order') == 1) {
		acc=localStorage.getItem('account');
		current_account_string = acc;
	} else if(localStorage.getItem('order')>1) {
		acc = localStorage.getItem('account').split(',{');
		if(account_number !== 0) {
			current_account_string = '{' + acc[account_number];
			for(let k = 1;k<acc.length;k++) {
				acc[k] = '{' + acc[k];
			}
		} else {
			current_account_string = acc[0];
			for(let k = 1;k<acc.length;k++) {
				acc[k] = '{' + acc[k];
			}
		}
	}
	current_account = JSON.parse(current_account_string);
	const currency = document.querySelector('.currency').value;
	current_account.income_sums.forEach((cur,index) => {
		if(current_account.currency=="$") {
			if(currency=="lei") {
				current_account.income_sums[index]*=4;
			} else if(currency=="€") {
				current_account.income_sums[index]*=0.82;
			}
		}
		if(current_account.currency=="€") {
			if(currency=="lei") {
				current_account.income_sums[index]*=4.87;
			} else if(currency=="$") {
				current_account.income_sums[index]*=1.21;
			}
		}
		if(current_account.currency=="lei") {
			if(currency=="$") {
				current_account.income_sums[index]/=4;
			} else if(currency=="€"){ 
				current_account.income_sums[index]/=4.87;
			}
		}
	});
	current_account.expense_sums.forEach((cur,index) => {
		if(current_account.currency=="$") {
			if(currency=="lei") {
				current_account.expense_sums[index]*=4;
			} else if(currency=="€") {
				current_account.expense_sums[index]*=0.82;
			}
		}
		if(current_account.currency=="€") {
			if(currency=="lei") {
				current_account.expense_sums[index]*=4.87;
			} else if(currency=="$") {
				current_account.expense_sums[index]*=1.21;
			}
		}
		if(current_account.currency=="lei") {
			if(currency=="$") {
				current_account.expense_sums[index]/=4;
			} else if(currency=="€"){ 
				current_account.expense_sums[index]/=4.87;
			}
		}
	});
	if(current_account.currency=="$") {
		if(currency=="lei") {
			current_account.total_expense*=4;
			current_account.total_income*=4;
		} else if(currency=="€") {
			current_account.total_expense*=0.82;
			current_account.total_income*=0.82;
		}
	}
	if(current_account.currency=="€") {
		if(currency=="lei") {
			current_account.total_expense*=4.87;
			current_account.total_income*=4.87;
		} else if(currency=="$") {
			current_account.total_expense*=1.21;
			current_account.total_income*=1.21;
		}
	}
	if(current_account.currency=="lei") {
		if(currency=="$") {
			current_account.total_expense/=4;
			current_account.total_income/=4;
		} else if(currency=="€"){ 
			current_account.total_expense/=4.87;
			current_account.total_income/=4.87;
		}
	}
	current_account.budget=parseFloat(parseFloat(current_account.total_income)-parseFloat(current_account.total_expense));
	current_account.currency = currency;
	if(localStorage.getItem('order') == 1) {
		acc = JSON.stringify(current_account);
	} else if(localStorage.getItem('order')>1) {
		acc[account_number] = JSON.stringify(current_account);
	}
	localStorage.setItem('account',acc);
}

//log out

const log_out = () => {
	localStorage.removeItem('account_nr');
	window.open('index.html','_self');
}
//new income/expense

const new_excome = () => {
	let type = document.querySelector('.select').value;
	let name = document.querySelector('.income_expense_name').value;
	let sum = document.querySelector('.sum').value;
	document.querySelector('.sum').value = '';
	document.querySelector('.income_expense_name').value = '';
	document.querySelector('.income_expense_name').focus();
	let id;
	let acc;
	let account_number = localStorage.getItem('account_nr')-1;
	let current_account;
	let current_account_string;
	if(localStorage.getItem('order') == 1) {
		acc=localStorage.getItem('account');
		current_account_string = acc;
	} else if(localStorage.getItem('order')>1) {
		acc = localStorage.getItem('account').split(',{');
		if(account_number !== 0) {
			current_account_string = '{' + acc[account_number];
			for(let k = 1;k<acc.length;k++) {
				acc[k] = '{' + acc[k];
			}
		} else {
			current_account_string = acc[0];
			for(let k = 1;k<acc.length;k++) {
				acc[k] = '{' + acc[k];
			}
		}
	}
	current_account = JSON.parse(current_account_string);
	let currency_type=document.querySelector(".currency").value;
	sum=parseFloat(sum);
	if(currency_type=='--') currency_type=current_account.currency;
	else {
		if(currency_type=="$") {
			if(current_account.currency=="lei") {
				sum*=4;
			} else if(current_account.currency=="€") {
				sum*=0.82;
			}
		}
		if(currency_type=="€") {
			if(current_account.currency=="lei") {
				sum*=4.87;
			} else if(current_account.currency=="$") {
				sum*=1.21;
			}
		}
		if(currency_type=="lei") {
			if(current_account.currency=="$") {
				sum/=4;
			} else if(current_account.currency=="€"){ 
				sum/=4.87;
			}
		}
	}
	if(type === 'income') {
		if(sum>=0) {
			let income_indexes = current_account.income_indexes;
			if(income_indexes.length) {
				id = income_indexes[income_indexes.length-1]+1;
			} else {
				id = 0;
			}
			let found = 0;
			let i;
			for(i = 0;i<income_indexes.length && found === 0;i++) {
				if(name === current_account.income_names[i]) {
					found = 1;
				}
			}
		if(!found) {
			current_account.income_indexes.push(id);
			document.querySelector('.income_container').insertAdjacentHTML('beforeend',`
				<div class="excome" id = 'income_${id}'>
					<div class="nameOfExcome">
						${name}
					</div>
					<div class="sumOfExcome">
						<i>${Math.round(sum * 100)/100}</i> ${current_account.currency}
					</div>
					<button class = "delete"  onClick = "delete_Excome()">
						<img class="icon_x" src="./pictures/icon.png" id = "income_${id}_delete">
					</button>
			</div>
			`);
			current_account.income_names.push(name);
			current_account.income_sums.push(Math.round(sum * 100)/100);
		} else {
			let previous = current_account.income_sums[i-1];
			let current = Math.round(previous*100)/100 + Math.round(sum * 100)/100;
			current_account.income_sums[i-1] = current;
			const line = document.querySelector(`#income_${income_indexes[i-1]}`).children[1];
			line.innerHTML = current;
		}
		let suma=current_account.total_income;
		suma+=parseFloat(sum);
		current_account.total_income=parseFloat(suma);
		current_account.budget+=parseFloat(sum);
		document.querySelector('.income').innerHTML = `Income: <i>${suma} ${current_account.currency}</i>`;
		document.querySelector('.budget').innerHTML = `Budget: <i>${Math.round((parseFloat(current_account.budget)) * 100)/100} ${current_account.currency}</i>`;
		if(localStorage.getItem('order') == 1) {
			acc = JSON.stringify(current_account);
		} else if(localStorage.getItem('order')>1) {
			acc[account_number] = JSON.stringify(current_account);
		}
		localStorage.setItem('account',acc);
	} else {
		let expense_indexes = current_account.expense_indexes;
			if(expense_indexes.length) {
				id = expense_indexes[expense_indexes.length-1]+1;
			} else {
				id = 0;
			}
			sum=-sum;
					let found = 0;
					let i;
					for(i = 0;i<expense_indexes.length && found === 0;i++) {
						if(name === current_account.expense_names[i]) {
							found = 1;
						}
					}
					if(!found) {
						current_account.expense_indexes.push(id);
						document.querySelector('.expense_container').insertAdjacentHTML('beforeend',`
							<div class="excome" id = 'expense_${id}'>
								<div class="nameOfExcome">
									${name}
								</div>
								<div class="sumOfExcome">
									<i>${Math.round(sum* 100)/100}</i> ${current_account.currency}
								</div>
								<button class = "delete"  onClick = "delete_Excome()">
									<img class="icon_x" src="./pictures/icon.png" id = "expense_${id}_delete">
								</button>
						</div>
						`);
						current_account.expense_names.push(name);
						current_account.expense_sums.push(Math.round(sum *100)/100);
					} else {
						let previous = current_account.expense_sums[i-1];
						let current = Math.round(previous * 100)/100 + Math.round(sum * 100) /100;
						current_account.expense_sums[i-1] = current;
						const line = document.querySelector(`#expense_${expense_indexes[i-1]}`).children[1];
						line.innerHTML = current;
					}
				current_account.total_expense+=parseFloat(sum);
				current_account.budget-=parseFloat(sum);
				document.querySelector('.expense').innerHTML = `Expense: <i>${current_account.total_expense}</i> ${current_account.currency}`;
				document.querySelector('.budget').innerHTML = `Budget: <i>${Math.round((current_account.budget) * 100)/100}</i> ${current_account.currency}`;
				if(localStorage.getItem('order') == 1) {
					acc = JSON.stringify(current_account);
				} else if(localStorage.getItem('order')>1) {
					acc[account_number] = JSON.stringify(current_account);
				}
				localStorage.setItem('account',acc);
	}
	} else if(type === 'expense') {
		if(sum>=0) {
			let expense_indexes = current_account.expense_indexes;
			if(expense_indexes.length) {
				id = expense_indexes[expense_indexes.length-1]+1;
			} else {
				id = 0;
			}
					let found = 0;
					let i;
					for(i = 0;i<expense_indexes.length && found === 0;i++) {
						if(name === current_account.expense_names[i]) {
							found = 1;
						}
					}
					if(!found) {
						current_account.expense_indexes.push(id);
						document.querySelector('.expense_container').insertAdjacentHTML('beforeend',`
							<div class="excome" id = 'expense_${id}'>
								<div class="nameOfExcome">
									${name}
								</div>
								<div class="sumOfExcome">
									<i>${Math.round(sum * 100)/100}</i> ${current_account.currency}
								</div>
								<button class = "delete"  onClick = "delete_Excome()">
									<img class="icon_x" src="./pictures/icon.png" id = "expense_${id}_delete">
								</button>
						</div>
						`);
						current_account.expense_names.push(name);
						current_account.expense_sums.push(Math.round(sum *100)/100);
					} else {
						let previous = current_account.expense_sums[i-1];
						let current = Math.round(previous * 100)/100 + Math.round(sum * 100) /100;
						current_account.expense_sums[i-1] = current;
						const line = document.querySelector(`#expense_${expense_indexes[i-1]}`).children[1];
						line.innerHTML = current;
					}
					current_account.total_expense+=parseFloat(sum);
					current_account.budget-=parseFloat(sum);
					document.querySelector('.expense').innerHTML = `Expense: <i>${current_account.total_expense}</i> ${current_account.currency}`;
					document.querySelector('.budget').innerHTML = `Budget: <i>${Math.round((current_account.budget) * 100)/100}</i> ${current_account.currency}`;
				if(localStorage.getItem('order') == 1) {
					acc = JSON.stringify(current_account);
				} else if(localStorage.getItem('order')>1) {
					acc[account_number] = JSON.stringify(current_account);
				}
				localStorage.setItem('account',acc);
		}else {
				let income_indexes = current_account.income_indexes;
				sum=-sum;
		if(income_indexes.length) {
			id = income_indexes[income_indexes.length-1]+1;
		} else {
			id = 0;
		}
		let found = 0;
		let i;
		for(i = 0;i<income_indexes.length && found === 0;i++) {
			if(name === current_account.income_names[i]) {
				found = 1;
			}
		}
		if(!found) {
			current_account.income_indexes.push(id);
			document.querySelector('.income_container').insertAdjacentHTML('beforeend',`
				<div class="excome" id = 'income_${id}'>
					<div class="nameOfExcome">
						${name}
					</div>
					<div class="sumOfExcome">
						<i>${Math.round(sum * 100)/100}</i> ${current_account.currency}
					</div>
					<button class = "delete"  onClick = "delete_Excome()">
						<img class="icon_x" src="./pictures/icon.png" id = "income_${id}_delete">
					</button>
			</div>
			`);
			current_account.income_names.push(name);
			current_account.income_sums.push(Math.round(sum * 100)/100);
		} else {
			let previous = current_account.income_sums[i-1];
			let current = Math.round(previous*100)/100 + Math.round(sum * 100)/100;
			current_account.income_sums[i-1] = current;
			const line = document.querySelector(`#income_${income_indexes[i-1]}`).children[1];
			line.innerHTML = current;
		}
		current_account.total_income+=parseFloat(sum);
		current_account.budget+=parseFloat(sum);
		document.querySelector('.income').innerHTML = `Income: <i>${current_account.total_income}</i> ${current_account.currency}`;
		document.querySelector('.budget').innerHTML = `Budget: <i>${Math.round((current_account.budget) * 100)/100}</i> ${current_account.currency}`;		
		if(localStorage.getItem('order') == 1) {
			acc = JSON.stringify(current_account);
		} else if(localStorage.getItem('order')>1) {
			acc[account_number] = JSON.stringify(current_account);
		}
		localStorage.setItem('account',acc);
	}
}
}

const delete_Excome = () => {
	let type = event.target.id.split('_')[0];
	let id = event.target.id.split('_')[1];
	let acc;
	let account_number = localStorage.getItem('account_nr')-1;
	let current_account;
	let current_account_string;
	if(localStorage.getItem('order') == 1) {
		acc=localStorage.getItem('account');
		current_account_string = acc;
	} else if(localStorage.getItem('order')>1) {
		acc = localStorage.getItem('account').split(',{');
		if(account_number !== 0) {
			current_account_string = '{' + acc[account_number];
			for(let k = 1;k<acc.length;k++) {
				acc[k] = '{' + acc[k];
			}
		} else {
			current_account_string = acc[0];
			for(let k = 1;k<acc.length;k++) {
				acc[k] = '{' + acc[k];
			}
		}
	}
	current_account = JSON.parse(current_account_string);
	if(type == 'income') {
		let income_sum = parseInt(current_account.income_sums[current_account.income_indexes.indexOf(parseInt(id))]);
		current_account.income_names.splice(current_account.income_indexes.indexOf(parseInt(id)),1);
		current_account.income_sums.splice(current_account.income_indexes.indexOf(parseInt(id)),1);
		current_account.income_indexes.splice(current_account.income_indexes.indexOf(parseInt(id)),1);
		current_account.total_income-=parseFloat(income_sum);
		current_account.budget-=parseFloat(income_sum);
		document.querySelector('.income').innerHTML = `Income: <i>${current_account.total_income}</i> ${current_account.currency}`;
		document.querySelector('.budget').innerHTML = `Budget: <i>${Math.round((current_account.budget)*100)/100} ${current_account.currency}</i>`;
	} else if(type == 'expense') {
		let expense_sum=parseInt(current_account.expense_sums[current_account.expense_indexes.indexOf(parseInt(id))]);
		current_account.expense_names.splice(current_account.expense_indexes.indexOf(parseInt(id)),1);
		current_account.expense_sums.splice(current_account.expense_indexes.indexOf(parseInt(id)),1);
		current_account.expense_indexes.splice(current_account.expense_indexes.indexOf(parseInt(id)),1);
		current_account.total_expense-=parseFloat(expense_sum);
		current_account.budget+=parseFloat(expense_sum);
		document.querySelector('.expense').innerHTML = `Expense: <i>${current_account.total_expense}</i> ${current_account.currency}`;
		document.querySelector('.budget').innerHTML = `Budget: <i>${current_account.budget} ${current_account.currency}</i>`;
	}
	if(localStorage.getItem('order') == 1) {
			acc = JSON.stringify(current_account);
	} else if(localStorage.getItem('order')>1) {
			acc[account_number] = JSON.stringify(current_account);
	}
	localStorage.setItem('account',acc);
	event.target.parentNode.parentNode.parentNode.removeChild(document.querySelector(`#${type}_${id}`));
}	


//load saved

const load_saved_data = () => {
	let acc;
	let account_number = localStorage.getItem('account_nr')-1;
	let current_account;
	let current_account_string;
	if(localStorage.getItem('order') == 1) {
		acc=localStorage.getItem('account');
		current_account_string = acc;
	} else if(localStorage.getItem('order')>1) {
		acc = localStorage.getItem('account').split(',{');
		if(account_number !== 0) {
			current_account_string = '{' + acc[account_number];
			for(let k = 1;k<acc.length;k++) {
				acc[k] = '{' + acc[k];
			}
		} else {
			current_account_string = acc[0];
			for(let k = 1;k<acc.length;k++) {
				acc[k] = '{' + acc[k];
			}
		}
	}
	current_account = JSON.parse(current_account_string);
	if(current_account.periodic_income_sums.length >= 1) {
		current_account.periodic_income_sums.forEach((cur,i) => {
		let val=current_account.period_income_amount[i].split('\\');
		document.querySelector('.income_container').insertAdjacentHTML('beforeend',`
			<div class="excome" id = 'income_periodic_${current_account.periodic_income_indexes[i]}'>
			<div class="nameOfExcome" id="pern">
				${current_account.periodic_income_names[i]}
			</div>
			<div class="sumOfExcome" id="pers">
				<i>${Math.round(current_account.periodic_income_sums[i]*100)/100}</i> ${current_account.currency}
			</div>
			<div class="monthly">
				${current_account.period_income_amount[i]}
				${current_account.period_income_types[i]} 
			</div>
			<button class = "delete"  onClick = "showPrompt()" id="per">
				<img class="icon_x" src="./pictures/icon.png" id = 'income_periodic_${current_account.periodic_income_indexes[i]}_delete'>
			</button>
		</div>
		`);
		});
	}
	if(current_account.periodic_expense_sums.length >= 1) {
		current_account.periodic_expense_sums.forEach((cur,i) => {
		let val=current_account.period_expense_amount[i].split('\\');
		document.querySelector('.expense_container').insertAdjacentHTML('beforeend',`
			<div class="excome" id = 'expense_periodic_${current_account.periodic_expense_indexes[i]}'>
			<div class="nameOfExcome" id="perne">
				${current_account.periodic_expense_names[i]}
			</div>
			<div class="sumOfExcome" id="perse">
				<i>${Math.round(current_account.periodic_expense_sums[i]*100)/100}</i> ${current_account.currency}
			</div>
			<div class="monthly">
				${current_account.period_expense_amount[i]}
				${current_account.period_expense_types[i]} 
			</div>
			<button class = "delete"  onClick = "showPrompt()" id="pere">
				<img class="icon_x" src="./pictures/icon.png" id = 'expense_periodic_${current_account.periodic_expense_indexes[i]}_delete'>
			</button>
		</div>
		`);
		});
	}
	if(current_account.income_sums.length >= 1) {
		current_account.income_sums.forEach((cur,i) => {
		document.querySelector('.income_container').insertAdjacentHTML('beforeend',`
			<div class="excome" id = 'income_${current_account.income_indexes[i]}'>
			<div class="nameOfExcome">
				${current_account.income_names[i]}
			</div>
			<div class="sumOfExcome">
				<i>${Math.round(current_account.income_sums[i]*100)/100}</i> ${current_account.currency}
			</div>
			<button class = "delete"  onClick = "delete_Excome()">
				<img class="icon_x" src="./pictures/icon.png" id = 'income_${current_account.income_indexes[i]}_delete'>
			</button>
		</div>
		`);
	});
	}
	if(current_account.expense_sums.length>=1) {
	current_account.expense_sums.forEach((cur,i) => {
		document.querySelector('.expense_container').insertAdjacentHTML('beforeend',`
			<div class="excome" id = 'expense_${current_account.expense_indexes[i]}'>
			<div class="nameOfExcome">
				${current_account.expense_names[i]}
			</div>
			<div class="sumOfExcome">
				<i>${Math.round(current_account.expense_sums[i]*100)/100}</i> ${current_account.currency}
			</div>
			<button class = "delete" onClick = "delete_Excome()">
				<img class="icon_x" src="./pictures/icon.png" id = 'expense_${current_account.expense_indexes[i]}_delete'>
			</button>
		</div>
		`);
	});
	}
	changePeriod();
}

//extra

const addPeriodic = () => {
	let type = document.querySelector('#type').value;
	let name = document.querySelector('.income_expense_name').value;
	let total_or_partial = document.querySelector('#part').value;
	let sum = document.querySelector('.sum').value;
	let currency_type = document.querySelector('#curr').value;
	let period=document.querySelector('#period').value;
	if(name && total_or_partial && sum && period) {
		let amount_of_time=document.querySelector('.amount').value;
		if(amount_of_time>0) {
		document.querySelector('.amount').value='';
		document.querySelector('.sum').value = '';
		document.querySelector('.income_expense_name').value = '';
		document.querySelector('.income_expense_name').focus();
		let id;
		let acc;
		let account_number = localStorage.getItem('account_nr')-1;
		let current_account;
		let current_account_string;
		if(localStorage.getItem('order') == 1) {
			acc=localStorage.getItem('account');
			current_account_string = acc;
		} else if(localStorage.getItem('order')>1) {
			acc = localStorage.getItem('account').split(',{');
			if(account_number !== 0) {
				current_account_string = '{' + acc[account_number];
				for(let k = 1;k<acc.length;k++) {
					acc[k] = '{' + acc[k];
				}
			} else {
				current_account_string = acc[0];
				for(let k = 1;k<acc.length;k++) {
					acc[k] = '{' + acc[k];
				}
			}
		}
		current_account = JSON.parse(current_account_string);
		if(currency_type=="$") {
			if(current_account.currency=="lei") {
				sum*=4;
			} else if(current_account.currency=="€") {
				sum*=0.82;
			}
		}
		if(currency_type=="€") {
			if(current_account.currency=="lei") {
				sum*=4.87;
			} else if(current_account.currency=="$") {
				sum*=1.21;
			}
		}
		if(currency_type=="lei") {
			if(current_account.currency=="$") {
				sum/=4;
			} else if(current_account.currency=="€"){ 
				sum/=4.87;
			}
		}
		if(total_or_partial=='total') {
			sum/=amount_of_time;
		}
		let d=new Date();
		if(type === '+') {	
			if(sum>0) {
				if(current_account.periodic_income_indexes.length) {
					id=current_account.periodic_income_indexes[current_account.periodic_income_indexes.length-1]+1;
				} else {
					id=0;
				}
				current_account.periodic_income_indexes.push(id);
				current_account.periodic_income_names.push(name);
				current_account.periodic_income_sums.push(sum);
				current_account.period_income_types.push(period);
				current_account.period_income_amount.push(`1\\${amount_of_time}`);
				current_account.period_income_update.push(`${d.getFullYear()}\\${d.getMonth()}\\${d.getTime()}\\${d.getDate()}`);
				current_account.total_income+=parseFloat(sum);
				current_account.budget+=parseFloat(sum);
			} else {
				if(current_account.periodic_expense_indexes.length) {
					id=current_account.periodic_expense_indexes[current_account.periodic_expense_indexes.length-1]+1;
				} else {
					id=0;
				}
				sum=-sum;
				current_account.periodic_expense_indexes.push(id);
				current_account.periodic_expense_names.push(name);
				current_account.periodic_expense_sums.push(sum);
				current_account.period_expense_types.push(period);
				current_account.period_expense_amount.push(`1\\${amount_of_time}`);
				current_account.period_expense_update.push(`${d.getFullYear()}\\${d.getMonth()}\\${d.getTime()}\\${d.getDate()}`)
				current_account.total_expense+=parseFloat(sum);
				current_account.budget-=parseFloat(sum);
			}
		} else if(type === '-') {
			if(sum<0) {
				if(current_account.periodic_income_indexes.length) {
					id=current_account.periodic_income_indexes[current_account.periodic_income_indexes.length-1]+1;
				} else {
					id=0;
				}
				sum=-sum;
				current_account.periodic_income_indexes.push(id);
				current_account.periodic_income_names.push(name);
				current_account.periodic_income_sums.push(sum);
				current_account.period_income_types.push(period);
				current_account.period_income_amount.push(`1\\${amount_of_time}`);
				current_account.period_income_update.push(`${d.getFullYear()}\\${d.getMonth()}\\${d.getTime()}\\${d.getDate()}`)
				current_account.total_income+=parseFloat(sum);
				current_account.budget+=parseFloat(sum);
			} else {
				if(current_account.periodic_expense_indexes.length) {
					id=current_account.periodic_expense_indexes[current_account.periodic_expense_indexes.length-1]+1;
				} else {
					id=0;
				}
				current_account.periodic_expense_indexes.push(id);
				current_account.periodic_expense_names.push(name);
				current_account.periodic_expense_sums.push(sum);
				current_account.period_expense_types.push(period);
				current_account.period_expense_update.push(`${d.getFullYear()}\\${d.getMonth()}\\${d.getTime()}\\${d.getDate()}`)
				current_account.period_expense_amount.push(`1\\${amount_of_time}`);
				current_account.total_expense+=parseFloat(sum);
				current_account.budget-=parseFloat(sum);
			}
		}
		if(localStorage.getItem('order') == 1) {
			acc = JSON.stringify(current_account);
		} else if(localStorage.getItem('order')>1) {
			acc[account_number] = JSON.stringify(current_account);
		}
		localStorage.setItem('account',acc);
		}else alert("Please complete all options");
	} else {
		alert("Please complete all options correctly");
	}
}
const deletePeriodic = (id,type,yn) => {
	console.log(id+type+yn);
		let acc;
		let account_number = localStorage.getItem('account_nr')-1;
		let current_account;
		let current_account_string;
		if(localStorage.getItem('order') == 1) {
			acc=localStorage.getItem('account');
			current_account_string = acc;
		} else if(localStorage.getItem('order')>1) {
			acc = localStorage.getItem('account').split(',{');
		if(account_number !== 0) {
			current_account_string = '{' + acc[account_number];
			for(let k = 1;k<acc.length;k++) {
				acc[k] = '{' + acc[k];
			}
		} else {
			current_account_string = acc[0];
			for(let k = 1;k<acc.length;k++) {
				acc[k] = '{' + acc[k];
			}
		}
	}
	current_account = JSON.parse(current_account_string);
		if(yn==1) {
			if(type == 'income') {
				current_account.total_income-=parseFloat(current_account.periodic_income_sums[current_account.periodic_income_indexes.indexOf(parseInt(id))]);
				current_account.budget-=parseFloat(current_account.periodic_income_sums[current_account.periodic_income_indexes.indexOf(parseInt(id))]);
				current_account.periodic_income_names.splice(current_account.periodic_income_indexes.indexOf(parseInt(id)),1);
				current_account.periodic_income_sums.splice(current_account.periodic_income_indexes.indexOf(parseInt(id)),1);
				current_account.periodic_income_indexes.splice(current_account.periodic_income_indexes.indexOf(parseInt(id)),1);
				current_account.period_income_types.splice(current_account.periodic_income_indexes.indexOf(parseInt(id)),1);
				current_account.period_income_amount.splice(current_account.periodic_income_indexes.indexOf(parseInt(id)),1);
				current_account.period_income_update.splice(current_account.periodic_income_indexes.indexOf(parseInt(id)),1);
				document.querySelector('.budget').innerHTML = `Budget: <i>${current_account.budget} ${current_account.currency}</i>`;
				document.querySelector('.income').innerHTML = `Income: <i>${current_account.total_income} ${current_account.currency}</i>`;
				document.querySelector('.expense').innerHTML = `Expense: <i>${current_account.total_expense} ${current_account.currency}</i>`;
				document.querySelector(`.income_container`).removeChild(document.getElementById(`income_periodic_${id}`));
			} else if(type == 'expense') {
				current_account.total_expense-=parseFloat(current_account.periodic_expense_sums[current_account.periodic_expense_indexes.indexOf(parseInt(id))]);
				current_account.budget+=parseFloat(current_account.periodic_expense_sums[current_account.periodic_expense_indexes.indexOf(parseInt(id))]);
				current_account.periodic_expense_names.splice(current_account.periodic_expense_indexes.indexOf(parseInt(id)),1);
				current_account.periodic_expense_sums.splice(current_account.periodic_expense_indexes.indexOf(parseInt(id)),1);
				current_account.periodic_expense_indexes.splice(current_account.periodic_expense_indexes.indexOf(parseInt(id)),1);
				current_account.period_expense_types.splice(current_account.periodic_expense_indexes.indexOf(parseInt(id)),1);
				current_account.period_expense_amount.splice(current_account.periodic_expense_indexes.indexOf(parseInt(id)),1);
				current_account.period_expense_update.splice(current_account.periodic_expense_indexes.indexOf(parseInt(id)),1);
				document.querySelector('.expense').innerHTML = `Expense: <i>${current_account.total_expense} ${current_account.currency}</i>`;
				document.querySelector('.income').innerHTML = `Income: <i>${current_account.total_income} ${current_account.currency}</i>`;
				document.querySelector('.budget').innerHTML = `Budget: <i>${current_account.budget} ${current_account.currency}</i>`;
				document.querySelector(`.expense_container`).removeChild(document.getElementById(`expense_periodic_${id}`));
			}
			if(localStorage.getItem('order') == 1) {
					acc = JSON.stringify(current_account);
			} else if(localStorage.getItem('order')>1) {
					acc[account_number] = JSON.stringify(current_account);
			}
			localStorage.setItem('account',acc);
		} else {
			if(type == 'income') {
				current_account.periodic_income_names.splice(current_account.periodic_income_indexes.indexOf(parseInt(id)),1);
				current_account.periodic_income_sums.splice(current_account.periodic_income_indexes.indexOf(parseInt(id)),1);
				current_account.periodic_income_indexes.splice(current_account.periodic_income_indexes.indexOf(parseInt(id)),1);
				current_account.period_income_types.splice(current_account.periodic_income_indexes.indexOf(parseInt(id)),1);
				current_account.period_income_amount.splice(current_account.periodic_income_indexes.indexOf(parseInt(id)),1);
				current_account.period_income_update.splice(current_account.periodic_income_indexes.indexOf(parseInt(id)),1);
				document.querySelector(`.income_container`).removeChild(document.querySelector(`#income_periodic_${id}`));
			} else if(type == 'expense') {
				current_account.periodic_expense_names.splice(current_account.periodic_expense_indexes.indexOf(parseInt(id)),1);
				current_account.periodic_expense_sums.splice(current_account.periodic_expense_indexes.indexOf(parseInt(id)),1);
				current_account.periodic_expense_indexes.splice(current_account.periodic_expense_indexes.indexOf(parseInt(id)),1);
				current_account.period_expense_types.splice(current_account.periodic_expense_indexes.indexOf(parseInt(id)),1);
				current_account.period_expense_amount.splice(current_account.periodic_expense_indexes.indexOf(parseInt(id)),1);
				current_account.period_expense_update.splice(current_account.period_expense_amount.indexOf(parseInt(id)),1);
				document.querySelector(`.expense_container`).removeChild(document.querySelector(`#expense_periodic_${id}`));
			}
			if(localStorage.getItem('order') == 1) {
					acc = JSON.stringify(current_account);
			} else if(localStorage.getItem('order')>1) {
					acc[account_number] = JSON.stringify(current_account);
			}
			localStorage.setItem('account',acc);
		}
}
const hidePrompt = (id,type,yn) => {
	document.querySelector(".modal").style.display="none";
	deletePeriodic(id,type,yn);
}
const showPrompt = () => {
	let type = event.target.id.split('_')[0];
	let id = event.target.id.split('_')[2];
	document.querySelector(".modal").style.display="block";
	document.querySelector("#yes").addEventListener('mouseup',() => hidePrompt(id,type,1));
	document.querySelector("#no").addEventListener('mouseup',() => hidePrompt(id,type,0));
}



const changePeriod = () => {
	let acc;
	let account_number = localStorage.getItem('account_nr')-1;
	let current_account;
	let current_account_string;
	if(localStorage.getItem('order') == 1) {
		acc=localStorage.getItem('account');
		current_account_string = acc;
	} else if(localStorage.getItem('order')>1) {
		acc = localStorage.getItem('account').split(',{');
		if(account_number !== 0) {
			current_account_string = '{' + acc[account_number];
			for(let k = 1;k<acc.length;k++) {
				acc[k] = '{' + acc[k];
			}
		} else {
			current_account_string = acc[0];
			for(let k = 1;k<acc.length;k++) {
				acc[k] = '{' + acc[k];
			}
		}
	}
	current_account = JSON.parse(current_account_string);
	let d= new Date();
	let year=parseInt(d.getFullYear());
	let month=parseInt(d.getMonth());
	let day=parseInt(d.getTime());
	let date=parseInt(d.getDate());
	for(let i=0;i<current_account.period_income_update.length;i++) {
		if(current_account.period_income_types[i]=='Years') {
			let val=current_account.period_income_amount[i].split('\\');
			let dates=current_account.period_income_update[i].split('\\');
			let dif=year-parseInt(dates[0]);
			if(parseInt(dates[1])>month) dif--;
			if(dif>0) {
				if(parseInt(val[0])+dif<parseInt(val[1])) {
					current_account.period_income_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
					current_account.total_income+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
					current_account.budget+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
					current_account.period_income_update[i]=`${year}\\${month}\\${day}\\${date}`;
					document.querySelector(`#income_periodic_${current_account.periodic_income_indexes[i]} .monthly`).innerHTML=`
						${current_account.period_income_types[i]} 
						${current_account.period_income_amount[i]}
					`;
				} else if(parseInt(val[0])+dif==parseInt(val[1])){
					current_account.period_income_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
					current_account.total_income+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
					current_account.budget+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
					current_account.period_income_update[i]=`${year}\\${month}\\${day}\\${date}`;
					document.querySelector(`#income_periodic_${current_account.periodic_income_indexes[i]} .monthly`).innerHTML=`
						${current_account.period_income_types[i]} 
						${current_account.period_income_amount[i]}
					`;
				} else {
					if(val[0]!=val[1]) {
						dif=parseInt(val[1])-parseInt(val[0]);
						current_account.period_income_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
						current_account.total_income+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
						current_account.budget+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
						current_account.period_income_update[i]=`${year}\\${month}\\${day}\\${date}`;
						document.querySelector(`#income_periodic_${current_account.periodic_income_indexes[i]} .monthly`).innerHTML=`
							${current_account.period_income_types[i]} 
							${current_account.period_income_amount[i]}
						`;
					}
				}
			}
		}
		if(current_account.period_income_types[i]=='Months') {
			let val=current_account.period_income_amount[i].split('\\');
			let dates=current_account.period_income_update[i].split('\\');
			let dif=(year-dates[0])*12+month-parseInt(dates[1]);
			if(parseInt(dates[3])>date) dif--;
			if(dif>0) {
				if(parseInt(val[0])+dif<parseInt(val[1])) {
					current_account.period_income_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
					current_account.total_income+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
					current_account.budget+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
					current_account.period_income_update[i]=`${year}\\${month}\\${day}\\${date}`;
					document.querySelector(`#income_periodic_${current_account.periodic_income_indexes[i]} .monthly`).innerHTML=`
						${current_account.period_income_types[i]} 
						${current_account.period_income_amount[i]}
					`;
				} else if(parseInt(val[0])+dif==parseInt(val[1])){
					current_account.period_income_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
					current_account.total_income+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
					current_account.budget+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
					current_account.period_income_update[i]=`${year}\\${month}\\${day}\\${date}`;
					document.querySelector(`#income_periodic_${current_account.periodic_income_indexes[i]} .monthly`).innerHTML=`
						${current_account.period_income_types[i]} 
						${current_account.period_income_amount[i]}
					`;
				} else {
					if(val[0]!=val[1]) {
						dif=parseInt(val[1])-parseInt(val[0]);
						current_account.period_income_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
						current_account.total_income+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
						current_account.budget+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
						current_account.period_income_update[i]=`${year}\\${month}\\${day}\\${date}`;
						document.querySelector(`#income_periodic_${current_account.periodic_income_indexes[i]} .monthly`).innerHTML=`
							${current_account.period_income_types[i]} 
							${current_account.period_income_amount[i]}
						`;
					}
				}
			}
		}
	if(current_account.period_income_types[i]=='Weeks') {
		let val=current_account.period_income_amount[i].split('\\');
		let dates=current_account.period_income_update[i].split('\\');
		let dif=parseInt((day-parseInt(dates[2]))/(7*86400000));
		if(dif>0) {
			if(parseInt(val[0])+dif<parseInt(val[1])) {
				current_account.period_income_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
				current_account.total_income+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
				current_account.budget+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
				current_account.period_income_update[i]=`${year}\\${month}\\${day}\\${date}`;
				document.querySelector(`#income_periodic_${current_account.periodic_income_indexes[i]} .monthly`).innerHTML=`
					${current_account.period_income_types[i]} 
					${current_account.period_income_amount[i]}
				`;
			} else if(parseInt(val[0])+dif==parseInt(val[1])){
				current_account.period_income_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
				current_account.total_income+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
				current_account.budget+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
				current_account.period_income_update[i]=`${year}\\${month}\\${day}\\${date}`;
				document.querySelector(`#income_periodic_${current_account.periodic_income_indexes[i]} .monthly`).innerHTML=`
					${current_account.period_income_types[i]} 
					${current_account.period_income_amount[i]}
				`;
			} else {
				if(val[0]!=val[1]) {
					dif=parseInt(val[1])-parseInt(val[0]);
					current_account.period_income_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
					current_account.total_income+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
					current_account.budget+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
					current_account.period_income_update[i]=`${year}\\${month}\\${day}\\${date}`;
					document.querySelector(`#income_periodic_${current_account.periodic_income_indexes[i]} .monthly`).innerHTML=`
						${current_account.period_income_types[i]} 
						${current_account.period_income_amount[i]}
					`;
				}
			}
		}
	}
	if(current_account.period_income_types[i]=='Days') {
		let val=current_account.period_income_amount[i].split('\\');
		let dates=current_account.period_income_update[i].split('\\');
		let dif=parseInt((day-parseInt(dates[2]))/86400000);
		if(dif>0) {
			if(parseInt(val[0])+dif<parseInt(val[1])) {
				current_account.period_income_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
				current_account.total_income+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
				current_account.budget+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
				current_account.period_income_update[i]=`${year}\\${month}\\${day}\\${date}`;
				document.querySelector(`#income_periodic_${current_account.periodic_income_indexes[i]} .monthly`).innerHTML=`
					${current_account.period_income_types[i]} 
					${current_account.period_income_amount[i]}
				`;
			} else if(parseInt(val[0])+dif==parseInt(val[1])){
				current_account.period_income_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
				current_account.total_income+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
				current_account.budget+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
				current_account.period_income_update[i]=`${year}\\${month}\\${day}\\${date}`;
				document.querySelector(`#income_periodic_${current_account.periodic_income_indexes[i]} .monthly`).innerHTML=`
					${current_account.period_income_types[i]} 
					${current_account.period_income_amount[i]}
				`;
			} else {
				if(val[0]!=val[1]) {
					dif=parseInt(val[1])-parseInt(val[0]);
					current_account.period_income_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
					current_account.total_income+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
					current_account.budget+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
					current_account.period_income_update[i]=`${year}\\${month}\\${day}\\${date}`;
					document.querySelector(`#income_periodic_${current_account.periodic_income_indexes[i]} .monthly`).innerHTML=`
						${current_account.period_income_types[i]} 
						${current_account.period_income_amount[i]}
					`;
				}
			}
		}
	}
}
for(let i=0;i<current_account.period_expense_update.length;i++) {
	if(current_account.period_expense_types[i]=='Years') {
		let val=current_account.period_expense_amount[i].split('\\');
		let dates=current_account.period_expense_update[i].split('\\');
		let dif=year-parseInt(dates[0]);
		if(parseInt(dates[1])>month) dif--;
		if(dif>0) {
			if(parseInt(val[0])+dif<parseInt(val[1])) {
				current_account.period_expense_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
				current_account.total_expense+=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
				current_account.budget-=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
				current_account.period_expense_update[i]=`${year}\\${month}\\${day}\\${date}`;
				document.querySelector(`#expense_periodic_${current_account.periodic_expense_indexes[i]} .monthly`).innerHTML=`
					${current_account.period_expense_types[i]} 
					${current_account.period_expense_amount[i]}
				`;
			} else if(parseInt(val[0])+dif==parseInt(val[1])){
				current_account.period_expense_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
				current_account.total_expense+=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
				current_account.budget-=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
				current_account.period_expense_update[i]=`${year}\\${month}\\${day}\\${date}`;
				document.querySelector(`#expense_periodic_${current_account.periodic_expense_indexes[i]} .monthly`).innerHTML=`
					${current_account.period_expense_types[i]} 
					${current_account.period_expense_amount[i]}
				`;
			} else {
				if(val[0]!=val[1]) {
					dif=parseInt(val[1])-parseInt(val[0]);
					current_account.period_expense_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
					current_account.total_expense+=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
					current_account.budget-=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
					current_account.period_expense_update[i]=`${year}\\${month}\\${day}\\${date}`;
					document.querySelector(`#expense_periodic_${current_account.periodic_expense_indexes[i]} .monthly`).innerHTML=`
						${current_account.period_expense_types[i]} 
						${current_account.period_expense_amount[i]}
					`;
				}
			}
		}
	}
	if(current_account.period_expense_types[i]=='Months') {
		let val=current_account.period_expense_amount[i].split('\\');
		let dates=current_account.period_expense_update[i].split('\\');
		let dif=(year-dates[0])*12+month-parseInt(dates[1]);
		if(parseInt(dates[3])>date) dif--;
		if(dif>0) {
			if(parseInt(val[0])+dif<parseInt(val[1])) {
				current_account.period_expense_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
				current_account.total_expense+=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
				current_account.budget-=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
				current_account.period_expense_update[i]=`${year}\\${month}\\${day}\\${date}`;
				document.querySelector(`#expense_periodic_${current_account.periodic_expense_indexes[i]} .monthly`).innerHTML=`
					${current_account.period_expense_types[i]} 
					${current_account.period_expense_amount[i]}
				`;
			} else if(parseInt(val[0])+dif==parseInt(val[1])){
				current_account.period_expense_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
				current_account.total_expense+=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
				current_account.budget-=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
				current_account.period_expense_update[i]=`${year}\\${month}\\${day}\\${date}`;
				document.querySelector(`#expense_periodic_${current_account.periodic_expense_indexes[i]} .monthly`).innerHTML=`
					${current_account.period_expense_types[i]} 
					${current_account.period_expense_amount[i]}
				`;
			} else {
				if(val[0]!=val[1]) {
					dif=parseInt(val[1])-parseInt(val[0]);
					current_account.period_expense_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
					current_account.total_expense+=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
					current_account.budget-=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
					current_account.period_expense_update[i]=`${year}\\${month}\\${day}\\${date}`;
					document.querySelector(`#expense_periodic_${current_account.periodic_expense_indexes[i]} .monthly`).innerHTML=`
						${current_account.period_expense_types[i]} 
						${current_account.period_expense_amount[i]}
					`;
				}
			}
		}
	}
if(current_account.period_expense_types[i]=='Weeks') {
	let val=current_account.period_expense_amount[i].split('\\');
	let dates=current_account.period_expense_update[i].split('\\');
	let dif=parseInt((day-parseInt(dates[2]))/(7*86400000));
	if(dif>0) {
		if(parseInt(val[0])+dif<parseInt(val[1])) {
			current_account.period_expense_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
			current_account.total_expense+=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
			current_account.budget-=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
			current_account.period_expense_update[i]=`${year}\\${month}\\${day}\\${date}`;
			document.querySelector(`#expense_periodic_${current_account.periodic_expense_indexes[i]} .monthly`).innerHTML=`
				${current_account.period_expense_types[i]} 
				${current_account.period_expense_amount[i]}
			`;
		} else if(parseInt(val[0])+dif==parseInt(val[1])){
			current_account.period_expense_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
			current_account.total_expense+=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
			current_account.budget-=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
			current_account.period_expense_update[i]=`${year}\\${month}\\${day}\\${date}`;
			document.querySelector(`#expense_periodic_${current_account.periodic_expense_indexes[i]} .monthly`).innerHTML=`
				${current_account.period_expense_types[i]} 
				${current_account.period_expense_amount[i]}
			`;
		} else {
			if(val[0]!=val[1]) {
				dif=parseInt(val[1])-parseInt(val[0]);
				current_account.period_expense_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
				current_account.total_expense+=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
				current_account.budget-=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
				current_account.period_expense_update[i]=`${year}\\${month}\\${day}\\${date}`;
				document.querySelector(`#expense_periodic_${current_account.periodic_expense_indexes[i]} .monthly`).innerHTML=`
					${current_account.period_expense_types[i]} 
					${current_account.period_expense_amount[i]}
				`;
			}
		}
	}
}
if(current_account.period_expense_types[i]=='Days') {
	let val=current_account.period_expense_amount[i].split('\\');
	let dates=current_account.period_expense_update[i].split('\\');
	let dif=parseInt((day-parseInt(dates[2]))/86400000);
	if(dif>0) {
		if(parseInt(val[0])+dif<parseInt(val[1])) {
			current_account.period_expense_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
			current_account.total_expense+=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
			current_account.budget-=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
			current_account.period_expense_update[i]=`${year}\\${month}\\${day}\\${date}`;
			document.querySelector(`#expense_periodic_${current_account.periodic_expense_indexes[i]} .monthly`).innerHTML=`
				${current_account.period_expense_types[i]} 
				${current_account.period_expense_amount[i]}
			`;
		} else if(parseInt(val[0])+dif==parseInt(val[1])){
			current_account.period_expense_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
			current_account.total_expense+=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
			current_account.budget-=dif*Math.floor(parseFloat(current_account.periodic_expense_sums[i])*100)/100;
			current_account.period_expense_update[i]=`${year}\\${month}\\${day}\\${date}`;
			document.querySelector(`#expense_periodic_${current_account.periodic_expense_indexes[i]} .monthly`).innerHTML=`
				${current_account.period_expense_types[i]} 
				${current_account.period_expense_amount[i]}
			`;
		} else {
			if(val[0]!=val[1]) {
				dif=parseInt(val[1])-parseInt(val[0]);
				current_account.period_expense_amount[i]=`${parseInt(val[0])+dif}\\${val[1]}`;
				current_account.total_income+=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
				current_account.budget-=dif*Math.floor(parseFloat(current_account.periodic_income_sums[i])*100)/100;
				current_account.period_income_update[i]=`${year}\\${month}\\${day}\\${date}`;
				document.querySelector(`#income_periodic_${current_account.periodic_income_indexes[i]} .monthly`).innerHTML=`
					${current_account.period_income_types[i]} 
					${current_account.period_income_amount[i]}
				`;
			}
		}
	}
}
}
	console.log(current_account.budget);
	document.querySelector('.expense').innerHTML = `Expense: <i>${current_account.total_expense} ${current_account.currency}</i>`;
	document.querySelector('.budget').innerHTML = `Budget: <i>${current_account.budget} ${current_account.currency}</i>`;
	document.querySelector('.income').innerHTML = `Income: <i>${current_account.total_income} ${current_account.currency}</i>`;
	if(localStorage.getItem('order') == 1) {
		acc = JSON.stringify(current_account);
	} else if(localStorage.getItem('order')>1) {
		acc[account_number] = JSON.stringify(current_account);
	}
	localStorage.setItem('account',acc);
}

const addperiod = () => {
	if(!document.querySelector(".amount")) {
		document.querySelector(".monthlyd").insertAdjacentHTML(`beforeend`,`
			<input type = "number" class = "amount" placeholder = "time...">
		`);
	}
}



//buttons


if(window.document.title === 'New account') {
	document.querySelector('.create_account').addEventListener('mouseup', () => {
		newAccount();
    });
    document.querySelector('.back').addEventListener('mouseup', () => {
		window.open('index.html','_self')
	});
	document.addEventListener('keydown',e => {
		if(e.keyCode === 13) {
			newAccount();
		}
	});
} else if(window.document.title === 'Excome login') {
	document.addEventListener('keydown',e => {
		if(e.keyCode === 13) {
			let mail = document.querySelector('#mail_input_login').value;
			let password = document.querySelector('#parola_input_login').value;
			if(mail && password) {
				login();
			} else if(mail && !password) {
				document.querySelector('#parola_input_login').focus();
			} else if(!mail && password) {
				document.querySelector('#mail_input_login').focus();
			}
		}
	});
} else if(window.document.title === 'Excome') {
	document.addEventListener('keydown',e => {
		if(e.keyCode === 13) {
			let name = document.querySelector('.income_expense_name').value;
			let sum = document.querySelector('.sum').value;
			if(name && sum) {
				new_excome();
			} else if(name && !sum) {
				document.querySelector('.sum').focus();
			} else if(!name && sum) {
				document.querySelector('.income_expense_name').focus();
			}
		}
	});
	document.querySelector('#log_out').addEventListener('mouseup',() => {
		log_out();
	});
	document.querySelector('#settings').addEventListener('mouseup',() => {
		window.open('settings.html','_self');
	});
	document.querySelector('#extra').addEventListener('mouseup',() => {
		window.open('extra.html','_self');
	});
} else if(window.document.title === 'Settings') {
	document.querySelector('#log_out').addEventListener('mouseup',() => {
		log_out();
	});
	document.querySelector('#home').addEventListener('mouseup',() => {
		window.open('main.html','_self');
	});
	document.querySelector('#extra').addEventListener('mouseup',() => {
		window.open('extra.html','_self');
	});
} else if(window.document.title === 'Extra') {
	document.querySelector('#log_out').addEventListener('mouseup',() => {
		log_out();
	});
	document.querySelector('#home').addEventListener('mouseup',() => {
		window.open('main.html','_self');
	});
	document.querySelector('#settings').addEventListener('mouseup',() => {
		window.open('settings.html','_self');
	});
}


//focus
const verif = () => {
	if(window.document.title === 'New account') {
		document.querySelector('#mail_input_first').focus();
	} else if(window.document.title === 'Excome login') {
		document.querySelector('#mail_input_login').focus();
	} else if(window.document.title === 'Excome') {
		load_saved_data();
		document.querySelector('.income_expense_name').focus();
	} else if(window.document.title === 'Settings') {

	}
}


//load page

window.onload = verif();