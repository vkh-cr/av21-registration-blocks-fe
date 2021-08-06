import React from "react";
import { Button, Col, ProgressBar, Row, Card, Badge } from "react-bootstrap";

function BlockEvent({ event }) {
  const isFull = (taken, capacity) => {
    taken = taken === "" ? 0 : Number.parseInt(taken);
    capacity = Number.parseInt(capacity);

    const time = Date.parse(event.openingTime);

    const isEventOpen = (time) => {
      const now = new Date().getTime();
      if (time - now > 0) {
        return true;
      }
      return false;
    };

    if (taken === capacity) {
      return (
        <>
          <Col sm>
            <ProgressBar striped variant="danger" now={100} />
          </Col>
          <Col sm>
            {taken} / {event.capacity} Obsazeno!
          </Col>
          <Col></Col>
        </>
      );
    }

    return (
      <>
        <Col sm>
          <ProgressBar
            striped
            now={Math.round((taken / Number.parseInt(event.capacity)) * 100)}
          />
        </Col>
        <Col style={{}}>
          Obsazenost: {taken} / {event.capacity}
        </Col>
        <Col style={{ textAlign: "right", marginTop: 10 }}>
          <Button variant="success" disabled={isEventOpen(time)}>
            Přihlaš se
          </Button>
        </Col>
      </>
    );
  };

  const cropTitle = (text) => {
    return text.replace("přednáška - ", "").replace("WS - ", "");
  };

  const customBadge = (section) => {
    switch (section) {
      case "Volnočasovky":
        return <Badge style={{...styles.badge, background: "green" }}>Workshop</Badge>;
      case "Přednášky":
        return <Badge style={{...styles.badge, background: "blue" }}>Přednáška</Badge>;
      case "Duchovní":
        return <Badge style={{...styles.badge, background: "blue" }}>Duchovní</Badge>;
      default:
        break;
    }
  };

  return (
    <Card style={styles.container}>
      <Card.Body>
        {customBadge(event.section)}
        <Card.Title> {cropTitle(event.nameOfEvent)} </Card.Title>

        <Row>
          <Col sm>{event.speaker}</Col>
          <Col>
            {event.timeStart} - {event.timeEnd}
          </Col>
        </Row>

        <Row style={styles.wrapperLastRow}>
          {isFull(event.taken, event.capacity)}
        </Row>
      </Card.Body>
    </Card>
  );
}

const styles = {
  container: {
    marginTop: 10,
  },
  wrapperLastRow: {
    paddingTop: 10,
    alignItems: "center",
  },
  badge: {
    marginBottom: 5,
  }
};

export default BlockEvent;
