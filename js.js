document.addEventListener('DOMContentLoaded',function(){
	const form = document.getElementById('form');
	form.addEventListener('submit',formSend);


	async function formSend(e){
		e.preventDefault();


		let error = formValidate(form);

		let formData = new FormData(form);
		
		

		if(error===0){
			form.classList.add('sending');
			let response = await fetch('sendmail.php', {
				method:'POST',
				body: formData
			});
			if(response.ok){
				let result = await response.json();
				alert(result.message);
				form.reset();
				form.classList.remove('sending');
			}else{
				alert("Error");
				form.classList.remove('sending');
			}

		}else{
			alert('Заповнити обовязковы поля')
		}
	}
	function formValidate (form){
		let error = 0;
		let formReq = document.querySelectorAll('.req');//обовязкове поле


		for (let index = 0; index < formReq.length; index++){
			const input = formReq[index];

			formRemoveError(input);

			if(input.classList.contains('email')){
				if(emailTest(input)){
					formAddError(input);
					error++;
				}
			}else if(input.getAttribute("type")==="checkbox"&&input.checked===false){
				formAddError(input);
				error++;
			}else{
				if(input.value===""){
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input){
		input.parentElement.classList.add('error');
		input.classList.add('error')
	}
	function formRemoveError(input){
		input.parentElement.classList.remove('error');
		input.classList.remove('error')
	}
	//функція теста email
	function emailTest(input){
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

// получаэм инпут file в переменную
	const formImage = document.getElementById('formImage');
// получаэм див для превью в переменную
	const formPreview = document.getElementById('formPreview');
// слушаем изменения в инпуте file
	formImage.addEventListener('change',()=> {
		uploadFile(formImage.files[0]);
	});
	function uploadFile(file){
		//перевыряэм тип файла
		if(!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)){
			alert('Дозволені тільки малюнки.');
			formImage.value ='';
			return;
		}
		//перевыряэм розмір файла(< 2 мб)
		if(file.size > 2 * 1024 * 1024){
			alert('Файл должен буть менше 2 МБ.');
			return;
		}


		var reader = new FileReader();
		reader.onload = function(e){
			formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`; 
		};
		reader.onerror = function(e){
			alert('Ошибка');
		};
		reader.readAsDataURL(file);
	}
});