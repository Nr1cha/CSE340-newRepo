document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#updateForm");

    // Add "input" event listener to each input element within the form
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener("input", function () {
            const updateBtn = document.querySelector("button");
            updateBtn.removeAttribute("disabled");
        });
    });
});

//CODE FROM INSTRUCTOR ASSIGNMENT
// const form = document.querySelector("#updateForm")
//     form.addEventListener("change", function () {
//       const updateBtn = document.querySelector("button")
//       updateBtn.removeAttribute("disabled")
//     })



