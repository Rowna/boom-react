import React from 'react';
import "./SingleView.scss";
import { useParams } from 'react-router-dom';



export default function SingleView() {
  // vgl. die Erklaerungen in App.jsx zu 'singleview/:artID'
  const artID = useParams().artID;
  console.log("Artikel-ID: " + artID)



  return (
    <div>SingleView</div>
  )
}
