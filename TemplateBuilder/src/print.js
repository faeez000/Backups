const printBtn = document.querySelector("#print-btn");

window.addEventListener("beforeprint", () => {
    printBtn.style.visibility = "hidden";
});

window.addEventListener("afterprint", () => {
    printBtn.style.visibility = "visible";
});

printBtn.addEventListener("click", (e) => {
    window.print();
});
