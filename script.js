window.onload = function()
{
    const canvas = document.createElement('canvas');
    canvas.width = "900";
    canvas.height = "600";
    canvas.style.border = "1px solid";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(30,30, 100, 50);
}