import React from "react";
import QRCode from "react-qr-code";

function QRCodes(props) {
  //TOdO: muon cusom thi tu vao day chinh
  return (
    <div style={{marginLeft: '28px', marginTop: '12px'}}>
      <QRCode
        title="transformQRCode"
        value={"123456"}
        bgColor="#0F1824"
        fgColor="#666"
        size={200}
      />
    </div>
  );
}
export default QRCodes;
