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
import { useParams } from "react-router-dom";
import { API_URL } from "./SubmitScanResult";

interface IFinding {
  ruleId: string;
  location: {
    path: string;
    positions: {
      begin: {
        line: number
      }
    }
  }
  metadata: {
    description: string;
    severity: string;
  }
  line: number;
}

const FindingList = () => {
  const [findings, setFindings] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (!params) return;
    const fetchResults = async () => {
      const results: any = await axios.get(
        `${API_URL}/result/${params.scanResultId}`
      );
      setFindings(results.data.data.Findings)
    };
    fetchResults();
  }, [params]);

  return (
    <>
      <Box mx="auto" mt="3em" w={["100%", "100%", "80%", "80%"]}>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>RuleId</Th>
                <Th>Description</Th>
                <Th>Severity </Th>
                <Th>Path name : line number</Th>
              </Tr>
            </Thead>
            <Tbody>
              {findings?.map((finding: IFinding, index: number) => {
                return (
                  <Tr key={`finding-${index}`}>
                    <Td>{finding.ruleId}</Td>
                    <Td>{finding.metadata?.description}</Td>
                    <Td>{finding.metadata?.severity}</Td>
                    <Td>{`${finding.location?.path} : ${finding.location?.positions?.begin?.line}`}</Td>
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

export default FindingList;
