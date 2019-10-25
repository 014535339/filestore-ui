import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

export default function Home(props) {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
  
      try {
        const files = await loadFiles();
        setFiles(files);
      } catch (e) {
        alert(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [props.isAuthenticated]);
  
  function loadFiles() {
    return [{ 
      "attachment":"File1",
      "content":"File1 Description",
      "createdAt":1572042267000,
      "fileId":"578eb840-f70f-11e6-9d1a-1359b3b22944",
      "userId":"USER-SUB-1234"
   },
   
   { 
      "attachment":"File2",
      "content":"File2 Description",
      "createdAt":1571955867000,
      "fileId":"578eb840-f70f-11e6-9d1a-1359b3b22945",
      "userId":"USER-SUB-1234"
   },
   
   { 
      "attachment":"File3",
      "content":"File3 Description",
      "createdAt":1571869467000,
      "fileId":"578eb840-f70f-11e6-9d1a-1359b3b22946",
      "userId":"USER-SUB-1234"
   }
   ]
  }

  
  function renderFilesList(files) {
      return [{}].concat(files).map((file, i) =>
        i !== 0 ? (
          <LinkContainer key={file.fileId} to={`/files/${file.fileId}`}>
            <ListGroupItem header={file.content.trim().split("\n")[0]}>
              {"Created: " + new Date(file.createdAt).toLocaleString()}
            </ListGroupItem>
          </LinkContainer>
        ) : (
          <LinkContainer key="new" to="/files/new">
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Upload a new file
              </h4>
            </ListGroupItem>
          </LinkContainer>
        )
      );
  }
  

  function renderLander() {
    return (
      <div className="lander">
        <h1></h1>
        <p>Your Files</p>
      </div>
    );
  }

  function renderFiles() {
    return (
      <div className="files">
        <PageHeader>Your Files</PageHeader>
        <ListGroup>
          {!isLoading && renderFilesList(files)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderFiles() : renderLander()}
    </div>
  );
}