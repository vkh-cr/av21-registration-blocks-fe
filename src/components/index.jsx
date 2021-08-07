import React from "react";

import BlockEvent from "./BlockEvent";
import { Card, Spinner } from "react-bootstrap";

function Program({ blockEvents }) {
  const uniqueTimes = blockEvents
    .map((item) => item.timeStart)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <>
      {blockEvents.length === 0 && (
        <div style={styles.spinnerWrapper}>
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {blockEvents.length > 0 && (
        <div>
          {uniqueTimes.map((time, index) => (
            <Card
              eventKey={index}
              style={{ marginBottom: 40, marginLeft: 5, marginRight: 5 }}
            >
              <Card.Body>
                <Card.Title>BLOK od {time}</Card.Title>

                {blockEvents
                  .filter((item) => item.timeStart === time)
                  .map((item, index) => (
                    <BlockEvent event={item} />
                  ))}
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
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
