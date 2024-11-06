const QRCode = require('qrcode');

// Generate a QR Code
const generateQRCode = async (text) => {
  try {
    const qrCodeData = await QRCode.toDataURL(text);
    return qrCodeData;
  } catch (err) {
    throw new Error('QR Code generation failed');
  }
};

module.exports = { generateQRCode };
