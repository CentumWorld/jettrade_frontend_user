// import React, { useState, useEffect } from "react";
// import "../css/UseridAndPasswod.css";
// import { Button } from "antd";
// import { useNavigate } from "react-router-dom";
// import { PDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "column",
//     backgroundColor: "#fff",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
//   heading: {
//     fontSize: 20,
//     marginBottom: 10,
//   },
//   label: {
//     fontSize: 12,
//     marginBottom: 5,
//   },
//   value: {
//     fontSize: 14,
//   },
// });

// const UseridAndPasswordSave = () => {
//   const navigate = useNavigate();
//   const [userid, setUserId] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     setUserId(localStorage.getItem("myuserid"));
//     setPassword(localStorage.getItem("mypassword"));
//   }, []);

//   const goPayment = () => {
//     navigate("/paymentpage");
//   };

//   const generatePDFContent = () => (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           <Text style={styles.heading}>User ID and Password</Text>
//           <Text style={styles.label}>UserID:</Text>
//           <Text style={styles.value}>{userid}</Text>
//           <Text style={styles.label}>Password:</Text>
//           <Text style={styles.value}>{password}</Text>
//         </View>
//       </Page>
//     </Document>
//   );

//   return (
//     <>
//       <div className="useid-password-div">
//         <div className="userid-password-container">
//           <p>Welcome to JATTRADE FX</p>
//           <h4>Please save your UserID and Password</h4>
//           <div className="userid-and-password">
//             <p>User ID</p>&nbsp; : &nbsp;<span>{userid}</span>
//           </div>
//           <div className="userid-and-password">
//             <p>Password</p>&nbsp; : &nbsp;<span>{password}</span>
//           </div>
//           {/* <div className='userid-and-password'>
//             <Button type='primary' onClick={goPayment}>Payment</Button>
//           </div> */}
//           <div className="userid-and-password">
//             <Button type="primary" onClick={() => window.print()}>
//               Print
//             </Button>
//           </div>
//         </div>
//       </div>
//       <PDFViewer width="100%" height={600}>
//         {generatePDFContent()}
//       </PDFViewer>
//     </>
//   );
// };

// export default UseridAndPasswordSave;

import React, { useState, useEffect, useRef } from 'react';
import '../css/UseridAndPasswod.css';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
  },
  downloadButton: {
    marginRight: 10,
  },
  paymentButton: {
    marginLeft: 10,
  },
});

const UseridAndPasswordSave = () => {
  const navigate = useNavigate();
  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');

  

  useEffect(() => {
    setUserId(localStorage.getItem('userid'));
    setPassword(localStorage.getItem('password'));
  }, []);

  const goPayment = () => {
    navigate('/paymentpage');
  };

  const generatePDFContent = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Welcome to JATTRADE FX, Please save your User ID and Password </Text>
          <Text style={styles.value}>User ID: {userid}</Text>
          <Text style={styles.value}>Password: {password}</Text>
        </View>
      </Page>
    </Document>
  );

  const pdfContent = generatePDFContent();
  const onRenderSuccess = () => {
    setTimeout(() => {
      const pdfBlob = pdfRef.current?.toBlob();
      if (pdfBlob) {
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'user_credentials.pdf';
        link.click();
        URL.revokeObjectURL(url);
      }
    }, 1000);
  };

  const pdfRef = useRef();

  return (
    <>
      <div className="useid-password-div">
        <div className="userid-password-container">
          <p>Welcome to JATTRADE-FX</p>
          <h4>Please save your User ID and Password</h4>
          <div className="userid-and-password">
            <p>UserID</p>&nbsp;: <span>{userid}</span>
          </div>
          <div className="userid-and-password">
            <p>Password</p>&nbsp;: <span>{password}</span>
          </div>
          <div className="userid-and-password">
            <PDFDownloadLink document={pdfContent} fileName="user_credentials.pdf" onRender={onRenderSuccess}>
              {({ loading }) => (loading ? 'Generating PDF...' : <Button style={styles.downloadButton}>Download PDF</Button>)}
            </PDFDownloadLink>
            <PDFViewer ref={pdfRef} style={{ display: 'none' }}>
              {pdfContent}
            </PDFViewer>
            <Button onClick={goPayment} style={styles.paymentButton}>Payment</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UseridAndPasswordSave;
