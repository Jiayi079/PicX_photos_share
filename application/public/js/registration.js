function vUsername(str, display = true) {
    if (str.match(/^[a-z]/) && str.trim().length < 3) {
      if (display) {
        errUsername.innerHTML = `
    <span class="green">✓ that begins with a character ([a-zA-Z]).</span><br>
    <span class="red">x that is 3 or more alphanumeric characters.</span>
    `;
      }
      return false;
    }
    else if (!str.match(/^[a-z]/) && str.trim().length > 2) {
      if (display) {
        errUsername.innerHTML = `
    <span class="red">x that begins with a character ([a-zA-Z]).</span><br>
    <span class="green">✓ that is 3 or more alphanumeric characters.</span>
    `;
      }
    }
    else if (!str.match(/^([a-z]+[a-z0-9]{2})/gi)) {
      if (display) {
        errUsername.innerHTML = `
    <span class="red">x that begins with a character ([a-zA-Z]).<br>
    x that is 3 or more alphanumeric characters.</span>
    `;
      }
      return false
    }
    else {
      if (display) {
        errUsername.innerHTML = `
    <span class="green">✓ that begins with a character ([a-zA-Z]).</span><br>
    <span class="green">✓ that is 3 or more alphanumeric characters.</span>
    `;
      }
      return true;
    }
  }
  
  function vEmail(str, display = true) {
    if (str.match(/@.*?\./g)) {
      if (display) {
        errEmail.innerHTML = `
    <span class="green">✓ Email is valid</span><br><br>
    `;
      }
      return true;
    }
    else {
      if (display) {
        errEmail.innerHTML = `
    <span class="red">x Email is invalid</span><br><br>
    `;
      }
      return false;
    }
  }
  function vPassword(str, display = true) {
    let result = '';
    // at least 8 characters
    if (str.trim().length > 7) {
      result += `
    <span class="green">✓ Has at least 8 characters</span><br>
    `;
    }
    else {
      result += `
    <span class="red">x Has at least 8 characters</span><br>
    `;
    }
  
    // at least 1 upper case
    if (str.match(/(?=.*[A-Z])/g)) {
      result += `
    <span class="green">✓ Has at least 1 Upper Case letter</span><br>
    `;
    }
    else {
      result += `
    <span class="red">x Has at least 1 Upper Case letter</span><br>
    `;
    }
  
    // at least 1 number
    if (str.match(/(?=.*[0-9])/g)) {
      result += `
    <span class="green">✓ Has at least 1 Number letter</span><br>
    `;
    }
    else {
      result += `
    <span class="red">x Has at least 1 Number letter</span><br>
    `;
    }
  
    // at least 1 symbol
    if (str.match(/(?=.*[/*\-\+!@#$^&])/g)) {
      result += `
    <span class="green">✓ Has at least 1 of the following (/*-+!@#$^&)</span><br>
    `;
    }
    else {
      result += `
    <span class="red">x Has at least 1 of the following (/*-+!@#$^&)</span><br>
    `;
    }
    if (display) {
      errPwd.innerHTML = result;
    }
    if (str.match(/^(?=.{8,})(?=.*[A-Z])(?=.*[/*\-\+!@#$^&]).*$/g)) {
      return true
    }
    else { return false; }
  }
  
  function vCPassword(str, display = true) {
    if (str == pwd.value) {
      if (display) {
        errCPwd.innerHTML = `
    <span class="green">✓ Passwords match!</span><br><br>
    `;
      }
      return true;
    }
    else {
      if (display) {
        errCPwd.innerHTML = `
    <span class="red">x Passwords don't match!</span><br><br>
    `;
      }
      return false;
    }
  }
  
  const myForm = document.querySelector('#myForm');
  const username = document.querySelector('#username');
  const email = document.querySelector('#email');
  const pwd = document.querySelector('#password');
  const cPwd = document.querySelector('#cPassword');
  const over13ys = document.querySelector('#over13ys');
  const privicyrule = document.querySelector('#privicyrule');
  const submitBtn = document.querySelector('#submitBtn');
  
  const errUsername = document.querySelector('#errUsername');
  const errPwd = document.querySelector('#errPwd');
  const errCPwd = document.querySelector('#errCPwd');
  const errChecks = document.querySelector('#errChecks');
  
  
  // Event Listeners
  // Username
  username.addEventListener('keyup', function () { vUsername(this.value) });
  username.addEventListener('focus', function () { vUsername(this.value) });
  username.addEventListener('blur', function () {
    if (vUsername(this.value)) { errUsername.innerHTML = '<br><br>'; }
  });
  
  // Email 
  email.addEventListener('keyup', function () { vEmail(this.value) });
  email.addEventListener('focus', function () { vEmail(this.value) });
  email.addEventListener('blur', function () {
    if (vEmail(this.value)) { errEmail.innerHTML = '<br><br>'; }
  });
  
  
  // Password
  pwd.addEventListener('keyup', function () { vPassword(this.value) });
  pwd.addEventListener('focus', function () { vPassword(this.value) });
  pwd.addEventListener('blur', function () {
    if (vPassword(this.value)) {
      errPwd.innerHTML = '<br><br>';
    }
  });
  
  // Confirm Password
  cPwd.addEventListener('keyup', function () { vCPassword(this.value) });
  cPwd.addEventListener('focus', function () { vCPassword(this.value) });
  cPwd.addEventListener('blur', function () {
    if (vCPassword(this.value)) {
      errCPwd.innerHTML = '<br><br>';
    }
  });
  
  
  // submit button 
  submitBtn.addEventListener('click', function () {
    errChecks.innerHTML = '<br><br>';
    if (vUsername(username.value, false) && vEmail(email.value, false) && vPassword(pwd.value, false) && vCPassword(cPwd.value, false) && over13ys.checked && privicyrule.checked) {
      //alert('submit');
      //myForm.submit();
      res.redirect('/login');
    }
    else if (!over13ys.checked && !privicyrule.checked) {
      errChecks.innerHTML = `
    <span class="red">x You need to confirm your age</span><br>
    <span class="red">x You need to accept terms</span><br>
    `;
    }
    else if (!over13ys.checked) {
      errChecks.innerHTML = `
    <span class="red">x You need to confirm your age</span><br><br>
    `;
    }
    else if (!privicyrule.checked) {
      errChecks.innerHTML = `
    <span class="red">x You need to accept terms</span><br><br>
    `;
    }
  });