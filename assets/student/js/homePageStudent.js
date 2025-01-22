const deleteButtons = document.querySelectorAll(".delete-btn");
for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].onclick = function () {
        this.closest("tr").remove();
    };
}
