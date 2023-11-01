window.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.match(/candidates\/candidate\/\d+\/change\/$/)) {
        try {
            const flexContainer = document.getElementsByClassName("flex-container")[4];
            flexContainer.style.flexDirection = "column";
            flexContainer.style.alignItems = "start";
        } catch {}
    }
});
