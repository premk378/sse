import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Notifications = () => {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState([]);
  let eventSource = undefined;

  useEffect(() => {
    if (!listening) {
      eventSource = new EventSource("http://localhost:8081/notify");

      eventSource.onopen = (event) => {
        console.log("connection opened");
      };

      eventSource.onmessage = (event) => {
        if(event.data) {
          const parsed = JSON.parse(event.data);
          setData((old) => [...old, parsed]);
        }
      };

      eventSource.onerror = (event) => {
        console.log(event.target.readyState);
        if (event.target.readyState === EventSource.CLOSED) {
          console.log("eventsource closed (" + event.target.readyState + ")");
        }
        eventSource.close();
      };

      setListening(true);
    }

    return () => {
      eventSource.close();
      console.log("eventsource closed");
    };
  }, []);

  return (
    <div className="table-container">
      <TableContainer className="notification-table">
        <Table variant="simple">
          {/* <TableCaption></TableCaption> */}
          <Thead>
            <Tr>
              <Th>File name</Th>
              <Th>Status</Th>
              <Th>Time</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map((d, idx) => {
                return (
                  <Tr key={idx}>
                    <Td>{d.filename}</Td>
                    <Td>{d.message}</Td>
                    <Td>{d.time}</Td>
                    <Td></Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Notifications;
