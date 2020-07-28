
import {performAction} from "./formHandler"
const formValidation = (event) => {
	event.preventDefault();
	const testReg = /[\!\@\#\$\%\^\&\*\(\)\_\=\+\{\[\}\]\\\"\|\;\:\/\.\>\,\<\?]/;
	const country = document.getElementById('country').value;

	if(country === '')
		alert('Please enter all form fields');
	else if(testReg.test(country))
		alert('Please enter only alphanumeric characters');
	else
		performAction();
}

export { formValidation };