window.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.match(/candidates\/candidate\/\d+\/change\/$/)
        || window.location.pathname.match(/companies\/company\/\d+\/change\/$/))
    {
        try {
            const flexContainer = document.getElementsByClassName("flex-container")[4];
            flexContainer.style.flexDirection = "column";
            flexContainer.style.alignItems = "start";
        } catch {}
    }
});
