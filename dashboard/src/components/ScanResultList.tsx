import { Table } from "@chakra-ui/react";
import { Tr } from "@chakra-ui/react";
import { Tbody } from "@chakra-ui/react";
import { Td } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import { Th } from "@chakra-ui/react";
import { Thead } from "@chakra-ui/react";
import { TableContainer } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./SubmitScanResult";
import { format } from "date-fns";

interface IScanResult {
  repositoryName: string;
  status: string;
  findingsCount: number;
  timestamp: string;
  id: number;
}

enum Status {
  QUEUED = "Queued",
  INPROGRESS = "In Progress",
  SUCCESS = "Success",
  FAILURE = "Failure",
}

const ScanResultList = () => {
  const navigate = useNavigate();
  const [scanResults, setScanResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const results: any = await axios.get(`${API_URL}/result/`);
      setScanResults(
        results.data.data.map((item: any) => {
          let timestamp = null;
          switch (item.Status) {
            case Status.INPROGRESS:
              timestamp = item.ScanningAt;
              break;
            case Status.QUEUED:
              timestamp = item.QueuedAt;
              break;
            case Status.SUCCESS:
              timestamp = item.FinishedAt;
              break;
            default:
              break;
          }
          return {
            id: item.Id,
            repositoryName: item.RepositoryName,
            status: item.Status,
            findingsCount: item.Findings?.length ?? 0,
            timestamp,
          };
        }) ?? []
      );
    };
    fetchResults();
  }, []);

  return (
    <>
      <Box mx="auto" mt="3em" w={["100%", "100%", "80%", "80%"]}>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Repository Name</Th>
                <Th>Scan Status</Th>
                <Th isNumeric>Findings</Th>
                <Th>Timestamp</Th>
              </Tr>
            </Thead>
            <Tbody>
              {scanResults?.map((scan: IScanResult, index: number) => {
                return (
                  <Tr key={`result-${index}`}>
                    <Td>{scan.repositoryName}</Td>
                    <Td>{scan.status}</Td>
                    <Td isNumeric>
                      <Badge
                        onClick={() => navigate(`/findings/${scan.id}`)}
                        cursor={"pointer"}
                        colorScheme="green"
                      >
                        {scan.findingsCount}
                      </Badge>
                    </Td>
                    <Td>
                      {format(new Date(scan.timestamp), "yyyy/MM/dd HH:MM:ss")}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default ScanResultList;
