import React from "react";

export const svg = (
    <div className="animOverlay m-0">
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" dataname="Layer 1" width="100%" height="100vh">
            <defs>
                <linearGradient id="lgrad" x1="100%" y1="50%" x2="0%" y2="50%">
                    <stop offset="25%" stopColor="#fff" stopOpacity="1" />
                    <stop offset="50%" stopColor="#fff" stopOpacity="0.7" />
                    <stop offset="75%" stopColor="#fff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="1" />
                </linearGradient>
                <mask id="mask" x="0" y="0" width="100%" height="100%">
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#lgrad)"/>
                    <ellipse cx="50%" cy="50%" stroke="#000" strokeOpacity="1" strokeWidth="2" />
                </mask>
            </defs>
            <rect x="0" y="0" width="100%" height="100vh" mask="url(#mask)" fill="#fff" fillOpacity="1"/>
        </svg>
    </div>
);

export const canvas = (
    <div className="animOverlay m-0">
        <canvas id="overlayCanvas" width="1920" height="1080">Your browser does not support the HTML5 canvas tag</canvas>
    </div>
);

export function setupCanvas() {
    let canvas = document.getElementById("overlayCanvas");
    let ctx = canvas.getContext("2d");
    ctx.save();
    ctx.beginPath();

    // Create gradient
    let grd = ctx.createLinearGradient(0,0,canvas.width,0);
    grd.addColorStop(0.25,"#fff");
    grd.addColorStop(0.5, "rgba(255, 255, 255, 0.65)");
    grd.addColorStop(0.75,"#fff");

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();
    ctx.ellipse(canvas.width/2,
        canvas.height/2,
        canvas.width*.2,
        canvas.height*.3,
        Math.PI, 0, 2 * Math.PI);

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fill();
}