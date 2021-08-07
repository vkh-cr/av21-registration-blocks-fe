import React from "react";
import { Button, Col, ProgressBar, Row, Card, Badge } from "react-bootstrap";

function BlockEvent({ event, key }) {
  const showFooter = (taken, capacity, isRegistration) => {
    if (isRegistration === "") {
      return (
        <>
          <Col>Registrace není potřeba</Col>
        </>
      );
    }

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
        <Col xs={6} md={4}>
          Obsazenost: {taken} / {event.capacity}
        </Col>
        <Col xs={6} md={4} style={{ textAlign: "right", marginTop: 10 }}>
          <Button variant="success" disabled={isEventOpen(time)}>
            Chci se přihlásit
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
        return (
          <Badge style={{ ...styles.badge, background: "green" }}>
            Workshop
          </Badge>
        );
      case "Přednášky":
        return (
          <Badge style={{ ...styles.badge, background: "blue" }}>
            Přednáška
          </Badge>
        );
      case "Duchovní":
        return (
          <Badge
            style={{ ...styles.badge, background: "yellow", color: "black" }}
          >
            Duchovní
          </Badge>
        );
      default:
        break;
    }
  };

  const badgeByTime = (startTime, endTime) => {
    let color;
    switch (startTime) {
      case "9:30":
        color = "#8EA4D2";
        break;
      case "10:00":
        color = "#8EA4D2";
        break;
      case "14:00":
        color = "#49516F";
        break;
      case "16:00":
        color = "#4C9F70";
        break;
      default:
        color = "8EA4D1";
    }
    return (
      <Badge style={{ ...styles.badge, marginLeft: 10, background: color }}>
        {startTime} - {endTime}
      </Badge>
    );
  };

  return (
    <Card style={styles.container} key={key}>
      <Card.Body>
        {customBadge(event.section)}
        {badgeByTime(event.timeStart, event.timeEnd)}
        <Card.Title> {cropTitle(event.nameOfEvent)} </Card.Title>

        <Row>
          <Col sm>{event.speaker}</Col>
          <Col></Col>
        </Row>

        <Row style={styles.wrapperLastRow}>
          {showFooter(event.taken, event.capacity, event.registration)}
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
  },
};

export default BlockEvent;
