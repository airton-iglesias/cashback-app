export const qrCodeTemplate = `
    <html>
    <head>
        <style>
            body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            img {
                max-width: 100%;
                height: auto;
            }
        </style>
    </head>
    <body>
        <div id="qrcode-container">
            <img src="data:image/png;base64,{{qrcodeData}}" alt="QR Code" />
        </div>
    </body>
    </html>
`;
