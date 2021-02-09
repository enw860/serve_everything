import "./style.less";

import * as auth from "../api/auth";

document.getElementById("main-container").innerHTML = "Hello";

// prove of login (temp)
auth.fetchUserInfo().then(data => {
    const { success, detail } = data;
    if (!success) {
        document.getElementById("main-container").innerHTML = "<a target='_self' href='/auth'>Go to login</i>";
    } else {
        document.getElementById("main-container").innerHTML = `Hello ${detail.username}`;
        console.log(detail);
    }
}).catch(err => {
    alert(err);
})
