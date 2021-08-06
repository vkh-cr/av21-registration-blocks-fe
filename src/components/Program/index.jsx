import React from "react";

import BlockEvent from "../BlockEvent";
import { Spinner } from "react-bootstrap";

function Program({ blockEvents }) {
  return (
    <>
      {blockEvents.length === 0 && (
        <div style={styles.spinnerWrapper}>
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {blockEvents.length > 0 &&
        blockEvents.map((item) => <BlockEvent event={item} />)}
    </>
  );
}

export default Program;

const styles = {
  spinnerWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
};
